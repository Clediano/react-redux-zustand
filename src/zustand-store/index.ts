import { create } from "zustand";
import { api } from "../lib/axios";

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  nextLesson: () => void;
  load: () => Promise<void>;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },
    nextLesson: () => {
      const { currentModuleIndex, currentLessonIndex, course } = get();
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });
        }
      }
    },

    load: async () => {
      set({ isLoading: true });
      const response = await api.get("/courses/1");
      set({ course: response.data, isLoading: false });
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state: PlayerState) => {
    const { currentLessonIndex, currentModuleIndex } = state;
    const currentLesson =
      state.course?.modules[currentModuleIndex].lessons[currentLessonIndex];
    const currentModule = state.course?.modules[currentModuleIndex];
    return { currentLesson, currentModule };
  });
};

import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
  reducer: {
    player: player,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useCurrentLesson = () => {
  return useAppSelector((state: RootState) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;
    const currentLesson =
      state.player.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];
    const currentModule = state.player.course?.modules[currentModuleIndex];
    return { currentLesson, currentModule };
  });
};

import { ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Lesson } from "./Lesson";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

type ModuleProps = {
  title: string;
  lessonsAmount: number;
  moduleIndex: number;
};

export function Module({ title, lessonsAmount, moduleIndex }: ModuleProps) {
  const dispatch = useAppDispatch();

  const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;
    return {currentModuleIndex, currentLessonIndex};
  });

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-sm text-zinc-400">{lessonsAmount} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentLessonIndex === lessonIndex && currentModuleIndex === moduleIndex;
            return (
              <Lesson
              key={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
              isCurrent={isCurrent}
            />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

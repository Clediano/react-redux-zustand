import { ChevronDown, MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useCurrentLesson, useStore } from "../store";
import { useEffect } from "react";

export function Player() {
  const { course, load, isLoading } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
      isLoading: store.isLoading,
    };
  });

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson?.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 right-0 bottom-0 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 divide-y-2 divide-zinc-900">
            {isLoading && (
              <>
                <div className="flex flex-col p-4 bg-zinc-800">
                  <div className="animate-pulse flex items-center space-x-4">
                    <div className="rounded-full bg-zinc-950 h-10 w-10"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 ml-auto text-slate-700 group-data-[state=open]:rotate-180 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-zinc-800">
                  <div className="animate-pulse flex items-center space-x-4">
                    <div className="rounded-full bg-slate-950 h-10 w-10"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 ml-auto text-slate-700 group-data-[state=open]:rotate-180 transition-transform" />
                  </div>
                </div>
              </>
            )}

            {!isLoading && course?.modules.map((module, index) => (
              <Module
                key={module.id}
                moduleIndex={index}
                title={module.title}
                lessonsAmount={module.lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}

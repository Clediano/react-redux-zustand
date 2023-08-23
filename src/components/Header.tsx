import { useCurrentLesson, useStore } from "../store";

export function Header() {
  const isLoading = useStore((store) => store.isLoading);
  const { currentLesson, currentModule } = useCurrentLesson();

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo "{currentModule?.title}"
      </span>
    </div>
  );
}


import type { Note } from "../types/note";
import { NoteCard } from "./NoteCard";

type NoteListProps = {
  notes: Note[];
  onUpdate: (
    id: string,
    changes: Partial<
      Pick<Note, "title" | "content" | "pinned" | "archived">
    >,
  ) => void;
  onRemove: (id: string) => void;
};

export function NoteList({
  notes,
  onUpdate,
  onRemove,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-400">
          No notes found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

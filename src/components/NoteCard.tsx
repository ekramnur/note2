
import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onUpdate: (
    id: string,
    changes: Partial<
      Pick<Note, "title" | "content" | "pinned" | "archived">
    >,
  ) => void;
  onRemove: (id: string) => void;
};

export function NoteCard({
  note,
  onUpdate,
  onRemove,
}: NoteCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {note.title}
        </h2>

        {note.pinned && (
          <span className="text-xl" title="Pinned">
            📌 pin
          </span>
        )}
      </div>

      <p className="mb-5 whitespace-pre-wrap text-gray-600 dark:text-gray-300">
        {note.content}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            onUpdate(note.id, {
              pinned: !note.pinned,
            })
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdate(note.id, {
              archived: !note.archived,
            })
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          type="button"
          onClick={() => onRemove(note.id)}
          className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-950"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

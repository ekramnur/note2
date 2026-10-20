
import { useLocalStorage } from "./useLocalStorage";
import type { Note } from "../types/note";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

  function add(title: string, content: string) {
    const now = Date.now();

    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      pinned: false,
      archived: false,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
  }

  function update(
    id: string,
    changes: Partial<Pick<Note, "title" | "content" | "pinned" | "archived">>,
  ) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...changes,
              updatedAt: Date.now(),
            }
          : note,
      ),
    );
  }

  function remove(id: string) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id),
    );
  }

  const pinned = notes.filter(
    (note) => note.pinned && !note.archived,
  );

  return {
    notes,
    add,
    update,
    remove,
    pinned,
  };
}

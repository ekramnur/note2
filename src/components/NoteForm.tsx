
import { useState, type FormEvent } from "react";

type NoteFormProps = {
  onAdd: (title: string, content: string) => void;
};

export function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onAdd(title.trim(), content.trim());

    setTitle("");
    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
        className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note..."
        rows={4}
        className="mb-3 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>
  );
}


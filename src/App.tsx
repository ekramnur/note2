
import { useState } from "react";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { useNotes } from "./hooks/useNotes";
import { useTheme } from "./context/ThemeContext";

type View = "all" | "pinned" | "archived";

function App() {
  const { notes, add, update, remove, pinned } = useNotes();
  const { theme, toggleTheme } = useTheme();

  const [view, setView] = useState<View>("all");

  const visibleNotes =
    view === "all"
      ? notes.filter((note) => !note.archived)
      : view === "pinned"
        ? pinned
        : notes.filter((note) => note.archived);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-2xl font-bold">Notes App</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep your notes organized
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <NoteForm onAdd={add} />

        <nav className="mb-6 flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setView("all")}
            className={`rounded-lg px-4 py-2 font-medium ${
              view === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            All ({notes.filter((note) => !note.archived).length})
          </button>

          <button
            type="button"
            onClick={() => setView("pinned")}
            className={`rounded-lg px-4 py-2 font-medium ${
              view === "pinned"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Pinned ({pinned.length})
          </button>

          <button
            type="button"
            onClick={() => setView("archived")}
            className={`rounded-lg px-4 py-2 font-medium ${
              view === "archived"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Archived ({notes.filter((note) => note.archived).length})
          </button>
        </nav>

        <NoteList
          notes={visibleNotes}
          onUpdate={update}
          onRemove={remove}
        />
      </main>
    </div>
  );
}

export default App;

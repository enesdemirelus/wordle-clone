import { ModeToggle } from "./components/ModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-gray-900 dark:text-white text-xl font-semibold">Enes' Wordle Clone</h1>
      <ModeToggle></ModeToggle>
    </nav>
  );
}
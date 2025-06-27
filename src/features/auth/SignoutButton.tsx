import { LogOut } from "lucide-react";
import { signOut } from "./actions";

export default function SignoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 text-indigo hover:text-indigo transition-colors"
      >
        <LogOut className="w-5 h-5 text-indigo" />
        <span className="text-indigo">Signout</span>
      </button>
    </form>
  );
}

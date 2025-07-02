import Link from "next/link";
import Image from "next/image";
import { Bell, Plus, Home } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import UserDropdown from "./UserDropdown";

export default async function SignedinHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/header.svg"
                alt="CostMyTrip Logo"
                width={300}
                height={70}
                className="h-11 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Home button */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Post button */}
            <Link
              href="/create"
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Create</span>
            </Link>

            {/* Notification bell */}
            <button className="relative p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
              <Bell className="h-5 w-5" />
            </button>

            {/* User icon */}
            <UserDropdown user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}

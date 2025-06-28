import Link from "next/link";
import Image from "next/image";
import { User, UserPlus } from "lucide-react";

export default function GuestHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-100 border-b border-stone-200">
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
            <Link
              href="/signin"
              className="flex items-center space-x-1 px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-stone-200 rounded-md transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/signin"
              className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors duration-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

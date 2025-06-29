"use client";

import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

export function ProfileEditor() {
  return (
    <Link
      href="/settings"
      className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-4 py-2 transition-colors duration-200"
    >
      <Pencil className="h-4 w-4" />
      <span className="font-medium">Edit</span>
    </Link>
  );
}

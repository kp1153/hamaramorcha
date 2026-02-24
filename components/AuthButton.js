// components/AuthButton.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user?.image ? (
            <img 
              src={session.user.image} 
              alt={session.user.name} 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
          <span className="text-sm text-gray-700 hidden md:inline">
            {session.user?.name}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
    >
      <LogIn size={16} />
      <span className="hidden md:inline">Login with Google</span>
    </button>
  );
}
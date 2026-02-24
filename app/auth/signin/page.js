// app/auth/signin/page.js
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            साइन इन करें
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            कमेंट करने के लिए Google से लॉगिन करें
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-medium">Google से जारी रखें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
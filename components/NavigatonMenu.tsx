"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavigationMenu = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return (
    <nav>
      <ul className="flex gap-4 p-4 bg-gray-100">
        {session?.user?.accessToken ? (
          <div className="w-full flex items-center justify-between">
            <div className="space-x-4">
              <button>
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </button>
              <button>
                <Link href="/about" className="text-blue-600 hover:underline">
                  About
                </Link>
              </button>
              <button>
                <Link href="/users" className="text-blue-600 hover:underline">
                  Users
                </Link>
              </button>
            </div>
            <button
              className="bg-black text-white p-2 rounded-xl cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <li>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Register
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationMenu;

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenu = () => {
  const { status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue-600 font-bold underline"
      : "text-gray-500";
  };
  if (status === "loading") return null;

  return (
    <nav>
      <ul className="flex gap-4 p-4 bg-gray-100">
        {status === "authenticated" ? (
          <div className="w-full flex items-center justify-between">
            <div className="space-x-4">
              <button>
                <Link href="/" className={isActive("/")}>
                  Home
                </Link>
              </button>
              <button>
                <Link href="/about" className={isActive("/about")}>
                  About
                </Link>
              </button>
              <button>
                <Link href="/users" className={isActive("/users")}>
                  Users
                </Link>
              </button>
            </div>
            <button
              className="bg-black text-white p-2 rounded-xl cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
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

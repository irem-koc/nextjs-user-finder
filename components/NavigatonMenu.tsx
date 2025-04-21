import Link from "next/link";

const NavigationMenu = () => {
  return (
    <nav>
      <ul className="flex gap-4 p-4 bg-gray-100">
        <>
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/users" className="text-blue-600 hover:underline">
              Users
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-blue-600 hover:underline">
              About
            </Link>
          </li>
        </>
        <li>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;

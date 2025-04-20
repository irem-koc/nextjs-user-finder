type Props = {};

const NavigationMenu = (props: Props) => {
  return (
    <nav>
      <ul className="flex gap-4 p-4 bg-gray-100">
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/users" className="text-blue-600 hover:underline">
            Users
          </a>
        </li>
        <li>
          <a href="/about" className="text-blue-600 hover:underline">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;

import Logo from "./components/Logo";
import LogoutButton from "./components/Logout";

interface HeaderProps {
  height?: string;
}

const Header = ({ height = "4rem" }: HeaderProps) => (
  <header
    className="flex items-center bg-(--main-container-bg)"
    style={{ height }}
  >
    <div
      className="w-full mx-auto
     flex items-center h-full"
    >
      <Logo />
      <span className="mx-auto text-preset-1">Auth Project</span>
      <div className="flex flex-row ml-auto space-x-4">
        <LogoutButton />
      </div>
    </div>
  </header>
);

export default Header;

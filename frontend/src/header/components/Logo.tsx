import logoIcon from "../../assets/logoIcon.png";

const Logo = () => (
  <div className="flex items-center">
    <img
      src={logoIcon}
      alt="logo Icon"
      className="rounded-[50%] w-10 sm:w-12"
    />
  </div>
);

export default Logo;

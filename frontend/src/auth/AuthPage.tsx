import { Outlet } from "react-router";

const AuthPage = () => {
  return (
    <div
      className="
        flex items-center justify-center
        min-h-screen w-screen
        bg-(--auth-page-bg)
        p-[16px]
      "
    >
      <div
        className="
          bg-(--sub-container-bg)
          rounded-[12px]
          w-full max-w-[520px]
          p-[16px] sm:p-[32px] md-p-[48px]
          transition-all duration-300 ease-in-out
          flex flex-col items-center gap-6
        "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;

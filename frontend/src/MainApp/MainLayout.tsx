import { Outlet } from "react-router";
import Header from "../header/Header";

const MainLayout = () => {
  return (
    <div
      className="flex flex-col gap-4
      min-h-screen bg-(--main-container-bg)
      overflow-y-auto
      mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20
      px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 
      py-4 md:py-8"
    >
      <Header />
      <main
        className="flex-1  
      my-8
    "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

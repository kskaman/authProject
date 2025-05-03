import { useAuth } from "../auth/hooks/useAuth";
import Loader from "../ui/Loader";
import DeleteAccountButton from "./components/DeleteAccountButton";
import LogoutButton from "./components/Logout";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <Loader />;

  return (
    <div
      className="min-w-[100%] min-h-[50vh]
     flex flex-col justify-center items-center
      space-y-8"
    >
      <div className="bg-(--container-bg-option-1) rounded-2xl p-6">
        <h2 className="text-preset-2 mb-4 text-[--heading-text]">User Info</h2>
        <p>
          <strong className="text-preset-4 text-[--subheading-text-1]">
            Email :{" "}
          </strong>
          {user.email}
        </p>
        <p>
          <strong className="text-preset-4 text-[--subheading-text-1]">
            Created At :{" "}
          </strong>
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-60">
          <LogoutButton />
        </div>
        <div className="w-60">
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

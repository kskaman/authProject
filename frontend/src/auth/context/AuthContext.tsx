import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextProps {
  user: User | null;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  authLoading: true,
});

export default AuthContext;

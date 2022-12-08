import { createContext } from "react";

interface AuthContext {
  isLoggedIn: boolean;
  userId: string | null;
  login: (uid: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContext>({
  isLoggedIn: false,
  userId: null,
  login: (uid: string) => {},
  logout: () => {},
});

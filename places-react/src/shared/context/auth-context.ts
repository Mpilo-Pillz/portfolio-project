import { createContext } from "react";

interface AuthContext {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (uid: string, token?: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContext>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: string) => {},
  logout: () => {},
});

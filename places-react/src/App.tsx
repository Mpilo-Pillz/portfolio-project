import { useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlace from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { USERDATA } from "./shared/constants";
import { AuthContext } from "./shared/context/auth-context";
import { StoredUser } from "./shared/Types/User";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (uid: string, token?: string, expirationDate?: Date) => {
      setToken(token!);
      setUserId(uid);
      const tokenExpirationTime =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        USERDATA,
        JSON.stringify({
          userId: uid,
          token,
          expiration: tokenExpirationTime.toISOString(),
        })
      );
    },
    [setToken]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(USERDATA);
  }, [setToken]);

  useEffect(() => {
    const storedData: StoredUser = JSON.parse(
      localStorage.getItem(USERDATA) as string
    );
    const isExpirationDateInTheFuture =
      new Date(storedData.expiration) > new Date();

    if (storedData && storedData.token && isExpirationDateInTheFuture) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]); // will only run once cause login is wrapped in a use callback

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlace />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />} //this is a way to redirect
        />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlace />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="*"
          element={<Navigate to="/auth" replace />} //this is a way to redirect
        />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <MainNavigation />
      <main>
        <Routes>{routes}</Routes>
      </main>
    </AuthContext.Provider>
  );
};

export default App;

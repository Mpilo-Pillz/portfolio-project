import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlace from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  let routes;

  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <MainNavigation />
      <main>
        <Routes>{routes}</Routes>
      </main>
    </AuthContext.Provider>
  );
};

export default App;

import { useCallback, useEffect, useState } from "react";
import { USERDATA } from "../constants";
import { StoredUser } from "../Types/User";

let logoutTimer: number;

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (uid: string, token?: string, expirationDate?: Date) => {
      setToken(token!);
      setUserId(uid);
      const dateTokenExpires =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

      setTokenExpirationDate(dateTokenExpires);

      localStorage.setItem(
        USERDATA,
        JSON.stringify({
          userId: uid,
          token,
          expiration: dateTokenExpires.toISOString(),
        })
      );
    },
    [setToken]
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem(USERDATA);
  }, [setToken]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime(); // in miliseconds
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]); // logout is not recreated thanks to useCallback so no infinte loop

  useEffect(() => {
    const storedData: StoredUser = JSON.parse(
      localStorage.getItem(USERDATA) as string
    );
    const isExpirationDateInTheFuture =
      new Date(storedData?.expiration) > new Date();

    if (storedData && storedData.token && isExpirationDateInTheFuture) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]); // will only run once cause login is wrapped in a use callback

  return { token, login, logout, userId };
};

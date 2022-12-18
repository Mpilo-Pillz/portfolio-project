import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { User } from "../../shared/Types/User";
import UsersList from "../components/UsersList";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState<User[]>();

  useEffect(() => {
    // using an iife becuase cannot make useeffect async
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );

        setLoadedUsers(responseData.users);
      } catch (err: any) {}
    };

    fetchUser();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error as string} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay={false} />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers as User[]} />}
    </>
  );
};

export default Users;

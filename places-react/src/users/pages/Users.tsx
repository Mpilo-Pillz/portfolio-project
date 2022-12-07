import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { User } from "../../shared/Types/User";
import UsersList from "../components/UsersList";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [loadedUsers, setLoadedUsers] = useState<User[]>();

  useEffect(() => {
    // using an iife becuase cannot make useeffect async
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:4000/api/users");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error as string} onClear={errorHandler} />
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

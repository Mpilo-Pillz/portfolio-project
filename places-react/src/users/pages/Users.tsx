import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Thulani Gindindza",
      places: 3,
      image:
        "https://images.unsplash.com/photo-1606894436761-7a742916220a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJhZ29uJTIwYmFsbCUyMHN1cGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;

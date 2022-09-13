import React from "react";
import { User } from "../../shared/Types/User";
import UserItem from "./UserItem";
import "./UsersList.css";

interface UsersListProps {
  items: User[];
}
const UsersList: React.FC<UsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }
  return (
    <ul>
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;

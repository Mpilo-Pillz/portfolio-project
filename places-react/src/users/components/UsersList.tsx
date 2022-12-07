import React from "react";
import Card from "../../shared/components/UIElements/Card";

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
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;

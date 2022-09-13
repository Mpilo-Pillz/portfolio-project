import React from "react";

import "./UsersItem.css";

interface UserItemProps {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}
const UserItem: React.FC<UserItemProps> = ({ id, image, name, placeCount }) => {
  return <h1>Users List</h1>;
};

export default UserItem;

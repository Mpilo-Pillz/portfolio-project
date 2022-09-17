import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Mbabane",
    description: "One of the places I grew up",
    address: "Dr Sishayi, Mbabane, Eswatini",
    location: {
      lat: -26.3152423,
      lng: 31.1196755,
    },
    creator: "u1",
    imageUrl:
      "https://images.unsplash.com/photo-1655207882298-bd11bb69ee43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGVzd2F0aW5pfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "p2",
    title: "Mlilwane",
    description: "My first Cycle Trail",
    address: "Lobamba, Eswatini",
    location: {
      lat: -26.4798342,
      lng: 31.1938053,
    },
    creator: "u2",
    imageUrl:
      "https://images.unsplash.com/photo-1652478412734-22ff7ad45dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGVzd2F0aW5pfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

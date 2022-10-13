import express, { Router } from "express";

const placesRoutes = Router();

export const DUMMY_PLACES = [
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

placesRoutes.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  res.json({ place });
});

placesRoutes.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  res.json({ place });
});

export default placesRoutes;

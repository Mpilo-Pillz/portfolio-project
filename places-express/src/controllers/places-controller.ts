import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import { Place } from "../types/place";

export const DUMMY_PLACES: Place[] = [
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

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place });
};

export const getPlaceByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ place });
};

export const createPlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, coordinates, address, creator }: Place = req.body;

  const createdPlace = {
    id: Math.random().toString(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  // adding to the front f the array
  DUMMY_PLACES.unshift(createdPlace); //push(createdPlace)

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description }: Place = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  // DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

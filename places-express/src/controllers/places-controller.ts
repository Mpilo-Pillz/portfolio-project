import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getCoordsForAddress } from "../../util/location";
import HttpError from "../models/http-error";
import { Place as PlaceType } from "../types/place";
// import {Place} from "../models/place";

const Place = require("../models/place");

export let DUMMY_PLACES: PlaceType[] = [
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

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);

    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  /**
   * removing _id and making place an object
   * mongoose adds and id getter to every document which returns the id as a string
   * the getters are lost when we add toObject so setting getters to true retains the getters so they are kept and not lost
   * */

  res.json({ place: place.toObject({ getters: true }) });
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

export const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  let places: PlaceType[];

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find  places for the provided user id.", 404)
    );
  }

  res.json({
    places: places.map((place: any) => place.toObject({ getters: true })),
  });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    next(new HttpError("Invalid inputs passed, please check your data.", 422));
    // throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description, coordinates, address, creator }: PlaceType =
    req.body;

  console.log("req.body---------------", req.body);

  let coords;

  try {
    coords = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    creator,
  });
  try {
    console.log("here");

    await createdPlace.save();
  } catch (err) {
    console.log(err);

    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
  // adding to the front f the array
  // DUMMY_PLACES.unshift(createdPlace); //push(createdPlace)
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description }: PlaceType = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrongm could not update place.",
      500
    );
    return next(error);
  }

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

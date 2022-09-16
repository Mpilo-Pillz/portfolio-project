import React from "react";
import { googleMapsLocations } from "../../models/Place";
import Card from "../../shared/components/UIElements/Card";

import "./PlaceItem.css";

interface PlaceItemProps {
  key: string;
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: googleMapsLocations;
}
const PlaceItem: React.FC<PlaceItemProps> = ({
  key,
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
}) => {
  return (
    <Card className="place-item__content">
      <li className="place-item">
        <div className="place-item__image">
          <img src={image} alt={title} />
        </div>
        <div className="place-item__info">
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className="place-item__actions">
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </li>
    </Card>
  );
};

export default PlaceItem;

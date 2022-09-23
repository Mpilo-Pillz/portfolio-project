import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./NewPlace.css";

const NewPlace = () => {
  const titleInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );

  const descriptionInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );

  return (
    <form className="place-form">
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={titleInputHandler}
      />

      <Input
        label="Title"
        id="description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters) "
        onInput={descriptionInputHandler}
      />
    </form>
  );
};
export default NewPlace;

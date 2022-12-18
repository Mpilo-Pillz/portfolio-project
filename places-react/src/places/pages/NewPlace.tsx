import React, { useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./PlaceForm.css";

export type FormActionType = "INPUT_CHANGE" | "SET_DATA";

export interface FormState {
  title: {
    value: string;
    isValid: boolean;
  };
  description: {
    value: string;
    isValid: boolean;
  };
}

export interface formActionState {
  isValid?: boolean;
  inputId?: string | number | symbol | any;
  type?: FormActionType;
  value?: string;
  formIsValid?: boolean | undefined;
  inputs?: any;
}

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      // formData.append("creator", auth.userId as string);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/places`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      // Redirect user to different page
      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error as string} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />

        <Input
          label="Description"
          id="description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters) "
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="input"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center={false}
          onInput={inputHandler}
          errorText={"Please provide and image"}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};
export default NewPlace;

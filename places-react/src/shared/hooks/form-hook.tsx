import { useCallback, useReducer } from "react";
import { formActionState } from "../../places/pages/NewPlace";
import { UserInput } from "../Types/UserInput";

const formReducer = (state: any, action: formActionState) => {
  // console.log("STATE-->", state);
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true; // option 2
      // let formIsValid: boolean | undefined = true; // option 3
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && (action.isValid as boolean); // option 2
          // formIsValid = formIsValid && action.isValid; // option 3
          // formIsValid = formIsValid && action.isValid!; // will never be null. I think it might becuase of the other dispatch
          // or just remove the optional the cos the issue is action.isValid might be undefiend
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: { title: UserInput; description: UserInput },
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  // Let react store it so we do not recreate it unnecesarily
  const setFormData = useCallback((inputData: any, formValidity: boolean) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

export default useForm;

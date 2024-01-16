// Importing necessary React hooks and a custom local storage hook

import { createContext, useEffect, useReducer, useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { FloorCountTypes } from '../types/floorCountType';
import { LiftType } from '../types/liftType';
import { TimeScaleTypes } from '../types/timeScaleType';

// Type definition for individual form fields
type Field = {
  value: string;
  hasError: boolean;
  errorMessage: string;
}

// Initial state for form fields
const initialState = {
  value: '',
  hasError: false,
  errorMessage: ''
}

// Defining the structure of the context's data
type FormContextData = {
  selectedLiftType: LiftType;
  setSelectedLiftType: React.Dispatch<React.SetStateAction<LiftType>>;
  selectedFloorCount: FloorCountTypes;
  setSelectedFloorCount: React.Dispatch<React.SetStateAction<FloorCountTypes>>;
  selectedTimeScale: TimeScaleTypes;
  setSelectedTimeScale: React.Dispatch<React.SetStateAction<TimeScaleTypes>>;
  nameField: Field;
  dispatchNameField: React.Dispatch<any>;
  emailField: Field;
  dispatchEmailField: React.Dispatch<any>;
  phoneNumberField: Field;
  dispatchPhoneNumberField: React.Dispatch<any>;
  isYearly: boolean;
  setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlan: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<Plan>>;
  addOns: { title: string, description: string, price: number }[];
  setAddOns: React.Dispatch<React.SetStateAction<{ title: string; description: string; price: number; }[]>>;
  clearForm: () => void;
}

// Creating a context for the form with initial values
export const FormContext = createContext({
  selectedLiftType: null as any,
  setSelectedLiftType: () => { },
  selectedFloorCount: null as any,
  setSelectedFloorCount: () => { },
  selectedTimeScale: null as any,
  setSelectedTimeScale: () => { },
  nameField: initialState,
  dispatchNameField: () => { },
  emailField: initialState,
  dispatchEmailField: () => { },
  phoneNumberField: initialState,
  dispatchPhoneNumberField: () => { },
  isYearly: false,
  setIsYearly: () => { },
  selectedPlan: null as any,
  setSelectedPlan: () => { },
  addOns: [],
  setAddOns: () => { },
  clearForm: () => { }
} as FormContextData);

// Defining action types for the reducer function
export const ACTIONS = {
  SET_VALUE: 'SET_VALUE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Reducer function to manage state of individual form fields
function handleFormState(
  state: Field,
  action: any
) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: ''
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: '',
        hasError: false
      }
    default:
      return state
  }
}

// Type definition for a plan (e.g., subscription plan)
export type Plan = {
  name: string;
  price: number
}

// Interface for props passed to FormProvider component
interface FormProviderProps {
  children: React.ReactNode;
}

// FormProvider component, providing context to its children
export const FormProvider = ({ children }: FormProviderProps) => {
  // Lift Type
  const [selectedLiftType, setSelectedLiftType] = useState<string | null>(null);

  //floor count
  const [selectedFloorCount, setSelectedFloorCount] = useState<string | null>(null);

  // Time Scale
  const [selectedTimeScale, setSelectedTimeScale] = useState<string | null>(null);

  // Your Info
  const [nameField, dispatchNameField] = useReducer(handleFormState, initialState)
  const [emailField, dispatchEmailField] = useReducer(handleFormState, initialState)
  const [phoneNumberField, dispatchPhoneNumberField] = useReducer(handleFormState, initialState)

  // States for managing the subscription plan
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null as any);

  // State for managing additional options or services
  const [addOns, setAddOns] = useState<{ title: string, description: string, price: number }[]>([]);

  // Utilizing custom local storage hook for persisting and retrieving data
  const { getValueFromLocalStorage, removeValueFromLocalStorage } = useLocalStorage()


  // Function to clear all form fields and reset state
  function clearForm() {
    removeValueFromLocalStorage('liftType')
    removeValueFromLocalStorage('floorCount')
    removeValueFromLocalStorage('timeScale')
    removeValueFromLocalStorage('your-info')
    removeValueFromLocalStorage('plan')
    removeValueFromLocalStorage('add-ons')

    dispatchNameField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchEmailField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: '' })
    setSelectedLiftType(null)
    setSelectedFloorCount(null)
    setSelectedTimeScale(null)
    setIsYearly(false)
    setSelectedPlan(null as any)
    setAddOns([])
  }

  // useEffect hook to initialize form fields from local storage upon component mount
  useEffect(() => {

    const liftTypeFromLocalStorage = getValueFromLocalStorage('liftType')
    if (liftTypeFromLocalStorage) {
      setSelectedLiftType(liftTypeFromLocalStorage.name)
    }

    const floorCountFromLocalStorage = getValueFromLocalStorage('floorCount')
    if (floorCountFromLocalStorage) {
      setSelectedFloorCount(floorCountFromLocalStorage.name)
    }

    const timeScaleFromLocalStorage = getValueFromLocalStorage('timeScale')
    if (timeScaleFromLocalStorage) {
      setSelectedTimeScale(timeScaleFromLocalStorage.name)
    }

    const yourInfoFromLocalStorage = getValueFromLocalStorage('your-info')
    if (yourInfoFromLocalStorage) {
      dispatchNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.name })
      dispatchEmailField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.email })
      dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.phoneNumber })
    }

    const planFromLocalStorage = getValueFromLocalStorage('plan')
    if (planFromLocalStorage) {
      setSelectedPlan(planFromLocalStorage.name)
      setIsYearly(planFromLocalStorage.isYearly)
    }

    const addOnsFromLocalStorage = getValueFromLocalStorage('add-ons')
    if (addOnsFromLocalStorage) {
      setAddOns(addOnsFromLocalStorage)
    }
  }, [])


  // Context value composed of all state and dispatch functions
  const value = {
    selectedLiftType,
    setSelectedLiftType,
    selectedFloorCount,
    setSelectedFloorCount,
    selectedTimeScale,
    setSelectedTimeScale,
    nameField,
    dispatchNameField,
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField,
    isYearly,
    setIsYearly,
    selectedPlan,
    setSelectedPlan,
    addOns,
    setAddOns,
    clearForm
  }

  // Providing context to child components
  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
    </FormContext.Provider>
  );
};



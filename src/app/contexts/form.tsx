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
  firstNameField: Field;
  dispatchFirstNameField: React.Dispatch<any>;
  lastNameField: Field;
  dispatchLastNameField: React.Dispatch<any>;
  emailField: Field;
  dispatchEmailField: React.Dispatch<any>;
  phoneNumberField: Field;
  dispatchPhoneNumberField: React.Dispatch<any>;
  additionalInfoField: Field;
  dispatchAdditionalInfoField: React.Dispatch<any>; 
  postcodeField: Field; 
  dispatchPostcodeField: React.Dispatch<any>; 
  addressField: Field; 
  dispatchAddressField: React.Dispatch<any>; 
  cityField: Field; 
  dispatchCityField: React.Dispatch<any>; 
  countyField: Field; 
  dispatchCountyField: React.Dispatch<any>; 
  selectedFinanceField: Field;
  setSelectedFinanceField: React.Dispatch<any>;
  clearForm: () => void;
};

// Creating a context for the form with initial values
export const FormContext = createContext({
  selectedLiftType: null as any,
  setSelectedLiftType: () => { },
  selectedFloorCount: null as any,
  setSelectedFloorCount: () => { },
  selectedTimeScale: null as any,
  setSelectedTimeScale: () => { },
  firstNameField: initialState, // Changed from nameField
  dispatchFirstNameField: () => { }, // Changed from dispatchNameField
  lastNameField: initialState, // New field
  dispatchLastNameField: () => { }, // New dispatch function
  emailField: initialState,
  dispatchEmailField: () => { },
  phoneNumberField: initialState,
  dispatchPhoneNumberField: () => { },
  additionalInfoField: initialState,
  dispatchAdditionalInfoField: () => { },
  postcodeField: initialState, // Changed from firstNameField
  dispatchPostcodeField: () => { }, // Changed from dispatchFirstNameField
  addressField: initialState, // Changed from lastNameField
  dispatchAddressField: () => { }, // Changed from dispatchLastNameField
  cityField: initialState, // Changed from emailField
  dispatchCityField: () => { }, // Changed from dispatchEmailField
  countyField: initialState, // Changed from phoneNumberField
  dispatchCountyField: () => { },
  selectedFinanceField: initialState,
  setSelectedFinanceField: () => { },
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
  const [firstNameField, dispatchFirstNameField] = useReducer(handleFormState, initialState); 
  const [lastNameField, dispatchLastNameField] = useReducer(handleFormState, initialState); 
  const [emailField, dispatchEmailField] = useReducer(handleFormState, initialState)
  const [phoneNumberField, dispatchPhoneNumberField] = useReducer(handleFormState, initialState)
  const [additionalInfoField, dispatchAdditionalInfoField] = useReducer(handleFormState, initialState); 

  // Your Location
   const [postcodeField, dispatchPostcodeField] = useReducer(handleFormState, initialState); 
   const [addressField, dispatchAddressField] = useReducer(handleFormState, initialState); 
   const [cityField, dispatchCityField] = useReducer(handleFormState, initialState); 
   const [countyField, dispatchCountyField] = useReducer(handleFormState, initialState); 

   // Finance
    const [selectedFinanceField, setSelectedFinanceField] = useState<boolean>(false);

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
    removeValueFromLocalStorage('your-location')
    removeValueFromLocalStorage('finance-options')

    dispatchFirstNameField({ type: ACTIONS.SET_VALUE, value: '' }) // Changed from dispatchNameField
    dispatchLastNameField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchEmailField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchAdditionalInfoField({ type: ACTIONS.SET_VALUE, value: '' }) 
    dispatchPostcodeField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchAddressField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchCityField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchCountyField({ type: ACTIONS.SET_VALUE, value: '' })
    setSelectedFinanceField(null)
    setSelectedLiftType(null)
    setSelectedFloorCount(null)
    setSelectedTimeScale(null)
  }

  // useEffect hook to initialize form fields from local storage upon component mount
  useEffect(() => {

    const liftTypeFromLocalStorage = getValueFromLocalStorage('liftType')
    if (liftTypeFromLocalStorage) {
      setSelectedLiftType(liftTypeFromLocalStorage)
    }

    const floorCountFromLocalStorage = getValueFromLocalStorage('floorCount')
    if (floorCountFromLocalStorage) {
      setSelectedFloorCount(floorCountFromLocalStorage)
    }

    const timeScaleFromLocalStorage = getValueFromLocalStorage('timeScale')
    if (timeScaleFromLocalStorage) {
      setSelectedTimeScale(timeScaleFromLocalStorage)
    }

    const yourInfoFromLocalStorage = getValueFromLocalStorage('your-info')
    if (yourInfoFromLocalStorage) {
      dispatchFirstNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.firstName }) // Changed from dispatchNameField
      dispatchLastNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.lastName }) // New line
      dispatchEmailField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.email })
      dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.phoneNumber })
      dispatchAdditionalInfoField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.additionalInfo }) 
    }

    const yourLocationFromLocalStorage = getValueFromLocalStorage('your-location')
    if (yourLocationFromLocalStorage) {
      dispatchPostcodeField({ type: ACTIONS.SET_VALUE, value: yourLocationFromLocalStorage.postcode }) 
      dispatchAddressField({ type: ACTIONS.SET_VALUE, value: yourLocationFromLocalStorage.address }) 
      dispatchCityField({ type: ACTIONS.SET_VALUE, value: yourLocationFromLocalStorage.city }) 
      dispatchCountyField({ type: ACTIONS.SET_VALUE, value: yourLocationFromLocalStorage.county }) 
    }
    const financeOptionsFromLocalStorage = getValueFromLocalStorage('finance-options')
    if (financeOptionsFromLocalStorage) {
      setSelectedFinanceField(financeOptionsFromLocalStorage)
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
    firstNameField, // Changed from nameField
    dispatchFirstNameField, // Changed from dispatchNameField
    lastNameField, // New field
    dispatchLastNameField, // New dispatch function
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField,
    additionalInfoField,
    dispatchAdditionalInfoField,
    postcodeField, // Changed from firstNameField
    dispatchPostcodeField, // Changed from dispatchFirstNameField
    addressField, // Changed from lastNameField
    dispatchAddressField, // Changed from dispatchLastNameField
    cityField, // Changed from emailField
    dispatchCityField, // Changed from dispatchEmailField
    countyField, // Changed from phoneNumberField
    dispatchCountyField,
    selectedFinanceField,
    setSelectedFinanceField,
    clearForm
  }

  // Providing context to child components
  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
    </FormContext.Provider>
  );
};



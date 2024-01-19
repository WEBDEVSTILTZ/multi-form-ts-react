// Importing necessary hooks and local storage utility
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

// Defining the shape of the context data
type FormStepContextData = {
  currentStep: number;
  steps: { title: string; number: number }[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  moveToStep(step: number): void;
}

// Creating a context for the form step with default values
export const FormStepContext = createContext({
  currentStep: 2,
  steps: [],
  handleNextStep: () => {},
  handlePreviousStep: () => {},
  moveToStep: () => {},
} as FormStepContextData);

// Props type for the provider component
interface FormStepProviderProps {
  children: React.ReactNode;
}

// The provider component for form steps
export const FormStepProvider = ({ children }: FormStepProviderProps) => {
  // State for the current step, initializing with step 1
  const [currentStep, setCurrentStep] = useState(1);

  // Hardcoded steps for the form
  const [steps, _] = useState([
    { title: 'Lift Type', number: 1 },
    { title: 'Floor Count', number: 2 },
    { title: 'Time Scale', number: 3 },
    { title: 'Your Details', number: 4 },
    // { title: 'Select plan', number: 5 },
    { title: 'Your Location', number: 5},
    { title: 'Summary', number: 6 },
  ]);

  // Destructuring local storage utility functions
  const { getValueFromLocalStorage, saveValueToLocalStorage } = useLocalStorage()

  // useEffect to initialize current step from local storage on component mount
  useEffect(() => {
    const step = getValueFromLocalStorage('currentStep')
    if (step) setCurrentStep(step)
  }, [getValueFromLocalStorage])

  // Function to move to the next step
  const handleNextStep = () => {
    const newStepValue = currentStep + 1;
    if (currentStep < steps.length) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage('currentStep', `${newStepValue}`)
    };
  };

  // Function to go back to the previous step
  const handlePreviousStep = () => {
    const newStepValue = currentStep - 1;
    if (currentStep > 1) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage('currentStep', `${newStepValue}`)
    }
  };

  // Function to directly move to a specific step
  const moveToStep = (step: number) => {
    setCurrentStep(step);
    saveValueToLocalStorage('currentStep', `${step}`)
  }

  // Providing the context value to child components
  return (
    <FormStepContext.Provider value={{ steps, currentStep, handleNextStep, handlePreviousStep, moveToStep }}>
      {children}
    </FormStepContext.Provider>
  );
};

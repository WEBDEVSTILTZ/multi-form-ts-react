import { useFormStep } from "../../hooks/use-form-step";

interface FooterProps {
  handleGoBack: () => void;
  handleGoForwardStep: () => void;
}

export function Footer({ handleGoBack, handleGoForwardStep }: FooterProps) {
  const { currentStep, steps } = useFormStep();

  const numberOfSteps = steps.length;
  const isLastStep = currentStep === numberOfSteps;

  return (
    <footer className="p-4 bg-white flex justify-between items-center mt-5 sm:mt-0">
      <button
        onClick={handleGoBack}
        className={`border-none text-sm text-grey font-medium ${currentStep === 1 ? 'invisible' : 'visible'} sm:text-base`}
      >
        Go back
      </button>
      <button
        onClick={handleGoForwardStep}
        className={`${isLastStep ? 'bg-HLE1' : 'bg-HLE1'} py-3 px-4 rounded text-sm text-white font-medium sm:text-base`}
      >
        {isLastStep ? 'Get Quote' : 'Next step'}
      </button>
    </footer >
  )
}
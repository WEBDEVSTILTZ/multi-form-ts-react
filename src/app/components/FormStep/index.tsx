import { useFormStep } from "../../hooks/use-form-step";


import { YourInfo } from "./YourInfo";
import { Plans } from "./Plans";
import { AddOns } from "./AddOns";
import { Summary } from "./Summary";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

const steps = [
  {
    step: 1,
    component: Step1
  },
  {
    step: 2,
    component: Step2
  },
  {
    step: 3,
    component: Step3
  },
  {
    step: 4,
    component: YourInfo
  },
  {
    step: 5,
    component: Plans
  },
  {
    step: 6,
    component: AddOns
  },
  {
    step: 7,
    component: Summary
  }
]

export function FormStep() {
  const { currentStep } = useFormStep();

  const step = steps.find(({ step }) => step === currentStep);

  return (
    <div className="flex flex-col flex-1 justify-between">
      {step && step.component()}
    </div>
  )
} 
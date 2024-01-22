import { Fragment } from "react";

import { TimeScaleCard } from "./timeScaleCard";
import { Footer } from "../../Footer";
import Form from "../../Form";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";

import { TimeScaleTypes } from "@/app/types/timeScaleType";
import timeScaleData from '../../../../data/timeScaleData.json'

export function Step3() {
  const {
    selectedTimeScale,
    setSelectedTimeScale,
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  function handleGoForwardStep() {
    if (!selectedTimeScale) return;
    saveValueToLocalStorage('timeScale', JSON.stringify(selectedTimeScale))
    handleNextStep()
  }

  function handleSelectTimeScale(timeScale: TimeScaleTypes) {
    setSelectedTimeScale({
      name: timeScale.name,
      icon: timeScale.icon
    })
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select your time scale"
          description="You have the option of monthly or yearly billing."
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row items-center justify-center" >
          {timeScaleData.map((timeScaleItem) => (
            <TimeScaleCard
              key={timeScaleItem.name}
              timeScale={timeScaleItem}
              icon={timeScaleItem.icon}
              isSelected={timeScaleItem.name === selectedTimeScale?.name}
              handleSelectTimeScale={handleSelectTimeScale}
            />
          ))}
        </div>

      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}
import { Fragment } from "react";

import { LiftTypeCard } from "./liftTypeCard";
import { Footer } from "../../Footer";
import Form from "../../Form";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";

import { LiftType } from "../../../types/liftType";
import liftTypes from '../../../../data/liftTypeData.json'

import TagManager from 'react-gtm-module';

export function Step1() {
  const {
    selectedLiftType,
    setSelectedLiftType,
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  function handleGoForwardStep() {
    if (!selectedLiftType) return;
    saveValueToLocalStorage('liftType', JSON.stringify(selectedLiftType));
    console.log('liftType', JSON.stringify(selectedLiftType))
    const dataLayer = {
      event: 'Step1', // This is typically the event name you're tracking
      liftType: selectedLiftType.name // Make sure this property exists
  };

  TagManager.dataLayer({
      dataLayer: dataLayer
  });

  
    handleNextStep()
  }

  function handleSelectLiftType(lifttype: LiftType) {
    setSelectedLiftType({
      name: lifttype.name,
      icon: lifttype.icon
    })
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select your lift type"
          description="
            We want to make sure you get the best experience possible."
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row items-center justify-center">
          {liftTypes.map(liftType => (
            <LiftTypeCard
              key={liftType.name}
              liftType={liftType}
              icon={liftType.icon}
              isSelected={liftType.name === selectedLiftType?.name}
              handleSelectLiftType={handleSelectLiftType}
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
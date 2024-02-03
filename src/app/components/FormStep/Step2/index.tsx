import { Fragment } from "react";

import { FloorCountCard } from "./floorCountCard";
import { Footer } from "../../Footer";
import Form from "../../Form";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";

import { FloorCountTypes } from "@/app/types/floorCountType";
import floorCountData from '../../../../data/floorCountData.json'

import TagManager from 'react-gtm-module';

export function Step2() {
  const {
    selectedFloorCount,
    setSelectedFloorCount,
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  function handleGoForwardStep() {
    if (!selectedFloorCount) return;
    
    saveValueToLocalStorage('floorCount', JSON.stringify(selectedFloorCount));

    const dataLayer = {
      event: 'Step2', // This is typically the event name you're tracking
      liftType: selectedFloorCount.name // Make sure this property exists
  };

  TagManager.dataLayer({
      dataLayer: dataLayer
  });
  
    handleNextStep();
  }

  function handleSelectFloorCount(floorcount: FloorCountTypes) {
    setSelectedFloorCount({
      name: floorcount.name,
      icon: floorcount.icon
    })
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select your floor count"
          description="You have the option of monthly or yearly billing."
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row items-center justify-center">
          {floorCountData.map((floorCountItem) => (
            <FloorCountCard
              key={floorCountItem.name}
              floorCount={floorCountItem}
              icon={floorCountItem.icon}
              isSelected={floorCountItem.name === selectedFloorCount?.name}
              handleSelectFloorCount={handleSelectFloorCount}
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
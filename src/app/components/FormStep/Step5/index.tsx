'use client';

import { Fragment } from "react";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

export function YourLocation() {
  const {
    postcodeField,
    dispatchPostcodeField,
    addressField,
    dispatchAddressField,
    cityField,
    dispatchCityField,
    countyField,
    dispatchCountyField,
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  // function validateForm() {
  //   let formHasError = false

  //   if (!firstNameField.value) { // Changed from nameField
  //     dispatchFirstNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'First name is required' }) // Changed from dispatchNameField
  //     formHasError = true
  //   }

  //   if (!lastNameField.value) { // New validation for last name
  //     dispatchLastNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Last name is required' }) // New dispatch function
  //     formHasError = true
  //   }

  //   if (!emailField.value) {
  //     dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is required' })
  //     formHasError = true
  //   } else {
  //     const emailRegex = /\S+@\S+\.\S+/
  //     if (!emailRegex.test(emailField.value)) {
  //       dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is invalid' })
  //       formHasError = true
  //     }
  //   }

  //   if (!phoneNumberField.value) {
  //     dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is required' })
  //     formHasError = true
  //   } else {
  //     if (phoneNumberField.value.length < 6) {
  //       dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is invalid' })
  //       formHasError = true
  //     }
  //   }

  //   return !formHasError
  // }

  function handleGoForwardStep() {
    // const isValid = validateForm()
    // if (isValid) {
    saveValueToLocalStorage('your-location', JSON.stringify({
      postcode: postcodeField.value,
      address: addressField.value,
      city: cityField.value,
      county: countyField.value,
    }))
    handleNextStep()
    //}
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Your Location"
          description="Please provide your postcode, address, city, and county this step is not mandatory so feel free to skip."
        />
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5 mt-5">
          <TextInput
            label="Postcode"
            placeholder="e.g. SW1A 1AA"
            value={postcodeField.value}
            onChange={(value: string) => dispatchPostcodeField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={postcodeField.errorMessage}
            clearError={() => dispatchPostcodeField({ type: ACTIONS.CLEAR_ERROR })} hasError={false} />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5 mt-5">
          <TextInput
            label="Address"
            placeholder="e.g. 10 Downing Street"
            value={addressField.value}
            onChange={(value: string) => dispatchAddressField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={addressField.errorMessage}
            clearError={() => dispatchAddressField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={false} />
          <TextInput
            label="City"
            placeholder="e.g. London"
            value={cityField.value}
            onChange={(value: string) => dispatchCityField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={cityField.errorMessage}
            clearError={() => dispatchCityField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={false} />
        </div>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5 mt-5">
          <TextInput
            label="County"
            placeholder="e.g. Greater London"
            value={countyField.value}
            onChange={(value: string) => dispatchCountyField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={countyField.errorMessage}
            clearError={() => dispatchCountyField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={false} />
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
} 
'use client';

import { Fragment } from "react";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import { TextArea } from "../../Form/TextArea";
import Form from "../../Form";
import { Footer } from "../../Footer";

export function YourInfo() {
  const {
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
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  function validateForm() {
    let formHasError = false

    if (!firstNameField.value) { // Changed from nameField
      dispatchFirstNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'First name is required' }) // Changed from dispatchNameField
      formHasError = true
    }

    if (!lastNameField.value) { // New validation for last name
      dispatchLastNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Last name is required' }) // New dispatch function
      formHasError = true
    }

    if (!emailField.value) {
      dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is required' })
      formHasError = true
    } else {
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(emailField.value)) {
        dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is invalid' })
        formHasError = true
      }
    }

    if (!phoneNumberField.value) {
      dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is required' })
      formHasError = true
    } else {
      if (phoneNumberField.value.length < 6) {
        dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is invalid' })
        formHasError = true
      }
    }

    return !formHasError
  }

  function handleGoForwardStep() {
    const isValid = validateForm()
    if (isValid) {
      saveValueToLocalStorage('your-info', JSON.stringify({
        firstName: firstNameField.value, // Changed from name
        lastName: lastNameField.value, // New field
        email: emailField.value,
        phoneNumber: phoneNumberField.value
      }))
      handleNextStep()
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Your Details"
          description="Please provide your name, email address, and phone number."
        />
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5 mt-5">
          <TextInput
            label="First Name"
            placeholder="e.g. Stephen"
            value={firstNameField.value}
            onChange={(value: string) => dispatchFirstNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={firstNameField.errorMessage}
            clearError={() => dispatchFirstNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={firstNameField.hasError}
          />
          <TextInput
            label="Last Name"
            placeholder="e.g. King"
            value={lastNameField.value}
            onChange={(value: string) => dispatchLastNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={lastNameField.errorMessage}
            clearError={() => dispatchLastNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={lastNameField.hasError}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          <TextInput
            label="Email"
            placeholder="e.g. stephen.king@example.com"
            value={emailField.value}
            onChange={(value: string) => dispatchEmailField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={emailField.errorMessage}
            clearError={() => dispatchEmailField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={emailField.hasError}
          />
          <TextInput
            label="Phone Number"
            placeholder="e.g. +1 234 567 890"
            value={phoneNumberField.value}
            onChange={(value: string) => dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={phoneNumberField.errorMessage}
            clearError={() => dispatchPhoneNumberField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={phoneNumberField.hasError}
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center mb-8">
          <TextArea
            label="Additional Information"
            placeholder="Enter additional information here"
            value={additionalInfoField.value}
            onChange={(value: string) => dispatchAdditionalInfoField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={additionalInfoField.errorMessage}
            clearError={() => dispatchAdditionalInfoField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={additionalInfoField.hasError}
          />
          </div>
          {/* <div className="mt-5 flex flex-col gap-4">
          <TextInput
            label="First Name"
            placeholder="e.g. Stephen"
            value={firstNameField.value}
            onChange={(value: string) => dispatchFirstNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={firstNameField.errorMessage}
            clearError={() => dispatchFirstNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={firstNameField.hasError}
          />
          <TextInput
            label="Last Name"
            placeholder="e.g. King"
            value={lastNameField.value}
            onChange={(value: string) => dispatchLastNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={lastNameField.errorMessage}
            clearError={() => dispatchLastNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={lastNameField.hasError}
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. stephenking@lorem.com"
            value={emailField.value}
            onChange={(value: string) => dispatchEmailField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={emailField.errorMessage}
            clearError={() => dispatchEmailField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={emailField.hasError}
          />
          <TextInput
            label="Phone Number"
            placeholder="e.g. +1 234 567 890"
            value={phoneNumberField.value}
            onChange={(value: string) => dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={phoneNumberField.errorMessage}
            clearError={() => dispatchPhoneNumberField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={phoneNumberField.hasError}
          />
        </div> */}
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
} 
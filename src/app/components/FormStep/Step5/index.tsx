'use client';

import { Fragment } from "react";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import { AddressTextInput } from "../../Form/AddressTextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

import AddressSearch from 'react-loqate';
// import 'react-loqate/dist/react-loqate.cjs.development.css';



const APIKey = process.env.NEXT_PUBLIC_LOQATE_API_KEY || ''


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

  const CustomInput = ({className, ...props}: {className?: string, [key: string]: any}): JSX.Element => {
    const combinedClassName = `${className} px-4 py-3 rounded border-[1px] text-base text-denim font-medium bg 
    placeholder:text-grey
    focus:outline-none focus:border-purple`;
    console.log(props)
    
    return (
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5 mt-5">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <label className="text-denim text-xs sm:text-sm	">PostCode</label>
          </div>
          <input
            placeholder={'Start typing your postcode and select your address'}
            autoComplete="chrome-off"
            className={combinedClassName}
            {...props}
          />
        </div>
      </div>
    );
  };


  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Your Location"
          description="Please provide your postcode, address, city, and county this step is not mandatory so feel free to skip."
        />
        <AddressSearch
          locale="en-GB"
          apiKey={APIKey}
          countries={['GB']}
          components={{
            Input: CustomInput,
          }}
          classes={{ list: 'styled-list   bg-white shadow rounded max-h-64 overflow-auto',
           listItem: 'py-2 px-5 hover:bg-gray-200  rounded', }}
          onSelect={(address) => {
            console.log(address)
            dispatchPostcodeField({ type: ACTIONS.SET_VALUE, value: address.PostalCode });
            dispatchAddressField({ type: ACTIONS.SET_VALUE, value: address.Line1 })
            dispatchCityField({ type: ACTIONS.SET_VALUE, value: address.City })
            dispatchCountyField({ type: ACTIONS.SET_VALUE, value: address.Province })
          }}
          inline
          debounce={100}
        />
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
            hasError={false}
          />
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
} 
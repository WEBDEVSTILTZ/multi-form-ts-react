import { Fragment, useEffect, useState, } from "react";
import React from 'react';
import { useContext } from 'react';
import { FormContext } from "../../../contexts/form";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from '@radix-ui/react-icons';
import { Footer } from "../../Footer";
import Form from "../../Form";
import { LoadingQuote } from "./loading";

export function Summary() {
  const formContextData = useContext(FormContext);
  console.log(formContextData);

  const [submitted, setSubmitted] = useState(false);
  const [showLoadingQuote, setShowLoadingQuote] = React.useState(false); // New state variable for loading state

  const { handlePreviousStep, handleNextStep } = useFormStep();
  const { saveValueToLocalStorage } = useLocalStorage();

  const { 
    selectedLiftType, 
    selectedFloorCount, 
    selectedTimeScale, 
    firstNameField, 
    lastNameField, 
    emailField, 
    phoneNumberField, 
    postcodeField,
    additionalInfoField, 
    addressField, 
    cityField, 
    countyField,
    selectedFinanceField,
    setSelectedFinanceField, 
    clearForm 
  } = useForm();

  async function handleGoForwardStep() {

    saveValueToLocalStorage('finance-option', selectedFinanceField);


    const url = 'https://europe-west2-quote-stiltz-uk.cloudfunctions.net/quote-netsuite'; // Replace with your function's URL

    const formData = {
      LiftType:selectedLiftType,
      FloorCount:selectedFloorCount,
      TimeScale:selectedTimeScale,
      firstName: firstNameField,
      lastName: lastNameField,
      email: emailField,
      phoneNumber: phoneNumberField,
      postcode: postcodeField,
      additionalInfo: additionalInfoField,
      address: addressField,
      city: cityField,
      county: countyField,
      selectedFinance: selectedFinanceField,
    };

    try {
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const data = await response.json();
      // console.log(data);

      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
       // Set loading state to false after fetch request
       setShowLoadingQuote(true);
       setTimeout(() => {
        setShowLoadingQuote(false);
        handleNextStep()
      }, 1400);
    }
  }

  // useEffect(() => {
  //   if (submitted) {
  //     clearForm();

  //     setTimeout(() => {
  //       moveToStep(1);
  //     }, 14000);
  //   }
  // }, [submitted, moveToStep]);

  if (submitted) {
    if (showLoadingQuote) {
      return <LoadingQuote />;
    }
  }


  return (
<Fragment>
    <Form.Card>
      <Form.Header
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className="max-h-[50vh] overflow-auto">
        <div className="flex flex-col">
                    <div className="-my-2 sm:mx-6 lg:mx-0 ">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            <tr>
                <td className="px-2 py-4 whitespace-nowrap">First Name</td>
                <td className="px-2  py-4 whitespace-nowrap">{firstNameField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Last Name</td>
                <td className="px-2 py-4 whitespace-nowrap">{lastNameField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Phone Number</td>
                <td className="px-2 py-4 whitespace-nowrap">{phoneNumberField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Email</td>
                <td className="px-2 py-4 whitespace-nowrap">{emailField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Lift Type</td>
                <td className="px-2 py-4 whitespace-nowrap">{selectedLiftType?.name}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Floor Count</td>
                <td className="px-2 py-4 whitespace-nowrap">{selectedFloorCount?.name}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Time Scale</td>
                <td className="px-2 py-4 whitespace-nowrap">{selectedTimeScale?.name}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Additional Info</td>
                <td className="px-2 py-4 whitespace-nowrap">{additionalInfoField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Postcode</td>
                <td className="px-2 py-4 whitespace-nowrap">{postcodeField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">Address</td>
                <td className="px-2 py-4 whitespace-nowrap">{addressField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">City</td>
                <td className="px-2 py-4 whitespace-nowrap">{cityField.value}</td>
              </tr>
              <tr>
                <td className="px-2 py-4 whitespace-nowrap">County</td>
                <td className="px-2 py-4 whitespace-nowrap">{countyField.value}</td>
              </tr>

            </tbody>
            </table>
              </div>
            </div>
          </div>
        </div>
      </div>
<div className="flex flex-col gap-1 items-start">
  <strong className="text-sm font-medium text-denim sm:text-base">
  </strong>
</div>
         
<div className="mt-5 flex flex-col bg-very-light-grey rounded-lg p-4 sm:px-6">
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-1 items-start">
      <strong className="text-sm font-medium text-denim sm:text-base">
      </strong>
    </div>
  </div>
  <div className="flex items-center">
  <Checkbox.Root
  className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
  onCheckedChange={() => {
    const newValue = !selectedFinanceField;
    console.log('Checkbox value:', newValue);
    setSelectedFinanceField(newValue);
    saveValueToLocalStorage('finance-option', newValue);
  }}
  id="c1"
>
  <Checkbox.Indicator className="text-violet11">
    <CheckIcon />
  </Checkbox.Indicator>
</Checkbox.Root>
<label className="pl-[15px] text-[15px] leading-none" htmlFor="c1">
  Please provide me with infomation regarding <strong>financing options</strong>
</label>
</div>
</div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}
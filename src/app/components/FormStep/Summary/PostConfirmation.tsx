import React from 'react';
import { useState, useEffect } from "react";
import Form from "../../Form";
import Image from 'next/image'
import FinanceAccordion  from '../../Form/Accordian'
import { useContext } from 'react';
import { FormContext } from "../../../contexts/form";
import { useForm } from "../../../hooks/use-form";




export function PostConfirmation() {

  const formContextData = useContext(FormContext);
  console.log(formContextData);


  const { 
    selectedLiftType, 
    selectedFloorCount, 
    selectedTimeScale, 
    postcodeField,
  } = useForm();

  const [quoteData, setQuoteData] = useState("");

  useEffect(() => {
    if (selectedLiftType?.name === "Two Person") {
      setQuoteData("£16,000 to £18,000");
    } else if (selectedLiftType?.name === "Three Person") {
      setQuoteData("£18,000 to £22,000");
    }
  }, [selectedLiftType]);

  return (
    <div className="sm:my-auto">
      <Form.Card>
        <div className="flex flex-col items-center">
          <strong className="mt-6 text-2xl	text-denim font-bold">
            Your Quote is {quoteData}
          </strong>

          <p className="mt-2 mb-5 text-base text-grey font-normal leading-6 tracking-[0.5px] text-center">
            What happens next? We will be in touch with you shortly to discuss your requirements and arrange a site survey.
          </p>
          <p className="mt-2  text-base text-grey font-normal leading-6 tracking-[0.5px] text-center">
            if you have any questions please call us on the below number.
          </p>
          <strong className="mb-5 text-2xl	text-denim font-bold">
            0000 000 0000
          </strong>
          <FinanceAccordion />
        </div>
      </Form.Card>
    </div>
  )
}
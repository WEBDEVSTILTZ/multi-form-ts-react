import { Fragment } from "react";

import { Footer } from "../../Footer";
import Form from "../../Form";
import { useForm } from "../../../hooks/use-form";
import FinanceAccordion from '../../Form/Accordian'

import { LiftType } from "../../../types/liftType";

export function Step7() {

  const {
    selectedLiftType,
    setSelectedLiftType,
  } = useForm()

  let quoteData = ""

  if (selectedLiftType?.name === "Two Person") {
    quoteData = "£16,000 to £18,000";
  } else if (selectedLiftType?.name === "Three Person") {
    quoteData = "£18,000 to £22,000";
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title={`Your Estimated Cost is ${quoteData}`}
          description={``}
        />
        <div className="flex flex-col items-center">
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
    </Fragment>
  )
}
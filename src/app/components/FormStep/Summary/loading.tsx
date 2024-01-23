import Form from "../../Form";
import Image from 'next/image'
import QuoteProgress from '../../Form/progress'

export function LoadingQuote() {
  return (
    <div className="sm:my-auto">
      <Form.Card>
        <div className="flex flex-col items-center">
          <Image
            src={'/images/icons/icon-thank-you.svg'}
            alt="Thank you icon"
            width={56}
            height={56}
          />

          <strong className="mt-6 text-2xl	text-denim font-bold">
            Generating your quote
          </strong>

          <QuoteProgress />

        </div>
      </Form.Card>
    </div>
  )
}
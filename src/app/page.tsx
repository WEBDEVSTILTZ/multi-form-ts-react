'use client'

import { FormStep } from "./components/FormStep";
import { Sidebar } from "./components/Sidebar";
import { FormProvider } from "./contexts/form";

import { FormStepProvider } from "./contexts/form-step";

// import TagManager from 'react-gtm-module'

// const tagManagerArgs = {
//     gtmId: 'GTM-TSRZ5DRX'
// }

// TagManager.initialize(tagManagerArgs)

export default function Home() {
  return (
    <FormStepProvider>
      <FormProvider>
        <main className={`
          flex flex-col h-screen m-0
          sm:flex-row sm:m-4 sm:mr-0 sm:h-[calc(100vh-32px)]`
        }>
          <Sidebar />
          <div className="flex flex-1  items-normal sm:items-center justify-center sm:max-w-[700px] sm:flex-0 sm:mx-auto">
            <FormStep />
          </div>
        </main >
      </FormProvider>
    </FormStepProvider>
  )
}

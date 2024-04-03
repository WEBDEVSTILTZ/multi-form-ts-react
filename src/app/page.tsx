'use client'
import React, { useEffect } from 'react';
import { FormStep } from "./components/FormStep";
import { Sidebar } from "./components/Sidebar";
import { FormProvider } from "./contexts/form";

import { FormStepProvider } from "./contexts/form-step";

import TagManager from 'react-gtm-module'


export default function Home() {

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-5FSR5VG8'
    }

    TagManager.initialize(tagManagerArgs)
  }, []);


  return (
    <FormStepProvider>
      <FormProvider>
        <div className="flex flex-col items-center justify-between sm:justify-center min-h-screen max-w-1920px max-h-[900px] mx-auto">
          <main className="flex flex-col sm:flex-row w-full h-full max-w-1920px">
            <div className="flex-none sm:w-1/4">
              <Sidebar />
            </div>
            <div className="flex-grow flex items-center justify-center sm:w-3/4 sm:max-w-xl sm:ml-[15%] sm:mr-auto">
              <FormStep />
            </div>
          </main>
        </div>
      </FormProvider>
    </FormStepProvider>
  )
}
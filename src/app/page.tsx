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

// export default function Home() {
//   return (
//     <FormStepProvider>
//       <FormProvider>
//         <div className="flex justify-center min-h-screen max-w-1920px max-h-[900px] mx-auto">
//           <main className={`
//             flex flex-col h-screen m-0 w-full
//             sm:flex-row sm:m-4 sm:mr-0 sm:h-[calc(100vh-32px)]
//           `}>
//             <Sidebar />
//             <div className="flex flex-1 items-normal sm:items-center justify-center sm:max-w-[700px] sm:flex-0 sm:mx-auto">
//               <FormStep />
//             </div>
//           </main>
//         </div>
//       </FormProvider>
//     </FormStepProvider>
//   )
// }


export default function Home() {
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
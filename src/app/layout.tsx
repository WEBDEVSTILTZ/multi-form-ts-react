import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu, Open_Sans} from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

const open_sans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: 'Multi Step Form',
  description: 'Multi Step Form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='antialiased'>
      <body className={open_sans.className}>{children}</body>
      {/* <body className={ubuntu.className}>{children}</body> */}
    </html>
  )
}

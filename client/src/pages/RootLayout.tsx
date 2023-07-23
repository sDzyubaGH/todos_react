import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

type Props = {}

export default function RootLayout({ }: Props) {
  return (
    <div className='bg-neutral-800 min-h-screen text-neutral-100'>
      <header className='py-2 border-b border-neutral-300'>
        <Navigation />
      </header>
      <div className='container mx-auto'>
        <Outlet />
      </div>
    </div>
  )
}
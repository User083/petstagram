import Image from 'next/image'
import { Navbar, Sidebar } from '@/components'

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow:hidden xl:hover:overflow-auto'>
          <Sidebar/>
        </div> 
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] images flex-1'>
           <h1 className='font-bold text-3xl'>Petstagram</h1>
        </div>
       
        </div> 
    </main>
  )
}

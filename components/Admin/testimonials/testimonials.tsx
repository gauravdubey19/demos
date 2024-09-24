import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TestimonialCards from './TestimonialCards'
import Modal from './Modal'

const Testimonials = () => {
  return (
    <div className='bg-white h-screen text-black p-10'>
      <div className='text-3xl'>
        Testimonials
      </div>
      <div className='pt-10 flex flex-row items-center justify-between'>
        <p className='text-lg'> Total Testimonials: 03</p>

        {/* Wrapping Button with DialogTrigger for Modal */}
        <Modal variant='create'/>
      </div>
      <div className="pt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <TestimonialCards />
        </div>
        <div>
          <TestimonialCards />
        </div>
        <div>
          <TestimonialCards />
        </div>
      </div>
    </div>
  )
}

export default Testimonials

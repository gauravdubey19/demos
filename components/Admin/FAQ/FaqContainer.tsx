import React from 'react'
import SearchForm from './SearchBar'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FAQ from "./FAccordian";
import FaqModal from './FaqModal';

const FaqContainer = () => {
  return (
    <div className='p-5 bg-white text-black'>
      <div className='text-3xl'>
        Testimonials
      </div>
        <div className='flex flex-row items-center pt-10 justify-between'>
              <div className='text-xl'>
                  Total FAQ{"'"}s: 07
              </div>
              <div className='flex flex-row gap-2'>
                  <SearchForm />
                  <FaqModal variant='create'/>
              </div>
        </div>
          <FAQ />

       
    </div>
  )
}

export default FaqContainer
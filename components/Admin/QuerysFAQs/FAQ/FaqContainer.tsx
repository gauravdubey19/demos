
"use client"
import React, { useState, useEffect } from 'react'
import SearchForm from './SearchBar'
import FAQ from "./FAccordian";
import FaqModal from './FaqModal';
import { Skeleton } from '@/components/ui/skeleton';


const FaqContainer = () => {
  const [faqData, setFaqData] = useState<any[]>([]); // Specify the correct type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq/get');
      if (response.ok) {
        const data = await response.json();
        setFaqData(data);
      } else {
        console.error('Failed to fetch FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSection = async (headline: any) => {
    try {
      const response = await fetch('/api/faq/push/createHeadline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headline }),
      });

      if (response.ok) {
        const newSection = await response.json();
        setFaqData([...faqData, newSection]);
      } else {
        console.error('Failed to create new FAQ section');
      }
    } catch (error) {
      console.error('Error creating new FAQ section:', error);
    }
  };

  return (
    <div className='p-5 bg-white text-black'>
      <div className='text-3xl'>
        FAQs
      </div>
      <div className='flex flex-row items-center pt-10 justify-between'>
        <div className='text-xl'>
          Total FAQ{"'"}s: {faqData.length}
        </div>
        <div className='flex flex-row gap-2'>
          <SearchForm />
          <FaqModal variant='create' onSubmit={handleCreateSection} />
        </div>
      </div>
      {isLoading ? (
        // Render skeleton while loading
        <div className="space-y-4 px-20 mt-10">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton className='w-full h-[3rem] ' key={index} />
          ))}
        </div>
      ) : (
        // Render actual data when loaded
        <FAQ faqData={faqData} setFaqData={setFaqData} />
      )}
    </div>
  )
}

export default FaqContainer
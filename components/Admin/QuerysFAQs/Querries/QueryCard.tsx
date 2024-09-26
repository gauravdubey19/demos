import { ChevronRight, CircleCheck, Hourglass, MessageSquareMore } from 'lucide-react'
import React from 'react'

interface QueryCardI{
    query:any
    onClick: () => void;
}

const QueryCard = ({ query, onClick }: QueryCardI) => {
  return (
      
      <div className="bg-[#f8f8f8] p-4 rounded-lg flex border  items-center gap-5" onClick={onClick}>
                      <div className=' flex flex-col items-start justify-between gap-4'>
                          <div>
                              {query.status === 'answered' ? (
                                  // <i className="fas fa-check-circle text-green-500 ml-auto"></i>
                                  <div className='p-1 rounded-lg bg-green-200'>
                                      <CircleCheck height={10} width={10} className='text-green-500' />
                                  </div>

                              ) : (
                                  // <i className="fas fa-exclamation-circle text-red-500 ml-auto"></i>
                                  <div className='p-1 rounded-lg bg-red-200'>
                                      <Hourglass height={10} width={10} className='text-red-500' />
                                  </div>
                              )}
                          </div>
                          <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
                      </div>
                      <div>
                          <p className="font-semibold">{query.name}</p>
                          {/* <p className="text-gray-500">{query.email}</p> */}
                          <p className="text-gray-500">{query.question}</p>
                      </div>
                      <div>
                          {query.status === 'answered' ? (
                              <ChevronRight height={12} width={12} />
                          ) : (
                              <MessageSquareMore height={12} width={12} />
                          )}

                      </div>
                  </div>
             
  )
}

export default QueryCard
import React, { useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
// import {GrPowerReset} from "react"
function Types({types, changeType}: {
    types: Texture[],
    changeType: (type: string) => void,
}) 

{
    const [activeTab, setActiveTab] = useState();
  return (
    <>
          <h1 className="text-3xl font-semibold p-3 sticky top-0 z-10 backdrop-blur-sm text-yellow-400 flex justify-between items-center gap-0">Types <GrPowerReset size={25} className='cursor-pointer hover:scale-105 transition-transform' onClick={() => changeType('reset')} /> </h1>
      <div className="w-full h-auto flex justify-center items-center flex-wrap gap-3.5 flex-row">
        {
          types.map((item: Texture) => (
            <div key={item.id} className={`${activeTab===item.imageUrl.src ? `border-yellow-400` : `border-transparent`} border-2 border-solid transition-all duration-300 ease-in-out w-full sm:w-32 h-32 rounded-xl overflow-hidden shadow-2xl`} onClick={() => {setActiveTab(item.imageUrl.src), changeType(item.name)}}>
              <img src={item.imageUrl.src} alt="" className="w-full h-full object-cover rounded-xl hover:scale-110 transition-all duration-200 cursor-pointer"/>
            </div>

          ))
        }
      </div>
    </>
  )
}

export default Types
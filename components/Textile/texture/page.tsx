import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5';

function Texture({textures, changeTexture}: {
    textures: Texture[],
    changeTexture: (texture: string) => void,
}) {
    const [active, setActive] = useState('');
  return (
    <>
    <h1 className="text-3xl font-semibold p-3 text-yellow-400 mix-blend-multiply sticky top-0 z-10 backdrop-blur-sm">Texture selection</h1>
    <div className="sm:w-[90%] w-full h-12 mb-4 flex justify-between items-center gap-0 px-3">
      <input type="text" placeholder='search...' className='w-5/6 h-4/5 py-0 text-base rounded-xl outline-none border border-solid border-gray-300 px-4' />
      <IoSearch className='bg-yellow-400/30 rounded-lg text-yellow-500 hover:bg-yellow-400 hover:text-white transition-all cursor-pointer p-2' size={38}/>
    </div>
      <div className="w-full h-auto flex justify-start items-start px-3 flex-wrap sm:gap-3.5 gap-2">
        {
          textures.map((item) => (
            <div key={item.id} className={`${active===item.imageUrl.src ? "border-yellow-500" : "border-transparent"} border-2 border-solid sm:w-40 sm:h-40 w-[45%] h-[45%] rounded-xl overflow-hidden`} onClick={() => {setActive(item.imageUrl.src), changeTexture(item.imageUrl.src)}}>
              <img src={item.imageUrl.src} alt="" className="wi-full h-full object-cover rounded-xl hover:scale-110 transition-all duration-200 cursor-pointer"/>
            </div>
          ))
        }
      </div>  
    </>
  )
}

export default Texture
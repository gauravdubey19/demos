"use client";


import { useState } from "react";
import Render from "@/components/Textile/render/page";


import shirt_1 from "@/assets/shirt_1.jpg";
import shirt_3 from "@/assets/shirt_2.jpg";
import shirt_2 from "@/assets/shirt_3.jpg";
import pants_1 from "@/assets/pants_1.png"
import pants_2 from "@/assets/pants_2.jpg"
import pants_3 from "@/assets/pants_3.jpg"
import pants_4 from "@/assets/pants_4.jpg"
import pants_5 from "@/assets/pants_5.jpg"




import shirt from "@/assets/shirt.png";
import pants from "@/assets/pants.png";
import full from "@/assets/full.png";
import shorts from "@/assets/shorts.png"

import Types from "@/components/Textile/type/page";
import Texture from "@/components/Textile/texture/page";



export default function RenderTextile() {
  const tabs = ['Shirts', 'Pants', 'Kurta', 'Trousers', 'Sherwani'];
  const [activeTab, setActiveTab] = useState(tabs[0].toLocaleLowerCase())
  const [activeCameraPosition, setCameraPosition] = useState([2.698, 2.738, 3.891])
  const [activeCameraRotation, setCameraRotation] = useState([-0.44, 0.552, 0.23])
  const [yAxis, setyAxis] = useState(0.9);
  const [Fov, setFov] = useState(22);
  
  const textures: Texture[] = [
    {
      id: 1,
      category: 'shirts',
      name: "Textured",
      imageUrl: shirt_1,
      
    },
    {
      id: 2,
      category: 'shirts',
      name: "Textured",
      imageUrl: shirt_2,
    },
    
    {
      id: 3,
      category: 'shirts',
      name: "Textured",
      imageUrl: shirt_3,
    },
    {
      id: 4,
      category: 'pants',
      name: "Textured",
      imageUrl: pants_1,
    }, 
    {
      id: 5,
      category: 'pants',
      name: "Textured",
      imageUrl: pants_2,
    }, 
    {
      id: 6,
      category: 'pants',
      name: "Textured",
      imageUrl: pants_3,
    }, 
    {
      id: 7,
      category: 'pants',
      name: "Textured",
      imageUrl: pants_4,
    }, 
    {
      id: 8,
      category: 'pants',
      name: "Textured",
      imageUrl: pants_5,
    }, 
 
  ]

  const types: Texture[] = [
    {
      id: 0,
      category: 'shirts',
      name: "reset",
      imageUrl: full,
    },
    {
      id: 1,
      category: 'shirts',
      name: "shirt",
      imageUrl: shirt,
    },
    {
      id: 2,
      category: 'pants',
      name: "pants",
      imageUrl: pants,
    },
    {
      id: 3,
      category: 'pants',
      name: "shorts",
      imageUrl: shorts,
    }
  ]
  const [textureUrl, setTextureUrl]:any = useState('')

  const activeCameraAngle = (type: string) => {
    if (type === "reset") {
      setCameraPosition([2.698, 2.738, 3.891]);
      setCameraRotation([-0.44, 0.552, 0.23]);
      setFov(22);
      setyAxis(0.9);
    }


    if (type === "shirt") {
      setCameraPosition([0, 0, 3.5]);
      setCameraRotation([0, 0, 0]);
      setFov(10);
      setyAxis(1.3);
    }
    if (type === "pants") {
      setCameraPosition([0, 0, 6]);
      setCameraRotation([0, 0, 0]);
      setFov(10);
      setyAxis(0.6);
    }
  }

  const changeTexture = (imageUrl: string) => {
    setTextureUrl(imageUrl);    
  }

  return (
    <div className="w-screen py-4 h-auto sm:h-screen overflow-hidden flex justify-between items-start flex-col sm:flex-row">
      {/* Types selection area */}
<div className="order-3 md:order-1 sm:w-[10%] w-full h-48 sm:h-full flex justify-start flex-col overflow-auto pb-4 p-2 pt-0 relative" style={{scrollbarWidth: 'none'}}>
      <Types types={types} changeType={activeCameraAngle}/>
</div>

        {/* Main render and tabs */}
      <div className="order-1 md:order-2 w-full px-2 gap-3 sm:gap-2 sm:w-2/3 sm:h-full h-[30rem] flex sm:flex-col flex-col-reverse justify-start items-start">
        <div className="w-full h-[10%] flex justify-start items-center flex-row px-4 gap-4 overflow-x-auto">
        {
          tabs.map((tab) => (
            <div key={tab} onClick={() => setActiveTab(tab.toLocaleLowerCase())} className={`w-fit h-fit p-4 pb-[2px] py-0 rounded-full text-xl cursor-pointer hover:scale-110 transition-all duration-300 ${tab.toLocaleLowerCase() === activeTab ? 'bg-yellow-400/30 border border-solid border-yellow-400 text-xl font-normal' : 'text-gray-500'}`}>
              <p>{tab}</p>
            </div>
          ))
        }
        </div>
        <Render ActivePosition={activeCameraPosition} ActiveRotation={activeCameraRotation} yAxis={yAxis} Fov={Fov} texture={textureUrl} activeTab={activeTab} />
      </div>

        {/* Texture selection... */}
      <div className="order-2 md:order-3 w-full sm:w-3/12 h-full flex justify-start flex-col overflow-auto pb-4 relative" style={{scrollbarWidth: 'none'}}>
        <Texture textures={textures.filter((item) => {return activeTab===item.category})} changeTexture={changeTexture} />
      </div>
    </div>
  );
}

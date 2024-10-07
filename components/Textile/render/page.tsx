import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import {Character} from "@/components/Textile/Character.jsx"
import { IoBagHandleOutline, IoLogoWhatsapp, IoShareSocialOutline } from 'react-icons/io5'

function Render({ActivePosition, ActiveRotation, yAxis, Fov, texture, activeTab}: {
    ActivePosition: any
    ActiveRotation: any,
    yAxis: number,
    Fov: number,
    texture: string,
    activeTab: string,
}) {
  return (
    <div className="w-full h-5/6 rounded-2xl bg-yellow-200/20 relative">
      <div className="w-16 h-48 flex flex-col gap-2 absolute right-0 bottom-0 px-[2px] z-10">
        <div className="cursor-pointer p-3 py-4 sm:py-4 sm:p-5 rounded-full flex justify-center items-center bg-teal-400/30 text-teal-600 text-2xl sm:text-3xl"><IoLogoWhatsapp /></div>
        <div className="cursor-pointer p-3 py-4 sm:py-4 sm:p-5 rounded-full flex justify-center items-center bg-blue-400/30 text-blue-700 text-2xl sm:text-3xl"><IoShareSocialOutline /></div>
        <div className="cursor-pointer p-3 py-4 sm:py-4 sm:p-5 rounded-full flex justify-center items-center bg-yellow-400/30 text-yellow-600 text-2xl sm:text-3xl"><IoBagHandleOutline /></div>

      </div>
        <Canvas>
      <PerspectiveCamera makeDefault={true} far={1000} near={0.9} fov={Fov} position={ActivePosition} rotation={ActiveRotation} />
        <Character 
         textureUrl={activeTab==="shirts" && texture}
         baseTextureUrl={activeTab==="pants" && texture}
        />
        <OrbitControls
         enableRotate
         enablePan={false}  // Disable panning
         enableZoom={false} 
        maxPolarAngle={Math.PI / 2}  // Restrict vertical rotation to top
         minPolarAngle={Math.PI / 2}  // Restrict vertical rotation to bottom
         enableDamping={true}
         dampingFactor={0.1}
         maxAzimuthAngle={Infinity}  // No limit on rotation around the Y axis
         minAzimuthAngle={-Infinity} // No limit on rotation around the Y axis
         target={[0, yAxis, 0]}
        />
        </Canvas>
    </div>
  )
}

export default Render

// 0.6 z - 6 
// 1.3 z - 3.5
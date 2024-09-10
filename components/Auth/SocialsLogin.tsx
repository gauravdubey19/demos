"use client";
import React, { useEffect, useState } from 'react'
import Google from '@/public/google.png'
import Facebook from '@/public/facebook.png'
import Github from '@/public/github.png'
import Image from 'next/image'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const SocialsLogin = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState<Providers>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
  
    useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
    }, []);
    useEffect(() => {
        console.log(providers);
    }, [providers]);
  return (
    <div className='w-full mt-10' >
        <div className='flex flex-row items-center gap-2 px-10'>
            <div className='h-[1px] w-full bg-black'/>
            <h1 className='text-black '>or</h1>
            <div className='h-[1px] w-full bg-black'/>
        </div>

        <div className='flex flex-row items-center justify-center gap-10 mt-10'>
            { providers && Object.values(providers).map((provider) => (
                <button className='h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer'
                type='button'
                key={provider.id}
                onClick={() => {
                    signIn(provider.id)
                }}
                >
                    <Image src={Google} alt='social_icons' />
                </button>
            ))
              }
              <div className='h-10 p-2 text-black w-10 border-black rounded-xl border cursor-pointer'>
                  <Image src={Facebook} alt='social_icons' />
              </div>
              <div className='h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer'>
                  <Image src={Github} alt='social_icons' />
              </div>
        </div>
      
    </div>
  )
}

export default SocialsLogin
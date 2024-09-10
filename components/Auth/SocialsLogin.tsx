"use client";

import React, { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import Image from "next/image";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const SocialsLogin = () => {
  const [providers, setProviders] = useState<Providers>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  useEffect(() => {
    // console.log(providers);
  }, [providers]);

  return (
    <div className="w-full mt-10">
      <div className="flex flex-row items-center gap-2 px-10">
        <div className="h-[1px] w-full bg-black" />
        <h1 className="text-black ">OR</h1>
        <div className="h-[1px] w-full bg-black" />
      </div>

      <div className="flex flex-row items-center justify-center gap-10 mt-10">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              className="h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer"
              type="button"
              key={provider.id}
              onClick={() => signIn(provider.id)}
            >
              <Image
                src="/google.png"
                alt="social_icons"
                width={200}
                height={200}
              />
            </button>
          ))}
        {/* <div className="h-10 p-2 text-black w-10 border-black rounded-xl border cursor-pointer">
            <Image
              src="/github.png"
              alt="social_icons"
              width={200}
              height={200}
            />
          </div>
          <div className="h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer">
            <Image
              src="/facebook.png"
              alt="social_icons"
              width={200}
              height={200}
            />
          </div> */}
      </div>
    </div>
  );
};

export default SocialsLogin;

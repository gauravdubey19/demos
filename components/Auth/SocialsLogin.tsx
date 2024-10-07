"use client";

import React, { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const SocialsLogin = () => {
  const [providers, setProviders] = useState<Providers>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setError("Error fetching providers");
      }
    })();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="w-full mt-7">
      <div className="flex flex-row items-center gap-2 px-10">
        <div className="h-[1px] w-full bg-black" />
        <h1 className="text-black ">OR</h1>
        <div className="h-[1px] w-full bg-black" />
      </div>

      <div className="flex flex-row items-center justify-center gap-10 mt-7">
        {/* {providers &&
          Object.values(providers).map((provider) => {
            // if (provider.id === "google") {
            return ( */}
        <Button
          className="w-fit bg-transparent text-black text-xl br hover:bg-primary hover:text-white"
          type="button"
          // key={provider.id}
          onClick={(e) => signIn("google")}
          // signIn(provider.id);}
        >
          <FcGoogle className="mr-" />
          oogle
        </Button>
        {/* );
            // }
          })} */}
      </div>
    </div>
  );
};

export default SocialsLogin;

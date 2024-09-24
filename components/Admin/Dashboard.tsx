"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="flex-between bg-background p-4 md:px-8 md:py-6">
          <div className="space-y-2">
            <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
              Welcome Back{" "}
              {session?.user?.name && session?.user?.name.split(" ")[0]},
            </h2>
            <p>Here’s what happening with your store today.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

import React from "react";
import UserProfileLayout from "@/app/components/userProfileLayout";
import NavbarDashboard from "@/app/components/navbarDashboard";
import GetInfo from "@/app/components/getInfo";

export default async function userPage() {
  return (
    <>
      <NavbarDashboard />
      <div className="flex flex-col items-center justify-start min-h-screen  from-g0 to-g1 py-10 px-4
        [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]">
        <div className="w-full max-w-2xl">
          <UserProfileLayout style="flex-col" />
          <GetInfo />
        </div>
      </div>
    </>
  );
}

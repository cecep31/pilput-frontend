import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getData } from "../lib/fetch";
import Image from "next/image";

const Profile = () => {
  const ASSET_UPLOAD = process.env.NEXT_PUBLIC_STORAGE;
  const [profile, setprofile] = useState({ name: "Loading..." });

  async function getprofile() {
    const response = await getData("/api/v1/profile");
    if (response.status >= 200 && response.status <= 299) {
      setprofile(response.data);
    }
  }

  useEffect(() => {
    getprofile();
  }, []);

  return (
    <div className="flex justify-center mb-10 ">
      <div className="px-6 py-10 my-20 w-4/12 shadow-md relative rounded-md border">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              {profile.image ? (
                <Image
                className="rounded-full"
                  width={200}
                  alt="profile"
                  height={200}
                  src={ASSET_UPLOAD + profile.image}
                  unoptimized
                />
              ) : (
                <Image
                  alt="profile"
                  className="rounded-full"
                  width={200}
                  height={200}
                  src="https://placeimg.com/640/480/any"
                />
              )}
            </div>
          </div>
          <div className="w-full text-center mt-10">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              {profile.email}{" "}
              <Link
                className="ml-3 absolute top-0 right-0 text-green-500 hover:bg-slate-100 p-3 rounded-lg"
                href="/update-profile"
              >
                edit
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            {profile.name}
          </h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
            Paris, France
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                An artist of considerable range, Mike is the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                and records all of his own music, giving it a warm.
              </p>
              <Link href="/dashboard" className="text-blue-500 underline">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

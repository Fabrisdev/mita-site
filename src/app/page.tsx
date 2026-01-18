"use client";

import { useState } from "react";
import type { AllowedPeople } from "@/types";
import { ProfileOption } from "./components/ProfileOption";

export default function Home() {
  const [selected, setSelected] = useState<AllowedPeople>();

  function select(person: AllowedPeople) {
    setSelected(person);
  }

  return (
    <main className="h-svh flex justify-center items-center">
      <form
        action=""
        className="bg-purple-800 p-20 flex flex-col justify-center items-center gap-3 rounded-2xl"
      >
        <p className="text-2xl font-bold">Please choose who you are</p>
        <div className="flex gap-2">
          <ProfileOption
            name="light"
            onClick={() => select("light")}
            selected={selected === "light"}
          />
          <ProfileOption
            name="pandita"
            onClick={() => select("pandita")}
            selected={selected === "pandita"}
          />
          <ProfileOption
            name="pau"
            onClick={() => select("pau")}
            selected={selected === "pau"}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-pink-500 p-2 w-full cursor-pointer hover:bg-pink-600 rounded-xs"
        />
      </form>
    </main>
  );
}

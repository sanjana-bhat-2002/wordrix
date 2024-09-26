"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

const UserNav = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <a className="text-white" href="/user">
        Profile
      </a>

      <Button
      variant="destructive"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
    >
      Sign Out
    </Button>
    </div>
  );
};

export default UserNav;

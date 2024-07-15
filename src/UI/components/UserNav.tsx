'use client'

import { Button } from "@/UI/widgets/button"
import { signOut } from "next-auth/react"

const UserNav = () => {
  return (
    <Button variant="destructive" onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
    })}>
        Sign Out
    </Button>
  )
}

export default UserNav
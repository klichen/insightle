'use client'
import { useAuthActions } from "@convex-dev/auth/react";
import SignIn from "./(auth)/SignIn";
import { Authenticated, Unauthenticated } from "convex/react";
import UserRedirect from "@/components/UserRedirect";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      <Authenticated>
        <UserRedirect/>
        {/* <button onClick={() => void signOut()}>SIGN OUT</button> */}
        <Button className="w-full" onClick={() => void signOut()}>Sign out</Button>
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </div>
  );
}

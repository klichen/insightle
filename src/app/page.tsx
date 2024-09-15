'use client'
import { useAuthActions } from "@convex-dev/auth/react";
import SignIn from "./(auth)/SignIn";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      <Authenticated>
        <div>HELLO WORLD</div>
        <button onClick={() => void signOut()}>SIGN OUT</button>
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </div>
  );
}

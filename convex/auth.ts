// import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import CustomPassword from "./CustomPassword";
// import { Password } from './CustomPassword';
  
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword],
});
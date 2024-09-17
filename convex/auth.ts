// import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import CustomPassword from "./CustomPassword";
import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
// import { Password } from './CustomPassword';
  
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword],
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
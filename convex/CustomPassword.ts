import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";
 
export default Password<DataModel>({
  profile(params) {
    return {
      name: params.name as string,
      email: params.email as string,
      isOwner: params.isOwner as boolean
    };
  },
});
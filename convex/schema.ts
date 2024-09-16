import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    isOwner: v.optional(v.boolean()),
  }).index("email", ["email"]),
  businesses: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    description: v.string(),
  }),
  feedback: defineTable({
    author: v.string(),
    authorId: v.id("users"),
    content: v.string(),
    businessId: v.id("businesses")
  }).index("byBusinessId", ["businessId"])
});
 
export default schema;
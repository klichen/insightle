import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const businessFeedback = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        // grab feedback for corresponding businessId
        const feedback = await ctx.db
            .query("feedback")
            .filter((q) => q.eq(q.field("businessId"), args.businessId))
            .order("desc");
        return feedback;
    },
});

export const sendFeedback = mutation({
    args: { content: v.string(), author: v.string(), authorId: v.id("users"), businessId: v.id("businesses") },
    handler: async (ctx, { content, author, authorId, businessId }) => {
        // Send new feedback message
        await ctx.db.insert("feedback", { content, author, authorId, businessId });
    },
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getBusinesses = query({
    args: {},
    handler: async (ctx) => {
        // grab feedback for corresponding businessId
        const businesses = await ctx.db
            .query("businesses")
            .order("desc")
            .collect();
        return businesses;
    },
});

export const getOwnerBusiness = query({
    args: { ownerId: v.id("users") },  // Accepts the ownerId as an argument
    handler: async (ctx, { ownerId }) => {
        // const businesses = await ctx.db.query("businesses").order("desc").collect();
        // Query businesses where ownerId matches the provided one
        const ownerBusiness = await ctx.db
            .query("businesses")
            .withIndex("byOwnerId", q => q.eq("ownerId", ownerId))  // Filter by ownerId
            .collect();
        return ownerBusiness;
    },
});

export const createBusiness = mutation({
    args: { ownerId: v.id("users"), name: v.string(), description: v.string(), },
    handler: async (ctx, { ownerId, name, description }) => {
        // Create business profile
        await ctx.db.insert("businesses", { ownerId, name, description });
    },
});
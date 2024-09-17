'use client'
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UserDashboard from "../app/(dashboard)/UserDashboard";
import OwnerDashboard from "../app/(dashboard)/OwnerDashboard";
import CreateBusinessProfile from "../app/(forms)/CreateBusinessProfile";

function UserRedirect() {
    const [businessCreated, setBusinessCreated] = useState(false); 
    const currentUser = useQuery(api.auth.currentUser);
    // const currentBusiness = useQuery(api.business.getOwnerBusiness, { ownerId: currentUser._id });
    const currentBusiness = useQuery(
        api.business.getOwnerBusiness, 
        currentUser ? { ownerId: currentUser._id } : "skip"
    );

    // Show loading state while fetching user data
    if (!currentUser) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {currentUser?.isOwner === true ?
                <div>
                    {currentBusiness === null && businessCreated === false ?
                        <CreateBusinessProfile currentUser={currentUser} stateChanger={setBusinessCreated} />
                        :
                        <OwnerDashboard bizId={currentBusiness?._id} />
                    }
                </div>
                :
                <UserDashboard currentUser={currentUser} />
            }
        </div>
    )
}

export default UserRedirect;
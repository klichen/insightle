'use client'
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

function SignIn({
    // provider,
    //   handleSent,
}: {
        // provider?: string;
        //   handleSent?: (email: string) => void;
    }) {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const [submitting, setSubmitting] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsOwner(e.target.checked);
    };

    return (
        <form
            className="flex flex-col"
            autoComplete="off"
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitting(true);
                const formData = new FormData(event.currentTarget);
                const signInData = {
                    email: formData.get("email") as string,
                    password: formData.get("password") as string,
                    flow: flow,
                    isOwner: isOwner, // boolean value
                  };
                // formData.append('isOwner', isOwner.toString()); // Assuming 'isOwner' is a boolean
                signIn("password", signInData)
                    .then(() => {
                        // handleSent?.(formData.get("email") as string);
                        alert("You have signed in!")
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('An error occured, make sure you have an account before trying to login')
                        setSubmitting(false);
                    });
            }}
        >
            <label htmlFor="email">Email</label>
            <input name="email" id="email" autoComplete="off" className="text-black" />
            <div className="flex items-center justify-between">
                <label htmlFor="password">Password</label>
            </div>
            <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                className="text-black"
            // autoComplete={flow === "signIn" ? "current-password" : "new-password"}
            />
            <div>
                <input type="checkbox" id="owner" name="owner" checked={isOwner} onChange={onChangeCheckBox} />
                <label htmlFor="owner" className="mx-2">Create account as a business owner</label>
            </div>
            <input name="flow" value={flow} type="hidden" />
            {/* <input name="isOwner" value={isOwner} type="hidden" /> */}
            <button type="submit" disabled={submitting}>
                {flow === "signIn" ? "Sign in" : "Sign up"}
            </button>
            <button
                // variant="link"
                type="button"
                onClick={() => {
                    setFlow(flow === "signIn" ? "signUp" : "signIn");
                }}
            >
                {flow === "signIn"
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
            </button>
        </form>
    );
}

export default SignIn;
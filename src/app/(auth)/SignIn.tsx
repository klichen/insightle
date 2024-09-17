'use client'
import { useAuthActions } from "@convex-dev/auth/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch";

function SignIn() {
    const { signIn } = useAuthActions();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const [submitting, setSubmitting] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const onChangeCheckBox = () => {
        setIsOwner(!isOwner);
    };


    const handleSubmit = () => {
        const signInData = {
            name,
            email,
            password,
            flow,
            isOwner,
        };
        signIn("password", signInData)
            .then(async () => {
                // handleSent?.(formData.get("email") as string);
                setSubmitting(true);
            })
            .catch((error) => {
                console.error(error);
                alert('An error occured, make sure you have an account before trying to login')
                setSubmitting(false);
            });
    };

    return (
        <Card className="mx-auto max-w-sm my-8">
            <CardHeader>
                <CardTitle className="text-xl">{flow === "signIn" ? "Login" : "Sign Up"}</CardTitle>
                <CardDescription>
                    {flow === "signIn" ? "Enter your email below to login to your account" : "Enter your information to create an account"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {flow === "signUp" ? <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Name</Label>
                            <Input id="first-name" placeholder="Max" required onChangeCapture={e => setName(e.currentTarget.value)} />
                        </div>
                    </div> : null}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@mail.com"
                            required
                            onChangeCapture={e => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" autoComplete="new-password" onChangeCapture={e => setPassword(e.currentTarget.value)} />
                    </div>
                    {flow === "signUp" ? <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Are you a business owner?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Create a business account
                            </p>
                        </div>
                        <Switch
                            checked={isOwner}
                            onCheckedChange={onChangeCheckBox}
                        />
                    </div> : null}
                    <Button type="submit" className="w-full" onClick={handleSubmit} disabled={submitting}>
                        {flow === "signIn" ? "Login" : "Create an account"}
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    {/* Already have an account?{" "} */}
                    {flow === "signUp" ? "Already have an account?" : "Don't have an account?"}
                    <Button
                        variant="link"
                        onClick={() => {
                            setFlow(flow === "signIn" ? "signUp" : "signIn");
                        }}>
                        {flow === "signIn" ? "Sign up" : "Sign in"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SignIn;
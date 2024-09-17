"use client"

// import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { User } from "../(dashboard)/UserDashboard";


export const description =
  "A profile creation form with business name, description, and image upload.";

export default function ProfileCreationForm({ currentUser }: { currentUser: User }) {
  const [bizName, setBizName] = useState("");
  const [bizDescription, setBizDescription] = useState("");
  const createBusiness = useMutation(api.business.createBusiness);
  // Define state for image preview with type annotations
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Event handler for image input change
  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]; // Optional chaining for type safety
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string); // Type cast result to string
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSave = async () => {
    await createBusiness({ name: bizName, description: bizDescription, ownerId: currentUser._id });
  };


  return (
    <Card className="mx-auto max-w-sm my-8">
      <CardHeader>
        <CardTitle className="text-2xl">Create a Profile</CardTitle>
        <CardDescription>
          Enter your business name and a short description!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            type="text"
            placeholder="Your Business Name"
            required
            onChangeCapture={e => setBizName(e.currentTarget.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your business"
            required
            onChangeCapture={e => setBizDescription(e.currentTarget.value)}
          />
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="imageUpload">Business Image</Label>
          <div
            className="relative w-full h-48 bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="text-gray-500">Click to upload an image</div>
            )}
          </div>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div> */}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogButton from "@/components/ui/DialogButton"; // Make sure this path is correct according to your folder structure

export default function Component() {
  // Mock data for the buttons
  const dialogButtonsData = [
    {
      buttonText: "Feedback from John",
      imageSrc: "/profile-john.jpg",
      altText: "John's Profile",
      dialogTitle: "Feedback from John",
      fullText: "John shared some constructive feedback about your recent post.",
    },
    {
      buttonText: "Feedback from Jane",
      imageSrc: "/profile-jane.jpg",
      altText: "Jane's Profile",
      dialogTitle: "Feedback from Jane",
      fullText: "Jane appreciated your recent post and gave some thoughtful comments.",
    },
    {
      buttonText: "Feedback from Mike",
      imageSrc: "/profile-mike.jpg",
      altText: "Mike's Profile",
      dialogTitle: "Feedback from Mike",
      fullText: "Mike found your insights on the topic to be very helpful.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          View your feedback from community members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dialogButtonsData.map((buttonData, index) => (
          <div key={index} className="mb-4"> {/* Added margin-bottom */}
            <DialogButton
              buttonText={buttonData.buttonText}
              imageSrc={buttonData.imageSrc}
              altText={buttonData.altText}
              dialogTitle={buttonData.dialogTitle}
              fullText={buttonData.fullText}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-3</strong> of <strong>{dialogButtonsData.length}</strong> comments
        </div>
      </CardFooter>
    </Card>
  );
}

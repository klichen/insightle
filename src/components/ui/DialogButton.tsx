import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

// Defining the props interface for the component
interface DialogButtonProps {
  buttonText: string; // The text to be displayed on the button
  imageSrc?: string; // Optional image source, defaulting to "/favicon.ico"
  altText?: string; // Optional alt text for the image
  dialogTitle?: string; // Optional dialog title, defaulting to "Full Text"
  fullText: string; // The full text to display inside the dialog
}

// Reusable DialogButton Component
const DialogButton: FC<DialogButtonProps> = ({
  buttonText,
  imageSrc = "/favicon.ico",
  altText = "Profile icon",
  dialogTitle = "Full Text",
  fullText,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Button with justify-start to align content to the left */}
        <Button
          variant="outline"
          className="w-full max-w-5xl mx-auto flex items-center justify-start py-6"
        >
          {/* Image to the left of the text */}
          <img src={imageSrc} alt={altText} className="h-5 w-5" />
          {/* Span with truncation styles */}
          <span className="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
            {buttonText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Displaying the full text inside the dialog */}
          <p>{fullText}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButton;

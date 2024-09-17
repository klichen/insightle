import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonIcon } from "@radix-ui/react-icons"; // Importing the icon
import { FC } from "react";

// Defining the props interface for the component
interface DialogButtonProps {
  buttonText: string; // The text to be displayed on the button
  dialogTitle?: string; // Optional dialog title, defaulting to "Full Text"
  fullText: string; // The full text to display inside the dialog
}

// Reusable DialogButton Component
const DialogButton: FC<DialogButtonProps> = ({
  buttonText,
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
          {/* Icon to the left of the text */}
          <PersonIcon className="h-5 w-5" />
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

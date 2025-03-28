import { MessageCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chat } from "./Chat";

export const ChatCTA = ({ bookId }: { bookId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-4 right-4 cursor-pointer">
        <MessageCircle size={60} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <Chat bookId={bookId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

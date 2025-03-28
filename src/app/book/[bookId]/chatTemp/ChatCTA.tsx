"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chat } from "./Chat";

export const ChatCTA = ({ bookId }: { bookId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-4 right-4 cursor-pointer">
        <motion.div
          animate={{
            x: [0, -5, 5, -5, 5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        >
          <MessageCircle size={60} />
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-transparent shadow-none border-none p-0">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogHeader>
          <DialogDescription>
            <Chat bookId={bookId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

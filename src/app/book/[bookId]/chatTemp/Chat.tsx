"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const messageParsed = (message: string) => {
  const rawParts = message
    .split("\n")
    .filter((line) => line.startsWith("0:"))
    .map((line) => line.slice(2)); // remove '0:'

  const parsedParts = rawParts.map((part) => {
    try {
      return JSON.parse(part);
    } catch {
      return "";
    }
  });
  const fullText = parsedParts.join("");
  const cleanText = fullText.replace(/[^\w\s.,!?'"-]/g, "");
  return cleanText;
};

export const Chat = ({ bookId }: { bookId: string }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    reload,
  } = useChat({
    body: {
      bookId,
    },
    streamProtocol: "text",
  });

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && <p>Loading...</p>}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <Card className="w-full max-w-3xl h-[80vh]">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">Chat</CardTitle>
        </CardHeader>

        <ScrollArea className="h-[calc(80vh-8rem)]">
          <CardContent className="p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                console.log({ message });
                const plainTextMessage =
                  message.role === "user"
                    ? message.content
                    : messageParsed(message.content);

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        {message.role === "assistant" ? (
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="AI"
                          />
                        ) : (
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          />
                        )}
                        <AvatarFallback>
                          {message.role === "user" ? "U" : "AI"}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 whitespace-pre-line ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {plainTextMessage}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </ScrollArea>

        <CardFooter className="border-t p-4">
          <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

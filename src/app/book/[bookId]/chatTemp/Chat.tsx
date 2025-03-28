"use client";

import { useChat } from "@ai-sdk/react";

export const Chat = ({ bookId }: { bookId: string }) => {
  const { messages, input, handleInputChange, handleSubmit, status, error } =
    useChat({
      body: {
        bookId,
      },
      streamProtocol: "text",
    });
  console.log({ status, error });
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

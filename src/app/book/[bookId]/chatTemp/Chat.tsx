"use client";

import { useChat } from "@ai-sdk/react";

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
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

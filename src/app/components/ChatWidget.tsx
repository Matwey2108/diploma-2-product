import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";
import { MinimizedChat } from "./MinimizedChat";

type ChatState = "closed" | "minimized" | "open";

export function ChatWidget() {
  const [chatState, setChatState] = useState<ChatState>("closed");

  const handleOpen = () => setChatState("open");
  const handleMinimize = () => setChatState("minimized");
  const handleClose = () => setChatState("closed");

  return (
    <>
      {chatState === "closed" && <ChatButton isOpen={false} onClick={handleOpen} />}
      {chatState === "minimized" && (
        <MinimizedChat onClick={handleOpen} onClose={handleClose} unreadCount={1} />
      )}
      <ChatWindow
        isOpen={chatState === "open"}
        onClose={handleClose}
        onMinimize={handleMinimize}
      />
    </>
  );
}

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "./app-sidebar.js";
import { Chat } from "./chat.js";
import { SidebarProvider, SidebarInset } from "./ui/sidebar.js";
import { ChatNavProvider } from "./chat-nav-context.js";
import { getChatMessages } from "../actions.js";
function ChatPage({ session, needsSetup, chatId }) {
  const [activeChatId, setActiveChatId] = useState(chatId || null);
  const [resolvedChatId, setResolvedChatId] = useState(() => chatId ? null : crypto.randomUUID());
  const [initialMessages, setInitialMessages] = useState([]);
  const navigateToChat = useCallback((id) => {
    if (id) {
      window.history.pushState({}, "", `/chat/${id}`);
      setResolvedChatId(null);
      setInitialMessages([]);
      setActiveChatId(id);
    } else {
      window.history.pushState({}, "", "/");
      setInitialMessages([]);
      setActiveChatId(null);
      setResolvedChatId(crypto.randomUUID());
    }
  }, []);
  useEffect(() => {
    const onPopState = () => {
      const match = window.location.pathname.match(/^\/chat\/(.+)/);
      if (match) {
        setResolvedChatId(null);
        setInitialMessages([]);
        setActiveChatId(match[1]);
      } else {
        setInitialMessages([]);
        setActiveChatId(null);
        setResolvedChatId(crypto.randomUUID());
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    if (activeChatId) {
      getChatMessages(activeChatId).then((dbMessages) => {
        if (dbMessages.length === 0) {
          setInitialMessages([]);
          setResolvedChatId(crypto.randomUUID());
          window.history.replaceState({}, "", "/");
          return;
        }
        const uiMessages = dbMessages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          parts: [{ type: "text", text: msg.content }],
          createdAt: new Date(msg.createdAt)
        }));
        setInitialMessages(uiMessages);
        setResolvedChatId(activeChatId);
      });
    }
  }, [activeChatId]);
  if (needsSetup || !session) {
    return null;
  }
  return /* @__PURE__ */ jsx(ChatNavProvider, { value: { activeChatId: resolvedChatId, navigateToChat }, children: /* @__PURE__ */ jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsx(AppSidebar, { user: session.user }),
    /* @__PURE__ */ jsx(SidebarInset, { children: resolvedChatId && /* @__PURE__ */ jsx(
      Chat,
      {
        chatId: resolvedChatId,
        initialMessages
      },
      resolvedChatId
    ) })
  ] }) });
}
export {
  ChatPage
};

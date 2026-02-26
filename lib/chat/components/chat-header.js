"use client";
import { jsx } from "react/jsx-runtime";
import { SidebarTrigger } from "./ui/sidebar.js";
function ChatHeader({ chatId }) {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2 z-10", children: /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(SidebarTrigger, {}) }) });
}
export {
  ChatHeader
};

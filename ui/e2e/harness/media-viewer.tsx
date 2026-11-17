// Browser fixture only. Not an application build input and never published as a route.
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionRoot } from "@/core/motion";
import { MessageRow } from "@/features/messages/message-row";
import { defaultProfile } from "@/services/profile-service";
import { configureAccountTransport } from "@/services/account-api";
import { PortalContextProvider } from "@/components/ui/portal-context";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DmMessage } from "@/features/messages/types";
import "@/styles/ui.css";

const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 400;
const ctx = canvas.getContext("2d")!;
ctx.fillStyle = "#264653";
ctx.fillRect(0, 0, 600, 400);
ctx.fillStyle = "#e9c46a";
ctx.fillRect(100, 70, 400, 260);
const data = canvas.toDataURL("image/png").split(",")[1];
configureAccountTransport(async (path) => {
  if (path === "/dm/attachments/fixture-image") {
    document.documentElement.dataset.attachmentReads = String(
      Number(document.documentElement.dataset.attachmentReads || 0) + 1,
    );
    return { attachment: { data } };
  }
  throw Error("Unexpected fixture request: " + path);
});
const initial: DmMessage = {
  id: "fixture-message",
  seq: 1,
  conversationId: "fixture-conversation",
  sender: { username: "fixture" },
  content: "Imagem de teste",
  createdAt: "2026-11-17T16:00:00Z",
  editedAt: null,
  deleted: false,
  pinned: false,
  bookmarked: false,
  reply: null,
  forwarded: false,
  attachments: [
    { id: "fixture-image", mime: "image/png", name: "exemplo.png", size: 3000 },
  ],
  reactions: [],
};
function Harness() {
  const [message, setMessage] = useState(initial),
    [panel, setPanel] = useState("");
  return (
    <>
      <main className="p-4">
        <h1 className="mb-4">Conversa de teste</h1>
        <MessageRow
          message={message}
          person={{
            username: "fixture",
            role: "user",
            profile: defaultProfile("Remetente"),
            available: true,
          }}
          own={false}
          read={false}
          onReply={() => setPanel("Responder")}
          onActions={() => setPanel("Reações da mensagem")}
          onForward={() => setPanel("Encaminhar")}
          onBookmark={async () =>
            setMessage((current) => ({
              ...current,
              bookmarked: !current.bookmarked,
            }))
          }
          onMention={() => {}}
          onProfile={() => setPanel("Perfil")}
          onReact={() => setPanel("Reação")}
          quickReaction="👍"
          viewer="reader"
        />
      </main>
      <Dialog
        open={!!panel}
        onOpenChange={(open) => {
          if (!open) setPanel("");
        }}
      >
        <DialogContent>
          <DialogTitle>{panel}</DialogTitle>
          <DialogDescription>Destino da ação na fixture.</DialogDescription>
          <Button onClick={() => setPanel("")}>Cancelar</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
const root = document.getElementById("root")!;
root.className = "organizeon-ui";
createRoot(root).render(
  <PortalContextProvider container={root}>
    <MotionRoot>
      <Harness />
    </MotionRoot>
  </PortalContextProvider>,
);

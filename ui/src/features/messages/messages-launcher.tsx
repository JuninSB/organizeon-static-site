import { MessageCircle } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
export function MessagesLauncher() {
  const state = useMessagesState();
  const { setOpenMobile } = useSidebar();
  const count =
    (state.inbox?.conversations.reduce((n, c) => n + c.unread, 0) || 0) +
    (state.inbox?.requests.filter((c) => c.direction === "incoming").length ||
      0);
  return (
    <SidebarMenuButton
      aria-label="Mensagens diretas"
      tooltip="Mensagens diretas"
      onClick={() => { setOpenMobile(false); messagesStore.open(); }}
    >
      <MessageCircle />
      <span>Mensagens</span>
      {count > 0 && (
        <Badge
          variant="secondary"
          className="ml-auto tabular-nums group-data-[collapsible=icon]:hidden"
          aria-label={`${count} mensagens ou solicitações não lidas`}
        >
          {count > 99 ? "99+" : count}
        </Badge>
      )}
    </SidebarMenuButton>
  );
}

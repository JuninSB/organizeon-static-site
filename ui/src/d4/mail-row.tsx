import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHoldMenu } from "@/hooks/use-hold-menu";
import { useLongPressDelay } from "@/features/messages/gesture-config";
import { SenderProfile } from "./sender-profile";
import { senderIdentity } from "./sender";
import { emailText } from "./email-document";
import { date, type Message } from "./api";
export function MailRow({
  item,
  folder,
  onActions,
}: {
  item: Message;
  folder: string;
  onActions: (item: Message) => void;
}) {
  const hold = useHoldMenu(() => onActions(item), useLongPressDelay());
  return (
    <div className="d4-mail-row">
      <SenderProfile sender={item.sender} messageId={item.id} />
      <button
        type="button"
        className="d4-mail-open"
        {...hold}
        onClick={() => {
          location.hash =
            folder === "drafts" ? "/compose/" + item.id : "/message/" + item.id;
        }}
      >
        <div className="min-w-0">
          <p
            className={
              "truncate text-sm " +
              (item.unread ? "font-semibold" : "text-muted-foreground")
            }
          >
            {senderIdentity(item.sender).name}
          </p>
          <p className="truncate text-sm">{item.subject || "(Sem assunto)"}</p>
          <p className="truncate text-xs text-muted-foreground">
            {emailText(item.snippet || "")}
          </p>
        </div>
        <time className="text-xs text-muted-foreground">
          {date(item.created)}
        </time>
      </button>
      <Button
        variant="ghost"
        size="icon"
        aria-label={"Opções de " + (item.subject || "e-mail")}
        onClick={() => onActions(item)}
      >
        <MoreHorizontal />
      </Button>
    </div>
  );
}

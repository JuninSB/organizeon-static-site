import { useEffect, useState } from "react";
import { Search, MailOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api, type Message } from "../api";
import { MailRow } from "../mail-row";
import { MailActions } from "../mail-actions";
export default function MailList({
  mailbox,
  folder,
  revision,
}: {
  mailbox: string;
  folder: string;
  revision: number;
}) {
  const [action, setAction] = useState<Message | null>(null),
    [actionRevision, setActionRevision] = useState(0);
  const [items, setItems] = useState<Message[]>([]),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(0),
    [more, setMore] = useState(false),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    setPage(0);
  }, [query, folder, mailbox]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = setTimeout(() => {
      api(
        "/messages?" +
          new URLSearchParams({
            mailbox,
            folder,
            q: query,
            page: String(page),
          }),
      )
        .then((r) => {
          if (active) {
            setItems(r.items);
            setMore(r.hasMore);
            setError("");
          }
        })
        .catch((e) => {
          if (active) setError(e.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [mailbox, folder, revision, actionRevision, query, page]);
  return (
    <section className="overflow-hidden rounded-lg border">
      <div className="flex items-center gap-3 border-b p-4">
        <Search className="size-4 text-muted-foreground" />
        <Input
          aria-label="Pesquisar e-mails"
          placeholder="Pesquisar nesta pasta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {error ? (
        <p role="alert" className="p-6 text-destructive">
          {error}
        </p>
      ) : loading ? (
        <div className="p-8 text-sm text-muted-foreground">
          Carregando mensagens…
        </div>
      ) : items.length ? (
        items.map((item) => (
          <MailRow
            key={item.id}
            item={item}
            folder={folder}
            onActions={setAction}
          />
        ))
      ) : (
        <div className="grid justify-items-center gap-3 px-4 py-16 text-center">
          <MailOpen className="size-8 text-muted-foreground" />
          <p className="text-sm">Nenhuma mensagem nesta pasta.</p>
          <p className="text-xs text-muted-foreground">
            Novas mensagens aparecerão automaticamente.
          </p>
        </div>
      )}
      <div className="flex justify-end gap-3 border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          disabled={!page || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft />
          Anterior
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!more || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
          <ChevronRight />
        </Button>
      </div>
      <MailActions
        item={action}
        folder={folder}
        onClose={() => setAction(null)}
        refresh={() => setActionRevision((value) => value + 1)}
      />
    </section>
  );
}

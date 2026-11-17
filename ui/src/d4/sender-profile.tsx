import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { senderIdentity } from "./sender";

export function SenderAvatar({ sender, large = false }: { sender: string; large?: boolean }) {
  const identity = senderIdentity(sender);
  const [failed, setFailed] = useState(false);
  return <span className={`d4-sender-avatar d4-avatar-tone-${identity.tone}${large ? " d4-sender-avatar-large" : ""}`} aria-hidden="true">
    {identity.logo && !failed ? <img src={identity.logo} alt="" onError={() => setFailed(true)} /> : identity.initials}
  </span>;
}

export function SenderProfile({ sender, messageId }: { sender: string; messageId: string }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const identity = senderIdentity(sender);
  return <>
    <button type="button" className="d4-sender-trigger" aria-label={`Ver perfil de ${identity.name}`} onClick={() => {setNotice("");setOpen(true);}}>
      <SenderAvatar key={sender} sender={sender} />
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85svh] overflow-y-auto">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <SenderAvatar key={sender} sender={sender} large />
          <DialogTitle className="max-w-full break-words text-lg">{identity.name}</DialogTitle>
          <DialogDescription className="max-w-full break-all">{identity.address}</DialogDescription>
        </div>
        <dl className="space-y-3 rounded-lg border p-4 text-sm">
          <div><dt className="text-xs text-muted-foreground">Domínio</dt><dd className="break-all">{identity.domain || "Não informado"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Identificação</dt><dd>{identity.logo ? "Logo do domínio" : "Iniciais do remetente"}</dd></div>
        </dl>
        <Button onClick={() => {setOpen(false);location.hash = "/compose?reply=" + encodeURIComponent(messageId);}}><Mail />Responder</Button>
        <Button variant="outline" onClick={async () => {
          try {await navigator.clipboard.writeText(identity.address);setNotice("Endereço copiado.");}
          catch {setNotice("Não foi possível copiar. Selecione o endereço acima.");}
        }}><Copy />Copiar endereço</Button>
        <p role="status" className="text-center text-xs text-muted-foreground">{notice}</p>
      </DialogContent>
    </Dialog>
  </>;
}

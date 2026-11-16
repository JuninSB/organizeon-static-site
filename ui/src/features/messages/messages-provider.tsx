import { accountSession } from "@/core/account-session";
import { MotionRoot } from "@/core/motion";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfileBoundary } from "@/features/profile/profile-boundary";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import { MessagesNotifications } from "./messages-notifications";
const MessagesPanel = lazy(() => import("./messages-panel"));
export function MessagesProvider({
  username,
  children,
}: {
  username: string | null | undefined;
  children: ReactNode;
}) {
  const state = useMessagesState();
  const valid = !!username && /^[A-Za-z0-9_.-]{3,32}$/.test(username);
  useEffect(() => {
    if (!valid) return;
    const release = accountSession.activate(username!);
    const stop = messagesStore.start(username!);
    return () => { stop(); release(); };
  }, [username, valid]);
  return (
    <MotionRoot>
      {children}
      {valid && (
        <>
          {state.open && (
            <ProfileBoundary onClose={() => messagesStore.close()}>
              <Suspense
                fallback={
                  <Dialog
                    open
                    onOpenChange={(open) => {
                      if (!open) messagesStore.close();
                    }}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mensagens diretas</DialogTitle>
                        <DialogDescription>
                          Carregando mensagens…
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        variant="outline"
                        onClick={() => messagesStore.close()}
                      >
                        Fechar
                      </Button>
                    </DialogContent>
                  </Dialog>
                }
              >
                <MessagesPanel />
              </Suspense>
            </ProfileBoundary>
          )}
          <MessagesNotifications />
        </>
      )}
    </MotionRoot>
  );
}

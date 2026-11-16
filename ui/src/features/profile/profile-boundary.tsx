import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export class ProfileBoundary extends Component<
  { children: ReactNode; onClose: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) this.props.onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil indisponível</DialogTitle>
            <DialogDescription>
              Não foi possível abrir o perfil. Feche e tente novamente.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={this.props.onClose}>Fechar</Button>
        </DialogContent>
      </Dialog>
    );
  }
}

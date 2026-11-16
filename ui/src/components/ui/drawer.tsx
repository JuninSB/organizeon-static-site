import { Drawer as Primitive } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "./portal-context";
import "./drawer.css";
/** Controlled bottom drawer. Base UI owns swipe, focus, Escape and dismissal. */
export const Drawer = Primitive.Root;
export const DrawerTitle = Primitive.Title;
export const DrawerDescription = Primitive.Description;
export function DrawerContent({
  children,
  className,
  ...props
}: Primitive.Popup.Props) {
  const container = usePortalContainer();
  return (
    <Primitive.Portal container={container ?? undefined}>
      <Primitive.Backdrop
        data-slot="drawer-overlay"
        className="oo-drawer-backdrop pointer-events-auto fixed inset-0 z-50 bg-black/40"
      />
      <Primitive.Viewport className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
        <Primitive.Popup
          data-slot="drawer-content"
          className={cn(
            "oo-drawer-popup pointer-events-auto w-full max-w-lg rounded-t-xl border border-b-0 border-border bg-popover text-sm text-popover-foreground outline-none",
            className,
          )}
          {...props}
        >
          <div
            aria-hidden="true"
            data-drawer-handle
            className="flex h-7 shrink-0 touch-none select-none items-center justify-center"
          >
            <div className="h-1 w-10 rounded-full bg-muted-foreground/40" />
          </div>
          <Primitive.Content className="oo-drawer-scroll overflow-y-auto overscroll-contain px-4 pb-4">
            {children}
          </Primitive.Content>
        </Primitive.Popup>
      </Primitive.Viewport>
    </Primitive.Portal>
  );
}

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "./portal-context";
// Base UI/shadcn composition, using the project's Tailwind 3 tokens and portal scope.
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;
export function PopoverContent({
  className,
  align = "center",
  side = "top",
  sideOffset = 6,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align" | "side" | "sideOffset">) {
  const container = usePortalContainer();
  return (
    <Primitive.Portal container={container ?? undefined}>
      <Primitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 outline-none"
      >
        <Primitive.Popup
          data-slot="popover-content"
          className={cn(
            "pointer-events-auto max-h-[var(--available-height)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-border bg-popover p-3 text-sm text-popover-foreground shadow-sm outline-none transition-[opacity,transform] duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}

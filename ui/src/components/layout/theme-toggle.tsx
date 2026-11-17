import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ theme, onToggle }: { theme: "dark" | "light"; onToggle: () => void }) {
  const label = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  return <Button type="button" variant="ghost" size="icon" onClick={onToggle} aria-label={label} title={label}>{theme === "dark" ? <Sun /> : <Moon />}</Button>;
}

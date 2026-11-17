import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ theme, onToggle }: { theme: "dark" | "light"; onToggle: () => void }) {
  const label = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  return <Button type="button" variant="ghost" size="icon" onClick={onToggle} aria-label={label} title={label}><span className="grid size-4" aria-hidden="true"><Sun className="transition-opacity duration-200 motion-reduce:transition-none" style={{gridArea:'1 / 1',opacity:theme==='dark'?1:0}}/><Moon className="transition-opacity duration-200 motion-reduce:transition-none" style={{gridArea:'1 / 1',opacity:theme==='light'?1:0}}/></span></Button>;
}

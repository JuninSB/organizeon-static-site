import { useState } from "react";
import { ArrowLeft, Flame, Gamepad2, Search, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CatalogToolbarProps = {
  count: number;
  categories: string[];
  onBack: () => void;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
};

export function CatalogToolbar({ count, categories, onBack, onQueryChange, onFilterChange }: CatalogToolbarProps) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "Todos", icon: Gamepad2 },
    { id: "trending", label: "Em alta", icon: Flame },
    { id: "flash", label: "Flash", icon: Zap },
    { id: "pc", label: "PC", icon: null },
    { id: "mobile", label: "Celular", icon: Smartphone },
    ...categories.map((category) => ({ id: `category:${category}`, label: category, icon: null })),
  ];
  return <div className="mx-auto grid w-full max-w-[1180px] gap-5 px-4 pb-5 pt-5 sm:px-6 sm:pt-7">
    <header className="flex min-w-0 flex-wrap items-center gap-3">
      <Button variant="outline" size="icon" aria-label="Voltar ao OrganizeOn" onClick={onBack}><ArrowLeft /></Button>
      <div className="min-w-0 flex-1"><h1 className="text-xl font-semibold tracking-tight">Jogos</h1><p className="text-sm text-muted-foreground">{count ? `${count.toLocaleString("pt-BR")} jogos · baixe uma vez e jogue do cache` : "Carregando catálogo…"}</p></div>
      <label className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" type="search" aria-label="Pesquisar jogos" placeholder={`Pesquisar em ${count || "…"} jogos`} onChange={(event) => onQueryChange(event.target.value)} /></label>
    </header>
    <Tabs value={filter} onValueChange={(value) => { const next = value || "all"; setFilter(next); onFilterChange(next); }}>
      <TabsList aria-label="Filtrar jogos" className="h-auto max-w-full justify-start gap-1 overflow-x-auto bg-transparent p-0">
        {filters.map(({ id, label, icon: Icon }) => <TabsTrigger key={id} value={id} className="min-h-8 shrink-0 gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground">{Icon && <Icon className="size-3.5" />}{label}</TabsTrigger>)}
      </TabsList>
    </Tabs>
  </div>;
}

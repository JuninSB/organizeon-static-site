import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PreferenceOption = { value: string; label: string; description?: string };

export type PreferenceCardProps = {
  title: string;
  description: string;
  label: string;
  value: string;
  options: PreferenceOption[];
  applyLabel?: string;
  onApply: (value: string) => void;
};

export function PreferenceCard({ title, description, label, value, options, applyLabel = "Aplicar", onApply }: PreferenceCardProps) {
  const [selected, setSelected] = useState(value);
  const changed = selected !== value;
  const selectedDescription = options.find((option) => option.value === selected)?.description;

  return <Card className="w-full animate-ui-enter">
    <CardHeader className="gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-1 max-w-3xl leading-relaxed">{description}</CardDescription>
      </div>
      <div className="grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]">
        <Select value={selected} onValueChange={(next) => next && setSelected(next)}>
          <SelectTrigger aria-label={label} className="h-9 w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button size="sm" disabled={!changed} onClick={() => onApply(selected)}>
          {changed ? <Check data-icon="inline-start" /> : null}{applyLabel}
        </Button>
      </div>
    </CardHeader>
    {selectedDescription ? <CardContent className="pt-2 text-xs text-muted-foreground">{selectedDescription}</CardContent> : null}
  </Card>;
}

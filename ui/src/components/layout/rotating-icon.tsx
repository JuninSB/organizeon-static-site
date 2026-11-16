import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type Props = { icon: LucideIcon; active: boolean };

export function RotatingIcon({ icon: Icon, active }: Props) {
  const [spinning, setSpinning] = useState(active);
  useEffect(() => { if (active) setSpinning(true); }, [active]);
  return <Icon aria-hidden="true" className={spinning ? 'motion-safe:animate-spin' : undefined}
    onAnimationIteration={() => { if (!active) setSpinning(false); }} />;
}

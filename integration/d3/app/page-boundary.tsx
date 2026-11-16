import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

class Boundary extends Component<{ children: ReactNode }, { error: string | null; copied: boolean; generation: number }> {
  state = { error: null as string | null, copied: false, generation: 0 };
  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    return { error: message.replace(/Bearer\s+[^\s]+/gi, 'Bearer [oculto]').replace(/([?&](?:token|secret|password)=)[^&\s]+/gi, '$1[oculto]'), copied: false };
  }
  componentDidCatch(_error: unknown, _info: ErrorInfo) { /* Error belongs to this route, never the shell. */ }
  render() {
    if (!this.state.error) return <div key={this.state.generation}>{this.props.children}</div>;
    return <section role="alert" className="mx-auto grid w-full max-w-2xl gap-4 py-12">
      <p className="text-4xl text-muted-foreground">:'(</p>
      <h1 className="text-xl font-semibold tracking-tight">Um erro ocorreu ao carregar esta página!</h1>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted p-4 text-xs text-muted-foreground">{this.state.error}</pre>
      <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(this.state.error || ''); this.setState({ copied: true }); } catch { this.setState({ copied: false }); } }}><Copy/>{this.state.copied ? 'Erro copiado' : 'Copiar erro'}</Button><Button onClick={() => this.setState(state => ({ error: null, copied: false, generation: state.generation + 1 }))}><RefreshCw/>Tentar novamente</Button></div>
    </section>;
  }
}
export function PageBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <Boundary key={location.pathname}>{children}</Boundary>;
}

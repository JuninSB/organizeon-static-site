import { Component,type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
export class Boundary extends Component<{children:ReactNode},{error:string}>{
 state={error:''};static getDerivedStateFromError(error:Error){return {error:error.message};}
 render(){return this.state.error?<div role="alert" className="grid gap-4 p-6"><h2>Não foi possível carregar esta página.</h2><p className="break-all text-sm text-muted-foreground">{this.state.error}</p><Button onClick={()=>this.setState({error:''})}>Tentar novamente</Button></div>:this.props.children;}
}

export type AccountRequestOptions = RequestInit & { onUploadProgress?: (loaded: number, total: number) => void };
type AccountTransport = (path: string, options: AccountRequestOptions) => Promise<any>;
let transport: AccountTransport | undefined;
export function configureAccountTransport(next: AccountTransport) {
  transport = next;
  return () => {
    if (transport === next) transport = undefined;
  };
}
const messages: Record<string, string> = {
  unauthorized: "Sua sessão expirou. Entre novamente.",
  authentication_required: "Sua sessão expirou. Entre novamente.",
  invalid_profile: "Confira o nome, a descrição e a foto do perfil.",
  invalid_current_password: "A senha atual está incorreta.",
  invalid_password: "A nova senha deve ter pelo menos 8 caracteres.",
  password_confirmation_mismatch: "As novas senhas não coincidem.",
  too_many_attempts: "Muitas tentativas. Aguarde antes de tentar novamente.",
  request_too_large: "O arquivo excede o tamanho permitido.",
  dm_user_not_found: "Conta não encontrada. Confira o @usuário.",
  dm_self_request: "Escolha outra conta para iniciar uma conversa.",
  dm_request_pending: "Aguarde a solicitação ser aceita.",
  dm_request_processed: "Esta solicitação já foi respondida.",
  dm_request_cooldown:
    "Aguarde 24 horas para enviar outra solicitação a esta conta.",
  dm_sending_unavailable: "Esta conversa não está disponível para envio.",
  dm_conversation_not_found: "Conversa não encontrada.",
  dm_message_not_found: "Esta mensagem não está mais disponível.",
  dm_rate_limited: "Aguarde um momento antes de tentar novamente.",
  dm_file_too_large: "Cada arquivo pode ter até 8 MB.",
  dm_media_quota: "Você atingiu o limite de mídia das DMs.",
  dm_storage_full: "O armazenamento de mídia está cheio.",
  dm_invalid_message: "Confira o texto e os anexos da mensagem.",
  dm_invalid_attachment: "Não foi possível usar este anexo.",
  dm_empty_message: "Escreva uma mensagem ou adicione um arquivo.",
  dm_operation_failed: "Não foi possível concluir. Tente novamente.",
  gold_badge_required: "Este recurso requer o emblema dourado.",
  banner_reroll_cooldown: "Aguarde o cooldown para gerar outra seed.",
  forbidden: "Você não tem acesso a esta ação.",
};
export class AccountApiError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string) {
    super(messages[code] || "Não foi possível concluir. Tente novamente.");
    this.status = status;
    this.code = code;
  }
}
function endpoint(path: string) {
  if (/^\/d[234](\/|$)/.test(location.pathname)) {
    const base = location.pathname.slice(0, 3) + "/api";
    if (path.startsWith("/account/"))
      return base + path.slice("/account".length);
    if (path === "/dm" || path.startsWith("/dm/")) return base + path;
  }
  const config = (
    window as Window & {
      __ORGANIZEON_CONFIG__?: { apiOrigin?: string; apiPrefix?: string };
    }
  ).__ORGANIZEON_CONFIG__;
  return (
    (config?.apiOrigin || "https://api.organizeon.com.br") +
    (config?.apiPrefix || "/827e7h3heuw823eh") +
    path
  );
}
export async function accountRequest<T = any>(
  path: string,
  options: AccountRequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body) headers.set("Content-Type", "application/json");
  if (transport) {
    try {
      return await transport(path, { ...options, headers });
    } catch (error) {
      if (error instanceof AccountApiError) throw error;
      const code = error instanceof Error ? error.message : "";
      if (messages[code])
        throw new AccountApiError(code === "unauthorized" ? 401 : 400, code);
      if (/sessão expirada/i.test(code))
        throw new AccountApiError(401, "unauthorized");
      throw new AccountApiError(0, "network_error");
    }
  }
  const token = localStorage.getItem("organizeon-access-token");
  if (token && !/^\/d[23](\/|$)/.test(location.pathname))
    headers.set("Authorization", "Bearer " + token);
  if (options.onUploadProgress) {
    return new Promise<T>((resolve,reject)=>{
      const xhr=new XMLHttpRequest();xhr.open(options.method || "POST",endpoint(path));xhr.withCredentials=true;xhr.timeout=120000;
      headers.forEach((value,key)=>xhr.setRequestHeader(key,value));
      xhr.upload.onprogress=event=>{if(event.lengthComputable)options.onUploadProgress?.(event.loaded,event.total);};
      xhr.onerror=()=>reject(new AccountApiError(0,"network_error"));xhr.ontimeout=xhr.onerror;
      xhr.onload=()=>{let data:any;try{data=JSON.parse(xhr.responseText);}catch{return reject(new AccountApiError(xhr.status,"invalid_response"));}if(xhr.status<200||xhr.status>=300)return reject(new AccountApiError(xhr.status,data?.error||"request_failed"));resolve(data);};
      xhr.send(options.body as XMLHttpRequestBodyInit);
    });
  }
  let response: Response;
  try {
    response = await fetch(endpoint(path), {
      ...options,
      headers,
      signal: options.signal || AbortSignal.timeout(15000),
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    throw new AccountApiError(0, "network_error");
  }
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new AccountApiError(response.status, data?.error || "request_failed");
  if (data === null)
    throw new AccountApiError(response.status, "invalid_response");
  return data as T;
}

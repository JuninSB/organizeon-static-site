export type Profile = {
  displayName: string;
  nameColor: string;
  bio: string;
  avatarShape: "circle" | "square" | "rounded";
  avatar: string | null;
};
export const defaultProfile = (username: string): Profile => ({
  displayName: username,
  nameColor: "#FAFAFA",
  bio: "",
  avatarShape: "circle",
  avatar: null,
});
function endpoint(kind: "profile" | "password") {
  if (/^\/d[23](\/|$)/.test(location.pathname))
    return location.pathname.slice(0, 3) + "/api/" + kind;
  const config = (
    window as Window & {
      __ORGANIZEON_CONFIG__?: { apiOrigin?: string; apiPrefix?: string };
    }
  ).__ORGANIZEON_CONFIG__;
  return (
    (config?.apiOrigin || "https://api.organizeon.com.br") +
    (config?.apiPrefix || "/827e7h3heuw823eh") +
    "/account/" +
    kind
  );
}
async function request(
  kind: "profile" | "password",
  options: RequestInit = {},
) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body) headers.set("Content-Type", "application/json");
  const token = localStorage.getItem("organizeon-access-token");
  if (token && !/^\/d[23](\/|$)/.test(location.pathname))
    headers.set("Authorization", "Bearer " + token);
  const response = await fetch(endpoint(kind), {
    ...options,
    headers,
    signal: AbortSignal.timeout(10000),
    credentials: "include",
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const messages: Record<string, string> = {
      invalid_profile: "Confira o nome, a descrição e a foto do perfil.",
      invalid_current_password: "A senha atual está incorreta.",
      invalid_password: "A nova senha deve ter pelo menos 8 caracteres.",
      password_confirmation_mismatch: "As novas senhas não coincidem.",
      too_many_attempts:
        "Muitas tentativas. Aguarde antes de tentar novamente.",
      unauthorized: "Sua sessão expirou. Entre novamente.",
      request_too_large: "A foto excede o tamanho permitido.",
    };
    throw Error(
      messages[data.error] || "Não foi possível salvar. Tente novamente.",
    );
  }
  return data;
}
export const profileService = {
  get: async (): Promise<Profile> => (await request("profile")).profile,
  save: async (profile: Profile): Promise<Profile> =>
    (
      await request("profile", {
        method: "PATCH",
        body: JSON.stringify(profile),
      })
    ).profile,
  password: async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    await request("password", { method: "POST", body: JSON.stringify(values) });
  },
};

export function finishPasswordChange() {
  if (/^\/d[23](\/|$)/.test(location.pathname)) {
    location.replace(location.pathname.slice(0, 3) + "/login");
    return;
  }
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "organizeon:open-main", loggedOut: true },
      "*",
    );
    return;
  }
  const auth = (
    window as Window & { organizeonAuth?: { logout: () => Promise<void> } }
  ).organizeonAuth;
  if (auth) {
    void auth.logout();
    return;
  }
  location.replace(new URL("./", document.baseURI).href);
}

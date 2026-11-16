// Loaded by the classic worker. v2 repairs v1 databases missing object stores,
// preserving existing cookie/config records rather than deleting the database.
let scramjetConfiguration;
function ensureScramjetSchema() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("$scramjet", 2);
    request.onupgradeneeded = () => {
      for (const name of [
        "config",
        "cookies",
        "redirectTrackers",
        "referrerPolicies",
        "publicSuffixList",
      ])
        if (!request.result.objectStoreNames.contains(name))
          request.result.createObjectStore(name);
    };
    request.onerror = () =>
      reject(new Error("Não foi possível abrir a configuração do Scramjet."));
    request.onblocked = () =>
      reject(
        new Error("Feche as outras abas do cliente para atualizar o Scramjet."),
      );
    request.onsuccess = () => {
      request.result.close();
      resolve();
    };
  });
}
async function prepareScramjetWorker() {
  if (!scramjetConfiguration)
    scramjetConfiguration = (async () => {
      await ensureScramjetSchema();
      const worker = await getScramjet();
      await worker.loadConfig();
      if (!worker.config?.prefix)
        throw new Error(
          "Abra novamente a pesquisa para inicializar o Scramjet.",
        );
      return worker;
    })().catch((error) => {
      scramjetConfiguration = undefined;
      throw error;
    });
  return scramjetConfiguration;
}
self.addEventListener("message", (event) => {
  if (event.data?.type !== "organizeon:scramjet-ready") return;
  event.waitUntil(
    prepareScramjetWorker().then(
      () => event.ports[0]?.postMessage({ ok: true }),
      () =>
        event.ports[0]?.postMessage({
          ok: false,
          error:
            "Não foi possível preparar o Scramjet. Feche outras abas e tente novamente.",
        }),
    ),
  );
});

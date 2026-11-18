// Repair missing stores without downgrading databases restored from cloud backups.
let scramjetConfiguration;
function ensureScramjetSchema() {
  const stores = [
    "config",
    "cookies",
    "redirectTrackers",
    "referrerPolicies",
    "publicSuffixList",
  ];
  return new Promise((resolve, reject) => {
    function open(version) {
      const request = version
        ? indexedDB.open("$scramjet", version)
        : indexedDB.open("$scramjet");
      request.onupgradeneeded = () => {
        for (const name of stores)
          if (!request.result.objectStoreNames.contains(name))
            request.result.createObjectStore(name);
      };
      request.onerror = () =>
        reject(new Error("Não foi possível abrir a configuração do Scramjet."));
      request.onblocked = () =>
        reject(
          new Error(
            "Feche as outras abas do cliente para atualizar o Scramjet.",
          ),
        );
      request.onsuccess = () => {
        const db = request.result,
          missing = stores.some((name) => !db.objectStoreNames.contains(name)),
          next = db.version + 1;
        db.close();
        missing ? open(next) : resolve();
      };
    }
    open();
  });
}
async function prepareScramjetWorker() {
  if (!scramjetConfiguration)
    scramjetConfiguration = ensureScramjetSchema().catch((error) => {
      scramjetConfiguration = undefined;
      throw error;
    });
  await scramjetConfiguration;
  const worker = await getScramjet();
  // Controller initialization invalidates worker.config through a loadConfig message.
  // Cache schema preparation, never the result of a configuration read.
  await worker.loadConfig();
  if (!worker.config?.prefix)
    throw new Error("Abra novamente a pesquisa para inicializar o Scramjet.");
  return worker;
}
self.addEventListener("message", (event) => {
  if(event.data?.type === "organizeon:scramjet-schema"){
    event.waitUntil(ensureScramjetSchema().then(()=>event.ports[0]?.postMessage({ok:true}),()=>event.ports[0]?.postMessage({ok:false,error:"Não foi possível preparar o armazenamento do Scramjet."})));
    return;
  }
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

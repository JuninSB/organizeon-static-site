// Scramjet v1 integration: initialize only after our worker controls the page.
let runtimePromise;
let controllerPromise;
function loadRuntime(base) {
  if (!runtimePromise)
    runtimePromise = new Promise((resolve, reject) => {
      if (window.$scramjetLoadController)
        return resolve(window.$scramjetLoadController());
      const script = document.createElement("script");
      script.src = `${base}xzmo/grhp.all.js?v=runtime-9a311f7cc63dea41`;
      script.onload = () => resolve(window.$scramjetLoadController());
      script.onerror = () => {
        runtimePromise = undefined;
        reject(new Error("Não foi possível carregar o Scramjet."));
      };
      document.head.append(script);
    });
  return runtimePromise;
}
function workerReady(worker, type = "organizeon:scramjet-ready") {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const finish = (error) => {
      clearTimeout(timer);
      channel.port1.close();
      error ? reject(error) : resolve();
    };
    const timer = setTimeout(
      () => finish(new Error("O Scramjet não confirmou a inicialização.")),
      10000,
    );
    channel.port1.onmessage = ({ data }) =>
      finish(
        data?.ok
          ? null
          : new Error(data?.error || "Falha ao preparar o Scramjet."),
      );
    worker.postMessage({ type }, [channel.port2]);
  });
}
export async function initializeScramjet(base) {
  if (!navigator.serviceWorker.controller)
    throw new Error("O service worker ainda não controla esta página.");
  if (!controllerPromise)
    controllerPromise = (async () => {
      await workerReady(navigator.serviceWorker.controller, "organizeon:scramjet-schema");
      const { ScramjetController } = await loadRuntime(base);
      const controller = new ScramjetController({
        prefix: `${base}dtix/`,
        flags: {sourcemaps:false},
        files: {
          wasm: `${base}xzmo/grhp.wasm.wasm`,
          all: `${base}xzmo/grhp.all.js?v=runtime-9a311f7cc63dea41`,
          sync: `${base}xzmo/grhp.sync.js?v=runtime-9a311f7cc63dea41`,
        },
      });
      await controller.init();
      await workerReady(navigator.serviceWorker.controller);
      return controller;
    })().catch((error) => {
      controllerPromise = undefined;
      throw error;
    });
  return controllerPromise;
}
export async function waitForWorkerControl(scriptUrl) {
  const expected = new URL(scriptUrl, location.href).href;
  const matches = () =>
    navigator.serviceWorker.controller?.scriptURL === expected;
  if (matches()) return;
  await new Promise((resolve, reject) => {
    const done = (error) => {
      clearTimeout(timer);
      navigator.serviceWorker.removeEventListener("controllerchange", changed);
      error ? reject(error) : resolve();
    };
    const changed = () => {
      if (matches()) done();
    };
    const timer = setTimeout(
      () =>
        done(new Error("O service worker não assumiu o controle da página.")),
      10000,
    );
    navigator.serviceWorker.addEventListener("controllerchange", changed);
    changed();
  });
}

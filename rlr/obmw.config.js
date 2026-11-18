const __cfgBase = typeof document !== 'undefined' && document.currentScript
  ? new URL('../', document.currentScript.src).pathname
  : new URL('./', self.location.href).pathname

self.__uv$config = {
	prefix: __cfgBase + 'nq/',
	encodeUrl: Ultraviolet.codec.xor.encode,
	decodeUrl: Ultraviolet.codec.xor.decode,
	handler: __cfgBase + 'rlr/obmw.handler.js?v=runtime-9a311f7cc63dea41',
	client: __cfgBase + 'rlr/obmw.client.js?v=runtime-9a311f7cc63dea41',
	bundle: __cfgBase + 'rlr/obmw.bundle.js?v=runtime-9a311f7cc63dea41',
	config: __cfgBase + 'rlr/obmw.config.js?v=runtime-9a311f7cc63dea41',
	sw: __cfgBase + 'rlr/obmw.sw.js?v=runtime-9a311f7cc63dea41'
}

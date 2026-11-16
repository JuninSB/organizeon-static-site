const __cfgBase = typeof document !== 'undefined' && document.currentScript
  ? new URL('../', document.currentScript.src).pathname
  : new URL('./', self.location.href).pathname

self.__uv$config = {
	prefix: __cfgBase + 'nq/',
	encodeUrl: Ultraviolet.codec.xor.encode,
	decodeUrl: Ultraviolet.codec.xor.decode,
	handler: __cfgBase + 'rlr/obmw.handler.js',
	client: __cfgBase + 'rlr/obmw.client.js',
	bundle: __cfgBase + 'rlr/obmw.bundle.js',
	config: __cfgBase + 'rlr/obmw.config.js',
	sw: __cfgBase + 'rlr/obmw.sw.js'
}

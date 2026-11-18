const __cfgBase = typeof document !== 'undefined' && document.currentScript
  ? new URL('../', document.currentScript.src).pathname
  : new URL('./', self.location.href).pathname

self.__uv$config = {
	prefix: __cfgBase + 'nq/',
	encodeUrl: Ultraviolet.codec.xor.encode,
	decodeUrl: Ultraviolet.codec.xor.decode,
	handler: __cfgBase + 'rlr/obmw.handler.js?v=runtime-c551e5374034b097',
	client: __cfgBase + 'rlr/obmw.client.js?v=runtime-c551e5374034b097',
	bundle: __cfgBase + 'rlr/obmw.bundle.js?v=runtime-c551e5374034b097',
	config: __cfgBase + 'rlr/obmw.config.js?v=runtime-c551e5374034b097',
	sw: __cfgBase + 'rlr/obmw.sw.js?v=runtime-c551e5374034b097'
}

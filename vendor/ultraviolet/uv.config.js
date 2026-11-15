const __cfgBase = self.location.pathname.replace(/tbojzp\.js$/, '')

self.__uv$config = {
	prefix: __cfgBase + 'proxy/ultraviolet/',
	encodeUrl: Ultraviolet.codec.xor.encode,
	decodeUrl: Ultraviolet.codec.xor.decode,
	handler: __cfgBase + 'vendor/ultraviolet/uv.handler.js',
	client: __cfgBase + 'vendor/ultraviolet/uv.client.js',
	bundle: __cfgBase + 'vendor/ultraviolet/uv.bundle.js',
	config: __cfgBase + 'vendor/ultraviolet/uv.config.js',
	sw: __cfgBase + 'vendor/ultraviolet/uv.sw.js'
}

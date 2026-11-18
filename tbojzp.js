/*global UVServiceWorker,__uv$config*/

const swBase = self.location.pathname.replace(/tbojzp\.js$/, '')

importScripts(swBase + 'rlr/obmw.bundle.js')
importScripts(swBase + 'rlr/obmw.config.js')
importScripts(__uv$config.sw || swBase + 'rlr/obmw.sw.js')

importScripts(swBase + 'xzmo/grhp.all.js')

const uv = new UVServiceWorker()

let scramjet = null
importScripts(swBase + 'core/proxy/scramjet-worker.js')

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})

async function getScramjet() {
	if (!scramjet) {
		const { ScramjetServiceWorker } = $scramjetLoadWorker()
		scramjet = new ScramjetServiceWorker()
	}
	return scramjet
}

async function handleScramjetRequest(event) {
	try {
		const s = await prepareScramjetWorker()
		if (s.route(event)) {
			return await s.fetch(event)
		}
	} catch (e) {
		console.error('Scramjet request failed:', e.name)
        return new Response('Não foi possível carregar a página com Scramjet. Volte à pesquisa e tente novamente.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
	}
	return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url)

	if (url.pathname.startsWith(swBase + 'dtix/') || (url.pathname === swBase + 'xzmo/grhp.wasm.wasm' && event.request.destination === 'script')) {
		event.respondWith(handleScramjetRequest(event))
		return
	}

	if (uv.route(event)) {
		event.respondWith(uv.fetch(event))
		return
	}
})

// ── Web Push (community chat notifications) ──
self.addEventListener('push', (e) => {
	let d = {}
	try {
		d = e.data.json()
	} catch {}
	e.waitUntil(
		self.registration.showNotification(d.title || 'Fern', {
			body: d.body || '',
			icon: d.icon,
			data: { url: d.url || '/chat' },
			tag: d.tag
		})
	)
})

self.addEventListener('notificationclick', (e) => {
	e.notification.close()
	const url = (e.notification.data && e.notification.data.url) || '/chat'
	e.waitUntil(
		self.clients
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then((cs) => {
				for (const c of cs) {
					if ('focus' in c) {
						c.navigate && c.navigate(url)
						return c.focus()
					}
				}
				return self.clients.openWindow(url)
			})
	)
})

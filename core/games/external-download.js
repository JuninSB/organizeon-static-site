/** Download only catalog-pinned sources; verify each source before using its bytes. */
export async function fetchExternalGame(download, { onProgress = () => {}, fetcher = fetch, timeoutMs = 180000 } = {}) {
  const sources = [download, ...(download.fallbacks || [])];
  const errors = [];
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    const label = source.label || (index ? 'OrganizeOn' : 'GitHub');
    const controller = new AbortController();
    let timer = setTimeout(() => controller.abort(), Math.min(timeoutMs, 15000));
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => controller.abort(), timeoutMs); };
    try {
      onProgress({ source: label, received: 0, total: source.size });
      const response = await fetcher(source.url, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      reset();
      const chunks = []; let received = 0;
      const reader = response.body?.getReader();
      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read(); if (done) break;
            received += value.byteLength;
            if (received > source.size) throw Error('Tamanho do arquivo inesperado');
            chunks.push(value); reset();
            onProgress({ source: label, received, total: source.size });
          }
        } finally { reader.releaseLock(); }
      } else { const bytes = new Uint8Array(await response.arrayBuffer()); chunks.push(bytes); received = bytes.length; }
      if (received !== source.size) throw Error('Arquivo incompleto');
      const bytes = new Uint8Array(received); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      const hash = async data => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', data)), b => b.toString(16).padStart(2, '0')).join('');
      if (await hash(bytes) !== source.sha256) throw Error('SHA-256 do pacote inválido');
      return { bytes, filename: source.filename,
        contentType: source.format === 'zip' ? 'application/zip' : 'text/html;charset=utf-8', source: label };
    } catch (error) { controller.abort(); errors.push(`${label}: ${error.name === 'AbortError' ? 'tempo de conexão esgotado' : error.message}`); }
    finally { clearTimeout(timer); }
  }
  throw Error(errors.join('; '));
}

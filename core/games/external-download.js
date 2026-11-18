/** Download only catalog-pinned sources; verify each source before using its bytes. */
export async function fetchExternalGame(download, { extract, onProgress = () => {}, fetcher = fetch, timeoutMs = 180000 } = {}) {
  const sources = [download, ...(download.fallbacks || [])];
  const errors = [];
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    const controller = new AbortController();
    let timer = setTimeout(() => controller.abort(), Math.min(timeoutMs, 15000));
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => controller.abort(), timeoutMs); };
    try {
      onProgress({ source: index ? 'OrganizeOn' : 'GitHub', received: 0, total: source.size });
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
            onProgress({ source: index ? 'OrganizeOn' : 'GitHub', received, total: source.size });
          }
        } finally { reader.releaseLock(); }
      } else { const bytes = new Uint8Array(await response.arrayBuffer()); chunks.push(bytes); received = bytes.length; }
      if (received !== source.size) throw Error('Arquivo incompleto');
      const bytes = new Uint8Array(received); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      const hash = async data => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', data)), b => b.toString(16).padStart(2, '0')).join('');
      if (await hash(bytes) !== source.sha256) throw Error('SHA-256 do pacote inválido');
      const html = source.format === 'zip-single-html' ? await extract(bytes, source.filename) : bytes;
      if (html.length !== source.outputSize || await hash(html) !== source.outputSha256) throw Error('Integridade do HTML inválida');
      return { html, filename: source.filename, source: index ? 'OrganizeOn' : 'GitHub' };
    } catch (error) { controller.abort(); errors.push(`${index ? 'OrganizeOn' : 'GitHub'}: ${error.name === 'AbortError' ? 'tempo de conexão esgotado' : error.message}`); }
    finally { clearTimeout(timer); }
  }
  throw Error(errors.join('; '));
}

export async function toPortable(value, seen = new WeakSet()) {
  if (value instanceof Date)
    return { __organizeonType: "Date", data: value.toISOString() };
  if (value instanceof Blob)
    return {
      __organizeonType: "Blob",
      type: value.type,
      data: arrayBufferToBase64(await value.arrayBuffer()),
    };
  if (typeof value === "bigint")
    return {
      __organizeonType: "BigInt",
      data: String(value),
    };
  if (value instanceof ArrayBuffer)
    return {
      __organizeonType: "ArrayBuffer",
      data: arrayBufferToBase64(value),
    };
  if (ArrayBuffer.isView(value))
    return {
      __organizeonType: value.constructor.name,
      data: arrayBufferToBase64(
        value.buffer.slice(
          value.byteOffset,
          value.byteOffset + value.byteLength,
        ),
      ),
    };
  if (Array.isArray(value)) {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const result = await Promise.all(
      value.map((item) => toPortable(item, seen)),
    );
    seen.delete(value);
    return result;
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const output = {};
    for (const [key, item] of Object.entries(value))
      output[key] = await toPortable(item, seen);
    seen.delete(value);
    return output;
  }
  return value;
}

export function fromPortable(value) {
  if (!value || typeof value !== "object") return value;
  if (value.__organizeonType === "Date") return new Date(value.data);
  if (value.__organizeonType === "BigInt") return BigInt(value.data);
  if (value.__organizeonType === "Blob")
    return new Blob([base64ToArrayBuffer(value.data)], { type: value.type });
  if (value.__organizeonType === "ArrayBuffer")
    return base64ToArrayBuffer(value.data);
  if (
    value.__organizeonType &&
    globalThis[value.__organizeonType]?.BYTES_PER_ELEMENT
  ) {
    return new globalThis[value.__organizeonType](
      base64ToArrayBuffer(value.data),
    );
  }
  if (Array.isArray(value)) return value.map(fromPortable);
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, fromPortable(item)]),
  );
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function base64ToArrayBuffer(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1)
    bytes[index] = binary.charCodeAt(index);
  return bytes.buffer;
}

/** Restore records without incrementing a database version on every cloud sync. */
export async function openBackupDatabase(backup) {
  const open = (version, upgrade) =>
    new Promise((resolve, reject) => {
      const request = version
        ? indexedDB.open(backup.name, version)
        : indexedDB.open(backup.name);
      request.onupgradeneeded = () =>
        upgrade?.(request.result, request.transaction);
      request.onerror = () => reject(request.error);
      request.onblocked = () =>
        reject(
          Error("Feche as outras abas para restaurar o armazenamento local."),
        );
      request.onsuccess = () => resolve(request.result);
    });
  let db = await open();
  const needsUpgrade = backup.stores.some((definition) => {
    if (!db.objectStoreNames.contains(definition.name)) return true;
    const store = db.transaction(definition.name).objectStore(definition.name);
    return (definition.indexes || []).some(
      (index) => !store.indexNames.contains(index.name),
    );
  });
  if (!needsUpgrade) return db;
  const version = db.version + 1;
  db.close();
  return open(version, (database, transaction) => {
    for (const definition of backup.stores) {
      const store = database.objectStoreNames.contains(definition.name)
        ? transaction.objectStore(definition.name)
        : database.createObjectStore(definition.name, {
            autoIncrement: definition.autoIncrement === true,
            ...(definition.keyPath != null
              ? { keyPath: definition.keyPath }
              : {}),
          });
      for (const index of definition.indexes || [])
        if (!store.indexNames.contains(index.name))
          store.createIndex(index.name, index.keyPath, {
            unique: index.unique === true,
            multiEntry: index.multiEntry === true,
          });
    }
  });
}

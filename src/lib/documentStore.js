/**
 * documentStore — persistent storage for the admin panel's CV / Résumé uploads.
 *
 * ---------------------------------------------------------------------------
 *  IMPORTANT LIMITATION (see also README → "Admin panel")
 * ---------------------------------------------------------------------------
 *  This site is a purely static bundle: there is no server that could accept
 *  and re-publish a file. Uploads are therefore kept in the visitor's browser
 *  (IndexedDB) and swap the document link *on that device only*.
 *
 *  To change the CV / Résumé for every visitor, replace the PDF in
 *  `public/documents/` and redeploy. The admin panel says this in plain text
 *  so nobody is misled.
 * ---------------------------------------------------------------------------
 */

const DB_NAME = "emmanuel-portfolio";
const DB_VERSION = 1;
const STORE = "documents";

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

function supported() {
  return typeof indexedDB !== "undefined";
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, run) {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const request = run(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(request ? request.result : undefined);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

/** All stored records, newest state per document id. */
export async function readDocuments() {
  if (!supported()) return [];
  try {
    const rows = await withStore("readonly", (store) => store.getAll());
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

export async function writeDocument(record) {
  if (!supported()) {
    throw new Error("This browser does not support local document storage.");
  }
  return withStore("readwrite", (store) => store.put(record));
}

export async function deleteDocument(id) {
  if (!supported()) return;
  return withStore("readwrite", (store) => store.delete(id));
}

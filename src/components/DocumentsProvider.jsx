import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { documents as documentDefinitions } from "../data/assets.js";
import { assetUrl } from "../lib/assets.js";
import {
  MAX_UPLOAD_BYTES,
  deleteDocument,
  readDocuments,
  writeDocument,
} from "../lib/documentStore.js";

/**
 * DocumentsProvider — makes the CV / Résumé links swappable at runtime.
 *
 * Public visitors get the PDFs committed under `public/documents/`. If the
 * admin panel has stored an upload in this browser, that file wins instead.
 * A document can also be marked `hidden`, which removes its download/view
 * buttons from the hero without deleting anything permanently.
 */
const DocumentsContext = createContext(null);

export function DocumentsProvider({ children }) {
  const [records, setRecords] = useState({});
  const [ready, setReady] = useState(false);
  const urlsRef = useRef({});

  const applyRecords = useCallback((next) => {
    Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));

    const nextUrls = {};
    for (const [id, record] of Object.entries(next)) {
      if (record?.blob) nextUrls[id] = URL.createObjectURL(record.blob);
    }

    urlsRef.current = nextUrls;
    setRecords(next);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const rows = await readDocuments();
      if (cancelled) return;
      const map = {};
      for (const row of rows) {
        if (row?.id) map[row.id] = row;
      }
      applyRecords(map);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [applyRecords]);

  useEffect(
    () => () => {
      Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current = {};
    },
    [],
  );

  const upload = useCallback(
    async (id, file) => {
      if (!file) throw new Error("No file selected.");
      const isPdf =
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) throw new Error("Please choose a PDF file.");
      if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error("That PDF is larger than 25 MB.");
      }

      const record = {
        id,
        hidden: false,
        name: file.name,
        type: file.type || "application/pdf",
        size: file.size,
        updatedAt: Date.now(),
        blob: file,
      };

      await writeDocument(record);
      applyRecords({ ...records, [id]: record });
      return record;
    },
    [applyRecords, records],
  );

  const remove = useCallback(
    async (id) => {
      const record = { id, hidden: true, updatedAt: Date.now() };
      await writeDocument(record);
      applyRecords({ ...records, [id]: record });
    },
    [applyRecords, records],
  );

  const restore = useCallback(
    async (id) => {
      await deleteDocument(id);
      const next = { ...records };
      delete next[id];
      applyRecords(next);
    },
    [applyRecords, records],
  );

  const docs = useMemo(
    () =>
      documentDefinitions.map((definition) => {
        const record = records[definition.id];
        const hasUpload = Boolean(record?.blob);
        return {
          ...definition,
          hidden: record?.hidden === true,
          custom: hasUpload,
          customName: hasUpload ? record.name : null,
          updatedAt: hasUpload ? record.updatedAt : null,
          href: hasUpload ? urlsRef.current[definition.id] : assetUrl(definition.publicPath),
        };
      }),
    [records],
  );

  const value = useMemo(
    () => ({ documents: docs, ready, upload, remove, restore }),
    [docs, ready, upload, remove, restore],
  );

  return (
    <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used inside <DocumentsProvider>");
  }
  return context;
}

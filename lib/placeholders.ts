/**
 * Placeholder hints ("Add screenshot…", "[ADD REAL RESULT]") only show while you run `npm run dev`.
 * On the live site (`npm run build`), anything not filled in yet is hidden or shown as a clean design,
 * so you can deploy before every asset is ready.
 */
export const showPlaceholders = process.env.NODE_ENV !== "production";

export const isPlaceholderText = (s?: string) => !s || s.trim().startsWith("[");

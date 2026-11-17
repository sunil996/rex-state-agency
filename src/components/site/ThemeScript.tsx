/**
 * Runs before paint so the correct design theme is on <html>.
 * Locked to Design 1 — British Editorial (preview switcher commented out).
 */
export function ThemeScript() {
  const code = `
(function () {
  try {
    // Locked: Design 1 (British Editorial)
    var design = "design-1";
    document.documentElement.setAttribute("data-design", design);
    localStorage.setItem("rex-design-preview", design);
  } catch (e) {}
})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      // eslint-disable-next-line react/no-danger
    />
  );
}

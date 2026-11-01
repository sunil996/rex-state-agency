/**
 * Runs before paint so the correct design theme is on <html>
 * (avoids always looking like "current").
 */
export function ThemeScript() {
  const code = `
(function () {
  try {
    var path = window.location.pathname || "/";
    var design = "current";
    if (path.indexOf("/design-1") === 0) design = "design-1";
    else if (path.indexOf("/design-2") === 0) design = "design-2";
    else if (path.indexOf("/design-3") === 0) design = "design-3";
    else {
      var saved = localStorage.getItem("rex-design-preview");
      if (saved === "design-1" || saved === "design-2" || saved === "design-3" || saved === "current") {
        design = saved;
      }
    }
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

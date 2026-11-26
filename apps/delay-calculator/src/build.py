import os, sys, shutil
from pathlib import Path

root = Path(__file__).parent
import json
tpl = (root / "app.template.html").read_text(encoding="utf-8")
imgs = json.dumps(json.loads((root / "imgs.json").read_text(encoding="utf-8")), separators=(",", ":"))
tpl = tpl.replace("/*IMGS*/{}/*END*/", imgs)

# 1) Wersja do publikacji jako artifact (bez doctype/head, bez service workera)
art = tpl.replace("{{HEAD_EXTRA}}", "").replace("{{BODY_END}}", "")
(root / "artifact.html").write_text(art, encoding="utf-8")

# 2) Wersja samodzielna PWA (pełny dokument, manifest, service worker, ikony)
head_extra = """<meta name="theme-color" content="#111418" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111418" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Seeburg Delay">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
"""
body_end = """<script>
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}
</script>"""
standalone = tpl.replace("{{HEAD_EXTRA}}", head_extra).replace("{{BODY_END}}", body_end)
# <title> i <meta claude:...> zostają w <head> dokumentu, reszta w <body>
title_end = standalone.index("<style>")
# głowa: wszystko do pierwszego bloku <style> (title, meta, head_extra), potem style, potem treść
style_start = standalone.index("<style>", title_end)
style_end = standalone.index("</style>", style_start) + len("</style>")
head_part = standalone[:style_start]
# head_extra zawiera własny <style> (safe-area) – pozostaje w head_part, bo poprzedza główny styl
html = (
    '<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head_part + standalone[style_start:style_end] + "\n</head>\n<body>\n"
    + standalone[style_end:] + "\n</body>\n</html>\n"
)
# usuń meta claude:* z wersji samodzielnej (nie ma tam sensu)
html = html.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
out = root / "pwa"
out.mkdir(exist_ok=True)
(out / "index.html").write_text(html, encoding="utf-8")

sw = """const CACHE = 'seeburg-delay-v5';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => caches.match('./index.html'))));
});
"""
(out / "sw.js").write_text(sw, encoding="utf-8")
manifest = """{
  "name": "Seeburg Delay",
  "short_name": "Delay",
  "description": "Kalkulator opóźnień sub/top z bazą Seeburg, działa bez internetu.",
  "lang": "pl",
  "start_url": ".",
  "scope": ".",
  "display": "standalone",
  "background_color": "#111418",
  "theme_color": "#111418",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
"""
(out / "manifest.webmanifest").write_text(manifest, encoding="utf-8")
print("ok", len(art), len(html))

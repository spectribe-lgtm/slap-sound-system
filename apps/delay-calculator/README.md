# Kalkulator opóźnień (Seeburg Delay)

Aplikacja PWA, działa offline po pierwszym uruchomieniu. Liczy opóźnienie między dwoma głośnikami (sub i top, wieża, osobno) z uwzględnieniem temperatury, wymiarów skrzyń i czasów przejścia z tabeli Time-Alignment Seeburga (HDLM 8 v6.3).

## Wdrożenie na iPhone
1. Wrzuć pliki z tego folderu (`index.html`, `sw.js`, `manifest.webmanifest`, ikony) na hosting HTTPS (np. GitHub Pages, Netlify, Cloudflare Pages).
2. W Safari otwórz adres, Udostępnij, Do ekranu początkowego.
3. Uruchom raz z internetem, potem działa offline.

## Źródła (`src/`)
`part_js.js` zawiera bazę głośników (`DB.subs`, `DB.tops`): nazwa, presety z czasem przejścia `L` (ms), wymiary `dims` [wysokość, szerokość, głębokość] w cm. `imgs.json` to zdjęcia w base64. `build.py` składa całość w `index.html` (szablon składa się z `part_head.html`, `part_css2.css`, `part_css3.css`, `part_body.html`, `part_js.js`).

`DESIGN-SYSTEM.md` opisuje tokeny i komponenty, `RAPORT-badania.md` badania nad fizyką opóźnień.

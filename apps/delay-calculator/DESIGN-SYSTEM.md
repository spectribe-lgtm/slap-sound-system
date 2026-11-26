# Seeburg Delay: system designu

Minimalistyczny system w stylu aplikacji Apple. Brak zewnętrznych fontów i bibliotek, działa offline. Wartości zebrane z Apple HIG (strony fetchowane w 2026) i z oznaczonych estymat.

## Tokeny

| Kategoria | Token | Jasny | Ciemny | Uwagi |
|---|---|---|---|---|
| Tło | `--bg` | #F2F2F7 | #000000 | systemGroupedBackground |
| Karta | `--card` | #FFFFFF | #1C1C1E | secondarySystemGroupedBackground |
| Tekst | `--label` | #000 | #FFF | |
| Tekst 2 | `--label-2` | rgba(60,60,67,.6) | rgba(235,235,245,.6) | wartości, podpisy |
| Separator | `--sep` | rgba(60,60,67,.29) | rgba(84,84,88,.6) | linia 0,5 px |
| Wypełnienie | `--fill` | rgba(120,120,128,.12) | rgba(120,120,128,.24) | segment, kafelek, krokowiec |
| Akcent (tło) | `--accent` | #0088FF | #0091FF | kolor iOS 26 |
| Akcent (tekst) | `--accent-text` | #0071E3 | #409CFF | ciemniejszy, bo #0088FF na bieli daje ok. 3,7:1 |
| Ostrzeżenie | `--orange` | #C93400 | #FF9F0A | tekst, kontrast ≥ 4,5:1 |

Typografia: stos systemowy `-apple-system, "SF Pro Text", system-ui`. Skala Dynamic Type: Large Title 34/41 bold, Body 17/22, Subhead 15/20, Footnote 13/18, Caption 12/16. Cyfry z `tabular-nums`.

Odstępy: siatka 4/8/12/16/24/32 px. Promienie: karta 12, kontrolki 9, kafelek 10. Wiersz min. 48 px, cel dotyku min. 44 px.

## Komponenty

| Komponent | Wariant | Stany | Dostępność |
|---|---|---|---|
| Grupa wstawiona (`.group` + `.row`) | wiersz z wartością, wiersz blokowy | zwykły | etykiety powiązane z polami |
| Wybór modelu (`.pick`) | natywny `<select>` | focus, otwarty | natywny picker iOS, VoiceOver czyta etykietę |
| Pole liczbowe (`.num`) | metry, °C | focus (obrys 2 px), nieprawidłowe (puste → „—”) | `inputmode="decimal"`, przecinek i kropka |
| Krokowiec (`.stepper`) | −/+ | wciśnięty (tło ciemniejsze) | etykiety „Mniej” / „Więcej” |
| Segmentowany przełącznik (`.seg`) | 1–3 segmenty | zaznaczony (biała pastylka), focus | radio z grupą `radiogroup` |
| Kafelek wyniku (`.tile`) | zwykły, `.on` (akcent) | który głośnik ma opóźnienie | `aria-live="polite"` na sekcji wyniku |
| Przycisk główny (`.btn`) | pełny | wciśnięty (opacity .6, scale .985) | focus 3 px |
| Pasek kart (`.tabbar`) | 3 karty | zaznaczona (akcent) | `role="tablist"`, `aria-selected` |
| Model w bazie (`details.model`) | zwinięty / rozwinięty | strzałka obraca się o 90° | natywne `<details>` |

## Zasady

- Jedna akcja główna na ekranie (Kopiuj wartość).
- Kolor akcentu oznacza tylko to, co trzeba ustawić albo można dotknąć.
- Ruch krótki (0,15–0,25 s), wyłączany przez `prefers-reduced-motion`.
- Liquid Glass tylko na pasku kart (`backdrop-filter`), nigdy na treści.

## Estymaty bez źródła Apple

Margines 16 px, promień 12 px, wysokość wiersza 48 px, czasy animacji, rozmiary kontrolek. Wartości do skorygowania po porównaniu z natywnymi aplikacjami na Twoim iPhonie.

## Dodatki (wersja 2)

| Komponent | Wariant | Stany | Dostępność |
|---|---|---|---|
| Plakietka głośnika (`.badge`) | A (niebieska), B (pomarańczowa) | stała | litera A/B jest też w tekście, kolor nie niesie sam znaczenia |
| Wiersz wyjaśnienia (`.why`) | zwykły, końcowy (`.final`, szare tło) | stała | tytuł, wartość, opis w jednym bloku |
| Scena układu (`.stage`) | widok z boku, jasne tło w obu trybach | zależna od danych | `role="img"` z opisem; wartości powtórzone w legendzie pod rysunkiem |
| Karta z rysunkiem (Baza) | zdjęcie z karty katalogowej | stała | alt z nazwą modelu |

Kolory głośników: A = `--a` (#0088FF / #0091FF), B = `--b` (#E07600 / #FF9F0A), tekst B w `--b-text`.

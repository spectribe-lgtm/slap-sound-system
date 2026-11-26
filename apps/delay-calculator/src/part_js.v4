"use strict";
/* ============ BAZA DANYCH (offline, wbudowana) ============
   Źródła: karty katalogowe Seeburg (K Sub 1801, K Sub 1502, Galeo T Sub, PS Sub, X8, K20, C15/C30, PS1, PS1-EX)
   oraz SEEBURG HDLM 8 + DSP2.6 Loudspeaker Library PEQ v6.3 (29.06.2026), rozdział 3.2 Time-Alignment-Delays.
   L = czas przejścia w ms z tabeli Time-Alignment (wspólna płaszczyzna czoła). lpf = rzeczywisty LPF presetu suba.
   dim = wysokość skrzyni w cm (do rysunku). Zdjęcia (IMGS) pochodzą z kart katalogowych. */
const IMGS = /*IMGS*/{}/*END*/;
const DB = {
  subs: [
    { id: "ksub1801", kind: "sub", name: "K Sub 1801", line: "18\" bas-reflex, 33–180 Hz", dim: 69.8, dims: [69.8, 51.2, 56],
      spec: [["Głośnik","18\" (cewka 4\")"],["Pasmo −6 dB","33–180 Hz"],["Strojenie","38 Hz"],["SPL 1 W / peak","101 / 137 dB"],["Moc AES / peak","1500 / 4500 W"],["Impedancja","8 Ω"],["Wymiary W×S×G","69,8 × 51,2 × 56,0 cm"],["Waga","42,5 kg"]],
      presets: [
        { id:"100", label:"100 Hz", L:4.4, lpf:92,  info:"HPF BW12 38 Hz · LPF LR24 92 Hz · PEQ 38 Hz Q2 +4 dB" },
        { id:"120", label:"120 Hz", L:5.2, lpf:110, info:"HPF BW12 38 Hz · LPF LR24 110 Hz · PEQ 38 Hz Q2 +4 dB, 85 Hz Q2 −1 dB" },
        { id:"140", label:"140 Hz", L:5.8, lpf:130, info:"HPF BW12 38 Hz · LPF LR24 130 Hz · PEQ 38 Hz Q2 +4 dB, 85 Hz Q2 −1 dB" } ] },
    { id: "ksub1502", kind: "sub", name: "K Sub 1502", line: "2×15\" bas-reflex, 37–220 Hz", dim: 51.2, dims: [51.2, 94.2, 56],
      spec: [["Głośniki","2 × 15\" Nd (cewka 4\")"],["Pasmo −6 dB","37–220 Hz"],["Strojenie","45 Hz"],["SPL 1 W / peak","104 / 142 dB"],["Moc AES / peak","2000 / 6000 W"],["Impedancja","4 Ω"],["Wymiary W×S×G","51,2 × 94,2 × 56,0 cm"],["Waga","48,0 kg"]],
      presets: [
        { id:"100", label:"100 Hz", L:4.6, lpf:100, info:"HPF BW12 45 Hz · LPF LR24 100 Hz · PEQ 45 Hz +3, 80 Hz +1, 200 Hz Q0,7 −5,5, 270 Hz Q5 −3 dB" },
        { id:"120", label:"120 Hz", L:5.2, lpf:120, info:"HPF BW12 45 Hz · LPF LR24 120 Hz · te same PEQ co w 100 Hz" },
        { id:"140", label:"140 Hz", L:5.6, lpf:140, info:"HPF BW12 45 Hz · LPF LR24 140 Hz · te same PEQ co w 100 Hz" } ] },
    { id: "galeotsub", kind: "sub", name: "Galeo T Sub", line: "21\" bas-reflex, 31–150 Hz", dim: 56, dims: [56, 76, 76],
      spec: [["Głośnik","21\" Nd"],["Pasmo −6 dB","31–150 Hz"],["Strojenie","36 Hz"],["SPL 1 W / peak","103 / 139 dB"],["Moc AES / peak","1500 / 4500 W"],["Impedancja","8 Ω"],["Wymiary W×S×G","56,0 × 76,0 × 76,0 cm"],["Waga","62 kg"]],
      presets: [
        { id:"80",  label:"80 Hz",  L:3.4, lpf:80,  info:"HPF BW12 36 Hz · LPF LR24 80 Hz · PEQ 36 Hz +3, 60 Hz +1, 110 Hz −3, 200 Hz −2 dB" },
        { id:"100", label:"100 Hz", L:4.2, lpf:100, info:"HPF BW12 36 Hz · LPF LR24 100 Hz · te same PEQ co w 80 Hz" },
        { id:"120", label:"120 Hz", L:4.7, lpf:120, info:"HPF BW12 36 Hz · LPF LR24 120 Hz · te same PEQ co w 80 Hz" } ] },
    { id: "pssub", kind: "sub", name: "PS Sub", line: "21\" ładowany tubą, 28–160 Hz", dim: 98, dims: [98, 58, 98],
      spec: [["Głośnik","21\" (cewka 4,5\")"],["Pasmo −6 dB","28–160 Hz"],["Strojenie","33 Hz"],["SPL 1 W / peak","104 / 141 dB"],["Moc AES / peak","1500 / 4500 W"],["Impedancja","8 Ω"],["Charakterystyka","dookólna"],["Wymiary W×S×G","98,0 × 58,0 × 98,0 cm"],["Waga","74 kg"]],
      presets: [
        { id:"100", label:"100 Hz", L:1.9, lpf:100, info:"HPF BW12 33 Hz · LPF LR24 100 Hz · PEQ 33 Hz Q2,3 +5, 70 Hz −3, 90 Hz −1, 145 Hz −8 dB" } ] }
  ],
  tops: [
    { id: "x8", kind: "top", name: "X8", line: "15\" koaksjal 80°×60°, 50 Hz–18 kHz", dim: 58, dims: [58, 45, 38],
      spec: [["Głośniki","15\" Nd (cewka 3,5\") + 1,4\" Nd"],["Pasmo −6 dB","50 Hz–18 kHz"],["Strojenie","60 Hz"],["Podział akustyczny","1 kHz"],["SPL 1 W / peak","101 / 134 dB"],["Moc AES / peak","600 / 1800 W"],["Impedancja","8 Ω"],["Rozpraszanie","80° × 60° (obrotowe)"],["Wymiary W×S×G","58,0 × 45,0 × 38,0 cm"],["Waga","22,5 kg"]],
      presets: [
        { id:"hp", label:"HP 100 Hz", L:3.2, info:"Fullrange · HPF BW18 65 Hz · PEQ 75 Hz Q1 −3 dB, 12 kHz Q2 +3 dB" },
        { id:"flat", label:"Flat", L:3.2, est:true, info:"Fullrange · HPF BW18 60 Hz · PEQ 70 Hz Q2 +6 dB, 12 kHz Q2 +3 dB. Tabela Time-Alignment nie ma wpisu dla Flat, przyjęto czas z presetu HP (inny jest tylko filtr 60 zamiast 65 Hz)." }
      ] },
    { id: "k24", kind: "top", name: "K24 a / xov", line: "2×12\" + 1,4\", 75 Hz–19 kHz", dim: 70, dims: [70, 42, 46],
      spec: [["Głośniki","2 × 12\" Nd + 1,4\" Nd"],["Pasmo −6 dB","75 Hz–19 kHz"],["Moc LF / HF (wersja dp)","2400 W RMS / 700 W RMS"],["Wymiary W×S×G","70,0 × 42,0 × 46,0 cm"],["Waga","37,0 kg"],["Uwaga","dane z karty K24 dp, wymiary skrzyni takie same dla a / xov"]],
      presets: [
        { id:"flat", label:"Flat", L:3.0, info:"Fullrange (xov) · HPF BW12 70 Hz · PEQ 90 Hz Q1,5 −6 dB oraz korekta średnich i wysokich" },
        { id:"hp", label:"HP 100 Hz", L:3.6, info:"Fullrange (xov) · HPF BW12 100 Hz · PEQ 90 Hz Q1,5 −6 dB oraz korekta średnich i wysokich" } ] },
    { id: "a8", kind: "top", name: "A8", line: "15\" + 1\", 50 Hz–20 kHz", dim: 70, dims: [69.8, 45, 42.5],
      spec: [["Głośniki","15\" Nd + 1\""],["Pasmo −10 dB","50 Hz–20 kHz"],["Impedancja","8 Ω"],["Moc AES / peak","500 / 1500 W"],["Wymiary W×S×G","69,8 × 45,0 × 42,5 cm"],["Waga","23,5 kg"]],
      presets: [ { id:"hp", label:"HP 100 Hz", L:4.0, info:"Fullrange · HPF BW18 110 Hz · PEQ 53 Hz Q2 +3 dB oraz korekta średnich i wysokich" } ] },
    { id: "a6", kind: "top", name: "A6", line: "12\" + 1\", 50 Hz–20 kHz", dim: 61, dims: [60.6, 36, 34],
      spec: [["Głośniki","12\" Nd + 1\""],["Pasmo","50 Hz–20 kHz"],["Moc LF / HF (wersja dp)","500 W AES / 150 W AES"],["Wymiary W×S×G","60,6 × 36,0 × 34,0 cm"],["Waga","16,8 kg"],["Uwaga","dane z karty A6 dp, wymiary skrzyni takie same dla wersji pasywnej"]],
      presets: [ { id:"hp", label:"HP 100 Hz", L:4.4, info:"Fullrange · HPF BW18 105 Hz · PEQ 59 Hz Q2 +3 dB oraz korekta średnich i wysokich" } ] },
    { id: "a3", kind: "top", name: "A3", line: "2×8\" + 1\", 80 Hz–20 kHz", dim: 59, dims: [59, 25, 25],
      spec: [["Głośniki","2 × 8\" Nd + 1\""],["Pasmo −6 dB","80 Hz–20 kHz"],["Impedancja","4 Ω (16 Ω opcja)"],["Moc AES / peak","500 / 1500 W"],["Wymiary W×S×G","59,0 × 25,0 × 25,0 cm"],["Waga","12,5 kg"],["Uwaga","starsza wersja A3 (tabela 5,8 ms); nowsza to A3 MKII"]],
      presets: [ { id:"hp", label:"HP 140 Hz", L:5.8, info:"Fullrange (A3 4 Ω) · HPF BW18 130 Hz · PEQ 60 Hz Q2 +3 dB oraz korekta średnich" } ] },
    { id: "a3mk2", kind: "top", name: "A3 MKII", line: "2×8\" + 1\", 80 Hz–20 kHz", dim: 59, dims: [59, 25, 25], dimsUnverified: true,
      spec: [["Głośniki","2 × 8\" Nd + 1\""],["Pasmo −6 dB","80 Hz–20 kHz"],["Impedancja","4 Ω (16 Ω opcja)"],["Moc AES / peak","500 / 1500 W"],["Wymiary W×S×G","59,0 × 25,0 × 25,0 cm"],["Waga","12,5 kg"],["Uwaga","wymiary z karty A3 HiMid, nie potwierdzone osobno dla MKII"]],
      presets: [ { id:"hp", label:"HP 120 Hz", L:5.0, info:"Fullrange (A3 MKII 4 Ω) · HPF BW12 120 Hz · PEQ 86 Hz Q2 +3 dB oraz korekta średnich i wysokich" } ] },
    { id: "x6", kind: "top", name: "X6", line: "12\" koaksjal, 55 Hz–18 kHz", dim: 50, dims: [50, 36, 33],
      spec: [["Głośniki","12\" Nd (cewka 3,5\") + 1,4\" Nd"],["Pasmo −6 dB","55 Hz–18 kHz"],["Impedancja","8 Ω"],["Moc AES / peak","500 / 1500 W"],["Wymiary W×S×G","50,0 × 36,0 × 33,0 cm"],["Waga","18,5 kg"]],
      presets: [
        { id:"hp", label:"HP 100 Hz", L:4.0, info:"Fullrange · HPF BW18 85 Hz · PEQ 120 Hz Q1,5 +1 dB, 900 Hz −1 dB, 5 kHz −2 dB, 12 kHz +2 dB" },
        { id:"flat", label:"Flat", L:4.0, est:true, info:"Fullrange · HPF BW18 65 Hz · PEQ 80 Hz Q2 +6 dB. Tabela Time-Alignment nie ma wpisu dla Flat, przyjęto czas z presetu HP." } ] },
    { id: "tsnano", kind: "top", name: "TS Nano", line: "mały satelita, HP 140 Hz", dim: 60, dims: [60, 60, 50], dimsUnknown: true,
      spec: [["Wymiary W×S×G","brak w dostępnych źródłach (podaj, a uzupełnię)"],["Impedancja w bibliotece","16 Ω, 120 W / 360 W"]],
      presets: [ { id:"hp", label:"HP 140 Hz", L:5.6, info:"Fullrange · HPF BW18 140 Hz · PEQ 1,2 kHz Q2 −3 dB, 1,7 kHz Q2 −3 dB" } ] },
    { id: "k20", kind: "top", name: "K20", line: "2×10\" + 1,4\", 70 Hz–18 kHz", dim: 66, dims: [66, 30, 36],
      spec: [["Głośniki","2 × 10\" Nd + 1,4\" Nd"],["Pasmo −6 dB","70 Hz–18 kHz"],["Strojenie","80 Hz"],["Podział akustyczny","900 Hz"],["SPL 1 W / peak","100 / 134 dB"],["Moc AES / peak","800 / 2400 W"],["Impedancja","4 Ω"],["Rozpraszanie","90°×60° albo 60°×50°"],["Wymiary W×S×G","66,0 × 30,0 × 36,0 cm"],["Waga","22,5 kg"]],
      presets: [
        { id:"flat", label:"Flat", L:3.4, info:"Fullrange · HPF BW18 80 Hz · PEQ 80 Hz Q3 +6 dB oraz korekta średnich i wysokich" },
        { id:"hp", label:"HP 100 Hz", L:4.4, info:"Fullrange · HPF BW18 100 Hz · korekta średnich i wysokich" } ] },
    { id: "c15", kind: "top", name: "C15 / C30", line: "2×10\" + 3×1\", 70 Hz–20 kHz", dim: 32, dims: [32, 70, 38],
      spec: [["Głośniki","2 × 10\" Nd + 3 × 1\" Nd"],["Pasmo −6 dB","70 Hz–20 kHz"],["Strojenie","80 Hz"],["Podział akustyczny","800 Hz"],["SPL 1 W / peak","100 / 134 dB"],["Moc AES / peak","800 / 2400 W"],["Impedancja","8 Ω"],["Rozpraszanie","90° × 15° (C15), 90° × 30° (C30)"],["Wymiary W×S×G","32,0 × 70,0 × 38,0 cm"],["Waga","25 kg (C15), 23,5 kg (C30)"]],
      presets: [ { id:"hp", label:"HP", L:3.9, info:"Fullrange · HPF BW18 70 Hz · PEQ 110 Hz Q1,7 −3 dB oraz korekta średnich i wysokich" } ] },
    { id: "ps1", kind: "top", name: "PS1", line: "3-drożny punktowy, 75 Hz–20 kHz", dim: 92, dims: [92, 58, 58],
      spec: [["Głośniki","2 × 12\" / 2 × 6,5\" / 1,4\""],["Pasmo −6 dB","75 Hz–20 kHz"],["Strojenie","80 Hz"],["Podział akustyczny","300 Hz / 1,3 kHz"],["SPL 1 W / peak LF","101 / 138 dB"],["SPL 1 W / peak MHF","108 / 138 dB"],["Moc AES / peak","LF 1500/4500 W, MHF 300/900 W"],["Impedancja","LF 4 Ω (8 Ω opcja), MHF 16 Ω"],["Rozpraszanie","80° × 40°"],["Wymiary W×S×G","92,0 × 58,0 × 58,0 cm"],["Waga","54 kg"]],
      presets: [ { id:"hp", label:"HP 100 Hz", L:4.3, info:"Dwa kanały (high, mid) · mid HPF BW18 110 Hz, delay mid 0,15 ms w presecie" } ] },
    { id: "galeottop", kind: "top", name: "Galeo T Top", line: "tylko biblioteka procesora", dim: 40, dims: [40, 60, 40],
      spec: [["Źródło danych","biblioteka HDLM 8, bez karty katalogowej"],["Preset","Flat (high+mid, low)"],["Delay w presecie","1,2 ms (high+mid)"]],
      presets: [ { id:"flat", label:"Flat", L:2.0, info:"Dwa kanały: high+mid i low · HPF BW24 260 Hz (high+mid)" } ] }
  ],
  other: { id: "other", kind: "other", name: "Inny głośnik", line: "bez danych z biblioteki", custom: true, dim: 60, dims: [60, 60, 50],
    presets: [ { id:"x", label:"bez presetu", L:0, info:"" } ] },
  infoOnly: [
    { name: "PS1-EX", line: "moduł niskośrednicowy do PS1, 75–500 Hz",
      spec: [["Głośniki","2 × 12\""],["Pasmo −6 dB","75–500 Hz"],["Strojenie","80 Hz"],["Podział akustyczny","300 Hz"],["SPL 1 W / peak","101 / 138 dB"],["Moc AES / peak","1500 / 4500 W"],["Impedancja","4 Ω (8 Ω opcja)"],["Wymiary W×S×G","36,8 × 58,0 × 58,0 cm"],["Waga","25 kg"],["Opóźnienie w bibliotece","brak wpisu w tabeli Time-Alignment"]] }
  ]
};
DB.all = DB.subs.concat(DB.tops, [DB.other]);
const modelOf = id => DB.all.find(m => m.id === id) || DB.all[0];

/* ============ OBLICZENIA ============ */
const speedOfSound = T => 331.3 * Math.sqrt(1 + T / 273.15);          // m/s, powietrze suche
const horiz = (d, h) => Math.sqrt(Math.max(d * d - h * h, 0));
const dimsOf = m => (m.dims || [60, 60, 50]).map(v => v / 100);        // [wysokość, szerokość, głębokość] w m
/* Geometria: wieża (B stoi na A) liczy drogi do środków grup z wymiarów skrzyń; "osobno" bierze wpisane odległości. */
function geom(s) {
  const mA = modelOf(s.A), mB = modelOf(s.B);
  const dA = dimsOf(mA), dB = dimsOf(mB);
  const n = Math.min(4, Math.max(1, Math.round(s.nA || 1))), stack = s.arr !== "side";
  const tower = s.place === "tower";
  const hgtA = stack ? n * dA[0] : dA[0];                         // wysokość grupy A
  const baseA = tower ? 0 : (s.bA || 0), baseB = tower ? baseA + hgtA : (s.bB || 0);
  const xA = s.x, xB = tower ? s.x : s.xB;
  const zA = baseA + hgtA / 2, zB = baseB + dB[0] / 2;            // środki akustyczne nad podłogą
  const rA = zA - s.hr, rB = zB - s.hr;                           // względem ucha
  return { tower, n, stack, x: xA, xA, xB, zA, zB, topA: baseA + hgtA, baseA, baseB, hA: rA, hB: rB,
           dA: Math.hypot(xA, rA), dB: Math.hypot(xB, rB), dims: { A: dA, B: dB } };
}
function compute(s) {
  const mA = modelOf(s.A), mB = modelOf(s.B);
  const pA = mA.presets.find(p => p.id === s.pA) || mA.presets[0];
  const pB = mB.presets.find(p => p.id === s.pB) || mB.presets[0];
  const c = speedOfSound(s.T);
  const g = geom(s);
  const geo = (g.dA - g.dB) / c * 1000;                           // ms; <0: A bliżej, opóźnij A
  const custom = !!(mA.custom || mB.custom);
  const lib = custom ? 0 : pA.L - pB.L;                           // ms; >0: A później, opóźnij B
  const X = geo + lib;                                            // >0: opóźnij B, <0: opóźnij A
  return { mA, mB, pA, pB, c, g, geo, lib, custom, X, delayA: X < 0 ? -X : 0, delayB: X > 0 ? X : 0 };
}

/* ============ STAN ============ */
const KEY = "seeburg-delay-v4";
/* Przykład: wieża przy DJ-u. 2 × K Sub 1801 jedna na drugiej, na nich X8, front w jednej płaszczyźnie, ucho 1,6 m nad podłogą, 1,3 m poziomo. */
const defaults = { A:"ksub1801", pA:"100", B:"x8", pB:"hp", nA:2, arr:"stack", place:"tower", x:1.3, xB:2.5, hr:1.6, bA:0, bB:0, T:20, ref:"dj" };
let S = Object.assign({}, defaults);
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const $ = id => document.getElementById(id);
const fmt = (n, d = 2) => n.toFixed(d).replace(".", ",").replace(/^-0([,.]0+)?$/, "0$1");
const sgn = (n, d = 2) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
const REF = { dj: ["Miejsce DJ-a", "miejsca DJ-a"], foh: ["FOH", "FOH"], other: ["Inny punkt", "punktu odniesienia"] };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ============ WIDOK: kontrolki ============ */
function fillSelect(el, val) {
  const opt = m => `<option value="${m.id}">${esc(m.name)}</option>`;
  el.innerHTML = `<optgroup label="Suby">${DB.subs.map(opt).join("")}</optgroup>` +
                 `<optgroup label="Topy i koaksjale">${DB.tops.map(opt).join("")}</optgroup>` +
                 `<optgroup label="Inne">${opt(DB.other)}</optgroup>`;
  el.value = val;
}
function fillSeg(el, name, presets, val, onPick) {
  el.innerHTML = presets.map(p => `<label><input type="radio" name="${name}" value="${p.id}"${p.id === val ? " checked" : ""}><span>${esc(p.label)}</span></label>`).join("");
  el.querySelectorAll("input").forEach(i => i.addEventListener("change", () => onPick(i.value)));
}
function syncModels() {
  const mA = modelOf(S.A), mB = modelOf(S.B);
  if (!mA.presets.some(p => p.id === S.pA)) S.pA = mA.presets[0].id;
  if (!mB.presets.some(p => p.id === S.pB)) S.pB = mB.presets[0].id;
  fillSeg($("segA"), "sa", mA.presets, S.pA, v => { S.pA = v; update(); });
  fillSeg($("segB"), "sb", mB.presets, S.pB, v => { S.pB = v; update(); });
  $("presetRowA").hidden = !!mA.custom;
  $("presetRowB").hidden = !!mB.custom;
}

/* Pola liczbowe: konfiguracja (odczyt, zapis, krok, zakres, miejsca po przecinku) */
const num = (key, step, lo, hi, d = 2) => ({ get: () => S[key], set: v => { S[key] = v; }, step, lo, hi, d });
const F = {
  nA: { get: () => S.nA, set: v => { S.nA = Math.min(4, Math.max(1, Math.round(v))); }, step: 1, lo: 1, hi: 4, d: 0 },
  fX: num("x", .05, .05, 200), fXB: num("xB", .05, .05, 200), fR: num("hr", .05, 0, 4),
  bA: num("bA", .05, 0, 10), bB: num("bB", .05, 0, 10),
  temp: { get: () => S.T, set: v => { S.T = v; }, step: 1, lo: -30, hi: 60, d: 1 }
};
const parse = v => parseFloat(String(v).replace(",", ".").replace(/[^0-9.\-]/g, ""));
function syncInputs() {
  Object.keys(F).forEach(id => { const el = $(id); if (document.activeElement !== el) el.value = Number.isFinite(F[id].get()) ? fmt(F[id].get(), F[id].d) : ""; });
}
Object.keys(F).forEach(id => {
  const inp = $(id), f = F[id];
  inp.addEventListener("input", () => { const v = parse(inp.value); if (Number.isFinite(v)) { f.set(v); update(false); } });
  inp.addEventListener("blur", () => { const v = parse(inp.value); if (Number.isFinite(v)) f.set(Math.min(f.hi, Math.max(f.lo, v))); update(); });
  inp.addEventListener("focus", () => inp.select());
});
document.querySelectorAll(".stepper button").forEach(b => b.addEventListener("click", () => {
  const f = F[b.dataset.step];
  let v = Number.isFinite(f.get()) ? f.get() : 0;
  v = Math.round((v + f.step * Number(b.dataset.dir)) * 1000) / 1000;
  f.set(Math.min(f.hi, Math.max(f.lo, v))); update();
}));
$("selA").addEventListener("change", e => { S.A = e.target.value; syncModels(); update(); });
$("selB").addEventListener("change", e => { S.B = e.target.value; syncModels(); update(); });
$("ref").addEventListener("change", e => { S.ref = e.target.value; update(); });
document.querySelectorAll('#segPlace input').forEach(i => i.addEventListener("change", () => { S.place = i.value; update(); }));
document.querySelectorAll('#segArr input').forEach(i => i.addEventListener("change", () => { S.arr = i.value; update(); }));

/* ============ WIDOK: wynik ============ */
function whyRow(title, right, rcls, text, extra = "") {
  return `<div class="why ${extra}"><div class="top"><span class="t">${title}</span><span class="r ${rcls}">${right}</span></div><p class="d">${text}</p></div>`;
}
const who = (k, name) => `<span class="badge ${k.toLowerCase()}">${k}</span>${esc(name)}`;
function render(r) {
  const g = r.g, ref = REF[S.ref];
  const nm = { A: (g.n > 1 ? g.n + "× " : "") + r.mA.name, B: r.mB.name };
  $("whoA").textContent = "A · " + nm.A;
  $("whoB").textContent = "B · " + nm.B;
  $("kX").textContent = g.tower ? "Do frontu skrzyń" : "Do frontu A";
  $("kXB").textContent = "Do frontu B";
  $("ref").value = S.ref;
  document.querySelectorAll('#segPlace input').forEach(i => { i.checked = i.value === S.place; });
  document.querySelectorAll('#segArr input').forEach(i => { i.checked = i.value === S.arr; });
  ["rowXB", "rowBA", "rowBB"].forEach(id => { $(id).hidden = g.tower; }); $("arrRow").hidden = g.n < 2;
  $("placeNote").textContent = g.tower
    ? "B stoi na skrzyniach A, front wszystkich skrzyń leży w jednej płaszczyźnie. Aplikacja liczy drogi do środków skrzyń z ich wymiarów."
    : "Skrzynie stoją osobno: podajesz odległość każdej z nich i wysokość, na jakiej stoi jej spód.";

  const ok = [S.x, S.xB, S.hr, S.T].every(Number.isFinite) && g.dA > 0 && g.dB > 0;
  $("cval").textContent = fmt(r.c, 1) + " m/s";
  if (!ok) {
    ["valA", "valB"].forEach(i => $(i).textContent = "—");
    $("dsp").textContent = "Wpisz odległości i temperaturę."; $("warn").hidden = true; $("why").innerHTML = ""; return;
  }
  const show = (k, ms) => {
    const on = ms > 0;
    $("val" + k).innerHTML = fmt(ms) + "<small>ms</small>";
    $("tile" + k).classList.toggle("on", on);
    $("hint" + k).textContent = on ? "ustaw to opóźnienie" : "bez opóźnienia";
  };
  show("A", r.delayA); show("B", r.delayB);
  const ms = Math.max(r.delayA, r.delayB);
  const smp = fs => { const n = Math.round(ms / 1000 * fs); return `<b>${n}</b> próbek (${fmt(n / fs * 1000, 3)} ms)`; };
  $("dsp").innerHTML = `48 kHz: ${smp(48000)}<br>96 kHz: ${smp(96000)}`;

  /* wyjaśnienie wyniku */
  const nearer = r.geo < 0 ? "A" : "B", dist = Math.abs(g.dA - g.dB);
  let geoRow, libRow;
  if (Math.abs(r.geo) < 0.005) geoRow = whyRow("1. Odległość", "0,00 ms", "n", `Oba głośniki są tak samo daleko od ${ref[1]} (po ${fmt(g.dA)} m i ${fmt(g.dB)} m). Ta różnica nic nie zmienia.`);
  else geoRow = whyRow("1. Odległość", `${nearer} +${fmt(Math.abs(r.geo))} ms`, nearer.toLowerCase(),
    `Głośnik ${nearer} ma bliżej do ${ref[1]} o ${fmt(dist)} m (${fmt(g.dA)} m i ${fmt(g.dB)} m po skosie). Jego dźwięk dociera o ${fmt(Math.abs(r.geo))} ms wcześniej, więc ${nearer} trzeba opóźnić.`);
  if (r.custom) libRow = whyRow("2. Czas przejścia", "pominięto", "n", "Dla głośnika spoza bazy nie ma czasu przejścia w bibliotece Seeburga, więc ten krok pominięto.");
  else if (Math.abs(r.lib) < 0.005) libRow = whyRow("2. Czas przejścia", "0,00 ms", "n", `Oba presety mają ten sam czas przejścia (${fmt(r.pA.L, 1)} ms).`);
  else {
    const late = r.lib > 0 ? "A" : "B", early = late === "A" ? "B" : "A";
    const Ll = late === "A" ? r.pA.L : r.pB.L, Le = late === "A" ? r.pB.L : r.pA.L;
    libRow = whyRow("2. Czas przejścia", `${early} +${fmt(Math.abs(r.lib))} ms`, early.toLowerCase(),
      `Wewnątrz skrzyń dźwięk idzie różnie długo. W tabeli Seeburga ${late} ma ${fmt(Ll, 1)} ms, a ${early} ${fmt(Le, 1)} ms. Różnicę ${fmt(Math.abs(r.lib))} ms wyrównuje opóźnienie ${early}.`);
  }
  let how;
  const gDir = Math.abs(r.geo) < 0.005 ? 0 : (r.geo < 0 ? -1 : 1), lDir = Math.abs(r.lib) < 0.005 ? 0 : (r.lib > 0 ? 1 : -1);
  if (Math.abs(r.X) < 0.005) how = "Efekty się znoszą, opóźnienie nie jest potrzebne.";
  else if (gDir === 0 || lDir === 0 || gDir === lDir) how = `Dodajemy: ${fmt(Math.abs(r.geo))} + ${fmt(Math.abs(r.lib))} = ${fmt(Math.abs(r.X))} ms.`;
  else how = `Oba efekty działają w przeciwne strony, więc je odejmujemy: ${fmt(Math.max(Math.abs(r.geo), Math.abs(r.lib)))} − ${fmt(Math.min(Math.abs(r.geo), Math.abs(r.lib)))} = ${fmt(Math.abs(r.X))} ms.`;
  const target = r.X > 0 ? "B" : r.X < 0 ? "A" : null;
  const finalRow = Math.abs(r.X) < 0.005
    ? whyRow("Wynik końcowy", "0,00 ms", "n", how, "final")
    : whyRow("Wynik końcowy", `${target} +${fmt(Math.abs(r.X))} ms`, target.toLowerCase(), `<b>Razem</b> to suma obu efektów. ${how} Opóźnij głośnik <b>${target}</b> (${esc(target === "A" ? nm.A : nm.B)}) o ${fmt(Math.abs(r.X))} ms.`, "final");
  let setupRow = "", procRow = "", spreadRow = "";
  {
    const cnt = g.n > 1 ? g.n + "× " : "", arrTxt = g.n > 1 ? (g.stack ? " jedna na drugiej" : " obok siebie") : "";
    setupRow = whyRow("Ustawienie", `${fmt(g.dA)} / ${fmt(g.dB)} m`, "n",
      `${cnt}${esc(r.mA.name)}${arrTxt}${g.tower ? ", na nich " + esc(r.mB.name) : " i " + esc(r.mB.name) + " osobno"}. Środek A jest ${fmt(g.zA)} m nad podłogą, środek B ${fmt(g.zB)} m, ucho ${fmt(S.hr)} m. ` +
      `Poziomo do frontu: A ${fmt(g.xA)} m, B ${fmt(g.xB)} m. Z tego aplikacja liczy drogę po skosie: A ${fmt(g.dA)} m, B ${fmt(g.dB)} m.`);
  }
  if (g.tower || g.n > 1) {
    const tg = target ? (target === "A" ? r.mA.name : r.mB.name) : "";
    procRow = whyRow("Co wpisać w procesorze", target ? `${target} ${fmt(Math.abs(r.X))} ms` : "0 ms", target ? target.toLowerCase() : "n",
      (g.n > 1 ? `Skrzynie A grają ten sam sygnał i mają ten sam preset, więc między nimi zostaje <b>0 ms</b>. ` : "") +
      (target ? `Wartość <b>${fmt(Math.abs(r.X))} ms</b> wpisz na wyjściu <b>${target}</b> (${esc(tg)}${target === "A" && g.n > 1 ? ", dla wszystkich " + g.n + " skrzyń" : ""}). Drugie wyjście zostaw na 0 ms.` : `Wszystkie opóźnienia zostaw na 0 ms.`));
  }
  if (g.stack && g.n > 1) {
    const ds = []; for (let i = 0; i < g.n; i++) ds.push(Math.hypot(g.x, g.baseA + (i + .5) * g.dims.A[0] - S.hr));
    const sp = (Math.max(...ds) - Math.min(...ds)) / r.c * 1000;
    if (sp >= 0.1) spreadRow = whyRow("Skrzynie w stosie", `${fmt(sp)} ms`, "n", `Dolna i górna skrzynia A mają różną drogę do ucha, razem ${fmt(sp)} ms. Nie koryguj tego opóźnieniem, bo to jeden sygnał. Zniknie z odległością (z miejsca FOH jest pomijalne).`);
  }
  if (!g.stack && g.n > 1) {
    const off = (g.n - 1) / 2 * g.dims.A[1], ex = (Math.hypot(g.dA, off) - g.dA) / r.c * 1000;
    if (ex >= 0.05) spreadRow = whyRow("Skrzynie obok siebie", `${fmt(ex)} ms`, "n", `Skrajne skrzynie są o ${fmt(ex)} ms dalej od punktu odniesienia niż środek grupy. Nie koryguj tego opóźnieniem, bo to jeden sygnał. Różnica maleje z odległością.`);
  }
  $("why").innerHTML = setupRow + geoRow + libRow + finalRow + procRow + spreadRow;

  const fc = r.pA.lpf || r.pB.lpf || 100, loss = 20 * Math.log10(Math.abs(Math.cos(Math.PI * fc * Math.abs(r.X) / 1000)));
  const w = $("warn");
  const bad = false;
  if (bad) { w.hidden = false; w.textContent = "Odległość po skosie nie może być mniejsza niż wysokość. Sprawdź wpisane wartości."; }
  else if (Math.abs(r.X) >= 8) { w.hidden = false; w.textContent = "Duża różnica. Sprawdź, czy odległości są wpisane poprawnie."; }
  else w.hidden = true;
  const est = [r.pA.est && "A", r.pB.est && "B"].filter(Boolean);
  if (est.length && !r.custom) { w.hidden = false; w.textContent = `Preset ${est.join(" i ")} nie ma wpisu w tabeli Time-Alignment Seeburga. Przyjęto czas z presetu HP (3,2 ms), sprawdź pomiarem.`; }
  const unk = [r.mA.dimsUnknown && "A", r.mB.dimsUnknown && "B"].filter(Boolean);
  if (unk.length) { w.hidden = false; w.textContent = (w.hidden || !w.textContent ? "" : w.textContent + " ") + `Brak wymiarów skrzyni ${unk.join(" i ")} w źródłach, do rysunku i wieży użyto 60 × 60 × 50 cm.`; }
  const lpfKnown = r.pA.lpf || r.pB.lpf;
  $("phaseNote").textContent = Math.abs(r.X) < 0.05
    ? "Źródła są już wyrównane."
    : (lpfKnown ? `Bez korekty suma obu głośników traci około ${fmt(Math.abs(loss), 1)} dB przy ${fc} Hz (podział LR4). Różnice poniżej 1 ms mają według Seeburga niewielki wpływ.`
                : "Różnice poniżej 1 ms mają według Seeburga niewielki wpływ.");
}

/* ============ WIDOK: rysunek układu (widok z boku, w skali) ============ */
function drawPlan(r) {
  const g = r.g, tower = g.tower, n = g.n;
  if (![g.dA, g.dB].every(v => Number.isFinite(v) && v > 0)) { $("stage").innerHTML = ""; return; }
  const W = 360, padL = 12, refW = 58, chipW = 84, padR = 10, gap = 8, padT = 30;
  const [hA, , dpA] = g.dims.A, [hB, , dpB] = g.dims.B;
  const xA = g.xA, xB = g.xB;
  const zsA = [];
  if (g.stack) { for (let i = 0; i < n; i++) zsA.push(g.baseA + (i + .5) * hA - S.hr); }
  else zsA.push(g.baseA + hA / 2 - S.hr);
  const copies = g.stack ? 1 : Math.min(n, 4);
  const P = [
    { k: "A", m: r.mA, col: "var(--a)", txt: "var(--accent-text)", x: xA, depth: dpA, h: hA, zs: zsA, zc: g.hA, copies, delay: r.delayA, d: g.dA,
      cap: n > 1 ? `${n} szt. ${g.stack ? "w stosie" : "obok siebie"}` : "" },
    { k: "B", m: r.mB, col: "var(--b)", txt: "var(--b-text)", x: xB, depth: dpB, h: hB, zs: [g.hB], zc: g.hB, copies: 1, delay: r.delayB, d: g.dB, cap: "" }
  ];
  let zTop = 0.2, zBot = -0.35;
  P.forEach(p => p.zs.forEach(z => { zTop = Math.max(zTop, z + p.h / 2); zBot = Math.min(zBot, z - p.h / 2); }));
  zBot = Math.min(zBot, -S.hr);
  const ghost = (copies - 1) * 5;
  const xMax = Math.max(...P.map(p => p.x + p.depth));
  const ppm = Math.min((W - padL - refW - chipW - padR - gap - ghost) / xMax, 330 / (zTop - zBot), 240);
  const x0 = padL + refW, yOf = z => padT + (zTop - z) * ppm, yRef = yOf(0), yF = yOf(-S.hr);
  const H = yOf(zBot) + 34;
  const f = v => v.toFixed(1);
  const chipX = W - padR - chipW;
  let s = `<svg viewBox="0 0 ${W} ${f(H)}" xmlns="http://www.w3.org/2000/svg">`;
  s += `<defs><linearGradient id="bx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A5A5E"/><stop offset="1" stop-color="#2E2E31"/></linearGradient>` +
       `<filter id="sh" x="-20%" y="-20%" width="145%" height="150%"><feDropShadow dx="0" dy="2.5" stdDeviation="3" flood-color="#000" flood-opacity=".30"/></filter></defs>`;
  /* podłoga i wysokość ucha */
  s += `<rect x="${padL}" y="${f(yF)}" width="${W - padL - padR}" height="3" rx="1.5" class="pl-floor"/>`;
  s += `<line x1="${x0}" y1="${f(yRef)}" x2="${W - padR}" y2="${f(yRef)}" class="pl-ear"/>`;
  /* punkt odniesienia */
  const xr = padL + 22; let dimTop;
  if (S.ref === "foh") {
    s += `<rect x="${xr - 17}" y="${f(yRef - 11)}" width="34" height="22" rx="5" class="pl-ref"/><path d="M${xr - 9} ${f(yRef - 5)}v10M${xr} ${f(yRef - 5)}v10M${xr + 9} ${f(yRef - 5)}v10" class="pl-sl"/>`; dimTop = yRef + 15;
  } else if (S.ref === "dj") {
    s += `<circle cx="${xr}" cy="${f(yRef)}" r="9" class="pl-ref"/><path d="M${xr - 17} ${f(yRef + 32)}Q${xr - 17} ${f(yRef + 14)} ${xr} ${f(yRef + 14)}Q${xr + 17} ${f(yRef + 14)} ${xr + 17} ${f(yRef + 32)}Z" class="pl-ref"/>`; dimTop = yRef + 36;
  } else {
    s += `<circle cx="${xr}" cy="${f(yRef)}" r="9" class="pl-ring"/><circle cx="${xr}" cy="${f(yRef)}" r="3" class="pl-ref"/>`; dimTop = yRef + 13;
  }
  if (yF - dimTop > 26) {
    const my = (dimTop + yF) / 2, t = fmt(S.hr) + " m";
    s += `<line x1="${xr}" y1="${f(dimTop)}" x2="${xr}" y2="${f(yF - 3)}" class="pl-dim"/><rect x="${xr - 22}" y="${f(my - 9)}" width="44" height="18" rx="9" class="pl-pill"/><text x="${xr}" y="${f(my + 4)}" text-anchor="middle" class="pl-t2 pl-sm">${t}</text>`;
  }
  s += `<text x="${xr}" y="${f(yF + 19)}" text-anchor="middle" class="pl-t2 pl-sm">${esc(REF[S.ref][0])}</text>`;
  /* skrzynie */
  P.forEach(p => {
    const L = x0 + p.x * ppm, w = p.depth * ppm, h = p.h * ppm;
    for (let c = p.copies - 1; c >= 1; c--) {
      const y = yOf(p.zs[0]) - h / 2 - c * 5;
      s += `<rect x="${f(L + c * 5)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="7" fill="url(#bx)" opacity="${(0.62 - c * .12).toFixed(2)}" class="pl-box"/>`;
    }
    p.zs.forEach(z => {
      const y = yOf(z) - h / 2;
      s += `<rect x="${f(L)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="7" fill="url(#bx)" filter="url(#sh)" class="pl-box"/>`;
      s += `<rect x="${f(L + 2.5)}" y="${f(y + 5)}" width="3" height="${f(Math.max(h - 10, 4))}" rx="1.5" fill="#fff" opacity=".30"/>`;
      if (w >= 40 && h >= 20 && p.m.name.length * 4.9 <= w - 8) s += `<text x="${f(L + w / 2 + 2)}" y="${f(yOf(z) + 3.5)}" text-anchor="middle" class="pl-bt">${esc(p.m.name)}</text>`;
    });
    const topY = yOf(p.zs[p.zs.length - 1]) - h / 2;
    p.badge = [L, topY - (p.copies - 1) * 5];
  });
  /* linie odległości */
  const mids = P.map(p => { const X = x0 + p.x * ppm, Y = yOf(p.zc); return { X, Y, mx: x0 + (X - x0) * .5, my: yRef + (Y - yRef) * .5 }; });
  if (Math.abs(mids[0].my - mids[1].my) < 22) { const d = (22 - Math.abs(mids[0].my - mids[1].my)) / 2, up = mids[0].my <= mids[1].my ? 0 : 1; mids[up].my -= d; mids[1 - up].my += d; }
  P.forEach((p, i) => {
    const m = mids[i], t = fmt(p.d) + " m", pw = 14 + t.length * 6.2, mx = Math.min(m.mx, m.X - 6 - pw / 2);
    s += `<line x1="${x0}" y1="${f(yRef)}" x2="${f(m.X)}" y2="${f(m.Y)}" stroke="${p.col}" class="pl-ln"/>`;
    s += `<circle cx="${f(m.X)}" cy="${f(m.Y)}" r="3.6" fill="${p.col}" class="pl-dot"/>`;
    s += `<rect x="${f(mx - pw / 2)}" y="${f(m.my - 9)}" width="${f(pw)}" height="18" rx="9" class="pl-pill" stroke="${p.col}"/><text x="${f(mx)}" y="${f(m.my + 4)}" text-anchor="middle" class="pl-sm pl-b" fill="${p.txt}">${t}</text>`;
  });
  /* plakietki opóźnień */
  const cy = P.map(p => yOf(p.zc) - (p.cap ? 6 : 0));
  if (Math.abs(cy[0] - cy[1]) < 46) { const d = (46 - Math.abs(cy[0] - cy[1])) / 2, up = cy[0] <= cy[1] ? 0 : 1; cy[up] -= d; cy[1 - up] += d; }
  P.forEach((p, i) => {
    const y = cy[i] - 12, on = p.delay > 0, lab = on ? `+${fmt(p.delay)} ms` : "0 ms";
    s += `<rect x="${chipX}" y="${f(y)}" width="${chipW}" height="24" rx="12" ${on ? `fill="${p.col}"` : ""} class="${on ? "pl-chip" : "pl-chip0"}"/>`;
    s += `<text x="${chipX + chipW / 2}" y="${f(y + 16)}" text-anchor="middle" class="pl-chipt ${on ? "on" + p.k : "off"}">${lab}</text>`;
    if (p.cap) s += `<text x="${chipX + chipW / 2}" y="${f(y + 38)}" text-anchor="middle" class="pl-t2 pl-xs">${esc(p.cap)}</text>`;
  });
  /* znaczki A / B */
  P.forEach(p => {
    const [bx, by] = p.badge;
    s += `<circle cx="${f(bx)}" cy="${f(by)}" r="10" fill="${p.col}" class="pl-bd"/><text x="${f(bx)}" y="${f(by + 4.2)}" text-anchor="middle" class="pl-bl on${p.k}">${p.k}</text>`;
  });
  s += `</svg>`;
  $("stage").innerHTML = s;
  $("stageNote").textContent = "Widok z boku w skali, skrzynie mają prawdziwe wymiary. Linie kończą się w środku skrzyni lub grupy skrzyń (droga po skosie).";
  const row = p => {
    const x = p.x, nm = (p.k === "A" && n > 1 ? n + "× " : "") + p.m.name;
    return whyRow(who(p.k, nm), p.delay > 0 ? `+${fmt(p.delay)} ms` : "0 ms", p.delay > 0 ? p.k.toLowerCase() : "n",
      `Po skosie ${fmt(p.d)} m · poziomo ${fmt(x)} m · środek ${fmt(p.zc + S.hr)} m nad podłogą`);
  };
  $("legend").innerHTML = P.map(row).join("");
}

function update(syncIn = true) {
  save();
  const r = compute(S);
  render(r);
  drawPlan(r);
  if (syncIn) syncInputs();
}

$("copy").addEventListener("click", async () => {
  const r = compute(S), ms = Math.max(r.delayA, r.delayB);
  const m = r.delayB > 0 ? r.mB : r.mA;
  const text = `${m.name}: ${fmt(ms)} ms`;
  const b = $("copy");
  try { await navigator.clipboard.writeText(text); b.textContent = "Skopiowano"; }
  catch (e) { b.textContent = text; }
  setTimeout(() => { b.textContent = "Kopiuj wartość"; }, 1600);
});

/* Karty */
function showTab(name) {
  ["calc", "plan", "db", "info"].forEach(t => {
    $("tab-" + t).hidden = t !== name;
    $("t-" + t).setAttribute("aria-selected", String(t === name));
  });
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));

/* Baza: lista modeli ze zdjęciami */
const chev = '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function modelHTML(m) {
  const specs = m.spec.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
  const pre = (m.presets || []).map(p => `<p><b>${p.label}</b> · czas przejścia ${fmt(p.L, 1)} ms<br>${p.info}</p>`).join("");
  const img = m.id && IMGS[m.id] ? `<div class="photo"><img alt="${esc(m.name)}" src="${IMGS[m.id].src}"></div>` : "";
  return `<details class="model"><summary><span><span class="n">${m.name}</span><br><span class="s">${m.line}</span></span>${chev}</summary>
    <div class="body">${img}<dl class="spec">${specs}</dl>${pre ? `<div class="presets"><h3>Presety procesora</h3>${pre}</div>` : ""}</div></details>`;
}
$("dbSubs").innerHTML = DB.subs.map(modelHTML).join("");
$("dbTops").innerHTML = DB.tops.concat(DB.infoOnly).map(modelHTML).join("");

/* Start */
fillSelect($("selA"), S.A);
fillSelect($("selB"), S.B);
syncModels();
update();

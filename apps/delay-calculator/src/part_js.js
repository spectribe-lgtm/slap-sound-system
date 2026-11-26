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
  const mC = modelOf(s.C), dC = dimsOf(mC), xC = s.xC, zC = (s.bC || 0) + dC[0] / 2, rC = zC - s.hr;
  return { tower, n, stack, x: xA, xA, xB, xC, zA, zB, zC, topA: baseA + hgtA, baseA, baseB, hA: rA, hB: rB, hC: rC,
           dA: Math.hypot(xA, rA), dB: Math.hypot(xB, rB), dC: Math.hypot(xC, rC), dims: { A: dA, B: dB, C: dC } };
}
function compute(s) {
  const mA = modelOf(s.A), mB = modelOf(s.B), mC = modelOf(s.C), useC = !!s.useC;
  const pick = (m, id) => m.presets.find(p => p.id === id) || m.presets[0];
  const pA = pick(mA, s.pA), pB = pick(mB, s.pB), pC = pick(mC, s.pC);
  const c = speedOfSound(s.T);
  const g = geom(s);
  const geo = (g.dA - g.dB) / c * 1000;                           // ms; <0: A bliżej, opóźnij A
  const custom = !!(mA.custom || mB.custom || (useC && mC.custom));
  const lib = custom ? 0 : pA.L - pB.L;                           // ms; >0: A później, opóźnij B
  const X = geo + lib;                                            // różnica A−B
  const act = useC ? ["A", "B", "C"] : ["A", "B"];
  const D = { A: g.dA, B: g.dB, C: g.dC }, P = { A: pA, B: pB, C: pC };
  const T = {};                                                   // czas dotarcia = droga / c + czas przejścia
  act.forEach(k => { T[k] = D[k] / c * 1000 + (custom ? 0 : P[k].L); });
  const Tm = Math.max(...act.map(k => T[k]));                     // opóźniamy do najpóźniejszego
  const dl = k => (act.includes(k) ? Math.max(0, Tm - T[k]) : 0);
  return { mA, mB, mC, pA, pB, pC, c, g, geo, lib, custom, X, useC, act, T, Tm, delayA: dl("A"), delayB: dl("B"), delayC: dl("C") };
}

/* ============ STAN ============ */
const KEY = "seeburg-delay-v4";
/* Przykład: wieża przy DJ-u. 2 × K Sub 1801 jedna na drugiej, na nich X8, front w jednej płaszczyźnie, ucho 1,6 m nad podłogą, 1,3 m poziomo. */
const defaults = { A:"ksub1801", pA:"100", B:"x8", pB:"hp", nA:2, arr:"stack", place:"tower", x:1.3, xB:2.5, hr:1.6, bA:0, bB:0, mode:"fs", fs:{ model:"ksub1801", type:"line", n:4, d:1, arc:90, fi:4, view:"spl" }, useC:false, C:"x6", pC:"hp", xC:4, bC:0, sm:{ A:{}, B:{}, C:{} }, T:20, ref:"dj" };
let S = Object.assign({}, defaults);
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
["A", "B", "C"].forEach(k => { S.sm[k] = S.sm[k] || {}; });
S.fs = Object.assign({ model:"ksub1801", type:"line", n:4, d:1, arc:90, fi:4, view:"spl" }, S.fs);
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
  const mC = modelOf(S.C);
  if (!mC.presets.some(p => p.id === S.pC)) S.pC = mC.presets[0].id;
  fillSeg($("segC"), "sc", mC.presets, S.pC, v => { S.pC = v; update(); });
  $("presetRowC").hidden = !!mC.custom;
  $("presetRowA").hidden = !!mA.custom;
  $("presetRowB").hidden = !!mB.custom;
}

/* Pola liczbowe: konfiguracja (odczyt, zapis, krok, zakres, miejsca po przecinku) */
const num = (key, step, lo, hi, d = 2) => ({ get: () => S[key], set: v => { S[key] = v; }, step, lo, hi, d });
const F = {
  nA: { get: () => S.nA, set: v => { S.nA = Math.min(4, Math.max(1, Math.round(v))); }, step: 1, lo: 1, hi: 4, d: 0 },
  fX: num("x", .05, .05, 200), fXB: num("xB", .05, .05, 200), fR: num("hr", .05, 0, 4),
  bA: num("bA", .05, 0, 10), bB: num("bB", .05, 0, 10), fsN: { get: () => S.fs.n, set: v => { S.fs.n = Math.min(12, Math.max(1, Math.round(v))); }, step: 1, lo: 1, hi: 12, d: 0 },
  fsD: { get: () => S.fs.d, set: v => { S.fs.d = v; }, step: .05, lo: .1, hi: 10, d: 2 },
  fsA: { get: () => S.fs.arc, set: v => { S.fs.arc = v; }, step: 5, lo: 10, hi: 170, d: 0 },
  fXC: num("xC", .05, .05, 200), bC: num("bC", .05, 0, 10),
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
  /* Enter (np. po wpisaniu z dalmierza w trybie klawiatury) przechodzi do następnego widocznego pola */
  inp.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const list = Array.from(document.querySelectorAll("#tab-calc .num input")).filter(i => i.offsetParent !== null);
    const nx = list[list.indexOf(inp) + 1];
    if (nx) nx.focus(); else inp.blur();
  });
});
document.querySelectorAll(".stepper button").forEach(b => b.addEventListener("click", () => {
  const f = F[b.dataset.step];
  let v = Number.isFinite(f.get()) ? f.get() : 0;
  v = Math.round((v + f.step * Number(b.dataset.dir)) * 1000) / 1000;
  f.set(Math.min(f.hi, Math.max(f.lo, v))); update();
}));
$("selA").addEventListener("change", e => { S.A = e.target.value; syncModels(); update(); });
$("selB").addEventListener("change", e => { S.B = e.target.value; syncModels(); update(); });
$("selC").addEventListener("change", e => { S.C = e.target.value; syncModels(); update(); });
document.querySelectorAll('#segUseC input').forEach(i => i.addEventListener("change", () => { S.useC = i.value === "1"; update(); }));
$("ref").addEventListener("change", e => { S.ref = e.target.value; update(); });
document.querySelectorAll('#segPlace input').forEach(i => i.addEventListener("change", () => { S.place = i.value; update(); }));
document.querySelectorAll('#segArr input').forEach(i => i.addEventListener("change", () => { S.arr = i.value; update(); }));

/* ============ WIDOK: wynik ============ */
function whyRow(title, right, rcls, text, extra = "") {
  return `<div class="why ${extra}"><div class="top"><span class="t">${title}</span><span class="r ${rcls}">${right}</span></div><p class="d">${text}</p></div>`;
}
const who = (k, name) => `<span class="badge ${k.toLowerCase()}">${k}</span>${esc(name)}`;
function multiRows(r, nm) {
  const g = r.g, ref = REF[S.ref][1];
  const rows = r.act.map(k => {
    const d = g["d" + k], dl = r["delay" + k], L = r.custom ? null : r["p" + k].L;
    return whyRow(who(k, nm[k]), dl > 0 ? `+${fmt(dl)} ms` : "0 ms", dl > 0 ? k.toLowerCase() : "n",
      `Droga do ${ref}: ${fmt(d)} m, czyli ${fmt(d / r.c * 1000)} ms. Czas przejścia ${L === null ? "pominięty" : fmt(L, 1) + " ms"}. Dotarcie po ${fmt(r.T[k])} ms. ` +
      (dl > 0 ? `Opóźnij o <b>${fmt(dl)} ms</b>.` : `To najpóźniejszy głośnik, zostaje <b>0 ms</b>.`));
  });
  return rows.join("") + whyRow("Zasada", "", "n", "Opóźnienie każdego głośnika = czas dotarcia najpóźniejszego minus jego własny. Czas dotarcia = droga / prędkość dźwięku + czas przejścia z tabeli Seeburga.", "final");
}
function render(r) {
  const g = r.g, ref = REF[S.ref];
  const nm = { A: (g.n > 1 ? g.n + "× " : "") + r.mA.name, B: r.mB.name };
  $("whoA").textContent = "A · " + nm.A;
  $("whoB").textContent = "B · " + nm.B;
  nm.C = r.mC.name; $("whoC").textContent = "C · " + nm.C;
  $("tileC").hidden = !r.useC; document.querySelector(".tiles").classList.toggle("three", r.useC);
  $("grpC").hidden = !r.useC; $("rowXC").hidden = $("rowBC").hidden = !r.useC;
  document.querySelectorAll('#segUseC input').forEach(i => { i.checked = i.value === (r.useC ? "1" : "0"); });
  $("kX").textContent = g.tower ? "Do frontu skrzyń" : "Do frontu A";
  $("kXB").textContent = "Do frontu B";
  $("ref").value = S.ref;
  document.querySelectorAll('#segPlace input').forEach(i => { i.checked = i.value === S.place; });
  document.querySelectorAll('#segArr input').forEach(i => { i.checked = i.value === S.arr; });
  ["rowXB", "rowBA", "rowBB"].forEach(id => { $(id).hidden = g.tower; }); $("arrRow").hidden = g.n < 2;
  $("placeNote").textContent = g.tower
    ? "B stoi na skrzyniach A, front wszystkich skrzyń leży w jednej płaszczyźnie. Aplikacja liczy drogi do środków skrzyń z ich wymiarów."
    : "Skrzynie stoją osobno: podajesz odległość każdej z nich i wysokość, na jakiej stoi jej spód.";

  const ok = [S.x, S.xB, S.hr, S.T].every(Number.isFinite) && g.dA > 0 && g.dB > 0 && (!r.useC || (Number.isFinite(S.xC) && Number.isFinite(S.bC) && g.dC > 0));
  $("cval").textContent = fmt(r.c, 1) + " m/s";
  if (!ok) {
    ["valA", "valB", "valC"].forEach(i => $(i).textContent = "—");
    $("dsp").textContent = "Wpisz odległości i temperaturę."; $("warn").hidden = true; $("why").innerHTML = ""; return;
  }
  const show = (k, ms) => {
    const on = ms > 0;
    $("val" + k).innerHTML = fmt(ms) + "<small>ms</small>";
    $("tile" + k).classList.toggle("on", on);
    $("hint" + k).textContent = on ? "ustaw to opóźnienie" : "bez opóźnienia";
  };
  show("A", r.delayA); show("B", r.delayB); if (r.useC) show("C", r.delayC);
  const ms = Math.max(r.delayA, r.delayB, r.delayC);
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
  $("why").innerHTML = r.useC ? multiRows(r, nm) + spreadRow : setupRow + geoRow + libRow + finalRow + procRow + spreadRow;

  const fc = r.pA.lpf || r.pB.lpf || 100, loss = 20 * Math.log10(Math.abs(Math.cos(Math.PI * fc * Math.abs(r.X) / 1000)));
  const w = $("warn");
  const bad = false;
  if (bad) { w.hidden = false; w.textContent = "Odległość po skosie nie może być mniejsza niż wysokość. Sprawdź wpisane wartości."; }
  else if (Math.abs(r.X) >= 8) { w.hidden = false; w.textContent = "Duża różnica. Sprawdź, czy odległości są wpisane poprawnie."; }
  else w.hidden = true;
  const est = [r.pA.est && "A", r.pB.est && "B", r.useC && r.pC.est && "C"].filter(Boolean);
  if (est.length && !r.custom) { w.hidden = false; w.textContent = `Preset ${est.join(" i ")} nie ma wpisu w tabeli Time-Alignment Seeburga. Przyjęto czas z presetu HP (3,2 ms), sprawdź pomiarem.`; }
  const unk = [r.mA.dimsUnknown && "A", r.mB.dimsUnknown && "B", r.useC && r.mC.dimsUnknown && "C"].filter(Boolean);
  if (unk.length) { w.hidden = false; w.textContent = (w.hidden || !w.textContent ? "" : w.textContent + " ") + `Brak wymiarów skrzyni ${unk.join(" i ")} w źródłach, do rysunku i wieży użyto 60 × 60 × 50 cm.`; }
  const lpfKnown = r.pA.lpf || r.pB.lpf;
  $("phaseNote").textContent = Math.abs(r.X) < 0.05
    ? "Źródła są już wyrównane."
    : (lpfKnown ? `Bez korekty suma obu głośników traci około ${fmt(Math.abs(loss), 1)} dB przy ${fc} Hz (podział LR4). Różnice poniżej 1 ms mają według Seeburga niewielki wpływ.`
                : "Różnice poniżej 1 ms mają według Seeburga niewielki wpływ.");
}

/* ============ WIDOK: rysunek układu (widok z boku, w skali) ============ */
function spreadY(arr, key, gap) {            // rozsuwa nakładające się etykiety w pionie
  const idx = arr.map((_, i) => i).sort((a, b) => arr[a][key] - arr[b][key]);
  for (let pass = 0; pass < 3; pass++) for (let i = 1; i < idx.length; i++) {
    const a = arr[idx[i - 1]], b = arr[idx[i]], d = gap - (b[key] - a[key]);
    if (d > 0) { a[key] -= d / 2; b[key] += d / 2; }
  }
}
let PL = null;
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
  if (r.useC) P.push({ k: "C", m: r.mC, col: "var(--c)", txt: "var(--c-text)", x: g.xC, depth: g.dims.C[2], h: g.dims.C[0], zs: [g.hC], zc: g.hC, copies: 1, delay: r.delayC, d: g.dC, cap: "" });
  let zTop = 0.2, zBot = -0.35;
  P.forEach(p => p.zs.forEach(z => { zTop = Math.max(zTop, z + p.h / 2); zBot = Math.min(zBot, z - p.h / 2); }));
  zBot = Math.min(zBot, -S.hr);
  const ghost = (copies - 1) * 5;
  const xMax = Math.max(...P.map(p => p.x + p.depth));
  const ppm = Math.min((W - padL - refW - chipW - padR - gap - ghost) / xMax, 330 / (zTop - zBot), 240);
  const x0 = padL + refW, yOf = z => padT + (zTop - z) * ppm, yRef = yOf(0), yF = yOf(-S.hr);
  const H = yOf(zBot) + 34;
  PL = { ppm, W };
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
      s += `<rect x="${f(L)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="7" fill="url(#bx)" filter="url(#sh)" class="pl-box pl-drag" data-drag="${p.k}" data-tip="${p.k}"/>`;
      s += `<rect x="${f(L + 2.5)}" y="${f(y + 5)}" width="3" height="${f(Math.max(h - 10, 4))}" rx="1.5" fill="#fff" opacity=".30" class="pl-nohit"/>`;
      if (w >= 40 && h >= 20 && p.m.name.length * 4.9 <= w - 8) s += `<text x="${f(L + w / 2 + 2)}" y="${f(yOf(z) + 3.5)}" text-anchor="middle" class="pl-bt">${esc(p.m.name)}</text>`;
    });
    const topY = yOf(p.zs[p.zs.length - 1]) - h / 2;
    p.badge = [L, topY - (p.copies - 1) * 5];
  });
  /* linie odległości */
  const mids = P.map(p => { const X = x0 + p.x * ppm, Y = yOf(p.zc); return { X, Y, mx: x0 + (X - x0) * .5, my: yRef + (Y - yRef) * .5 }; });
  spreadY(mids, "my", 22);
  P.forEach((p, i) => {
    const m = mids[i], t = fmt(p.d) + " m", pw = 14 + t.length * 6.2, mx = Math.min(m.mx, m.X - 6 - pw / 2);
    s += `<line x1="${x0}" y1="${f(yRef)}" x2="${f(m.X)}" y2="${f(m.Y)}" stroke="${p.col}" class="pl-ln"/>`;
    s += `<circle cx="${f(m.X)}" cy="${f(m.Y)}" r="3.6" fill="${p.col}" class="pl-dot"/>`;
    s += `<rect x="${f(mx - pw / 2)}" y="${f(m.my - 9)}" width="${f(pw)}" height="18" rx="9" class="pl-pill" stroke="${p.col}"/><text x="${f(mx)}" y="${f(m.my + 4)}" text-anchor="middle" class="pl-sm pl-b" fill="${p.txt}">${t}</text>`;
  });
  /* plakietki opóźnień */
  const cy = P.map(p => ({ v: yOf(p.zc) - (p.cap ? 6 : 0) }));
  spreadY(cy, "v", 46);
  P.forEach((p, i) => {
    const y = cy[i].v - 12, on = p.delay > 0, lab = on ? `+${fmt(p.delay)} ms` : "0 ms";
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
  $("stageNote").textContent = "Widok z boku w skali. Przeciągnij skrzynię palcem lub myszą, żeby zmienić odległość (i wysokość, gdy stoi osobno). Przytrzymaj skrzynię, żeby zobaczyć opis.";
  const row = p => {
    const nm = (p.k === "A" && n > 1 ? n + "× " : "") + p.m.name;
    return `<div class="why tipRow" data-tip="${p.k}"><div class="top"><span class="t">${who(p.k, nm)}</span><span class="r ${p.delay > 0 ? p.k.toLowerCase() : "n"}">${p.delay > 0 ? `+${fmt(p.delay)} ms` : "0 ms"}</span></div></div>`;
  };
  $("legend").innerHTML = P.map(row).join("");
}

function update(syncIn = true) {
  save();
  const r = compute(S);
  render(r);
  drawPlan(r);
  renderSmaart();
  fsRender();
  if (syncIn) syncInputs();
}

/* Karty */
function showTab(name) {
  ["calc", "plan", "sm", "db", "info"].forEach(t => {
    $("tab-" + t).hidden = t !== name;
    $("t-" + t).setAttribute("aria-selected", String(t === name));
  });
  window.scrollTo(0, 0);
  if (name === "calc") fsRender();
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


/* ============ SMAART: zmierzone czasy dotarcia ============ */
const SPK = ["A", "B", "C"];
function smaartBuild() {
  const chev2 = '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $("smBody").innerHTML = SPK.map(k => `<div class="group sm-card" id="smc${k}">
    <div class="row"><span class="k"><span class="badge ${k.toLowerCase()}">${k}</span><span id="smn${k}"></span></span><span class="v mono" id="smcalc${k}"></span></div>
    <div class="row"><label class="k" for="smT${k}">Czas dotarcia (Delay Finder)</label><div class="num"><input id="smT${k}" inputmode="decimal" autocomplete="off" placeholder="ms"><span class="u">ms</span></div></div>
    <div class="row"><label class="k" for="smH${k}">Koherencja</label><div class="num"><input id="smH${k}" inputmode="decimal" autocomplete="off" placeholder="%"><span class="u">%</span></div></div>
    <div class="row"><label class="k" for="smP${k}">Polaryzacja</label><label class="pick"><select id="smP${k}"><option value="">nie sprawdzono</option><option value="+">zgodna (+)</option><option value="-">odwrócona (−)</option></select>${chev2}</label></div>
    <div class="row block"><input class="txt" id="smN${k}" autocomplete="off" placeholder="Notatka: pozycja mikrofonu, filtr, uwagi"></div></div>`).join("");
  SPK.forEach(k => {
    const bind = (id, key, fix) => { const el = $(id); el.value = S.sm[k][key] || ""; el.addEventListener(fix ? "change" : "input", () => { S.sm[k][key] = el.value; save(); renderSmaart(); }); };
    bind("smT" + k, "t"); bind("smH" + k, "h"); bind("smP" + k, "p", true); bind("smN" + k, "n");
  });
}
function renderSmaart() {
  if (!$("smBody").firstChild) return;
  const r = compute(S);
  SPK.forEach(k => {
    const on = r.act.includes(k); $("smc" + k).hidden = !on;
    if (on) { $("smn" + k).textContent = r["m" + k].name; $("smcalc" + k).textContent = "obliczone " + fmt(r["delay" + k]) + " ms"; }
  });
  const meas = r.act.filter(k => Number.isFinite(parse(S.sm[k].t || "")));
  const out = $("smOut");
  if (meas.length < 2) { out.innerHTML = whyRow("Brak porównania", "", "n", "Wpisz czas dotarcia co najmniej dwóch głośników. Każdy mierz osobno, przy opóźnieniu 0 ms w procesorze, z tym samym sygnałem odniesienia i tym samym mikrofonem."); return; }
  const M = {}; meas.forEach(k => { M[k] = parse(S.sm[k].t); });
  const Mm = Math.max(...meas.map(k => M[k]));
  const fc = r.pA.lpf || r.pB.lpf || (r.useC && r.pC.lpf) || 100;
  let html = "", copy = [];
  meas.forEach(k => {
    const md = Mm - M[k], calc = r["delay" + k], diff = md - calc, deg = 360 * fc * diff / 1000;
    const status = Math.abs(diff) < 0.1 ? "zgodne z obliczeniem" : Math.abs(diff) < 0.5 ? "drobna różnica" : "duża różnica: sprawdź pomiar i odległości";
    const coh = parse(S.sm[k].h || ""), warn = [];
    if (S.sm[k].p === "-") warn.push("polaryzacja odwrócona");
    if (Number.isFinite(coh) && coh < 80) warn.push(`koherencja ${fmt(coh, 0)} % (orientacyjnie za niska, pomiar niepewny)`);
    copy.push(`${k} ${r["m" + k].name}: ${fmt(md)} ms`);
    html += whyRow(who(k, r["m" + k].name), `${fmt(md)} ms`, md > 0 ? k.toLowerCase() : "n",
      `Z pomiaru: ${fmt(md)} ms. Obliczone: ${fmt(calc)} ms. Różnica ${sgn(diff)} ms, czyli około ${sgn(deg, 0)}° przy ${fc} Hz. <b>${status}.</b>` + (warn.length ? ` Uwaga: ${warn.join(", ")}.` : "") + (S.sm[k].n ? ` Notatka: ${esc(S.sm[k].n)}` : ""));
  });
  if (meas.length < r.act.length) html += whyRow("Pomiar niepełny", "", "n", "Nie wszystkie aktywne głośniki mają zmierzony czas, więc „najpóźniejszy” liczy się tylko z tych, które wpisano.");
  out.innerHTML = html;
  $("smCopy").onclick = async () => { const b = $("smCopy"), t = copy.join(" · "); try { await navigator.clipboard.writeText(t); b.textContent = "Skopiowano"; } catch (e) { b.textContent = t; } setTimeout(() => { b.textContent = "Kopiuj opóźnienia z pomiaru"; }, 1600); };
}
smaartBuild();

/* ============ Przeciąganie skrzyń i opisy po przytrzymaniu ============ */
function tipFor(k) {
  const r = compute(S), g = r.g;
  if (!r["m" + k] || (k === "C" && !r.useC)) return "";
  const m = r["m" + k], p = r["p" + k], dl = r["delay" + k];
  const name = (k === "A" && g.n > 1 ? g.n + "× " : "") + m.name;
  return `<b>${k} · ${esc(name)}</b><br>poziomo ${fmt(g["x" + k])} m · po skosie ${fmt(g["d" + k])} m<br>środek ${fmt(g["z" + k])} m nad podłogą<br>preset ${esc(p.label)}, czas przejścia ${r.custom ? "—" : fmt(p.L, 1) + " ms"}<br>opóźnienie <b>${fmt(dl)} ms</b>`;
}
const tipEl = document.createElement("div"); tipEl.id = "tip"; tipEl.hidden = true; document.body.appendChild(tipEl);
let tipTimer = null, tipHide = null, drag = null;
function hideTip() { clearTimeout(tipTimer); clearTimeout(tipHide); tipEl.hidden = true; }
function showTip(el, key) {
  const h = tipFor(key); if (!h) return;
  tipEl.innerHTML = h; tipEl.hidden = false;
  const b = el.getBoundingClientRect(), w = tipEl.offsetWidth, hh = tipEl.offsetHeight;
  const left = Math.min(Math.max(8, b.left + b.width / 2 - w / 2), innerWidth - w - 8);
  let top = b.top - hh - 12; if (top < 60) top = b.bottom + 12;
  tipEl.style.left = left + "px"; tipEl.style.top = top + "px";
}
function attachTip(root) {
  let sx = 0, sy = 0;
  root.addEventListener("contextmenu", e => e.preventDefault());
  root.addEventListener("pointerdown", e => {
    const el = e.target.closest("[data-tip]"); if (!el) return;
    sx = e.clientX; sy = e.clientY; hideTip();
    tipTimer = setTimeout(() => showTip(el, el.dataset.tip), 450);
  });
  root.addEventListener("pointermove", e => {
    if (e.pointerType === "mouse" && !drag && e.buttons === 0) return;
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > 8) clearTimeout(tipTimer);
  });
  ["pointerup", "pointercancel"].forEach(t => root.addEventListener(t, () => { clearTimeout(tipTimer); if (!tipEl.hidden) tipHide = setTimeout(hideTip, 1600); }));
  root.addEventListener("pointerover", e => {            // myszka: opis po najechaniu
    if (e.pointerType !== "mouse" || drag) return;
    const el = e.target.closest("[data-tip]"); if (!el) return;
    clearTimeout(tipTimer); tipTimer = setTimeout(() => showTip(el, el.dataset.tip), 400);
  });
  root.addEventListener("pointerout", e => { if (e.pointerType === "mouse" && !drag && e.buttons === 0) hideTip(); });
}
attachTip($("stage")); attachTip($("legend"));

const stageEl = $("stage");
const snap = v => Math.round(v / 0.05) * 0.05;
stageEl.addEventListener("touchstart", e => { if (e.target.closest("[data-drag]")) e.preventDefault(); }, { passive: false });
stageEl.addEventListener("pointerdown", e => {
  const el = e.target.closest("[data-drag]"); if (!el || !PL) return;
  const k = el.dataset.drag, tower = S.place === "tower";
  const xf = k === "C" ? "xC" : (k === "A" || tower ? "x" : "xB");
  const bf = k === "C" ? "bC" : (tower ? null : (k === "A" ? "bA" : "bB"));
  const svg = stageEl.querySelector("svg"), sc = PL.W / svg.getBoundingClientRect().width;
  drag = { id: e.pointerId, xf, bf, sc, x0: e.clientX, y0: e.clientY, lx: e.clientX, ly: e.clientY, moved: false, rx: S[xf], rb: bf ? S[bf] : 0 };
  try { stageEl.setPointerCapture(e.pointerId); } catch (err) {}
});
stageEl.addEventListener("pointermove", e => {
  if (!drag || e.pointerId !== drag.id) return;
  if (!drag.moved) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 7) return;
    drag.moved = true; hideTip(); drag.lx = e.clientX; drag.ly = e.clientY;
  }
  const dx = (e.clientX - drag.lx) * drag.sc / PL.ppm, dy = (e.clientY - drag.ly) * drag.sc / PL.ppm;
  drag.lx = e.clientX; drag.ly = e.clientY;
  drag.rx = Math.min(200, Math.max(0.05, drag.rx + dx)); S[drag.xf] = Math.round(snap(drag.rx) * 100) / 100;
  if (drag.bf) { drag.rb = Math.min(10, Math.max(0, drag.rb - dy)); S[drag.bf] = Math.round(snap(drag.rb) * 100) / 100; }
  update();
});
["pointerup", "pointercancel", "lostpointercapture"].forEach(t => stageEl.addEventListener(t, () => { drag = null; }));


/* ============ FRONT SYSTEM: układ subwooferów i pole dźwięku ============ */
const FSF = [30, 40, 50, 60, 80, 100];
const FSTYPE = {
  line: ["Linia", "Suby obok siebie, wszystkie z tym samym sygnałem i bez opóźnień."],
  arc: ["Łuk", "Suby w prostej linii z opóźnieniami, jakby stały na łuku o podanym kącie. Rozszerza wiązkę. Opóźnione są suby z brzegów."],
  end: ["End-fire", "Suby jeden za drugim. Każdy bliższy publiczności jest opóźniony o odstęp / c, więc z przodu sygnały się sumują, a z tyłu znoszą. Zalecany odstęp ¼ fali."],
  grad: ["Gradient (kardioida)", "Dwa suby jeden za drugim: tylny opóźniony o odstęp / c i z odwróconą polaryzacją. Wycisza dźwięk za układem. Zalecany odstęp ¼ fali."]
};
const FSX = [-20, 20], FSY = [-10, 30], GN = 160;               // zakres mapy w metrach (x, y) i rozdzielczość siatki
let fsField = null, fsRaf = null;
function fsSources() {
  const f = S.fs, c = speedOfSound(S.T), d = f.d;
  let n = Math.max(1, Math.min(12, Math.round(f.n))); const out = [];
  if (f.type === "grad") n = 2;
  if (f.type === "line" || f.type === "arc") {
    const half = (n - 1) / 2, th = Math.min(170, Math.max(10, f.arc)) * Math.PI / 180;
    const R = f.type === "arc" && n > 1 ? (n - 1) * d / (2 * Math.sin(th / 2)) : 0;
    for (let i = 0; i < n; i++) {
      const x = (i - half) * d; let t = 0;
      if (R) t = R * (1 - Math.cos(Math.asin(Math.min(1, Math.abs(x) / R)))) / c * 1000;
      out.push({ x, y: 0, t, pol: 1 });
    }
  } else if (f.type === "end") {
    for (let i = 0; i < n; i++) out.push({ x: 0, y: (i - (n - 1)) * d, t: i * d / c * 1000, pol: 1 });
  } else { out.push({ x: 0, y: 0, t: 0, pol: 1 }, { x: 0, y: -d, t: d / c * 1000, pol: -1 }); }
  return { src: out, c, n };
}
function fsCompute() {
  const { src, c } = fsSources(), f = FSF[S.fs.fi], k = 2 * Math.PI * f / c, w = 2 * Math.PI * f;
  const re = new Float32Array(GN * GN), im = new Float32Array(GN * GN);
  for (let j = 0; j < GN; j++) {
    const Y = FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / GN;
    for (let i = 0; i < GN; i++) {
      const X = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / GN;
      let a = 0, b = 0;
      for (const s of src) {
        const r = Math.max(0.3, Math.hypot(X - s.x, Y - s.y)), ph = -k * r - w * s.t / 1000, g = s.pol / r;
        a += g * Math.cos(ph); b += g * Math.sin(ph);
      }
      re[j * GN + i] = a; im[j * GN + i] = b;
    }
  }
  let mx = 1e-9;
  for (let j = 0; j < GN; j++) for (let i = 0; i < GN; i++) {
    const X = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / GN, Y = FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / GN;
    if (src.every(s => Math.hypot(X - s.x, Y - s.y) > 3)) mx = Math.max(mx, Math.hypot(re[j * GN + i], im[j * GN + i]));
  }
  fsField = { re, im, mx, src, f, c };
}
const CMAP = [[0, [11, 26, 58]], [.25, [29, 79, 156]], [.5, [41, 182, 168]], [.75, [232, 212, 77]], [1, [232, 68, 47]]];
function cmap(t) {
  t = Math.min(1, Math.max(0, t));
  for (let i = 1; i < CMAP.length; i++) if (t <= CMAP[i][0]) {
    const [t0, c0] = CMAP[i - 1], [t1, c1] = CMAP[i], u = (t - t0) / (t1 - t0);
    return [c0[0] + (c1[0] - c0[0]) * u, c0[1] + (c1[1] - c0[1]) * u, c0[2] + (c1[2] - c0[2]) * u];
  }
  return CMAP[CMAP.length - 1][1];
}
const fsOff = document.createElement("canvas"); fsOff.width = fsOff.height = GN;
function fsDraw(tms) {
  const cv = $("fsCv"); if (!cv || !fsField) return;
  const ctx = cv.getContext("2d"), o = fsOff.getContext("2d"), img = o.createImageData(GN, GN), F = fsField, wave = S.fs.view === "wave";
  const ph = wave ? (tms / 1000) * 2 * Math.PI * 0.6 : 0, cp = Math.cos(ph), sp = Math.sin(ph);
  for (let j = 0; j < GN; j++) {
    const Y = FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / GN;
    for (let i = 0; i < GN; i++) {
      const p = j * GN + i, a = F.re[p], b = F.im[p];
      let col;
      if (wave) {                                                     // chwilowe ciśnienie pomnożone przez odległość, żeby było widać falę daleko
        const X = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / GN, rr = Math.max(1, Math.hypot(X, Y + 2));
        const v = (a * cp - b * sp) * rr / (F.mx * 12), m = Math.min(1, Math.abs(v) ** 0.7);
        col = v >= 0 ? [20 + 215 * m, 22 + 50 * m, 28 + 20 * m] : [20 + 10 * m, 22 + 110 * m, 28 + 215 * m];
      } else {
        const lv = 20 * Math.log10(Math.hypot(a, b) / F.mx + 1e-9);            // 0 dB = maksimum dalej niż 3 m od subów
        const q = Math.round(lv / 3) * 3;                                      // pasma co 3 dB jak w S.A.D.
        col = cmap((q + 36) / 36);
      }
      const q4 = p * 4; img.data[q4] = col[0]; img.data[q4 + 1] = col[1]; img.data[q4 + 2] = col[2]; img.data[q4 + 3] = 255;
    }
  }
  o.putImageData(img, 0, 0);
  const W = cv.width, H = cv.height;
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
  ctx.drawImage(fsOff, 0, 0, W, H);
  const px = x => (x - FSX[0]) / (FSX[1] - FSX[0]) * W, py = y => (FSY[1] - y) / (FSY[1] - FSY[0]) * H;
  ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 1; ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = "20px -apple-system, sans-serif";
  for (let x = -20; x <= 20; x += 10) { ctx.beginPath(); ctx.moveTo(px(x), 0); ctx.lineTo(px(x), H); ctx.stroke(); }
  for (let y = -10; y <= 30; y += 10) { ctx.beginPath(); ctx.moveTo(0, py(y)); ctx.lineTo(W, py(y)); ctx.stroke(); }
  for (let y = 10; y <= 30; y += 10) ctx.fillText(y + " m", 8, py(y) - 6);
  const m = modelOf(S.fs.model), dm = dimsOf(m), ppm = W / (FSX[1] - FSX[0]);
  F.src.forEach((s, i) => {
    const w = Math.max(10, dm[1] * ppm), h = Math.max(10, dm[2] * ppm), X = px(s.x), Y = py(s.y);
    ctx.fillStyle = s.pol < 0 ? "#7d2f2f" : "#3a3d44"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
    ctx.fillRect(X - w / 2, Y - h / 2, w, h); ctx.strokeRect(X - w / 2, Y - h / 2, w, h);
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px -apple-system, sans-serif"; ctx.textAlign = "center"; ctx.fillText(String(i + 1), X, Y + 6); ctx.textAlign = "start";
  });
  ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "20px -apple-system, sans-serif"; ctx.fillText("publiczność ↑", W - 150, 28);
}
function fsLoop(t) {
  fsRaf = null;
  if (S.mode !== "fs" || S.fs.view !== "wave" || $("tab-calc").hidden || document.hidden) return;
  fsDraw(t); fsRaf = requestAnimationFrame(fsLoop);
}
function fsRender() {
  document.querySelectorAll('#segMode input').forEach(i => { i.checked = i.value === S.mode; });
  $("dj").hidden = S.mode !== "fs" ? false : true; $("fs").hidden = S.mode !== "fs";
  if (S.mode !== "fs") return;
  const f = S.fs, { src, c, n } = fsSources(), fq = FSF[f.fi], lam = c / fq;
  document.querySelectorAll('#segFSType input').forEach(i => { i.checked = i.value === f.type; });
  document.querySelectorAll('#segFSView input').forEach(i => { i.checked = i.value === f.view; });
  $("fsF").value = f.fi; $("fsFval").textContent = fq + " Hz (λ = " + fmt(lam) + " m)";
  $("rowFSA").hidden = f.type !== "arc"; $("rowFSN").hidden = f.type === "grad";
  const quarter = f.type === "end" || f.type === "grad";
  $("fsAuto").textContent = `Ustaw odstęp ${quarter ? "¼" : "½"} fali (${fmt(lam / (quarter ? 4 : 2))} m)`;
  $("fsNote").textContent = FSTYPE[f.type][1];
  const m = modelOf(f.model);
  fsCompute(); fsDraw(performance.now());
  $("fsMapNote").textContent = f.view === "wave"
    ? "Animacja pokazuje chwilowe ciśnienie na wybranej częstotliwości (czerwony: nadciśnienie, niebieski: podciśnienie), spowolniona. Widać, dokąd fala się sumuje, a gdzie się znosi."
    : "Pasma co 3 dB. 0 dB to najgłośniejsze miejsce dalej niż 3 m od subów, ciemny niebieski to −36 dB i mniej. Dla każdej częstotliwości mapa liczy się od nowa.";
  const rows = src.map((s, i) => whyRow(`<span class="badge" style="background:var(--accent)">${i + 1}</span>${esc(m.name)}`,
    `${fmt(s.t)} ms${s.pol < 0 ? " · polaryzacja −" : ""}`, s.t > 0 || s.pol < 0 ? "a" : "n",
    `Pozycja: ${fmt(s.x)} m w bok, ${fmt(s.y)} m w głąb (0 = front suba najbliższego publiczności).`));
  const d = f.d, sum = whyRow("Odstęp", `${fmt(d)} m`, "n", `To ${fmt(d / lam, 2)} długości fali przy ${fq} Hz (λ = ${fmt(lam)} m, c = ${fmt(c, 1)} m/s). ${quarter ? "Dla end-fire i gradientu optimum to ¼ λ." : "Dla układów poziomych typowo ½ λ."}`, "final");
  $("fsOut").innerHTML = sum + rows.join("");
  if (!fsRaf && f.view === "wave") fsRaf = requestAnimationFrame(fsLoop);
}
document.querySelectorAll('#segMode input').forEach(i => i.addEventListener("change", () => { S.mode = i.value; update(); }));
document.querySelectorAll('#segFSType input').forEach(i => i.addEventListener("change", () => { S.fs.type = i.value; if (i.value === "grad") S.fs.n = 2; update(); }));
document.querySelectorAll('#segFSView input').forEach(i => i.addEventListener("change", () => { S.fs.view = i.value; update(); }));
$("fsF").addEventListener("input", e => { S.fs.fi = Number(e.target.value); update(); });
$("fsAuto").addEventListener("click", () => {
  const lam = speedOfSound(S.T) / FSF[S.fs.fi], q = S.fs.type === "end" || S.fs.type === "grad";
  S.fs.d = Math.round(lam / (q ? 4 : 2) * 100) / 100; update();
});
$("selFS").addEventListener("change", e => { S.fs.model = e.target.value; update(); });
$("selFS").innerHTML = DB.subs.map(m => `<option value="${m.id}">${esc(m.name)}</option>`).join(""); $("selFS").value = S.fs.model;

/* Start */
fillSelect($("selA"), S.A);
fillSelect($("selB"), S.B);
fillSelect($("selC"), S.C);
syncModels();
update();

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
  const mA = modelOf(s.A), mB = modelOf(s.B), mC = modelOf(s.C), useC = false;
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
const defaults = { A:"ksub1801", pA:"100", B:"x8", pB:"hp", nA:2, arr:"stack", place:"tower", x:1.3, xB:2.5, hr:1.6, bA:0, bB:0, mode:"fs", fs:{ A:"ksub1801", pA:"100", B:"x8", pB:"hp", C:"x6", pC:"hp", useC:false, dA:12, dB:12, dC:6, type:"line", n:4, d:1, arc:90, fi:4, view:"spl" }, useC:false, C:"x6", pC:"hp", xC:4, bC:0, sm:{ A:{}, B:{}, C:{} }, T:20, ref:"dj" };
let S = Object.assign({}, defaults);
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
["A", "B", "C"].forEach(k => { S.sm[k] = S.sm[k] || {}; });
S.fs = Object.assign({ A:"ksub1801", pA:"100", B:"x8", pB:"hp", C:"x6", pC:"hp", useC:false, dA:12, dB:12, dC:6, type:"line", n:4, d:1, arc:90, fi:4, view:"spl" }, S.fs);
S.fs.room = Object.assign({ w1:false, w2:false, w3:false, w4:false, ce:false, x0:-12, x1:12, y1:-4, y2:24, hc:8, R:0.8 }, S.fs.room);
S.fs.sp = S.fs.sp || "lin"; S.fs.q = S.fs.q || 2;
S.useC = false;
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const $ = id => document.getElementById(id);
const fmt = (n, d = 2) => n.toFixed(d).replace(".", ",").replace(/^-0([,.]0+)?$/, "0$1");
const sgn = (n, d = 2) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
const REF = { dj: ["Miejsce DJ-a", "miejsca DJ-a"], foh: ["FOH", "FOH"], other: ["Inny punkt", "punktu odniesienia"] };
const CHEV = '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function spkHTML(pfx, k) {
  const lc = k.toLowerCase(), lab = pfx === "f" && k === "A" ? "Sub array" : "Głośnik";
  return `<div class="spkblk spk-${lc}" id="${pfx}blk${k}"${pfx === "f" && k === "C" ? " hidden" : ""}>
    <div class="row"><span class="k"><span class="badge ${lc}">${k}</span>${lab}</span>
      <label class="pick"><select id="${pfx}sel${k}" aria-label="Model głośnika ${k}"></select>${CHEV}</label></div>
    <div class="row block" id="${pfx}presetRow${k}"><div class="seg sq" id="${pfx}seg${k}" role="radiogroup" aria-label="Preset głośnika ${k}"></div></div></div>`;
}
document.getElementById("djSpk").innerHTML = spkHTML("", "A") + spkHTML("", "B");
document.getElementById("fsSpk").innerHTML = spkHTML("f", "A") + spkHTML("f", "B") +
  `<div class="row block spkuse spk-c"><span class="k" style="margin-bottom:8px"><span class="badge c">C</span>Trzeci głośnik</span>
    <div class="seg" id="segUseC" role="radiogroup" aria-label="Głośnik C"><label><input type="radio" name="usec" value="0"><span>Wyłączony</span></label><label><input type="radio" name="usec" value="1"><span>Włączony</span></label></div></div>` + spkHTML("f", "C");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ============ WIDOK: kontrolki ============ */
function fillSelect(el, val, subsOnly) {
  const opt = m => `<option value="${m.id}">${esc(m.name)}</option>`;
  if (subsOnly) { el.innerHTML = DB.subs.map(opt).join(""); el.value = val; return; }
  el.innerHTML = `<optgroup label="Suby">${DB.subs.map(opt).join("")}</optgroup>` +
                 `<optgroup label="Topy i koaksjale">${DB.tops.map(opt).join("")}</optgroup>` +
                 `<optgroup label="Inne">${opt(DB.other)}</optgroup>`;
  el.value = val;
}
function fillSeg(el, name, presets, val, onPick) {
  el.innerHTML = presets.map(p => `<label><input type="radio" name="${name}" value="${p.id}"${p.id === val ? " checked" : ""}><span>${esc(p.label)}</span></label>`).join("");
  el.querySelectorAll("input").forEach(i => i.addEventListener("change", () => onPick(i.value)));
}
const holder = pfx => (pfx === "f" ? S.fs : S);
function syncSpk(pfx, k) {
  const h = holder(pfx), m = modelOf(h[k]), pk = "p" + k;
  if (!m.presets.some(p => p.id === h[pk])) h[pk] = m.presets[0].id;
  fillSeg($(pfx + "seg" + k), pfx + "s" + k, m.presets, h[pk], v => { h[pk] = v; update(); });
  $(pfx + "presetRow" + k).hidden = !!m.custom;
}
function syncModels() { ["A", "B"].forEach(k => syncSpk("", k)); ["A", "B", "C"].forEach(k => syncSpk("f", k)); }

/* Pola liczbowe: konfiguracja (odczyt, zapis, krok, zakres, miejsca po przecinku) */
const num = (key, step, lo, hi, d = 2) => ({ get: () => S[key], set: v => { S[key] = v; }, step, lo, hi, d });
const F = {
  nA: { get: () => S.nA, set: v => { S.nA = Math.min(4, Math.max(1, Math.round(v))); }, step: 1, lo: 1, hi: 4, d: 0 },
  fX: num("x", .05, .05, 200), fXB: num("xB", .05, .05, 200), fR: num("hr", .05, 0, 4),
  bA: num("bA", .05, 0, 10), bB: num("bB", .05, 0, 10),
  fsDA: { get: () => S.fs.dA, set: v => { S.fs.dA = v; }, step: .1, lo: .1, hi: 500, d: 2 },
  fsDB: { get: () => S.fs.dB, set: v => { S.fs.dB = v; }, step: .1, lo: .1, hi: 500, d: 2 },
  fsDC: { get: () => S.fs.dC, set: v => { S.fs.dC = v; }, step: .1, lo: .1, hi: 500, d: 2 },
  fsN: { get: () => S.fs.n, set: v => { S.fs.n = Math.min(12, Math.max(1, Math.round(v))); }, step: 1, lo: 1, hi: 12, d: 0 },
  fsD: { get: () => S.fs.d, set: v => { S.fs.d = v; }, step: .05, lo: .1, hi: 10, d: 2 },
  fsA: { get: () => S.fs.arc, set: v => { S.fs.arc = v; }, step: 5, lo: 10, hi: 170, d: 0 },
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
["A", "B", "C"].forEach(k => $("fsel" + k).addEventListener("change", e => { S.fs[k] = e.target.value; syncModels(); update(); }));
document.querySelectorAll('#segUseC input').forEach(i => i.addEventListener("change", () => { S.fs.useC = i.value === "1"; update(); }));
$("fref").addEventListener("change", e => { S.ref = e.target.value; update(); });
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
  $("kX").textContent = g.tower ? "Do frontu skrzyń" : "Do frontu A";
  $("kXB").textContent = "Do frontu B";
  $("ref").value = S.ref; $("fref").value = S.ref;
  document.querySelectorAll('#segPlace input').forEach(i => { i.checked = i.value === S.place; });
  document.querySelectorAll('#segArr input').forEach(i => { i.checked = i.value === S.arr; });
  ["rowXB", "rowBA", "rowBB"].forEach(id => { $(id).hidden = g.tower; }); $("arrRow").hidden = g.n < 2;
  $("placeNote").textContent = g.tower
    ? "B stoi na skrzyniach A, front wszystkich skrzyń leży w jednej płaszczyźnie. Aplikacja liczy drogi do środków skrzyń z ich wymiarów."
    : "Skrzynie stoją osobno: podajesz odległość każdej z nich i wysokość, na jakiej stoi jej spód.";

  const ok = [S.x, S.xB, S.hr, S.T].every(Number.isFinite) && g.dA > 0 && g.dB > 0 && (!r.useC || (Number.isFinite(S.xC) && Number.isFinite(S.bC) && g.dC > 0));
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
function smCalc() {
  if (S.mode === "fs") { const q = fsCalc(); return { act: q.act, name: k => q.M[k].name, delay: k => (q.act.includes(k) ? q.dl[k] : null), fc: q.P.A.lpf || q.P.B.lpf || (q.act.includes("C") && q.P.C.lpf) || 100 }; }
  const r = compute(S);
  return { act: r.act, name: k => (k === "C" ? modelOf(S.fs.C).name : r["m" + k].name), delay: k => (r.act.includes(k) ? r["delay" + k] : null), fc: r.pA.lpf || r.pB.lpf || 100 };
}
function renderSmaart() {
  if (!$("smBody").firstChild) return;
  const q = smCalc();
  SPK.forEach(k => {
    $("smn" + k).textContent = q.name(k);
    const dl = q.delay(k); $("smcalc" + k).textContent = dl === null ? "bez obliczenia" : "obliczone " + fmt(dl) + " ms";
  });
  const meas = SPK.filter(k => Number.isFinite(parse(S.sm[k].t || "")));
  const out = $("smOut");
  if (meas.length < 2) { out.innerHTML = whyRow("Brak porównania", "", "n", "Wpisz czas dotarcia co najmniej dwóch głośników. Każdy mierz osobno, przy opóźnieniu 0 ms w procesorze, z tym samym sygnałem odniesienia i tym samym mikrofonem."); return; }
  const M = {}; meas.forEach(k => { M[k] = parse(S.sm[k].t); });
  const Mm = Math.max(...meas.map(k => M[k])), fc = q.fc;
  let html = "", copy = [];
  meas.forEach(k => {
    const md = Mm - M[k], calc = q.delay(k), coh = parse(S.sm[k].h || ""), warn = [];
    if (S.sm[k].p === "-") warn.push("polaryzacja odwrócona");
    if (Number.isFinite(coh) && coh < 80) warn.push(`koherencja ${fmt(coh, 0)} % (orientacyjnie za niska, pomiar niepewny)`);
    copy.push(`${k} ${q.name(k)}: ${fmt(md)} ms`);
    let txt;
    if (calc === null) txt = `Z pomiaru: ${fmt(md)} ms. Ten głośnik nie ma obliczenia w trybie DJ Monitor.`;
    else {
      const diff = md - calc, deg = 360 * fc * diff / 1000, status = Math.abs(diff) < 0.1 ? "zgodne z obliczeniem" : Math.abs(diff) < 0.5 ? "drobna różnica" : "duża różnica: sprawdź pomiar i odległości";
      txt = `Z pomiaru: ${fmt(md)} ms. Obliczone: ${fmt(calc)} ms. Różnica ${sgn(diff)} ms, czyli około ${sgn(deg, 0)}° przy ${fc} Hz. <b>${status}.</b>`;
    }
    html += whyRow(who(k, q.name(k)), `${fmt(md)} ms`, md > 0 ? k.toLowerCase() : "n", txt + (warn.length ? ` Uwaga: ${warn.join(", ")}.` : "") + (S.sm[k].n ? ` Notatka: ${esc(S.sm[k].n)}` : ""));
  });
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
let fsField = null, fsRaf = null, fsWalls = [];
function fsSources() {
  const f = S.fs, c = speedOfSound(S.T), d = f.d;
  let n = Math.max(1, Math.min(12, Math.round(f.n))); const out = [];
  if (f.type === "grad") n = 2;
  if (f.type === "line" || f.type === "arc") {
    /* wzór z arkusza S.A.D. (Setups!S, delayed array): opóźnienie = odległość między pozycją na łuku a pozycją w linii, odjęte minimum */
    const half = (n - 1) / 2, A = Math.min(170, Math.max(10, f.arc));
    const r = f.type === "arc" && n > 1 ? 360 / A * (n - 1) * d / (2 * Math.PI) : 0;
    const Sd = [];
    for (let i = 0; i < n; i++) {
      const M = i - half, N = n > 1 ? M * A / (n - 1) * Math.PI / 180 : 0;
      Sd.push(r ? Math.hypot(Math.cos(N) * r - r, Math.sin(N) * r - M * d) : 0);
    }
    const S0 = Math.min(...Sd);
    for (let i = 0; i < n; i++) out.push({ x: (i - half) * d, y: 0, t: (Sd[i] - S0) / c * 1000, pol: 1 });
  } else if (f.type === "end") {
    /* odstępy liczone od frontu do tyłu: najmniejszy d przy froncie; w trybie log każdy kolejny większy o współczynnik q */
    const gaps = []; for (let k = 0; k < n - 1; k++) gaps.push(f.sp === "log" ? d * Math.pow(f.q, k) : d);   // gaps[0] = przód
    const ys = [0]; gaps.forEach(g => ys.push(ys[ys.length - 1] - g));                                        // ys[0] = front (0), dalej do tyłu
    const rear = ys[ys.length - 1];
    for (let i = 0; i < n; i++) { const y = ys[n - 1 - i]; out.push({ x: 0, y, t: (y - rear) / c * 1000, pol: 1 }); }
  } else { out.push({ x: 0, y: 0, t: 0, pol: 1 }, { x: 0, y: -d, t: d / c * 1000, pol: -1 }); }
  return { src: out, c, n };
}
const FSZR = 1.6;                                              // wysokość ucha słuchacza, m
function fsRoom() {
  const q = S.fs.room, out = [];
  if (q.w2) out.push([0, q.x0]); if (q.w3) out.push([0, q.x1]); if (q.w1) out.push([1, q.y1]); if (q.w4) out.push([1, q.y2]); if (q.ce) out.push([2, q.hc]);
  return out;
}
function fsOut(X, Y) { const q = S.fs.room; return (q.w2 && X < q.x0) || (q.w3 && X > q.x1) || (q.w1 && Y < q.y1) || (q.w4 && Y > q.y2); }
/* źródła punktowe + ich obrazy w ścianach/suficie (metoda źródeł-obrazów, rząd 2, jednakowy współczynnik odbicia R) */
function fsEff() {
  const { src, c } = fsSources(), dm = dimsOf(modelOf(S.fs.A)), zs = dm[0] / 2, surf = fsRoom(), R = S.fs.room.R, out = [];
  src.forEach(s => {
    let cur = [{ p: [s.x, s.y, zs], a: s.pol, last: -1 }];
    out.push(...cur.map(o => ({ x: o.p[0], y: o.p[1], z: o.p[2], a: o.a, t: s.t })));
    for (let ord = 0; ord < 2 && surf.length; ord++) {
      const nxt = [];
      cur.forEach(o => surf.forEach((sf, si) => {
        if (si === o.last) return;
        const p = o.p.slice(); p[sf[0]] = 2 * sf[1] - p[sf[0]]; nxt.push({ p, a: o.a * R, last: si });
      }));
      out.push(...nxt.map(o => ({ x: o.p[0], y: o.p[1], z: o.p[2], a: o.a, t: s.t })));
      cur = nxt;
    }
  });
  return { eff: out, src, c };
}
function fsCompute() {
  const { eff, src, c } = fsEff(), f = FSF[S.fs.fi], k = 2 * Math.PI * f / c, w = 2 * Math.PI * f;
  const three = S.fs.view === "3d", N = three ? 100 : GN, VZ = 48, hc = S.fs.room.ce ? S.fs.room.hc : 10, M = eff.length;
  const ex = new Float32Array(M), ey = new Float32Array(M), ez = new Float32Array(M), ea = new Float32Array(M), eph = new Float32Array(M);
  eff.forEach((e, i) => { ex[i] = e.x; ey[i] = e.y; ez[i] = e.z; ea[i] = e.a; eph[i] = -w * e.t / 1000; });
  const point = (X, Y, Z, o, p) => {
    let a = 0, b = 0;
    for (let m = 0; m < M; m++) {
      const dx = X - ex[m], dy = Y - ey[m], dz = Z - ez[m], r = Math.max(0.3, Math.sqrt(dx * dx + dy * dy + dz * dz)), ph = -k * r + eph[m], g = ea[m] / r;
      a += g * Math.cos(ph); b += g * Math.sin(ph);
    }
    o[p] = a; o[p + 1] = b;
  };
  const re = new Float32Array(N * N), im = new Float32Array(N * N), tmp = [0, 0];
  for (let j = 0; j < N; j++) {
    const Y = FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / N;
    for (let i = 0; i < N; i++) {
      const X = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / N;
      point(X, Y, FSZR, tmp, 0); re[j * N + i] = tmp[0]; im[j * N + i] = tmp[1];
    }
  }
  let mx = 1e-9;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const X = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / N, Y = FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / N;
    if (!fsOut(X, Y) && src.every(s => Math.hypot(X - s.x, Y - s.y) > 3)) mx = Math.max(mx, Math.hypot(re[j * N + i], im[j * N + i]));
  }
  let vre = null, vim = null, xc = 0;
  if (three) {                                                 // przekrój pionowy wzdłuż osi y w płaszczyźnie x = środek układu
    xc = src.reduce((a, s) => a + s.x, 0) / src.length; vre = new Float32Array(N * VZ); vim = new Float32Array(N * VZ);
    for (let j = 0; j < VZ; j++) { const Z = hc * (1 - (j + .5) / VZ);
      for (let i = 0; i < N; i++) { const Y = FSY[0] + (FSY[1] - FSY[0]) * (i + .5) / N; point(xc, Y, Z, tmp, 0); vre[j * N + i] = tmp[0]; vim[j * N + i] = tmp[1]; } }
  }
  fsField = { re, im, mx, src, f, c, N, VZ, vre, vim, xc, hc };
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
  if (S.fs.view === "3d") return fsDraw3(tms);
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
      { const X2 = FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / GN; if (fsOut(X2, Y)) col = [col[0] * .25, col[1] * .25, col[2] * .25]; }
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
  const m = modelOf(S.fs.A), dm = dimsOf(m), ppm = W / (FSX[1] - FSX[0]);
  F.src.forEach((s, i) => {
    const w = Math.max(4, dm[1] * ppm), h = Math.max(4, dm[2] * ppm), X = px(s.x), Y = py(s.y);
    ctx.fillStyle = s.pol < 0 ? "#7d2f2f" : "#3a3d44"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
    ctx.fillRect(X - w / 2, Y - h / 2, w, h); ctx.strokeRect(X - w / 2, Y - h / 2, w, h);
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px -apple-system, sans-serif"; ctx.textAlign = "center"; ctx.fillText(String(i + 1), X, Y - Math.max(h, 8) / 2 - 6); ctx.textAlign = "start";
  });
  fsWalls = [];
  const rm = S.fs.room, WC = ["#FFB84D", "#4DD0E1", "#B58CFF", "#7BE07B"];
  [["w1", 1, rm.y1, "1"], ["w2", 0, rm.x0, "2"], ["w3", 0, rm.x1, "3"], ["w4", 1, rm.y2, "4"]].forEach(([key, ax, v, lab], q) => {
    if (!rm[key]) return;
    ctx.strokeStyle = WC[q]; ctx.fillStyle = WC[q]; ctx.lineWidth = 5; ctx.beginPath();
    if (ax === 0) { ctx.moveTo(px(v), 0); ctx.lineTo(px(v), H); } else { ctx.moveTo(0, py(v)); ctx.lineTo(W, py(v)); }
    ctx.stroke();
    const hx = ax === 0 ? px(v) : W - 40, hy = ax === 0 ? 40 : py(v); ctx.beginPath(); ctx.arc(hx, hy, 17, 0, 7); ctx.fill();
    ctx.fillStyle = "#111"; ctx.font = "bold 20px -apple-system, sans-serif"; ctx.textAlign = "center"; ctx.fillText(lab, hx, hy + 7); ctx.textAlign = "start";
    fsWalls.push({ key, ax, v, px: ax === 0 ? px(v) : null, py: ax === 1 ? py(v) : null });
  });
  ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "20px -apple-system, sans-serif"; ctx.fillText("publiczność ↑", W - 150, 28);
}

/* Układ subów w skali: skrzynie w prawdziwych wymiarach z karty katalogowej, z widocznymi odstępami */
function fsLayout() {
  const cv = $("fsLay"); if (!cv) return;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, { src } = fsSources(), m = modelOf(S.fs.A), dm = dimsOf(m);
  const bw = dm[1], bd = dm[2];
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  src.forEach(s => { x0 = Math.min(x0, s.x - bw / 2); x1 = Math.max(x1, s.x + bw / 2); y0 = Math.min(y0, s.y - bd / 2); y1 = Math.max(y1, s.y + bd / 2); });
  const padX = 0.5, padY = 0.9, ppm = Math.min(320, (W - 60) / (x1 - x0 + 2 * padX), (H - 90) / (y1 - y0 + 2 * padY));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, px = x => W / 2 + (x - cx) * ppm, py = y => H / 2 + 6 - (y - cy) * ppm;
  ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#0B0D10"; ctx.fillRect(0, 0, W, H);
  ctx.font = "18px -apple-system, sans-serif"; ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.fillText("publiczność ↑", W / 2, 24);
  const overlap = (S.fs.type === "end" || S.fs.type === "grad") ? S.fs.d < bd - 1e-6 : S.fs.d < bw - 1e-6;
  src.forEach((s, i) => {
    const w = bw * ppm, h = bd * ppm, X = px(s.x) - w / 2, Y = py(s.y + bd / 2);
    ctx.fillStyle = s.pol < 0 ? "#7d2f2f" : "#3a3d44"; ctx.strokeStyle = overlap ? "#ff6b5b" : "#4C8DFF"; ctx.lineWidth = 2.5;
    ctx.fillRect(X, Y, w, h); ctx.strokeRect(X, Y, w, h);
    ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(X, Y, w, Math.min(6, h * .12));           // front skrzyni (strona publiczności)
    ctx.fillStyle = "#fff"; ctx.font = "bold " + Math.max(14, Math.min(26, w * .4)) + "px -apple-system, sans-serif"; ctx.fillText(String(i + 1), X + w / 2, Y + h / 2 + 7);
  });
  /* wymiary: odstęp środków i szczelina między skrzyniami */
  ctx.lineWidth = 1.5; ctx.font = "16px -apple-system, sans-serif";
  const line = (ax, ay, bx, by, txt, dy) => {
    ctx.strokeStyle = "#E8D44D"; ctx.fillStyle = "#E8D44D"; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    [[ax, ay], [bx, by]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); });
    if (dy === 0) { ctx.textAlign = "left"; ctx.fillText(txt, ax + 10, (ay + by) / 2 + 5); ctx.textAlign = "center"; } else ctx.fillText(txt, (ax + bx) / 2, (ay + by) / 2 + dy);
  };
  const horiz = !(S.fs.type === "end" || S.fs.type === "grad"), gap = Math.round((S.fs.d - (horiz ? bw : bd)) * 100);
  if (src.length > 1) {
    const a = src[0], b = src[1];
    const gtxt = gap >= 0 ? "szczelina " + gap + " cm" : "nakładają się o " + (-gap) + " cm";
    if (!horiz) { const u = src[src.length - 2], v = src[src.length - 1]; a.x = u.x; a.y = u.y; b.x = v.x; b.y = v.y; }
    if (horiz) line(px(a.x), py(a.y) - bd * ppm / 2 - 14, px(b.x), py(a.y) - bd * ppm / 2 - 14, "środek–środek " + fmt(S.fs.d * 100, 0) + " cm", -8);
    else line(px(a.x) + bw * ppm / 2 + 16, py(a.y), px(b.x) + bw * ppm / 2 + 16, py(b.y), fmt(S.fs.d * 100, 0) + " cm", 0);
    ctx.fillStyle = overlap ? "#ff6b5b" : "rgba(255,255,255,.75)";
    ctx.fillText(gtxt + (overlap ? " – za blisko" : ""), W / 2, H - 28);
  }
  ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.fillText(`skrzynia ${esc(m.name)}: ${fmt(bw * 100, 0)} × ${fmt(bd * 100, 0)} cm (szer. × głęb.) · skala ${fmt(ppm / 100, 1)} px/cm`, W / 2, H - 8);
  ctx.textAlign = "start";
}

/* ===== Widok 3D: płaszczyzna słuchacza (1,6 m) + przekrój pionowy, obracanie kamery palcem/myszą ===== */
const cam = { yaw: 0.55, pit: 0.5, dist: 62 };
const texH = document.createElement("canvas"), texV = document.createElement("canvas");
function tri(ctx, img, s0, s1, s2, d0, d1, d2) {
  const cx = (d0[0] + d1[0] + d2[0]) / 3, cy = (d0[1] + d1[1] + d2[1]) / 3, g = (p) => { const dx = p[0] - cx, dy = p[1] - cy, l = Math.hypot(dx, dy) || 1; return [p[0] + dx / l * .7, p[1] + dy / l * .7]; };
  const e0 = g(d0), e1 = g(d1), e2 = g(d2);
  ctx.save(); ctx.beginPath(); ctx.moveTo(e0[0], e0[1]); ctx.lineTo(e1[0], e1[1]); ctx.lineTo(e2[0], e2[1]); ctx.closePath(); ctx.clip();
  const det = (s1[0] - s0[0]) * (s2[1] - s0[1]) - (s2[0] - s0[0]) * (s1[1] - s0[1]);
  if (Math.abs(det) > 1e-9) {
    const a = ((d1[0] - d0[0]) * (s2[1] - s0[1]) - (d2[0] - d0[0]) * (s1[1] - s0[1])) / det, b = ((d1[1] - d0[1]) * (s2[1] - s0[1]) - (d2[1] - d0[1]) * (s1[1] - s0[1])) / det;
    const c = ((s1[0] - s0[0]) * (d2[0] - d0[0]) - (s2[0] - s0[0]) * (d1[0] - d0[0])) / det, d = ((s1[0] - s0[0]) * (d2[1] - d0[1]) - (s2[0] - s0[0]) * (d1[1] - d0[1])) / det;
    ctx.transform(a, b, c, d, d0[0] - a * s0[0] - c * s0[1], d0[1] - b * s0[0] - d * s0[1]); ctx.drawImage(img, 0, 0);
  }
  ctx.restore();
}
function drawTex(ctx, img, tw, th, P, sub) {                       // P = rzutowane rogi [lewy-górny, prawy-górny, lewy-dolny, prawy-dolny]
  const lerp = (u, v) => { const t = [0, 1].map(k => P[0][k] * (1 - u) * (1 - v) + P[1][k] * u * (1 - v) + P[2][k] * (1 - u) * v + P[3][k] * u * v); return t; };
  for (let a = 0; a < sub; a++) for (let b = 0; b < sub; b++) {
    const u0 = a / sub, u1 = (a + 1) / sub, v0 = b / sub, v1 = (b + 1) / sub;
    const q00 = lerp(u0, v0), q10 = lerp(u1, v0), q01 = lerp(u0, v1), q11 = lerp(u1, v1);
    tri(ctx, img, [u0 * tw, v0 * th], [u1 * tw, v0 * th], [u0 * tw, v1 * th], q00, q10, q01);
    tri(ctx, img, [u1 * tw, v0 * th], [u1 * tw, v1 * th], [u0 * tw, v1 * th], q10, q11, q01);
  }
}
function paintTex(cv, re, im, N, M, wave, cp, sp, pos) {
  if (cv.width !== N || cv.height !== M) { cv.width = N; cv.height = M; }
  const o = cv.getContext("2d"), img = o.createImageData(N, M), F = fsField;
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) {
    const p = j * N + i, [X, Y, Z] = pos(i, j), rr = Math.max(1, Math.hypot(X, Y + 2, Z - 0.5));
    const v = (re[p] * cp - im[p] * sp) * rr / (F.mx * 12), m = Math.min(1, Math.abs(v) ** 0.7);
    let col = v >= 0 ? [20 + 215 * m, 22 + 50 * m, 28 + 20 * m] : [20 + 10 * m, 22 + 110 * m, 28 + 215 * m];
    if (Z > F.hc || fsOut(X, Y)) col = col.map(x => x * .3);
    const q4 = p * 4; img.data[q4] = col[0]; img.data[q4 + 1] = col[1]; img.data[q4 + 2] = col[2]; img.data[q4 + 3] = 255;
  }
  o.putImageData(img, 0, 0);
}
function fsDraw3(tms) {
  const cv = $("fs3"), F = fsField; if (!cv || !F || !F.vre) return;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, rm = S.fs.room, N = F.N, VZ = F.VZ;
  const ph = (tms / 1000) * 2 * Math.PI * 0.6, cp = Math.cos(ph), sp = Math.sin(ph);
  paintTex(texH, F.re, F.im, N, N, true, cp, sp, (i, j) => [FSX[0] + (FSX[1] - FSX[0]) * (i + .5) / N, FSY[1] - (FSY[1] - FSY[0]) * (j + .5) / N, FSZR]);
  paintTex(texV, F.vre, F.vim, N, VZ, true, cp, sp, (i, j) => [F.xc, FSY[0] + (FSY[1] - FSY[0]) * (i + .5) / N, F.hc * (1 - (j + .5) / VZ)]);
  /* kamera */
  const T = [0, 10, 3], cy = Math.cos(cam.pit), E = [T[0] + cam.dist * cy * Math.sin(cam.yaw), T[1] - cam.dist * cy * Math.cos(cam.yaw), T[2] + cam.dist * Math.sin(cam.pit)];
  const fw = [T[0] - E[0], T[1] - E[1], T[2] - E[2]], fl = Math.hypot(...fw); fw.forEach((v, i) => fw[i] = v / fl);
  let rt = [fw[1], -fw[0], 0]; const rl = Math.hypot(...rt); rt = rt.map(v => v / rl);
  const up = [rt[1] * fw[2] - rt[2] * fw[1], rt[2] * fw[0] - rt[0] * fw[2], rt[0] * fw[1] - rt[1] * fw[0]], FOC = W * 1.15;
  const pr = p => { const v = [p[0] - E[0], p[1] - E[1], p[2] - E[2]], x = v[0] * rt[0] + v[1] * rt[1] + v[2] * rt[2], y = v[0] * up[0] + v[1] * up[1] + v[2] * up[2], z = v[0] * fw[0] + v[1] * fw[1] + v[2] * fw[2];
    return [W / 2 + x / Math.max(.5, z) * FOC, H * .52 - y / Math.max(.5, z) * FOC, z]; };
  ctx.fillStyle = "#0B0D10"; ctx.fillRect(0, 0, W, H);
  const items = [];
  const quad = (pts, fill, stroke, lw) => { const q = pts.map(pr); items.push({ d: q.reduce((a, p) => a + p[2], 0) / q.length, f: () => { ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.5; ctx.stroke(); } } }); };
  const x0 = rm.w2 ? rm.x0 : FSX[0], x1 = rm.w3 ? rm.x1 : FSX[1], y0 = rm.w1 ? rm.y1 : FSY[0], y1 = rm.w4 ? rm.y2 : FSY[1], hw = F.hc;
  const WC = ["#FFB84D", "#4DD0E1", "#B58CFF", "#7BE07B"], al = c => c + "30";
  quad([[FSX[0], FSY[1], 0], [FSX[1], FSY[1], 0], [FSX[0], FSY[0], 0], [FSX[1], FSY[0], 0]].map((p, i) => p).filter((p, i) => true).slice(0, 0), null, null);
  const floor = [[x0, y1, 0], [x1, y1, 0], [x1, y0, 0], [x0, y0, 0]]; quad(floor, "rgba(255,255,255,.04)", "rgba(255,255,255,.25)");
  if (rm.w1) quad([[x0, y0, 0], [x1, y0, 0], [x1, y0, hw], [x0, y0, hw]], al(WC[0]), WC[0], 2.5);
  if (rm.w2) quad([[x0, y0, 0], [x0, y1, 0], [x0, y1, hw], [x0, y0, hw]], al(WC[1]), WC[1], 2.5);
  if (rm.w3) quad([[x1, y0, 0], [x1, y1, 0], [x1, y1, hw], [x1, y0, hw]], al(WC[2]), WC[2], 2.5);
  if (rm.w4) quad([[x0, y1, 0], [x1, y1, 0], [x1, y1, hw], [x0, y1, hw]], al(WC[3]), WC[3], 2.5);
  if (rm.ce) quad([[x0, y0, hw], [x1, y0, hw], [x1, y1, hw], [x0, y1, hw]], "rgba(255,255,255,.10)", "rgba(255,255,255,.6)", 2);
  /* płaszczyzny z falą */
  const PH = [[FSX[0], FSY[1], FSZR], [FSX[1], FSY[1], FSZR], [FSX[0], FSY[0], FSZR], [FSX[1], FSY[0], FSZR]].map(pr);
  items.push({ d: PH.reduce((a, p) => a + p[2], 0) / 4 + 0.01, f: () => drawTex(ctx, texH, N, N, PH, 8) });
  const PV = [[F.xc, FSY[0], F.hc], [F.xc, FSY[1], F.hc], [F.xc, FSY[0], 0], [F.xc, FSY[1], 0]].map(pr);
  items.push({ d: PV.reduce((a, p) => a + p[2], 0) / 4 - 0.01, f: () => drawTex(ctx, texV, N, VZ, PV, 10) });
  /* skrzynie subów w skali */
  const dm = dimsOf(modelOf(S.fs.A)), bw = dm[1] / 2, bd = dm[2] / 2, bh = dm[0];
  F.src.forEach(s => {
    const a = s.x - bw, b = s.x + bw, c = s.y - bd, d = s.y + bd, fc = s.pol < 0 ? "#a04040" : "#6b7078";
    quad([[a, c, bh], [b, c, bh], [b, d, bh], [a, d, bh]], "#8a9099", "#fff", 1);
    quad([[a, d, 0], [b, d, 0], [b, d, bh], [a, d, bh]], fc, "#fff", 1); quad([[a, c, 0], [b, c, 0], [b, c, bh], [a, c, bh]], "#4a4e55", "#fff", 1);
    quad([[a, c, 0], [a, d, 0], [a, d, bh], [a, c, bh]], "#555a62", "#fff", 1); quad([[b, c, 0], [b, d, 0], [b, d, bh], [b, c, bh]], "#555a62", "#fff", 1);
  });
  items.sort((p, q) => q.d - p.d).forEach(it => it.f());
  ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = "18px -apple-system, sans-serif";
  const lab = (t, p) => { const q = pr(p); ctx.fillText(t, q[0] + 6, q[1] - 6); };
  lab("publiczność →", [0, 30, 0.3]); lab("suby", [0, 0, bh + .3]);
  ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.fillText("czerwony: nadciśnienie · niebieski: podciśnienie", 12, H - 12);
}
let fsDragW = null, fsPtrs = new Map(), fsPinch = 0;
function wallFromEvent(e, cv) {
  const rc = cv.getBoundingClientRect(), sx = cv.width / rc.width, X = (e.clientX - rc.left) * sx, Y = (e.clientY - rc.top) * sx;
  return { X, Y, W: cv.width, H: cv.height, x: FSX[0] + X / cv.width * (FSX[1] - FSX[0]), y: FSY[1] - Y / cv.height * (FSY[1] - FSY[0]) };
}
(function wire3d() {
  const c2 = $("fsCv"), c3 = $("fs3");
  let pend = false; const redo = () => { if (pend) return; pend = true; requestAnimationFrame(() => { pend = false; update(false); }); };
  c2.style.touchAction = "pan-y";
  c2.addEventListener("pointerdown", e => {
    const q = wallFromEvent(e, c2); let best = null, bd = 34;
    fsWalls.forEach(w => { const dd = w.ax === 0 ? Math.abs(q.X - w.px) : Math.abs(q.Y - w.py); if (dd < bd) { bd = dd; best = w; } });
    if (best) { fsDragW = best; c2.setPointerCapture(e.pointerId); c2.style.touchAction = "none"; e.preventDefault(); }
  });
  c2.addEventListener("pointermove", e => {
    if (!fsDragW) return; const q = wallFromEvent(e, c2), rm = S.fs.room, srcs = fsField ? fsField.src : [{ x: 0, y: 0 }];
    const mnx = Math.min(...srcs.map(s => s.x)) - 1, mxx = Math.max(...srcs.map(s => s.x)) + 1, mny = Math.min(...srcs.map(s => s.y)) - 1;
    const rd = v => Math.round(v * 10) / 10;
    if (fsDragW.key === "w2") rm.x0 = rd(Math.max(-19, Math.min(mnx, q.x))); if (fsDragW.key === "w3") rm.x1 = rd(Math.min(19, Math.max(mxx, q.x)));
    if (fsDragW.key === "w1") rm.y1 = rd(Math.max(-9, Math.min(mny, q.y))); if (fsDragW.key === "w4") rm.y2 = rd(Math.min(29, Math.max(3, q.y)));
    e.preventDefault(); redo();
  });
  const end = e => { if (fsDragW) { fsDragW = null; c2.style.touchAction = "pan-y"; } };
  c2.addEventListener("pointerup", end); c2.addEventListener("pointercancel", end);
  /* kamera 3D */
  c3.style.touchAction = "none";
  c3.addEventListener("pointerdown", e => { c3.setPointerCapture(e.pointerId); fsPtrs.set(e.pointerId, [e.clientX, e.clientY]); if (fsPtrs.size === 2) { const [a, b] = [...fsPtrs.values()]; fsPinch = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
  c3.addEventListener("pointermove", e => {
    const p = fsPtrs.get(e.pointerId); if (!p) return;
    if (fsPtrs.size === 1) { cam.yaw -= (e.clientX - p[0]) * 0.008; cam.pit = Math.max(0.05, Math.min(1.5, cam.pit + (e.clientY - p[1]) * 0.008)); }
    fsPtrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (fsPtrs.size === 2) { const [a, b] = [...fsPtrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (fsPinch) cam.dist = Math.max(18, Math.min(130, cam.dist * fsPinch / d)); fsPinch = d; }
  });
  const up = e => { fsPtrs.delete(e.pointerId); fsPinch = 0; };
  c3.addEventListener("pointerup", up); c3.addEventListener("pointercancel", up);
  c3.addEventListener("wheel", e => { e.preventDefault(); cam.dist = Math.max(18, Math.min(130, cam.dist * (1 + e.deltaY * 0.001))); }, { passive: false });
  ["rw1", "rw2", "rw3", "rw4", "rce"].forEach(id => $(id).addEventListener("change", e => { S.fs.room[{ rw1: "w1", rw2: "w2", rw3: "w3", rw4: "w4", rce: "ce" }[id]] = e.target.checked; update(); }));
  $("fsHc").addEventListener("input", e => { S.fs.room.hc = Number(e.target.value); update(); });
  $("fsR").addEventListener("input", e => { S.fs.room.R = Number(e.target.value); update(); });
})();
function fsRoomUI() {
  const rm = S.fs.room, f = S.fs;
  [["rw1", "w1"], ["rw2", "w2"], ["rw3", "w3"], ["rw4", "w4"], ["rce", "ce"]].forEach(([id, k]) => { $(id).checked = !!rm[k]; });
  $("fsHc").value = rm.hc; $("fsR").value = rm.R;
  $("fsHcv").textContent = fmt(rm.hc, 1) + " m"; $("fsRv").textContent = fmt(rm.R, 2);
  $("rowHc").hidden = !rm.ce;
  const pos = [rm.w1 ? `1: y = ${fmt(rm.y1, 1)} m` : "", rm.w2 ? `2: x = ${fmt(rm.x0, 1)} m` : "", rm.w3 ? `3: x = ${fmt(rm.x1, 1)} m` : "", rm.w4 ? `4: y = ${fmt(rm.y2, 1)} m` : ""].filter(Boolean);
  $("fsWallPos").textContent = pos.length ? "Ściany (przeciągnij je na mapie 2D): " + pos.join(" · ") : "Wszystkie ściany wyłączone: pole swobodne.";
  $("fsStage2").hidden = f.view === "3d"; $("fs3Stage").hidden = f.view !== "3d";
}
function fsLoop(t) {
  fsRaf = null;
  if (S.mode !== "fs" || (S.fs.view !== "wave" && S.fs.view !== "3d") || $("tab-calc").hidden || document.hidden) return;
  fsDraw(t); fsRaf = requestAnimationFrame(fsLoop);
}
function fsCalc() {
  const f = S.fs, c = speedOfSound(S.T), useC = !!f.useC;
  const M = { A: modelOf(f.A), B: modelOf(f.B), C: modelOf(f.C) };
  const pk = (m, id) => m.presets.find(p => p.id === id) || m.presets[0];
  const P = { A: pk(M.A, f.pA), B: pk(M.B, f.pB), C: pk(M.C, f.pC) }, D = { A: f.dA, B: f.dB, C: f.dC };
  const act = useC ? ["A", "B", "C"] : ["A", "B"], custom = act.some(k => M[k].custom);
  const T = {}; act.forEach(k => { T[k] = D[k] / c * 1000 + (custom ? 0 : P[k].L); });
  const Tm = Math.max(...act.map(k => T[k])), dl = {}; act.forEach(k => { dl[k] = Math.max(0, Tm - T[k]); });
  return { c, act, M, P, D, T, Tm, dl, custom };
}
function fsRender() {
  document.querySelectorAll('#segMode input').forEach(i => { i.checked = i.value === S.mode; });
  $("dj").hidden = S.mode === "fs"; $("fs").hidden = S.mode !== "fs";
  if (S.mode !== "fs") return;
  const f = S.fs, q = fsCalc(), { src, c, n } = fsSources(), fq = FSF[f.fi], lam = c / fq, m = q.M.A;
  document.querySelectorAll('#segUseC input').forEach(i => { i.checked = i.value === (f.useC ? "1" : "0"); });
  $("fblkC").hidden = !f.useC; $("ftileC").hidden = !f.useC; $("rowFSDC").hidden = !f.useC;
  $("ftiles").classList.toggle("three", f.useC);
  document.querySelectorAll('#segFSType input').forEach(i => { i.checked = i.value === f.type; });
  document.querySelectorAll('#segFSView input').forEach(i => { i.checked = i.value === f.view; });
  $("fsF").value = f.fi; $("fsFval").textContent = fq + " Hz (λ = " + fmt(lam) + " m)";
  $("rowFSA").hidden = f.type !== "arc"; $("rowFSSp").hidden = f.type !== "end"; $("rowFSQ").hidden = !(f.type === "end" && f.sp === "log"); $("rowFSQr").hidden = $("rowFSQ").hidden;
  document.querySelectorAll('#segFSSp input').forEach(i => { i.checked = i.value === f.sp; }); $("fsQ").value = f.q; $("fsQv").textContent = "× " + fmt(f.q, 1); $("rowFSN").hidden = f.type === "grad";
  const quarter = f.type === "end" || f.type === "grad";
  $("fsAuto").textContent = `Ustaw odstęp ${quarter ? "¼" : "½"} fali (${fmt(lam / (quarter ? 4 : 2))} m)`;
  $("fsNote").textContent = FSTYPE[f.type][1];
  /* kafelki */
  const names = { A: (n > 1 ? n + "× " : "") + q.M.A.name, B: q.M.B.name, C: q.M.C.name };
  q.act.forEach(k => {
    const ms = q.dl[k], on = ms > 0;
    $("fwho" + k).textContent = k + " · " + names[k];
    $("fval" + k).innerHTML = fmt(ms) + "<small>ms</small>";
    $("ftile" + k).classList.toggle("on", on);
    $("fhint" + k).textContent = on ? "ustaw to opóźnienie" : "bez opóźnienia";
  });
  const mx = Math.max(...q.act.map(k => q.dl[k])), smp = fs => { const z = Math.round(mx / 1000 * fs); return `<b>${z}</b> próbek (${fmt(z / fs * 1000, 3)} ms)`; };
  $("fdsp").innerHTML = `48 kHz: ${smp(48000)}<br>96 kHz: ${smp(96000)}`;
  const w = $("fwarn"); const est = q.act.filter(k => q.P[k].est);
  w.hidden = !est.length; if (est.length) w.textContent = `Preset ${est.join(" i ")} nie ma wpisu w tabeli Time-Alignment Seeburga, przyjęto czas z presetu HP. Sprawdź pomiarem.`;
  /* mapa */
  fsRoomUI(); fsCompute(); fsDraw(performance.now()); fsLayout();
  $("fsMapNote").textContent = f.view === "3d"
    ? "Obracaj: przeciągnij palcem lub myszą. Zoom: dwa palce lub kółko. Pole liczone metodą źródeł-obrazów (odbicia rzędu 1 i 2, jednakowy współczynnik odbicia R, ściany idealnie płaskie, bez modów pomieszczenia i bez odbicia od podłogi). To model poglądowy, nie zastępuje pomiaru."
    : f.view === "wave"
    ? "Animacja pokazuje chwilowe ciśnienie na wybranej częstotliwości (czerwony: nadciśnienie, niebieski: podciśnienie), spowolniona. Widać, dokąd fala się sumuje, a gdzie się znosi."
    : "Pasma co 3 dB. 0 dB to najgłośniejsze miejsce dalej niż 3 m od subów, ciemny niebieski to −36 dB i mniej. Dla każdej częstotliwości mapa liczy się od nowa.";
  /* tabela */
  const ref = REF[S.ref][1];
  const rowsG = q.act.map(k => whyRow(who(k, names[k]), q.dl[k] > 0 ? `+${fmt(q.dl[k])} ms` : "0 ms", q.dl[k] > 0 ? k.toLowerCase() : "n",
    `Droga do ${ref}: ${fmt(q.D[k])} m, czyli ${fmt(q.D[k] / c * 1000)} ms. Czas przejścia ${q.custom ? "pominięty" : fmt(q.P[k].L, 1) + " ms"}. Dotarcie po ${fmt(q.T[k])} ms.` + (k === "A" ? " To opóźnienie grupy subów, do niego dochodzą opóźnienia wewnętrzne układu." : "")));
  const rowsS = src.map((s, i) => { const tot = q.dl.A + s.t; return whyRow(`<span class="badge a">${i + 1}</span>${esc(m.name)}`,
    `${fmt(tot)} ms${s.pol < 0 ? " · pol −" : ""}`, tot > 0 || s.pol < 0 ? "a" : "n",
    `Do wpisania w procesorze: grupa ${fmt(q.dl.A)} ms + układ ${fmt(s.t)} ms${s.pol < 0 ? ", polaryzacja odwrócona" : ""}. Pozycja: ${fmt(s.x)} m w bok, ${fmt(s.y)} m w głąb (0 = front suba najbliższego publiczności).`); });
  const d = f.d, sum = whyRow("Odstęp subów", `${fmt(d)} m`, "n", `To ${fmt(d / lam, 2)} długości fali przy ${fq} Hz (λ = ${fmt(lam)} m, c = ${fmt(c, 1)} m/s). ${quarter ? "Dla end-fire i gradientu optimum to ¼ λ." : "Dla układów poziomych typowo ½ λ."}`, "final");
  $("fsOut").innerHTML = rowsG.join("") + sum + rowsS.join("");
  if (!fsRaf && (f.view === "wave" || f.view === "3d")) fsRaf = requestAnimationFrame(fsLoop);
}
document.querySelectorAll('#segMode input').forEach(i => i.addEventListener("change", () => { S.mode = i.value; update(); }));
document.querySelectorAll('#segFSType input').forEach(i => i.addEventListener("change", () => { S.fs.type = i.value; if (i.value === "grad") S.fs.n = 2; update(); }));
document.querySelectorAll('#segFSSp input').forEach(i => i.addEventListener("change", () => { S.fs.sp = i.value; update(); }));
$("fsQ").addEventListener("input", e => { S.fs.q = Number(e.target.value); update(); });
document.querySelectorAll('#segFSView input').forEach(i => i.addEventListener("change", () => { S.fs.view = i.value; update(); }));
$("fsF").addEventListener("input", e => { S.fs.fi = Number(e.target.value); update(); });
$("fsAuto").addEventListener("click", () => {
  const lam = speedOfSound(S.T) / FSF[S.fs.fi], q = S.fs.type === "end" || S.fs.type === "grad";
  S.fs.d = Math.round(lam / (q ? 4 : 2) * 100) / 100; update();
});

/* Start */
fillSelect($("selA"), S.A);
fillSelect($("selB"), S.B);
fillSelect($("fselA"), S.fs.A, true);
fillSelect($("fselB"), S.fs.B);
fillSelect($("fselC"), S.fs.C);
syncModels();
update();

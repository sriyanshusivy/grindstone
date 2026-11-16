// Solved examples (kind 'ex'), practice ('pr') and end-semester questions ('pyq').
// by: 'notes' = solution printed in the slides; 'studio' = solution written for this site.
const md = String.raw;
export const PROBLEMS = {
  // ================= LAWS =================
  'ex-laws-1': { topic: 'laws', kind: 'ex', lvl: 1, title: 'Same crusher, new duty: three laws, three answers', src: 'A:22-28;C:26-32', by: 'notes',
    q: md`A material is crushed in a Blake jaw crusher so that the average particle size falls from 50 mm to 10 mm, using 13.0 kW/(kg/s). What energy is needed to crush the same material from 75 mm to 25 mm, assuming (a) Rittinger's law, (b) Kick's law, (c) Bond's law? Which result is more reliable?`,
    steps: [
      ['Read the units', md`13.0 kW per kg/s is 13.0 kJ/kg. Each law has one unknown constant, so the first duty fixes the constant and the second duty uses it.`],
      ['Rittinger', md`$13.0 = K_R'\left(\tfrac{1}{10}-\tfrac{1}{50}\right) \Rightarrow K_R' = 162.5$ kJ·mm/kg.

$E = 162.5\left(\tfrac{1}{25}-\tfrac{1}{75}\right) = 4.33$ kJ/kg`],
      ['Kick', md`$13.0 = K_k\ln\tfrac{50}{10} \Rightarrow K_k = 8.08$ kJ/kg.

$E = 8.08\,\ln\tfrac{75}{25} = 8.87$ kJ/kg`],
      ['Bond', md`$13.0 = K_b\left(\tfrac{1}{\sqrt{10}}-\tfrac{1}{\sqrt{50}}\right) \Rightarrow K_b = 74.36$ kJ·mm$^{1/2}$/kg.

$E = 74.36\left(\tfrac{1}{\sqrt{25}}-\tfrac{1}{\sqrt{75}}\right) = 6.28$ kJ/kg`],
      ['Which one to trust', md`Both duties are coarse crushing (tens of millimetres), where very little new surface is made. The slides conclude that Bond's or Kick's law gives the better estimate here; Rittinger's law is meant for fine grinding.`],
    ],
    ans: md`Rittinger 4.33 kJ/kg, Kick 8.87 kJ/kg, Bond 6.28 kJ/kg. Prefer Kick or Bond for this size range.`,
    note: md`Rittinger gives the lowest figure because the second duty creates much less new surface per kilogram than the first, even though its reduction ratio (3) is not far from the first (5).` },

  'pr-laws-2': { topic: 'laws', kind: 'pr', lvl: 1, title: 'One decade coarse, one decade fine', by: 'studio',
    q: md`A mill uses 20 kWh/t to reduce a solid from 10 mm to 1 mm. Estimate the energy to reduce it from 1 mm to 0.1 mm by each of the three laws.`,
    steps: [
      ['Kick', md`Same reduction ratio (10), so the same energy: **20 kWh/t**.`],
      ['Rittinger', md`$K_R' = 20/(1/1-1/10) = 22.2$. Then $E = 22.2\,(1/0.1-1/1) = $ **200 kWh/t**.`],
      ['Bond', md`$K_b = 20/(1-1/\sqrt{10}) = 29.25$. Then $E = 29.25\,(1/\sqrt{0.1}-1) = $ **63.2 kWh/t**.`],
    ],
    ans: md`Kick 20, Bond 63.2, Rittinger 200 kWh/t.`,
    note: md`The three laws agree at the calibration point and fan out as you move to finer sizes: by a factor of $10^{n-1}$ per decade.` },

  'pr-laws-3': { topic: 'laws', kind: 'pr', lvl: 2, title: 'Integrate the general law', by: 'studio',
    q: md`Starting from $dE = -C\,dL/L^{n}$, integrate from feed size $D_F$ to product size $D_P$ for $n = 1$, $n = 2$ and $n = 1.5$, and identify each result.`,
    steps: [
      ['n = 1', md`$E = -C\int_{D_F}^{D_P}\frac{dL}{L} = C\ln\frac{D_F}{D_P}$, which is Kick's law with $K_k = C$.`],
      ['n = 2', md`$E = -C\int_{D_F}^{D_P}L^{-2}\,dL = C\left(\frac{1}{D_P}-\frac{1}{D_F}\right)$, which is Rittinger's law.`],
      ['n = 1.5', md`$E = -C\int_{D_F}^{D_P}L^{-3/2}\,dL = 2C\left(\frac{1}{\sqrt{D_P}}-\frac{1}{\sqrt{D_F}}\right)$, which is Bond's law with $K_b = 2C$.`],
    ],
    ans: md`Kick: $C\ln(D_F/D_P)$. Rittinger: $C(1/D_P-1/D_F)$. Bond: $2C(1/\sqrt{D_P}-1/\sqrt{D_F})$.`, src: 'C:23' },

  // ================= BOND =================
  'ex-bond-cost': { topic: 'bond', kind: 'ex', lvl: 2, title: 'Annual cost of grinding an ore', src: 'A:34-39;C:33-38', by: 'notes',
    q: md`A grinder that is 8 % efficient handles 10 tonnes/h of an ore (specific gravity 2.65, work index 13.57 kWh/tonne). The grinder costs Rs. 40,000, runs 24 h a day for 300 days a year and depreciates on a straight line over 10 years. Miscellaneous costs are 50 % of the power cost and electricity costs 70 paise per kWh. Estimate the annual processing cost.

| Screen size, mm | Feed | Product |
|---|---|---|
| −3.327 +2.362 | 0.143 | 0 |
| −2.362 +1.651 | 0.211 | 0 |
| −1.651 +1.168 | 0.230 | 0 |
| −1.168 +0.833 | 0.186 | 0.098 |
| −0.833 +0.589 | 0.120 | 0.234 |
| −0.589 +0.417 | 0.076 | 0.277 |
| −0.417 +0.295 | 0.034 | 0.149 |
| −0.295 +0.208 | 0 | 0.101 |
| −0.208 +0.147 | 0 | 0.068 |
| −0.147 +0.104 | 0 | 0.044 |
| −0.104 | 0 | 0.029 |`,
    steps: [
      ['Choose the law', md`A work index is given, so use Bond: $E/M = 0.3162\,W_i\,(1/\sqrt{D_P}-1/\sqrt{D_F})$ with the **80 % passing** sizes in mm.`],
      ['Cumulative undersize', md`Add the mass fractions from the finest size upward. For the product: 0.029, 0.073, 0.141, 0.242, 0.391, 0.668, 0.902, 1.0 at 0.104, 0.147, 0.208, 0.295, 0.417, 0.589, 0.833, 1.168 mm. For the feed: 0.034, 0.110, 0.230, 0.416, 0.646, 0.857, 1.0 at 0.417, 0.589, 0.833, 1.168, 1.651, 2.362, 3.327 mm.`],
      ['Read the 80 % sizes', md`From the plotted curves the slides read $D_P = 0.7$ mm and $D_F = 2.12$ mm.`],
      ['Net energy', md`$\dfrac{E}{10} = 0.3162\times13.57\left(\dfrac{1}{\sqrt{0.7}}-\dfrac{1}{\sqrt{2.12}}\right) \Rightarrow E = 21.816$ kW of useful grinding power.`],
      ['Power actually drawn', md`At 8 % efficiency the input is $21.816/0.08 = 272.7$ kW.`],
      ['Annual cost', md`Energy per year $= 272.696\times24\times300 = 19{,}63{,}414$ kWh.

Power cost $= 19{,}63{,}414\times0.70 \approx$ Rs. 13.744 lakh. Miscellaneous $= 50\,\% \approx$ Rs. 6.872 lakh. Depreciation $= 40{,}000/10 =$ Rs. 4,000.`],
    ],
    ans: md`About **Rs. 20.66 lakh per year** (13.744 + 6.872 + 0.04).`,
    note: md`Straight-line interpolation of the tables gives 0.73 mm and 2.17 mm instead of the 0.7 and 2.12 mm read from the hand-drawn curve. The answer shifts by only a few percent, and either reading is acceptable if you show the plot.` },

  'ex-bond-sugar': { topic: 'bond', kind: 'ex', lvl: 2, title: 'Will the existing motor cope?', src: 'A:29-33;C:39-43', by: 'notes',
    q: md`Sugar crystals (80 % passing 500 µm) are ground until 80 % passes 88 µm, using a motor that delivers 5 HP while working at 90 % of its full power. The duty changes: grind only to 80 % passing 125 µm, but raise the throughput by 50 %. Can the existing motor do it? Assume Bond's law.`,
    steps: [
      ['Write Bond for the first duty', md`With $D_P$ in µm: $\dfrac{E_1}{m_1} = \dfrac{5}{m_1} = W_i\sqrt{\dfrac{100}{88}}\left(1-\sqrt{\dfrac{88}{500}}\right)$`],
      ['Second duty', md`$m_2 = 1.5\,m_1$ and $D_P = 125$ µm: $\dfrac{E_2}{1.5\,m_1} = W_i\sqrt{\dfrac{100}{125}}\left(1-\sqrt{\dfrac{125}{500}}\right)$. The work index does not change because the material is the same.`],
      ['Divide', md`$\dfrac{E_2}{1.5\times5} = \dfrac{\sqrt{100/125}\,(1-\sqrt{125/500})}{\sqrt{100/88}\,(1-\sqrt{88/500})} = \dfrac{0.4472}{0.6188} \Rightarrow E_2 = 5.42$ HP (the slides round this to 5.43)`],
      ['Compare with the motor', md`Full power of the motor $= 5/0.9 = 5.56$ HP, which is more than 5.42 HP.`],
    ],
    ans: md`Yes. The motor has enough power and would run at about **98 %** of full load.`,
    note: md`The coarser product saves more energy per tonne than the extra 50 % throughput costs, but only just.` },

  'pr-bond-limestone': { topic: 'bond', kind: 'pr', lvl: 1, title: 'Very large feed to 50 µm', src: 'A:101', by: 'studio',
    q: md`The energy required per unit mass to grind limestone particles of very large size to 100 µm is 12.7 kWh/ton. Estimate, using Bond's law, the energy to grind the particles from a very large size to 50 µm.`,
    steps: [
      ['Very large feed', md`$1/\sqrt{D_F}\to0$, so $E/M = K_b/\sqrt{D_P}$ and the energy scales as $1/\sqrt{D_P}$.`],
      ['Scale', md`$E_2 = 12.7\sqrt{100/50} = 12.7\times1.414$`],
    ],
    ans: md`**17.96 kWh/ton**`,
    note: md`The 12.7 kWh/ton is the work index itself, by definition.` },

  'pr-bond-power': { topic: 'bond', kind: 'pr', lvl: 1, title: 'Power for a limestone crusher', by: 'studio',
    q: md`Limestone ($W_i = 12.74$ kWh/tonne) is crushed at 100 t/h. 80 % of the feed passes 50 mm and 80 % of the product passes 3 mm. Find the net power.`,
    steps: [
      ['Bond, sizes in mm', md`$E/M = 0.3162\times12.74\left(\dfrac{1}{\sqrt{3}}-\dfrac{1}{\sqrt{50}}\right) = 4.028\times0.4359 = 1.756$ kWh/t`],
      ['Power', md`$1.756\times100 = 175.6$ kW`],
    ],
    ans: md`About **176 kW** net.` },

  'pyq24-1': { topic: 'bond', kind: 'pyq', lvl: 2, title: 'Work index from a laboratory mill', src: 'Y24:Q1', by: 'studio', marks: '2 + 3 = 5',
    q: md`In a laboratory experiment to determine the work index of a copper-zinc ore, a sample of 1000 grams of the ore was ground in a laboratory mill for 12 minutes. The power input to the empty mill (containing only the ball charge) was recorded as 226.9 watts, while the power input when grinding the sample was 283.2 watts. The feed to the mill was 80 % passing 1530 microns, and the product was 80 % passing 79 microns. Calculate (a) the net kWh per ton of ore needed to grind the ore from 1530 microns to 79 microns, (b) the work index of the ore.`,
    steps: [
      ['Net power', md`Subtract the empty-mill power: $283.2-226.9 = 56.3$ W goes into the ore.`],
      ['(a) Net energy per ton', md`$56.3\ \text{W}\times\dfrac{12}{60}\ \text{h} = 11.26$ Wh for 1 kg, which is **11.26 kWh per tonne**.`],
      ['(b) Work index', md`With sizes in µm, $E/M = 10\,W_i\left(\dfrac{1}{\sqrt{79}}-\dfrac{1}{\sqrt{1530}}\right) = 10\,W_i\,(0.11251-0.02557) = 0.8694\,W_i$.

$W_i = 11.26/0.8694 = 12.95$ kWh/tonne`],
    ],
    ans: md`(a) 11.26 kWh/t; (b) $W_i \approx$ **12.95 kWh/t**.`,
    note: md`This takes "ton" as the metric tonne (1000 kg). The empty-mill subtraction is the same idea as the theoretical effectiveness in the surface topic.` },

  // ================= SURFACE =================
  'ex-surf-cone': { topic: 'surface', kind: 'ex', lvl: 3, title: 'Cone crusher in closed circuit: overall and theoretical effectiveness', src: 'C:94-107', by: 'notes',
    q: md`A hard rock (specific gravity 3.8) is fed at 5000 kg/h to a cone crusher in closed circuit with a screen. All the undersize from the screen passes a 0.592 mm mesh. Drop-weight tests show that 0.98 J of mechanical energy creates 175 cm² of new surface, and the specific surface ratios are the same as for sphalerite. The crusher draws 4 kW empty and 7.5 kW when delivering 5000 kg/h. Estimate the overall and theoretical energy effectiveness.

| Screen size, mm | $d_{avg}$, cm | $n$ | Raw feed $x_F$ | Crusher discharge $x_M$ | Screen oversize $x_R$ |
|---|---|---|---|---|---|
| −6.680 +4.699 | 0.569 | 5.0 | 0.10 | 0 | 0 |
| −4.699 +3.327 | 0.4013 | 4.6 | 0.20 | 0 | 0 |
| −3.327 +2.362 | 0.2845 | 4.2 | 0.40 | 0 | 0 |
| −2.362 +1.651 | 0.2007 | 3.8 | 0.20 | 0 | 0 |
| −1.651 +1.168 | 0.141 | 3.4 | 0.10 | 0.02 | 0.03 |
| −1.168 +0.833 | 0.1001 | 3.3 | 0 | 0.04 | 0.06 |
| −0.833 +0.592 | 0.0712 | 2.7 | 0 | 0.06 | 0.09 |
| −0.592 +0.417 | 0.0506 | 2.5 | 0 | 0.25 | 0.35 |
| −0.417 +0.296 | 0.0356 | 2.4 | 0 | 0.30 | 0.30 |
| −0.296 +0.208 | 0.0252 | 2.2 | 0 | 0.20 | 0.08 |
| −0.208 +0.147 | 0.0178 | 2.0 | 0 | 0.06 | 0.05 |
| −0.147 +0.104 | 0.0126 | 1.8 | 0 | 0.04 | 0.04 |
| −0.104 +0.074 | 0.0089 | 1.6 | 0 | 0.03 | 0 |`,
    steps: [
      ['Plan', md`Energy that makes new surface is $E = \dot M\,(s_P-s_F)/R_N$. We know the raw feed analysis, but the product $P$ (screen undersize) is not given, so find it from a balance around the screen.`],
      ['Rittinger number', md`$R_N = 175/0.98 = 178.57$ cm²/J`],
      ['Screen balance', md`$M = P + R$ and $M x_M = P x_P + R x_R$ give $\dfrac{M}{P}x_M = x_P + \left(\dfrac{M}{P}-1\right)x_R$.

Nothing coarser than 0.592 mm is in $P$. Take the −1.168 +0.833 mm fraction: $x_P = 0$, $x_M = 0.04$, $x_R = 0.06$, so $M/P = 3$ and

$x_P = 3x_M - 2x_R$`],
      ['Product analysis', md`Applying this to the six fine fractions: $x_P =$ 0.05, 0.30, 0.44, 0.08, 0.04, 0.09 (they add to 1.00).`],
      ['Specific surfaces', md`$\sum n\,x_F/d_{avg} = 15.29$ cm⁻¹ and $\sum n\,x_P/d_{avg} = 92.01$ cm⁻¹.

$s_P-s_F = \dfrac{6}{3.8}(92.01-15.29) = 121.137$ cm²/g $= 1{,}21{,}137$ cm²/kg`],
      ['Energy for new surface', md`$E = \dfrac{1{,}21{,}137}{178.57}\times\dfrac{5000}{3600} = 942.2$ W`],
      ['Efficiencies', md`Overall $= \dfrac{942.2}{7500}\times100 = 12.56\,\%$. Theoretical $= \dfrac{942.2}{(7.5-4)\times1000}\times100 = 26.92\,\%$.`],
    ],
    ans: md`Overall energy efficiency **12.56 %**, theoretical effectiveness **26.92 %**.`,
    note: md`Two entries in the slide's $x_R$ column do not fit its own solution: 0.30 for −1.651 +1.168 mm and 0.05 for −0.592 +0.417 mm. With $x_P = 3x_M - 2x_R$ they must be **0.03** and **0.35**, which also makes the column add to 1.00. The table above uses the corrected values.` },

  'ex-surf-sphal': { topic: 'surface', kind: 'ex', lvl: 3, title: 'Sphalerite crusher with a 0.417 mm screen', src: 'A:53-62', by: 'notes',
    q: md`Sphalerite (density 4000 kg/m³) is fed to a crusher at 10 000 kg/h in closed circuit with a 0.417 mm screen. The crusher draws 3.5 kW empty and 6.5 kW when crushing. Using Rittinger's number for sphalerite, compute the overall and theoretical efficiency.

| Mesh size, mm | Make-up feed $F$ | Crusher discharge $P_c$ | Screen oversize $R$ | $n$ |
|---|---|---|---|---|
| −6.680 +4.699 | 0.07 | 0 | 0 | 5.0 |
| −4.699 +3.327 | 0.22 | 0 | 0 | 4.6 |
| −3.327 +2.362 | 0.35 | 0 | 0 | 4.2 |
| −2.362 +1.651 | 0.24 | 0 | 0 | 3.8 |
| −1.651 +1.168 | 0.08 | 0.02 | 0.03 | 3.4 |
| −1.168 +0.833 | 0.04 | 0.04 | 0.06 | 3.3 |
| −0.833 +0.592 | 0 | 0.06 | 0.09 | 2.7 |
| −0.592 +0.417 | 0 | 0.08 | 0.12 | 2.5 |
| −0.417 +0.296 | 0 | 0.32 | 0.34 | 2.4 |
| −0.296 +0.208 | 0 | 0.29 | 0.22 | 2.2 |
| −0.208 +0.147 | 0 | 0.12 | 0.09 | 2.0 |
| −0.147 +0.104 | 0 | 0.05 | 0.05 | 1.8 |
| −0.104 +0.074 | 0 | 0.02 | 0 | 1.6 |`,
    steps: [
      ['Product from the screen balance', md`Nothing coarser than 0.417 mm reaches the product. From any coarse fraction, for example 0.04 and 0.06, $M/P = 3$, so $x_{PF} = 3x_{Pc}-2x_R$. The fine fractions give $x_{PF} =$ 0.28, 0.43, 0.18, 0.05, 0.06.`],
      ['Sum for feed and product', md`With $d_{avg}$ in metres: $\sum n\,x_F/d_{avg} = 1609.9$ m⁻¹ and $\sum n\,x_{PF}/d_{avg} = 9462.9$ m⁻¹.`],
      ['Energy per kg', md`$\dfrac{E}{M} = \dfrac{6\,(9462.9-1609.9)}{4000\times0.0573} = 205.6$ J/kg`],
      ['Power for new surface', md`$E = 205.6\times\dfrac{10\,000}{3600} = 571.0$ W`],
      ['Efficiencies', md`Overall $= 571.0/6500 = 8.785\,\%$. Theoretical $= 571.0/(6500-3500) = 19.03\,\%$.`],
    ],
    ans: md`Overall **8.79 %**, theoretical **19.03 %**.`,
    note: md`The slide prints the Rittinger number as 0.573 m²/J and the third feed fraction as 0.035. Its own arithmetic (and the Rittinger table) uses **0.0573 m²/J**, and the feed column only adds to 1 with **0.35**. Both are corrected here.` },

  'pr-surf-calcite': { topic: 'surface', kind: 'pr', lvl: 3, title: 'Blake jaw crusher on calcite, then quartz', src: 'A:85-86', by: 'studio',
    q: md`A 60 × 40 cm Blake jaw crusher is fed calcite at 45 tonne/h and is driven by a 30 HP motor. (a) Find the efficiency of the crusher if the motor runs at one sixth of its rating. (b) How many tonne/h of quartz could be reduced over the same size range with the same power? Take SG calcite 2.71, SG quartz 2.65, Rittinger's number 76.05 cm²/(kg·cm) for calcite and 17.51 cm²/(kg·cm) for quartz, and 1 kg·m/s = 0.01315 hp. The specific surface ratios are the same for both.

| Average size, cm | Feed | Product | $n$ |
|---|---|---|---|
| 42.6 | 0.16 | 0 | 10.0 |
| 30.1 | 0.34 | 0 | 9.7 |
| 21.3 | 0.24 | 0 | 9.5 |
| 15.07 | 0.17 | 0 | 9.0 |
| 10.66 | 0.09 | 0.06 | 8.6 |
| 7.54 | 0 | 0.19 | 8.0 |
| 5.33 | 0 | 0.44 | 7.2 |
| 3.77 | 0 | 0.24 | 6.6 |
| 2.67 | 0 | 0.07 | 6.2 |`,
    steps: [
      ['Sums', md`$\sum n\,x_F/d = 0.4283$ cm⁻¹ and $\sum n\,x_P/d = 1.4271$ cm⁻¹, so the difference is 0.9988 cm⁻¹.`],
      ['New surface for calcite', md`$s_P-s_F = \dfrac{6}{2.71}\times0.9988 = 2.211$ cm²/g $= 2211$ cm²/kg`],
      ['Energy for new surface', md`$2211/76.05 = 29.08$ kg·cm per kg $= 0.2908$ kg·m per kg. At 45 t/h $= 12.5$ kg/s this is $3.635$ kg·m/s $= 0.0478$ hp.`],
      ['(a) Efficiency', md`Motor output $= 30/6 = 5$ hp. Efficiency $= 0.0478/5 = 0.96\,\%$.`],
      ['(b) Quartz', md`$s_P-s_F = \dfrac{6}{2.65}\times0.9988 = 2261$ cm²/kg. Energy $= 2261/17.51 = 129.2$ kg·cm/kg $= 1.292$ kg·m/kg. With the same 3.635 kg·m/s: $3.635/1.292 = 2.81$ kg/s $= 10.1$ t/h.`],
    ],
    ans: md`(a) about **0.96 %**; (b) about **10.1 tonne/h** (the slide quotes 10.2).`,
    note: md`Quartz has a Rittinger number about four times smaller than calcite, so the same power crushes roughly a quarter of the tonnage.` },

  // ================= JAW / GYRATORY / HAMMER =================
  'pr-jaw-size': { topic: 'jaw', kind: 'pr', lvl: 1, title: 'Size a primary jaw crusher from its gape', by: 'studio',
    q: md`A Blake jaw crusher has a gape of 0.6 m. Using the rules of thumb from the notes, estimate the largest feed lump, the vertical height, the range of jaw width and the throw.`,
    steps: [
      ['Feed, height, width', md`$d_{max} = 0.9\times0.6 = 0.54$ m. Height $\approx 2\times0.6 = 1.2$ m. Width between $1.3\times0.6 = 0.78$ m and $3\times0.6 = 1.8$ m.`],
      ['Throw', md`With $G$ in metres: $0.0502\times0.6^{0.85} = 0.0325$ m, about 33 mm. If you put $G = 600$ mm into the same formula you get 11.5 mm instead.`],
    ],
    ans: md`0.54 m lumps, 1.2 m high, 0.78 to 1.8 m wide, throw about 33 mm (metre basis).`,
    note: md`A power-law correlation depends on its units. Lectures 14 to 19 say "mm if gape is mm"; the textbook form of this correlation takes the gape in metres. State which one you use.` },

  'pr-gyr-select': { topic: 'gyratory', kind: 'pr', lvl: 1, title: 'Jaw or gyratory?', src: 'A:90', by: 'studio',
    q: md`A plant needs 25 tons/h through a primary crusher with a 12 inch gape. Use the capacity test from the notes to choose between a jaw and a gyratory crusher.`,
    steps: [
      ['Gape area', md`$L = 1.7D = 20.4$ in, so $L\times D = 244.8$ in².`],
      ['Ratio', md`$25/244.8 = 0.102$, which is below 0.115.`],
    ],
    ans: md`Choose a **jaw crusher**. A gyratory of this gape would be badly under-used.` },

  'pr-hammer': { topic: 'hammer', kind: 'pr', lvl: 1, title: 'Blow force and capacity of a hammer mill', by: 'studio',
    q: md`(a) A 10 kg hammer moving at 40 m/s strikes an inelastic rock. Estimate the maximum force of the blow. (b) A hammer mill has a rotor 1.0 m in diameter and 1.2 m long, turning at 900 rpm. Take $K = 5$ and a reduction ratio of 10. Estimate its capacity.`,
    steps: [
      ['(a) Force', md`$F_{max} = 1.5\,W\dfrac{u}{g\,t}$ with $W/g = 10$ kg and $t = 0.002$ s: $F_{max} = 1.5\times10\times\dfrac{40}{0.002} = 3.0\times10^{5}$ N.`],
      ['(b) Capacity', md`$Q = \dfrac{5\times1.0^{2}\times1.2\times900^{2}}{3600\,(10-1)} = 150$ tons/h`],
    ],
    ans: md`(a) about 300 kN (600 kN for a highly elastic material, $t = 0.001$ s); (b) 150 tons/h.` },

  // ================= ROLLS =================
  'ex-roll-gate': { topic: 'rolls', kind: 'ex', lvl: 1, title: 'Largest particle a pair of rolls can nip', src: 'A:101', by: 'studio',
    q: md`In a roll crusher, rolls of diameter 1 m each are set so that the minimum clearance between the crushing surfaces is 15 mm. If the angle of nip is 31°, what is the maximum diameter of particle that can be crushed?`,
    steps: [
      ['Half angle', md`The angle of nip is $2\theta = 31°$, so $\theta = 15.5°$ and $\cos\theta = 0.9636$.`],
      ['Geometry', md`$\cos\theta = \dfrac{R + L/2}{R + d/2}$ with $R = 500$ mm and $L = 15$ mm:

$500 + \dfrac{d}{2} = \dfrac{507.5}{0.9636} = 526.7$ mm`],
      ['Solve', md`$d = 2\times26.7 = 53.3$ mm`],
    ],
    ans: md`About **53 mm**.`,
    note: md`A 1 m roll only nips a 53 mm lump. Smooth rolls need to be large compared with their feed, which is why their reduction ratio is small.` },

  'pyq23-3': { topic: 'rolls', kind: 'pyq', lvl: 3, title: 'Roll diameter and the effect of lower friction', src: 'Y23:Q3', by: 'studio', marks: '2 + 3 = 5',
    q: md`(a) Find the diameter of the rotating rolls ($D$) in a roll crusher as a function of the average diameter of feed ($d$), the gap between the rolls ($L$), and the nip angle. Draw a schematic and mark the relevant parameters. (b) In case of damage to one of the rolls, both the rolls of a roll crusher are generally replaced, which leads to a 10 % reduction in $\mu$ (the static coefficient of friction between roll surface and particles). How will this affect the capacity of the roll crusher? Data: $Q = \pi\,60\,D\,W\,\nu\,L\,\rho_B$ t/h, where $\nu$ = roll speed (rpm), $\rho_B$ = bulk SG of the mineral (t/m³) and $W$ = width of roll (m).`,
    steps: [
      ['(a) Geometry', md`Join the roll centre to the particle centre. That line has length $R + d/2$ and makes the angle $\theta$ (half the nip angle) with the line of roll centres. Its projection on the line of centres is $R + L/2$:

$\cos\theta = \dfrac{R + L/2}{R + d/2} \;\Rightarrow\; D = 2R = \dfrac{L - d\cos\theta}{\cos\theta-1} = \dfrac{d\cos\theta - L}{1-\cos\theta}$

Sketch two rolls of diameter $D$, the gap $L$ on the line of centres, the particle of diameter $d$ resting in the gap, and the angle $2\theta$ between the two tangents at the contact points.`],
      ['Where friction enters', md`The particle is nipped only if $\tan\theta \le \mu$, so the largest usable half angle is $\theta = \tan^{-1}\mu$. The capacity formula has no $\mu$ in it; friction acts through the geometry.`],
      ['(b) New rolls, lower friction', md`With $\mu' = 0.9\mu$ the limiting angle falls, $\theta' = \tan^{-1}(0.9\mu) < \theta$, and $1-\cos\theta$ falls by about 19 %. The rolls are the same diameter and the feed is the same, so the gap must open to $L' = d\cos\theta' - D(1-\cos\theta')$ for the feed still to be nipped.`],
      ['Effect on capacity', md`With $D$, $W$, $\nu$ and $\rho_B$ unchanged, $Q \propto L$, so $\dfrac{Q'}{Q} = \dfrac{L'}{L} = \dfrac{d\cos\theta' - D(1-\cos\theta')}{d\cos\theta - D(1-\cos\theta)} > 1$.

For example, $D = 1000$ mm, $d = 50$ mm and $\mu = 0.30$ give $L = 5.7$ mm before and $L' = 13.7$ mm after.`],
    ],
    ans: md`(a) $D = \dfrac{d\cos\theta - L}{1-\cos\theta}$, with $2\theta$ the nip angle. (b) Lower $\mu$ means a smaller nip angle. To keep nipping the same feed the set $L$ has to be opened, so the ribbon capacity $Q \propto L$ rises, but the product is coarser.`,
    note: md`No official solution is available, so state your assumption. If you instead hold the set $L$ fixed, $Q$ from the formula is unchanged and the cost shows up as a smaller maximum feed size, $d_{max} = \dfrac{L + D(1-\cos\theta')}{\cos\theta'}$ (41.7 mm instead of 50 mm in the example); larger lumps ride on the rolls and real throughput drops.` },

  'pr-roll-5': { topic: 'rolls', kind: 'pr', lvl: 3, title: 'Checking a smooth roll crusher for 10 t/h', src: 'A:100', by: 'studio',
    q: md`A smooth-surfaced roll crusher has a roll diameter of 910 mm. Its suitability to crush an ore at 10.0 t/h is being examined. The kinetic friction factor was 0.036 when the speed of revolution was 33 rpm. The average diameter of the feed particles is 200 mm and the SG of the ore is 2.8. Estimate (1) the distance between the rolls, (2) the angle of nip, (3) the width of the rolls.`,
    steps: [
      ['Peripheral speed', md`$\nu_P = \pi D N/60 = \pi\times0.91\times33/60 = 1.572$ m/s`],
      ['Static friction', md`$\mu_K = \dfrac{1+1.12\nu}{1+6\nu}\,\mu$ with $\nu = 1.572$: $0.036 = 0.2646\,\mu$, so $\mu = 0.136$.`],
      ['(2) Angle of nip', md`$\theta = \tan^{-1}0.136 = 7.74°$, so the angle of nip is $2\theta \approx 15.5°$.`],
      ['(1) Set', md`From $\cos\theta = \dfrac{R+L/2}{R+d/2}$: $L = d\cos\theta - D(1-\cos\theta) = 200\times0.9909 - 910\times0.0091 = 189.9$ mm`],
      ['(3) Width', md`$Q = \pi\,60\,D\,W\,\nu\,L\,\rho_B$: $10 = \pi\times60\times0.91\times W\times33\times0.1899\times2.8 = 3010\,W$, so $W \approx 0.0033$ m.`],
    ],
    ans: md`Set about **190 mm**, angle of nip about **15.5°**, ideal width about **3 mm**.`,
    note: md`The slides give no solution; this one follows their formulas step by step. Two things to know. First, the slide labels $\nu$ in the Wills relation as rpm, but the relation is normally used with the peripheral speed in m/s, as here (with 33 rpm instead you get $\mu = 0.189$, $2\theta = 21.4°$, $L = 180.7$ mm). Second, the tiny width only says that width does not limit a 10 t/h duty with such a wide set; in practice the rolls must be wider than the 200 mm feed.` },

  // ================= BALL MILL =================
  'ex-ball-4': { topic: 'ballmill', kind: 'ex', lvl: 1, title: 'Changing the ball size', src: 'B:12-13', by: 'notes',
    q: md`In a ball mill of 2000 mm diameter, 100 mm steel balls are used for grinding at a speed of 15 rpm. At what speed must the mill run if the 100 mm balls are replaced by 50 mm balls, all other conditions remaining the same?`,
    steps: [
      ['Critical speed now', md`$N_c = \dfrac{42.3}{\sqrt{2-0.1}} = 30.69$ rpm`],
      ['Fraction of critical', md`$15/30.69 = 48.9\,\%$. "All other conditions the same" means keeping this fraction.`],
      ['Critical speed with 50 mm balls', md`$N_c = \dfrac{42.3}{\sqrt{2-0.05}} = 30.29$ rpm`],
      ['New speed', md`$0.489\times30.29 = 14.8$ rpm`],
    ],
    ans: md`About **14.8 rpm**.`,
    note: md`The slide prints 30.26 and 14.79 rpm; the square root works out to 30.29. Ball size barely matters because $d \ll D$: the mill diameter sets the critical speed.` },

  'pyq23-4': { topic: 'ballmill', kind: 'pyq', lvl: 2, title: 'Recommended speed range for a ball mill', src: 'Y23:Q4', by: 'studio', marks: '2 + 3 = 5',
    q: md`(a) Derive the expression for finding the critical speed in a ball mill. (b) What rotational speed range, in revolutions per minute, would you recommend for a ball mill of 1200 mm in diameter charged with 75 mm balls? The operating speed of the ball mill is 60 to 80 % of the critical speed.`,
    steps: [
      ['(a) Force balance', md`A ball of mass $M$ at angle $\theta$ from the top travels on a circle of radius $R-r$. It stays on the wall while the centripetal force needed is at least the radial component of its weight; it leaves where $Mg\cos\theta = \dfrac{Mv^{2}}{R-r}$.`],
      ['Critical condition', md`At the critical speed the ball is carried right to the top, $\theta = 0$: $g = \dfrac{v_c^{2}}{R-r}$. With $v_c = 2\pi(R-r)N_c$,

$N_c = \dfrac{1}{2\pi}\sqrt{\dfrac{g}{R-r}} = \dfrac{1}{2\pi}\sqrt{\dfrac{2g}{D-d}}$ rev/s $= \dfrac{42.3}{\sqrt{D-d}}$ rpm ($D$, $d$ in m).`],
      ['(b) Numbers', md`$N_c = \dfrac{42.3}{\sqrt{1.2-0.075}} = 39.88$ rpm. Then $0.6N_c = 23.9$ rpm and $0.8N_c = 31.9$ rpm.`],
    ],
    ans: md`$N_c = 42.3/\sqrt{D-d}$ rpm; run the mill at about **24 to 32 rpm**.` },

  'pyq24-2': { topic: 'ballmill', kind: 'pyq', lvl: 2, title: 'A ball mill that is not grinding', src: 'Y24:Q2', by: 'studio', marks: '2 + 3 = 5',
    q: md`(a) Derive the expression for finding the critical speed in a ball mill. (b) A ball mill, 1.2 m in diameter, is run at 0.80 Hz and it is found that the mill is not working properly when grinding very small particles. Should any modification in the conditions of operation be suggested? The optimum speed of rotation is 60 % of the critical speed.`,
    steps: [
      ['(a)', md`Same derivation as the 2023 question: $Mg\cos\theta = Mv^{2}/(R-r)$, set $\theta = 0$, and $N_c = \dfrac{1}{2\pi}\sqrt{\dfrac{g}{R-r}}$.`],
      ['Critical speed', md`No ball size is given, and the balls are small compared with the mill, so take $R-r \approx R = 0.6$ m:

$N_c = \dfrac{1}{2\pi}\sqrt{\dfrac{9.81}{0.6}} = 0.644$ Hz $= 38.6$ rpm`],
      ['Diagnosis', md`The mill runs at 0.80 Hz (48 rpm), which is 124 % of critical. The charge is centrifuging: it rides round with the shell and neither falls nor rubs, so nothing is ground.`],
      ['Remedy', md`Optimum speed $= 0.6\times0.644 = 0.39$ Hz, about 23 rpm.`],
    ],
    ans: md`Yes. Reduce the speed from 0.80 Hz to about **0.39 Hz (23 rpm)**, roughly half the present speed.` },

  'pr-ball-angle': { topic: 'ballmill', kind: 'pr', lvl: 2, title: 'Where does the ball leave the wall?', by: 'studio',
    q: md`A ball mill 3 m in diameter is charged with 80 mm balls and run at 70 % of its critical speed. Find the critical speed, the operating speed, and the angle from the top at which an outer ball leaves the shell.`,
    steps: [
      ['Critical and operating speed', md`$N_c = 42.3/\sqrt{3-0.08} = 24.75$ rpm; operating speed $= 0.7\times24.75 = 17.3$ rpm.`],
      ['Departure angle', md`Divide the force balance by its value at critical speed: $\cos\theta = (N/N_c)^{2} = 0.49$, so $\theta = 60.7°$ from the top.`],
    ],
    ans: md`24.75 rpm, 17.3 rpm, and about **61°** from the top.`,
    note: md`$\cos\theta = (N/N_c)^2$ is worth remembering. It is what the ball mill simulation draws.` },

  // ================= CIRCUITS =================
  'ex-circ-open': { topic: 'circuits', kind: 'ex', lvl: 1, title: 'Open circuit: how much goes to the secondary crusher?', src: 'C:78-81;B:21-23', by: 'notes',
    q: md`The product of a primary crusher contains 57 % of +1 inch material and is sent to a 1 inch screen. The overflow of the screen is crushed in a secondary crusher to −1 inch and joins the screen underflow as final product. Feed to the primary crusher is 100 tons/h. Find the rate of material crushed in the secondary crusher if the screen effectiveness is (b) 80 % based on oversize, (c) 85 % based on undersize.`,
    steps: [
      ['Why this is open circuit', md`The screen overflow goes to a different crusher and never returns to the one it came from.`],
      ['True oversize and undersize', md`Screen feed: 57 t/h of +1 inch and 43 t/h of −1 inch.`],
      ['(b) Oversize basis', md`$\eta = \dfrac{\text{true oversize in feed}}{\text{overflow obtained}} = 0.80$, so overflow $= 57/0.80 = 71.25$ t/h. Underflow $= 100-71.25 = 28.75$ t/h.`],
      ['(c) Undersize basis', md`$\eta = \dfrac{\text{undersize obtained}}{\text{undersize in feed}} = 0.85$, so underflow $= 0.85\times43 = 36.55$ t/h and overflow $= 63.45$ t/h.`],
    ],
    ans: md`(b) **71.25 tons/h**; (c) **63.45 tons/h**.`,
    note: md`The older slide deck (30.10) takes overflow $= 0.8\times57 = 45.6$ t/h for part (b). That would send 11.4 t/h of oversize into the "finished" product, which contradicts the assumption that oversize cannot pass the screen.` },

  'ex-circ-closed': { topic: 'circuits', kind: 'ex', lvl: 2, title: 'Closed circuit: circulating load on a gyratory crusher', src: 'C:82-83;B:27-31', by: 'notes',
    q: md`A gyratory crusher is in closed circuit with a 2 inch square screen. New feed is 100 tons/h. The crusher product contains 54 % below 2 inch and 46 % above 2 inch. Screen efficiency is 85 %. Find the circulating load if the efficiency is based on (a) oversize, (b) undersize.`,
    steps: [
      ['Set up', md`Let $C$ be the circulating load. The crusher handles $C + 100$ t/h, and at steady state the undersize product is 100 t/h.`],
      ['(a) Oversize basis', md`True oversize in the screen feed $= 0.46(C+100)$, and the overflow is $C$:

$\dfrac{0.46\,(C+100)}{C} = 0.85 \;\Rightarrow\; C = \dfrac{46}{0.39} = 117.95$ t/h`],
      ['(b) Undersize basis', md`True undersize in the screen feed $= 0.54(C+100)$, and 100 t/h is obtained:

$\dfrac{100}{0.54\,(C+100)} = 0.85 \;\Rightarrow\; C = 117.86$ t/h`],
    ],
    ans: md`(a) **117.95 tons/h**; (b) **117.86 tons/h**.`,
    note: md`The crusher handles more than twice the fresh feed. The older deck quotes 64.20 t/h for (a), from $C = 0.85\times0.46\,(C+100)$.` },

  'ex-circ-two': { topic: 'circuits', kind: 'ex', lvl: 3, title: 'Two crushers, two screens', src: 'C:84-86;B:32-34', by: 'notes',
    q: md`A gyratory crusher (set at 2.5 inch) receives 200 tph. Its product is 80 % −2.5 inch, 40 % −1 inch and 25 % −½ inch, and goes to a 1 inch screen ($\eta = 85\,\%$). The overflow goes to a cone crusher (set at ½ inch) whose product is 70 % −½ inch. Cone crusher product and the 1 inch screen underflow both go to a ½ inch screen ($\eta = 75\,\%$), whose overflow $C$ returns to the cone crusher. Efficiencies are based on oversize. Find $C$ and the total load on the ½ inch screen.`,
    steps: [
      ['1 inch screen', md`+1 inch in its feed $= 0.60\times200 = 120$ t/h. Overflow $= 120/0.85 = 141.2$ t/h; underflow $= 200-141.2 = 58.8$ t/h.`],
      ['What is in that underflow', md`All 50 t/h of −½ inch ($0.25\times200$) passes, so the underflow carries $58.8-50 = 8.8$ t/h of +½ inch.`],
      ['Cone crusher', md`Load $= 141.2 + C$. Its product holds $0.30\,(C+141.2)$ of +½ inch.`],
      ['½ inch screen', md`True oversize fed $= 0.30\,(C+141.2) + 8.8$; overflow $= C$:

$0.75 = \dfrac{0.30\,(C+141.2)+8.8}{C} \;\Rightarrow\; C = 113.7$ t/h`],
      ['Total load', md`$141.2 + 113.7 + 58.8 = 313.7$ t/h`],
    ],
    ans: md`$C =$ **113.7 tph**; load on the ½ inch screen **313.7 tph**.`,
    note: md`The older deck's numbers (102, 98, 48, then $C = 76.06$ and 276.06 tph) come from multiplying by the efficiency instead of dividing.` },

  'ex-circ-ballmill': { topic: 'circuits', kind: 'ex', lvl: 3, title: 'Ball mill with recycle: open versus closed circuit energy', src: 'A:40-52', by: 'notes',
    q: md`A ball mill is fed with fresh feed $F = 30\times10^{3}$ kg/h. The product $P$ is screened on a 295 µm screen and the oversize is recycled at $R = 60\times10^{3}$ kg/h, so the mill feed is $F_1 = F + R$ and the screen undersize is $P_1$. The work index is 12.74 kWh/ton. Calculate the energy consumption of the mill treated as an open circuit and as a closed circuit, and the effectiveness of the 295 µm screen with oversize as the desired product.

| Mesh, µm | $F$ | $R$ | $P_1$ | | Mesh, µm | $F$ | $R$ | $P_1$ |
|---|---|---|---|---|---|---|---|---|
| −13330 +9423 | 0.051 | 0 | 0 | | −833 +589 | 0.034 | 0.209 | 0 |
| −9423 +6680 | 0.202 | 0.06 | 0 | | −589 +417 | 0.026 | 0.036 | 0.051 |
| −6680 +4699 | 0.174 | 0.07 | 0 | | −417 +295 | 0.019 | 0.026 | 0.125 |
| −4699 +3327 | 0.125 | 0.082 | 0 | | −295 +208 | 0.021 | 0.014 | 0.19 |
| −3327 +2362 | 0.085 | 0.095 | 0 | | −208 +147 | 0.017 | 0.011 | 0.131 |
| −2362 +1651 | 0.055 | 0.028 | 0 | | −147 +104 | 0.015 | 0.009 | 0.119 |
| −1651 +1168 | 0.047 | 0.155 | 0 | | −104 +74 | 0.013 | 0.006 | 0.097 |
| −1168 +833 | 0.031 | 0.169 | 0 | | −74 | 0.085 | 0.03 | 0.287 |`,
    steps: [
      ['Two ways to draw the boundary', md`**Open circuit**: look at the mill alone. Feed is $F_1$ (90 t/h), product is $P$. **Closed circuit**: look at mill plus screen. Feed is $F$ (30 t/h), product is $P_1$.`],
      ['Missing analyses', md`Mixing: $x_1 = \dfrac{F x_F + R x_R}{F + R}$, for example $(30\times0.051 + 60\times0)/90 = 0.017$ for the top size. Screen: $x_P = \dfrac{R x_R + P_1 x_{P1}}{R + P_1}$ with $P_1 = F = 30$, for example $(60\times0.06 + 0)/90 = 0.04$.`],
      ['Open circuit', md`Cumulative plots of $F_1$ and $P$ give $d_{Fb} = 5100$ µm and $d_{Pb} = 2500$ µm.

$\dfrac{E}{M} = 0.3162\times12.74\left(\dfrac{1}{\sqrt{2.5}}-\dfrac{1}{\sqrt{5.1}}\right) = 0.764$ kWh/ton, so $E = 0.764\times90 = 68.76$ kW`],
      ['Closed circuit', md`Cumulative plots of $F$ and $P_1$ give $d_{Fb} = 7150$ µm and $d_{Pb} = 3500$ µm.

$\dfrac{E}{M} = 0.3162\times12.74\left(\dfrac{1}{\sqrt{3.5}}-\dfrac{1}{\sqrt{7.15}}\right) = 0.6467$ kWh/ton, so $E = 0.6467\times30 = 19.4$ kW`],
      ['Screen effectiveness', md`$P$ is the feed to the screen, $R$ the oversize (product) and $P_1$ the reject. The fractions coarser than 295 µm are $y_A = 0.679$, $y_B = 0.93$, $y_C = 0.176$:

$E_s = \dfrac{(y_A-y_C)\,y_B}{(y_B-y_C)\,y_A}\left[1-\dfrac{(y_A-y_C)(1-y_B)}{(y_B-y_C)(1-y_A)}\right] = 0.9136\times0.8548 = 0.781$`],
    ],
    ans: md`Open circuit **68.76 kW**, closed circuit **19.4 kW**, screen effectiveness **78.1 %**.`,
    note: md`Slides 40 to 52 of the first deck are images, so this example is easy to miss when searching the PDF. The 80 % sizes are read from the slide's plots.` },

  'pyq23-1': { topic: 'circuits', kind: 'pyq', lvl: 3, title: 'Crushing circuit with two screens (mm version)', src: 'Y23:Q1', by: 'studio', marks: '3 + 2 = 5',
    q: md`A gyratory crusher receives 200 tph. Its product is 80 % −50 mm, 40 % −25 mm and 25 % −15 mm, and goes to a 25 mm screen ($\eta = 85\,\%$). The screen overflow goes to a cone crusher whose product is 70 % −15 mm. The cone crusher product and the 25 mm screen underflow go to a 15 mm screen ($\eta = 75\,\%$); its overflow $C$ returns to the cone crusher and its underflow is the 200 tph of −15 mm product. Assume steady state. Screen efficiencies are based on oversize material. (a) Calculate the circulation load $C$. (b) Estimate the total load on the 15 mm screen.`,
    steps: [
      ['Recognise it', md`This is the two-screen example from the notes with 2.5, 1 and ½ inch replaced by 50, 25 and 15 mm. Every percentage is the same.`],
      ['25 mm screen', md`+25 mm in feed $= 0.60\times200 = 120$ tph. Overflow $= 120/0.85 = 141.2$ tph; underflow $= 58.8$ tph, of which 50 tph is −15 mm and 8.8 tph is +15 mm.`],
      ['15 mm screen', md`True +15 mm fed $= 0.30\,(C+141.2)+8.8$, overflow $= C$:

$0.75\,C = 0.30\,C + 42.35 + 8.8 \;\Rightarrow\; C = 113.7$ tph`],
      ['(b) Total load', md`$141.2 + 113.7 + 58.8 = 313.7$ tph`],
    ],
    ans: md`(a) $C \approx$ **113.7 tph**; (b) about **313.7 tph**.`,
    note: md`With the older deck's definition (overflow = efficiency × oversize) the answers are 76.06 and 276.06 tph. Write down the definition you use.` },

  'pyq24-4': { topic: 'circuits', kind: 'pyq', lvl: 3, title: 'Two gyratory crushers sharing one screen', src: 'Y24:Q4', by: 'studio', marks: '1 + 2 + 2 = 5',
    q: md`Manganese ore at the rate of 300 tons/hr is crushed in a gyratory crusher to a size of 58 % of +1.5 mm and fed to a 1.5 mm screen of 75 % efficiency based on oversize material. The overflow of the screen is crushed in another gyratory crusher to a size of 30 % of +1.5 mm and re-fed to the screen along with the product of the first gyratory crusher. If the finished product is 300 tons/hr of −1.5 mm in size, (i) draw the flow diagram with details; (ii) calculate the total load on the screen; (iii) calculate the total load on the screen if the screen efficiency is based on undersize material.`,
    steps: [
      ['(i) Flow diagram', md`Feed 300 t/h → gyratory 1 (product 58 % +1.5 mm) → 1.5 mm screen. Screen underflow: 300 t/h of −1.5 mm product. Screen overflow $O$ → gyratory 2 (product 30 % +1.5 mm) → back to the same screen. Screen load $= 300 + O$.`],
      ['Composition of the screen feed', md`+1.5 mm: $0.58\times300 + 0.30\,O = 174 + 0.30\,O$. −1.5 mm: $0.42\times300 + 0.70\,O = 126 + 0.70\,O$.`],
      ['(ii) Oversize basis', md`$\eta = \dfrac{\text{true oversize in feed}}{\text{overflow}}$: $0.75 = \dfrac{174 + 0.30\,O}{O} \Rightarrow O = \dfrac{174}{0.45} = 386.7$ t/h.

Total load $= 300 + 386.7 = 686.7$ t/h`],
      ['(iii) Undersize basis', md`$\eta = \dfrac{\text{undersize obtained}}{\text{undersize in feed}}$: $0.75 = \dfrac{300}{126 + 0.70\,O} \Rightarrow O = 391.4$ t/h.

Total load $= 691.4$ t/h`],
    ],
    ans: md`(ii) about **686.7 tons/h**; (iii) about **691.4 tons/h**.`,
    note: md`With the older deck's definition, $O = 0.75\,(174 + 0.30\,O)$ gives $O = 168.4$ and a load of 468.4 t/h for part (ii).` },

  'pr-circ-load': { topic: 'circuits', kind: 'pr', lvl: 2, title: 'Circulating load ratio', by: 'studio',
    q: md`A crusher in closed circuit with a screen receives 150 t/h of fresh feed. The crusher discharge contains 35 % oversize. Find the circulating load and the load on the crusher if the screen efficiency is 90 % (a) on oversize basis, (b) on undersize basis.`,
    steps: [
      ['(a) Oversize basis', md`$\dfrac{0.35\,(C+150)}{C} = 0.90 \Rightarrow C = \dfrac{0.35\times150}{0.90-0.35} = 95.5$ t/h. Crusher load $= 245.5$ t/h.`],
      ['(b) Undersize basis', md`$\dfrac{150}{0.65\,(C+150)} = 0.90 \Rightarrow C = \dfrac{150}{0.585}-150 = 106.4$ t/h. Crusher load $= 256.4$ t/h.`],
    ],
    ans: md`(a) 95.5 t/h (64 % of fresh feed); (b) 106.4 t/h (71 %).` },
};

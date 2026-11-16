// Learning path. Step kinds: c concept, i intuition, v visual, e equations, x solved example,
// s interactive, p practice, t takeaways. A step with no src is the studio's own explanation.
const md = String.raw;

export const UNITS = [
  { id: 'A', title: 'Energy for size reduction', blurb: 'How solids break, the three energy laws, the work index and how little of the energy ends up as new surface.', topics: ['basics', 'laws', 'bond', 'surface'] },
  { id: 'B', title: 'Equipment', blurb: 'What each machine does to the rock, the geometry that limits it and the numbers used to size it.', topics: ['jaw', 'gyratory', 'rolls', 'hammer', 'ballmill', 'ultrafine'] },
  { id: 'C', title: 'Crushing circuits', blurb: 'Open and closed circuits, the two meanings of screen efficiency and circulating load balances.', topics: ['circuits'] },
];

export const TOPICS = [
// =====================================================================================
{ id: 'basics', unit: 'A', title: 'How solids break', sub: 'Mechanisms, stages of size reduction and why it is so wasteful', min: 20, src: 'A:4-7,75-76;C:4-7,45-48',
  concepts: [
    { id: 'mech', title: 'Four ways to break a particle', steps: [
      { k: 'c', src: 'A:4-5', md: md`**Comminution** is the general name for size reduction. A solid can be made smaller by **compression**, **impact**, **attrition** (rubbing or shear) or **cutting** (tearing).

Brittle materials such as coal and minerals are broken by compression, impact or shear. Fibrous materials such as wood and asbestos have to be torn or cut.

Whatever the machine, the sequence inside the particle is the same: applied **stress** produces **strain**; when the strain is too large the particle **fractures along its lines of weakness**; the stored energy that is not used to make new surface is **released as heat**.` },
      { k: 'i', md: md`Think of each machine as a way of delivering one of these four actions. A jaw crusher squeezes slowly (compression). A hammer mill hits hard and fast (impact). A ball mill does both: falling balls strike the ore, and sliding balls rub it. A colloid mill shears. A knife cutter cuts.

The feed tells you which action to pick. Hard, abrasive rock is squeezed, because sliding contact would wear the machine out. Soft, sticky or fibrous material is hit or cut.` },
      { k: 'v', fig: 'mechanisms', cap: 'The four actions. Most real machines combine two of them.' },
      { k: 'c', src: 'A:5,7', md: md`The energy needed depends on two properties of the material: its **hardness** and its **friability** (its tendency to crack). Both the size of the force and the time for which it is applied affect how much grinding is achieved.

Chemistry alone does not decide grindability. **Marble** and **chalk** are both calcium carbonate, but marble is a recrystallised metamorphic rock and chalk is a soft, porous sedimentary one. They differ only in physical structure, and they behave completely differently in a crusher.` },
      { k: 't', list: [md`Four actions: compression, impact, attrition, cutting.`, md`Stress → strain → fracture along weak planes → heat.`, md`Hardness and friability set the energy; structure matters as much as chemistry (marble and chalk).`] },
    ] },
    { id: 'stages', title: 'Stages and classes of equipment', steps: [
      { k: 'c', src: 'A:75;C:45,47', md: md`No single machine takes a boulder to a powder. Size reduction is done in stages, and the machines are grouped by the stage they serve.

| Stage | Typical feed | Machines |
|---|---|---|
| Coarse | 50 to 250 mm or more | Crushers: jaw, gyratory, crushing rolls |
| Intermediate | 25 to 75 mm | Grinders: hammer mills, rolling-compression mills, attrition mills, tumbling mills |
| Fine | 5 to 15 mm | Ultrafine grinders: fluid energy mills, agitated mills |

A **primary crusher** breaks run-of-mine rock into 50 to 250 mm lumps and a **secondary crusher** takes these down to about 6 mm. **Grinders** reduce crushed feed to powder. **Ultrafine grinders** give a product of 1 to 50 µm. **Cutters** give particles of definite shape and size, 2 to 10 mm long.` },
      { k: 'v', fig: 'sizeladder', cap: 'Feed and product ranges on a log scale. Ranges overlap, so duty and material decide between neighbours.' },
      { k: 'e', f: ['rr'] },
      { k: 'c', src: 'A:19,64;C:6-7', md: md`Size reduction is usually the first energy-intensive step in a process plant. For efficient grinding, the energy applied should exceed the minimum needed to rupture the material by **as small a margin as possible**; the excess is lost as heat.

In practice the margin is enormous. The crushing efficiency, the share of the absorbed energy that ends up as new surface, is only about **0.1 to 2 %**. Breaking a rock is easy; breaking it into very fine dust takes a disproportionate amount of power.` },
      { k: 't', list: [md`Coarse → intermediate → fine, each with its own class of machine.`, md`Reduction ratio $RR = D_F/D_P$: about 3 to 7 for crushers, up to about 100 for grinders.`, md`Only 0.1 to 2 % of the energy absorbed creates new surface. The rest becomes heat.`] },
    ] },
  ],
  quiz: [
    { q: 'Which action does a jaw crusher mainly use?', o: ['Impact', 'Compression', 'Attrition', 'Cutting'], a: 1, why: 'Lumps are squeezed between a fixed and a swinging jaw.' },
    { q: 'Marble and chalk behave differently in a crusher because they differ in', o: ['chemical composition', 'physical structure', 'density only', 'colour'], a: 1, why: 'Both are calcium carbonate; only the structure differs.', src: 'A:7' },
    { q: 'Wood and asbestos are best reduced by', o: ['compression', 'impact', 'tearing or cutting', 'attrition between balls'], a: 2, why: 'Fibrous materials are disintegrated by tearing loads.', src: 'A:4' },
    { q: 'The crushing efficiency of industrial machines is typically', o: ['0.1 to 2 %', '10 to 20 %', '40 to 60 %', 'above 90 %'], a: 0, why: 'Almost all of the energy absorbed is released as heat.', src: 'A:64' },
    { q: 'An ultrafine grinder typically gives a product of', o: ['50 to 250 mm', '5 to 50 mm', '0.1 to 5 mm', '1 to 50 µm'], a: 3, why: 'Ultrafine grinders deliver 1 to 50 µm.', src: 'A:75' },
    { q: 'Energy required for grinding depends chiefly on', o: ['hardness and friability', 'colour and density', 'thermal conductivity', 'moisture only'], a: 0, why: 'Hardness and the tendency to crack set the energy.', src: 'A:5' },
  ],
  cards: [
    ['What is comminution?', 'The general term for size reduction of solids.'],
    ['Name the four breaking actions.', 'Compression, impact, attrition (rubbing or shear), and cutting or tearing.'],
    ['What happens to energy that does not create new surface?', 'It is released as heat. Typically 98 % or more goes this way.'],
    ['Feed size ranges for coarse, intermediate and fine reduction?', 'About 50 to 250 mm, 25 to 75 mm, and 5 to 15 mm.'],
    ['Define reduction ratio.', 'Average feed size divided by average product size, $RR = D_F/D_P$.'],
  ],
},
// =====================================================================================
{ id: 'laws', unit: 'A', title: 'Kick, Rittinger and Bond', sub: 'One differential equation, three exponents', min: 35, src: 'A:8-28;C:8-32',
  concepts: [
    { id: 'general', title: 'The general law', steps: [
      { k: 'c', src: 'A:19-20;C:8,23', md: md`All three laws start from the same assumption: the energy needed to produce a small change $dL$ in a particle of size $L$ is a simple power function of $L$.

$$dE = -C\,\frac{dL}{L^{\,n}}$$

The minus sign is there because the size decreases as energy is added. The exponent $n$ says how much harder it gets as the particle gets smaller. Integrating from the feed size $D_F$ to the product size $D_P$ gives a different law for each $n$.` },
      { k: 'i', md: md`With $n = 1$ every halving of size costs the same energy, however small the particle already is. With $n = 2$ every halving costs twice as much as the one before. Real materials sit in between, and the right exponent shifts with size: coarse particles are full of flaws and break easily (closer to $n = 1$); fine particles have used up their big flaws and nearly all the work goes into new surface (closer to $n = 2$).` },
      { k: 'e', f: ['general', 'kick', 'rittinger', 'bond'] },
      { k: 'c', src: 'C:13', md: md`| Law | Says energy is proportional to | Use it for |
|---|---|---|
| Kick (1885), $n = 1$ | the log of the reduction ratio | coarse crushing |
| Bond (1952), $n = 1.5$ | $1/\sqrt{D_P} - 1/\sqrt{D_F}$ | ball milling, industrial grinding |
| Rittinger (1867), $n = 2$ | new surface area created | fine grinding |

The slides' one-line summary: **Kick for crushers, Rittinger for grinders, Bond for the mills in between.**` },
      { k: 's', sim: 'laws', cap: 'Calibrate all three laws on one duty, then move to another and watch them disagree.' },
      { k: 'x', ex: 'ex-laws-1' },
      { k: 'p', pr: ['pr-laws-2', 'pr-laws-3'] },
    ] },
    { id: 'kick', title: "Kick's law", steps: [
      { k: 'c', src: 'A:8;C:14', md: md`The original statement is about deformation: *the energy required to produce analogous changes of configuration of geometrically similar bodies varies as the volumes or masses of these bodies.* That statement is not valid when new surfaces are created.

The modified form used for crushing is: **the work required to crush a given mass of material is constant for the same reduction ratio, irrespective of the original size.** Reducing 100 mm to 50 mm costs the same per kilogram as reducing 10 mm to 5 mm.` },
      { k: 't', list: [md`$E/M = K_k\ln(D_F/D_P)$`, md`Only the ratio matters, so it suits coarse crushing where little new surface forms.`, md`It badly underestimates fine grinding.`] },
    ] },
    { id: 'ritt', title: "Rittinger's law", steps: [
      { k: 'c', src: 'A:9;C:16', md: md`**The work done in crushing is proportional to the surface exposed by the operation.** Since specific surface varies as $1/D$, the energy is proportional to $1/D_P - 1/D_F$.` },
      { k: 'v', fig: 'cubes', cap: 'The slide argument. Shearing a cube across area A needs energy F·A·D and creates surface 2A. A quarter-size piece needs F·(A/4)·D and creates 2A/4. Energy and new surface stay in proportion.', src: 'A:10-12' },
      { k: 'c', src: 'A:13;C:17', md: md`The inverse of the Rittinger constant is **Rittinger's number**: the new surface created per unit of mechanical energy absorbed. It is found by a **drop-weight test**: a known mass is dropped from a set height onto a sample several times, and the new surface is worked out from the size analysis before and after.

| Mineral | m²/J | cm² per kg·cm |
|---|---|---|
| Quartz (SiO₂) | 0.0179 | 17.56 |
| Pyrite (FeS₂) | 0.02303 | 22.57 |
| Sphalerite (ZnS) | 0.0573 | 56.2 |
| Calcite (CaCO₃) | 0.07745 | 75.2 |
| Galena (PbS) | 0.0957 | 93.8 |

A larger number means a more grindable material. Galena is soft and breaks readily; quartz is the hardest to grind in this list.` },
      { k: 't', list: [md`$E/M = K_R(s_P - s_F)$, proportional to $1/D_P - 1/D_F$.`, md`Rittinger's number $= 1/K_R$ = new surface per unit energy.`, md`It overestimates coarse crushing and suits fine grinding.`] },
    ] },
  ],
  quiz: [
    { q: "In the general law dE = −C dL/Lⁿ, Bond's law corresponds to", o: ['n = 1', 'n = 1.5', 'n = 2', 'n = 2.5'], a: 1, why: 'n = 1 Kick, n = 1.5 Bond, n = 2 Rittinger.', src: 'A:20' },
    { q: "According to Kick's law, reducing 80 mm to 40 mm compared with 8 mm to 4 mm needs", o: ['ten times the energy per kg', 'the same energy per kg', 'one tenth of the energy per kg', 'it cannot be said'], a: 1, why: 'Same reduction ratio, same energy per unit mass.', src: 'A:8' },
    { q: "Rittinger's law is most reliable for", o: ['primary crushing', 'coarse crushing of slabby rock', 'fine grinding', 'cutting fibrous solids'], a: 2, why: 'In fine grinding nearly all useful work is new surface.', src: 'C:13' },
    { q: "Rittinger's number is", o: ['energy per unit of new surface', 'new surface per unit of energy absorbed', 'the reduction ratio at 80 % passing', 'the exponent n'], a: 1, why: 'It is 1/K_R, measured by a drop-weight test.', src: 'A:9' },
    { q: 'Which mineral in the notes is easiest to grind?', o: ['Quartz', 'Pyrite', 'Calcite', 'Galena'], a: 3, why: 'Galena has the largest Rittinger number, 0.0957 m²/J.', src: 'C:17' },
    { q: 'In Problem 1 (50 → 10 mm, then 75 → 25 mm) which law predicts the lowest energy for the second duty?', o: ['Kick', 'Bond', 'Rittinger', 'All the same'], a: 2, why: 'Rittinger 4.33, Bond 6.28, Kick 8.87 kJ/kg.', src: 'A:25-27' },
    { q: 'Integrating the general law with n = 2 gives energy proportional to', o: ['ln(D_F/D_P)', '1/D_P − 1/D_F', '1/√D_P − 1/√D_F', 'D_F − D_P'], a: 1, why: 'That is Rittinger: energy follows the surface term 1/D.' },
  ],
  cards: [
    ['General energy law for size reduction', '$dE = -C\\,dL/L^{n}$ with $n = 1$ (Kick), 1.5 (Bond), 2 (Rittinger).'],
    ["Kick's law", '$E/M = K_k\\ln(D_F/D_P)$. Same reduction ratio, same energy. Coarse crushing.'],
    ["Rittinger's law", '$E/M = K_R(s_P - s_F) \\propto 1/D_P - 1/D_F$. Fine grinding.'],
    ["Bond's law", '$E/M = K_b(1/\\sqrt{D_P} - 1/\\sqrt{D_F})$. Between the other two; industrial grinding.'],
    ["How is Rittinger's number measured?", 'Drop-weight test: known impact energy, size analysis before and after gives new surface.'],
    ['One-line guide to choosing a law', 'Kick for crushers, Rittinger for grinders, Bond for the mills in between.'],
  ],
},
// =====================================================================================
{ id: 'bond', unit: 'A', title: "Bond's law and the work index", sub: 'The equation you will use most often', min: 40, src: 'A:14-18,29-39,101;C:19-22,33-43',
  concepts: [
    { id: 'wi', title: 'Work index', steps: [
      { k: 'c', src: 'A:14-15;C:19-20', md: md`Bond's law says the energy per unit mass is proportional to the difference between the reciprocal square roots of the product and feed sizes. The constant $K_b$ is not tabulated directly. Instead Bond defined the **work index** $W_i$:

> the gross energy, in kWh per ton of feed, needed to reduce a **very large feed** to such a size that **80 % of the product passes a 100 µm screen**.

Put that definition into Bond's law. A very large feed means $1/\sqrt{D_F} \to 0$, and $D_P = 100$ µm, so $W_i = K_b/\sqrt{100}$.` },
      { k: 'e', f: ['kb', 'bondmm', 'bondrr'] },
      { k: 'i', md: md`The work index is a material property with a physical meaning: it is the energy bill for turning boulders into 100 µm powder. Since Bond energy is proportional to $W_i$, an ore with $W_i = 13.5$ needs about twice the energy of one with $W_i = 6.7$ for the same duty in the same mill.

Two habits prevent most mistakes. Use the **80 % passing** size, not the mean. And match the constant to the units: 0.3162 with millimetres, 10 with micrometres.` },
      { k: 'c', src: 'A:17;C:22', md: md`| Material | Specific gravity | Work index, kWh/tonne |
|---|---|---|
| Gypsum rock | 2.69 | 6.73 |
| Bauxite | 2.20 | 8.78 |
| Limestone | 2.66 | 12.74 |
| Coal | 1.40 | 13.00 |
| Cement clinker | 3.15 | 13.45 |
| Quartz | 2.65 | 13.57 |` },
      { k: 's', sim: 'bond', cap: 'Bond calculator. Change the material, the 80 % sizes and the throughput.' },
      { k: 'c', src: 'A:18', md: md`**Holmes' revision.** In 1957 Holmes pointed out that Bond's fixed square root is itself an approximation. Writing the exponent as $r$, a "deviation from Kick's law", he found $r$ between 0.25 and 0.73 for different materials and a more consistent work index as a result.` },
      { k: 'e', f: ['holmes'] },
      { k: 'p', pr: ['pr-bond-limestone', 'pr-bond-power'] },
    ] },
    { id: 'd80', title: 'Finding the 80 % passing size', steps: [
      { k: 'c', src: 'A:36-37;C:35-36', md: md`A sieve analysis gives the mass fraction **retained** between pairs of screens. Bond needs the aperture through which 80 % of the material **passes**. To get it:

- Add the fractions from the finest upward to get the cumulative fraction passing each aperture.
- Plot cumulative fraction against aperture, for feed and product.
- Read the aperture at 0.8 on each curve.` },
      { k: 's', sim: 'd80', cap: 'The feed and product analyses from the grinder problem. Edit any fraction and the 80 % sizes update.' },
      { k: 'x', ex: 'ex-bond-cost' },
      { k: 'x', ex: 'ex-bond-sugar' },
      { k: 'p', pr: ['pyq24-1'] },
      { k: 't', list: [md`$E/M = 0.3162\,W_i\,(1/\sqrt{D_P} - 1/\sqrt{D_F})$ with 80 % passing sizes in mm.`, md`$W_i$: kWh/ton to take a very large feed to 80 % passing 100 µm.`, md`For ratio problems the work index cancels; for cost problems divide the net power by the efficiency.`, md`In a lab test, subtract the empty-mill power before working out kWh/ton.`] },
    ] },
  ],
  quiz: [
    { q: 'The work index is defined for a product of which 80 % passes', o: ['1 mm', '100 µm', '75 µm', '200 mesh'], a: 1, why: 'Very large feed to 80 % passing 100 µm.', src: 'A:15' },
    { q: "With sizes in millimetres, Bond's constant K_b equals", o: ['10 W_i', '100 W_i', '0.3162 W_i', '3.162 W_i'], a: 2, why: '√(100 × 10⁻³) = 0.3162.', src: 'A:15' },
    { q: 'The sizes used in the Bond equation are', o: ['arithmetic mean sizes', 'Sauter mean diameters', 'the sizes that 80 % of the material passes', 'the largest particle sizes'], a: 2, why: 'By definition of the work index.', src: 'A:15' },
    { q: 'Which material in the notes needs the least grinding energy for the same duty?', o: ['Quartz', 'Cement clinker', 'Gypsum rock', 'Coal'], a: 2, why: 'Gypsum has the lowest work index, 6.73 kWh/tonne.', src: 'C:22' },
    { q: 'Limestone has W_i = 12.7 kWh/ton. Grinding a very large feed to 50 µm needs about', o: ['6.35 kWh/ton', '12.7 kWh/ton', '17.96 kWh/ton', '25.4 kWh/ton'], a: 2, why: 'Energy scales as 1/√D_P: 12.7 × √2.', src: 'A:101' },
    { q: 'A grinder needs 21.8 kW of Bond power and is 8 % efficient. It draws about', o: ['1.7 kW', '23.6 kW', '174 kW', '273 kW'], a: 3, why: '21.8 / 0.08 = 272.7 kW.', src: 'A:38' },
    { q: 'Holmes found the exponent r in the revised Bond equation to lie between', o: ['0 and 0.1', '0.25 and 0.73', '1 and 2', '0.5 exactly'], a: 1, why: 'r varies from 0.25 to 0.73 for several materials.', src: 'A:18' },
  ],
  cards: [
    ['Define the work index.', 'Gross energy in kWh per ton of feed to reduce a very large feed to 80 % passing 100 µm.'],
    ['Bond equation, mm form', '$E/M = 0.3162\\,W_i\\,(1/\\sqrt{D_P} - 1/\\sqrt{D_F})$'],
    ['Bond constant with sizes in µm', '$K_b = 10\\,W_i$'],
    ['How do you get $D_P$ and $D_F$ from a sieve analysis?', 'Build the cumulative fraction passing, plot it against aperture, read the size at 0.8.'],
    ['Work index of limestone and of quartz', 'About 12.74 and 13.57 kWh/tonne.'],
    ['What did Holmes change?', 'Replaced the fixed exponent 0.5 by a material exponent $r$ (0.25 to 0.73).'],
  ],
},
// =====================================================================================
{ id: 'surface', unit: 'A', title: 'New surface and efficiency', sub: "Specific surface, Rittinger's number and where the energy goes", min: 45, src: 'A:53-74,85-86;C:87-107',
  concepts: [
    { id: 'ss', title: 'Specific surface of a crushed product', steps: [
      { k: 'c', src: 'C:91-93', md: md`To use Rittinger's law on real data you need the specific surface of the feed and of the product. Crushed particles are not spheres, so each size fraction gets a **specific surface ratio** $n$: the specific surface of the real particles divided by that of spheres of the same sieve diameter.

A sphere of diameter $d$ has specific surface $6/(\rho_s d)$, so a real fraction has $6n/(\rho_s d_{avg})$. For a mixture, weight each fraction by its mass fraction.

Unlike sphericity, **$n$ is a function of particle size**. For sphalerite it rises from about 1.6 at 0.09 mm to 5 at 5.7 mm, so it has to be read off for each size fraction.` },
      { k: 'e', f: ['nratio', 'smix', 'rnum'] },
      { k: 's', sim: 'surface', cap: 'Specific surface and Rittinger energy from a size analysis. Preloaded with the cone crusher example.' },
    ] },
    { id: 'eff', title: 'Overall and theoretical efficiency', steps: [
      { k: 'c', src: 'C:89', md: md`Rittinger's law gives the energy that creates new surface. It says nothing about friction in bearings, the drive, or the work of moving the crusher's own parts. Those mechanical losses are measured by **running the machine empty**.

Two efficiencies follow. The **overall energy efficiency** compares surface energy with everything the motor supplies. The **theoretical effectiveness** first subtracts the empty-running power, so it describes the crushing action alone.` },
      { k: 'e', f: ['eff', 'ccbal'] },
      { k: 'i', md: md`In closed-circuit problems the crusher discharge is **not** the product. The product is the screen undersize, and you usually have to back it out. The trick is always the same: find a size range that cannot be in the undersize, so its $x_P$ is zero, and use it to get $M/P$.` },
      { k: 'x', ex: 'ex-surf-cone' },
      { k: 'x', ex: 'ex-surf-sphal' },
      { k: 'p', pr: ['pr-surf-calcite'] },
    ] },
    { id: 'crush', title: 'Crushing efficiency and the probability model', steps: [
      { k: 'c', src: 'A:63-65', md: md`McCabe and Smith split the losses differently. The **crushing efficiency** $\eta_c$ is the surface energy created divided by the energy absorbed by the solid. The surface energy made by fracture is small compared with the mechanical energy stored in the particle at the moment of rupture, so $\eta_c$ is only 0.1 to 2 %.

The solid absorbs less than the machine is fed. The ratio of energy absorbed to energy input is the **mechanical efficiency** $\eta_m$.` },
      { k: 'e', f: ['cruseff', 'power'] },
      { k: 'c', src: 'A:66-74', md: md`**Why is $C$ not constant?** Breaking a particle is a chain of chances: whether the particle is hit at all, whether the collision produces a stress above the breaking stress, and whether crack tips then propagate through the solid. The slides fold three probabilities into the general law.

- $P_c$, probability of collision. It equals the target efficiency $\eta_T$, read from a chart against the separation number $\psi = \dfrac{L^{2}\,v\,\rho_p}{18\,\mu\,D}$, where $D$ is the size of the object struck, $v$ the impact velocity and $\mu$ the viscosity of the surrounding fluid.
- $P_\sigma$, probability of exceeding the breaking stress, with the maximum stress at impact from Hertz's contact theory.
- $P_a$, probability of crack-tip propagation, which decays with the pressure in the crusher.` },
      { k: 'e', f: ['prob', 'psigma'] },
      { k: 't', list: [md`$s = \dfrac{6}{\rho_s}\sum n_i x_i/d_{avg,i}$ for feed and product; energy $= \dot M (s_P - s_F)/R_N$.`, md`Overall efficiency uses total power; theoretical effectiveness uses total minus empty power.`, md`Closed circuit: product analysis from $x_P = (M/P)x_M - (M/P - 1)x_R$.`, md`Crushing efficiency is 0.1 to 2 %; mechanical efficiency accounts for the machine itself.`] },
    ] },
  ],
  quiz: [
    { q: 'The specific surface ratio n of a crushed material', o: ['is the same for all sizes', 'changes with particle size', 'is always less than 1', 'equals the sphericity'], a: 1, why: 'Unlike sphericity, n is a function of the average size of the fraction.', src: 'C:92' },
    { q: 'Mechanical losses of a crusher are found by', o: ['a drop-weight test', 'running the machine empty', 'sieving the product', "Bond's law"], a: 1, why: 'Empty running power is subtracted to get the theoretical effectiveness.', src: 'C:89' },
    { q: 'A crusher draws 7.5 kW loaded and 4 kW empty; 942 W creates new surface. Theoretical effectiveness is', o: ['12.6 %', '23.6 %', '26.9 %', '46.7 %'], a: 2, why: '942 / (7500 − 4000) = 26.9 %.', src: 'C:107' },
    { q: 'In a closed circuit, the energy calculation should use the size analysis of', o: ['raw feed and crusher discharge', 'raw feed and screen undersize', 'crusher discharge and screen oversize', 'screen oversize and undersize'], a: 1, why: 'The circuit takes in raw feed and gives out the screen undersize.', src: 'C:98-99' },
    { q: 'If x_P = 0, x_M = 0.04 and x_R = 0.06 for a coarse fraction, M/P is', o: ['1.5', '2', '3', '6'], a: 2, why: '(M/P)(0.04) = (M/P − 1)(0.06) gives M/P = 3.', src: 'C:101' },
    { q: 'Drop tests give 175 cm² of new surface for 0.98 J. Rittinger number is', o: ['0.0056 J/cm²', '171.5 cm² J', '178.6 cm²/J', '17.86 cm²/J'], a: 2, why: '175 / 0.98 = 178.57 cm²/J.', src: 'C:97' },
    { q: 'In the probability model, P_σ tends to 1 when', o: ['σ_max equals σ_a', 'σ_max is much larger than σ_a', 'the particle is not hit', 'the pressure is very high'], a: 1, why: 'A stress far above the breaking stress almost certainly breaks the particle.', src: 'A:73' },
  ],
  cards: [
    ['Specific surface of a mixture', '$s_m = \\dfrac{6}{\\rho_s}\\sum n_i x_i/d_{avg,i}$'],
    ['Overall energy efficiency', 'Energy to create new surface divided by total energy supplied.'],
    ['Theoretical effectiveness', 'Energy to create new surface divided by (total energy minus empty-running energy).'],
    ['How do you find the product analysis in a closed circuit?', 'Screen balance: $x_P = (M/P)x_M - (M/P-1)x_R$, with $M/P$ from a size that cannot be in the product.'],
    ['Crushing efficiency: definition and size', 'Surface energy created over energy absorbed by the solid; 0.1 to 2 %.'],
    ['Three probabilities in the breakage model', 'Collision, exceeding the breaking stress, crack-tip propagation.'],
  ],
},
// =====================================================================================
{ id: 'jaw', unit: 'B', title: 'Jaw crushers', sub: 'Blake, Dodge, toggles, gape and throw', min: 30, src: 'A:77-84;C:49-55',
  concepts: [
    { id: 'how', title: 'How a jaw crusher works', steps: [
      { k: 'c', src: 'A:78;C:50-51', md: md`Feed is admitted between two jaws set to form a **V open at the top**. The **fixed (anvil) jaw** is nearly vertical and does not move. The **swinging jaw** reciprocates in a horizontal plane and makes an angle of 20° to 30° with the anvil jaw. It is driven by an eccentric so that it applies a large compressive force to lumps caught between the jaws. The jaws open and close 250 to 400 times a minute.

Rock is squeezed until it fractures, drops to a narrower part of the V on the opening stroke, and is squeezed again until it is small enough to leave through the discharge opening. Typical reduction ratio is 6 to 8.` },
      { k: 'v', fig: 'jaw', cap: 'Blake jaw crusher. The gape is the feed opening; the set is the discharge opening; the throw is how far the swing jaw moves at the discharge.' },
      { k: 'i', src: 'C:51', md: md`**The slippage principle.** To grip a lump, friction on both jaw faces must overcome the part of the squeezing force that pushes the lump upward and out. If the angle between the jaws is too large, or the faces are smooth, the lump slips instead of breaking. Keep the nip angle small (about 20°) and the jaw faces rough.` },
    ] },
    { id: 'types', title: 'Blake, Dodge and the toggles', steps: [
      { k: 'c', src: 'A:78,82-83;C:50,52-53', md: md`Jaw crushers are classified by where the swing jaw is pivoted.

| Type | Pivot | Consequence |
|---|---|---|
| **Blake** | at the top | Greatest movement at the discharge. Less choking. Relatively coarse, slabby product with few fines. The common industrial machine. |
| **Dodge** | at the bottom | Discharge opening hardly changes, so the product is closely sized. Prone to choking and hard to build large. Mostly a laboratory machine. |
| **Universal** | at an intermediate position | Movement at both ends. |

In the Blake machine an eccentric drives a **pitman** connected to two **toggle plates**; one is pinned to the frame and the other to the swinging jaw.

| | Single toggle (overhead eccentric) | Double toggle (Blake) |
|---|---|---|
| Motion at the bottom | large, elliptical | nearly pure compression |
| For | lighter, simpler, higher capacity, cheaper | heavy duty, less rubbing, lower wear on hard abrasive rock |
| Against | more rubbing and liner wear | more parts, heavier, lower throughput for the same gape, dearer |` },
      { k: 'e', f: ['jawforce'] },
      { k: 'i', md: md`The toggle is a force multiplier. A modest pull $F_1$ on the pitman becomes a toggle force $F_2 = F_1/(2\cos\theta)$, and as the toggles straighten at the end of the stroke ($\theta \to 90°$) that force grows without limit. The jaw moves least exactly when it pushes hardest, which is what breaking rock needs.` },
    ] },
    { id: 'size', title: 'Sizing rules', steps: [
      { k: 'c', src: 'A:80-81;C:53-54', md: md`- Largest lump the crusher will take: **0.9 × gape**.
- Vertical height of the crusher: about **2 × gape**.
- Jaw width: more than **1.3 × gape** (so the crusher is not starved) and less than **3 × gape** (beyond this there is little gain).
- Throw: **0.0502 × gape^0.85**. A bigger throw gives more capacity and a coarser product; a smaller throw gives a finer product at lower capacity.` },
      { k: 'e', f: ['jawsize'] },
      { k: 's', sim: 'jaw', cap: 'Jaw sizing from the gape, and the force on the swing jaw.' },
      { k: 'p', pr: ['pr-jaw-size'] },
      { k: 't', list: [md`Compression between a fixed and a swinging jaw; 250 to 400 strokes a minute.`, md`Blake pivots at the top, Dodge at the bottom.`, md`$d_{max} = 0.9G$, height $2G$, width $1.3G$ to $3G$, throw $0.0502\,G^{0.85}$.`, md`$F_x = F_1 L\tan\theta/(2x)$ from moments about the jaw pivot.`] },
    ] },
  ],
  quiz: [
    { q: 'In a Blake jaw crusher the swing jaw is pivoted at', o: ['the top', 'the bottom', 'the middle', 'both ends'], a: 0, why: 'Blake: top pivot. Dodge: bottom pivot.', src: 'A:78' },
    { q: 'A Dodge crusher gives a closely sized product because', o: ['it runs faster', 'its discharge opening is nearly constant', 'it has two toggles', 'it uses impact'], a: 1, why: 'The pivot is at the bottom, so the discharge opening hardly moves.', src: 'A:83' },
    { q: 'The largest lump a jaw crusher of gape G accepts is about', o: ['0.5 G', '0.9 G', '1.3 G', '2 G'], a: 1, why: 'Largest particle size = 0.9 × gape.', src: 'A:80' },
    { q: 'The angle between the jaws of a jaw crusher is typically', o: ['5° to 10°', '20° to 30°', '45° to 60°', '90°'], a: 1, why: 'The swinging jaw makes 20° to 30° with the anvil jaw.', src: 'A:78' },
    { q: 'Compared with a double-toggle machine, a single-toggle jaw crusher has', o: ['lower capacity and lower wear', 'higher capacity but more liner wear', 'no eccentric', 'a bottom pivot'], a: 1, why: 'The elliptical motion helps feed and discharge but rubs the liners.', src: 'C:52' },
    { q: 'Increasing the throw of a jaw crusher gives', o: ['more capacity and a coarser product', 'less capacity and a finer product', 'no change', 'a smaller gape'], a: 0, why: 'Bigger throw: more capacity, coarser product.', src: 'C:54' },
  ],
  cards: [
    ['Blake vs Dodge', 'Blake: pivot at top, variable discharge, less choking, industrial. Dodge: pivot at bottom, constant discharge, close sizing, chokes, laboratory.'],
    ['Jaw crusher speed and jaw angle', '250 to 400 strokes per minute; 20° to 30° between the jaws.'],
    ['Four jaw sizing rules', 'Max feed 0.9G; height 2G; width 1.3G to 3G; throw 0.0502 G^0.85.'],
    ['Force on the moving jaw', '$F_x = F_1 L\\tan\\theta/(2x)$'],
    ['What is the slippage principle?', 'Friction on the jaw faces must exceed the force pushing the lump out, so the nip angle must stay small.'],
  ],
},
// =====================================================================================
{ id: 'gyratory', unit: 'B', title: 'Gyratory and cone crushers', sub: 'Continuous crushing for high tonnage', min: 20, src: 'A:87-92;C:57-59',
  concepts: [
    { id: 'gyr', title: 'Gyratory crusher', steps: [
      { k: 'c', src: 'A:88;C:58', md: md`A gyratory is a primary crusher with a conical head (the **mantle**) that gyrates inside a concave shell on an eccentric. Material is nipped between mantle and concaves.

A jaw crusher bites once per stroke. A gyratory is **always crushing**: the eccentric sweeps the mantle round a circle, so some part of the chamber is closing at every instant.

Adjustments: the **width of the discharge opening** (by raising or lowering the spindle), the **throw** (by changing the eccentric sleeve) and the **speed**. Reduction ratio averages about 6. The size of a gyratory crusher is quoted as **gape × mantle diameter**.` },
      { k: 'v', fig: 'gyratory', cap: 'Gyratory crusher in section. The eccentric tilts the spindle so that it sweeps a cone. The mantle is closest to the shell on one side and farthest on the other, and that closed side travels round.' },
      { k: 'c', src: 'A:89;C:58', md: md`**Jaw or gyratory?**

| | Jaw | Gyratory |
|---|---|---|
| Action | intermittent | continuous, smoother power draw |
| Capacity for the same gape | lower | roughly 2 to 3 times higher |
| Product | 25 % coarser than the open set | finer; about 10 % coarser than the open set |
| Idle power | 40 to 50 % | about 30 % |
| Feeding | harder | easier; can be fed direct from trucks |
| Very hard feed | handles it, low nip angle, less choking | less suited |
| Set adjustment | easy | more involved |
| Housing, headroom, maintenance cost | less | more |` },
      { k: 'e', f: ['select'] },
      { k: 's', sim: 'select', cap: 'The capacity test from the notes.' },
      { k: 'p', pr: ['pr-gyr-select'] },
    ] },
    { id: 'cone', title: 'Cone crusher', steps: [
      { k: 'c', src: 'A:91;C:59', md: md`A cone crusher is an **intermediate** crusher, very like a gyratory in construction. The differences:

- The crushing head is much more **flared**, and the bowl flares outward too, giving more crushing volume and a larger discharge area.
- The spindle is **supported on the bottom eccentric bearing** instead of being hung from above.
- The depth of the cone is about one third of its base diameter.
- The throw of the head is **5 to 9 times the setting**, which lets material discharge easily.
- It runs fast (435 to 700 rpm) so that material is crushed at least twice on its way through.

Cone crushers are named by the diameter of the bottom of the breaking head. Capacities run from about 150 TPH at a ¼ inch closed set to 900 TPH at 2½ inch, with power up to 300 HP. The bowl is held down by **springs** that release when tramp iron enters, protecting the crushing surfaces.` },
      { k: 't', list: [md`Gyratory: continuous crushing, high capacity, primary duty at large tonnage.`, md`Capacity test: tons/h divided by gape area; above 0.115 pick a gyratory.`, md`Cone: flared head, bottom-supported spindle, large throw, high speed, spring release for tramp iron.`] },
    ] },
  ],
  quiz: [
    { q: 'The main reason to choose a gyratory over a jaw crusher is', o: ['lower headroom', 'higher capacity for the same gape', 'easier set adjustment', 'cheaper maintenance'], a: 1, why: 'Selection is made on the basis of capacity.', src: 'A:90' },
    { q: 'The size of a gyratory crusher is specified as', o: ['gape × width', 'gape × mantle diameter', 'throw × speed', 'head diameter only'], a: 1, why: 'Size of a gyratory crusher = gape × mantle diameter.', src: 'A:88' },
    { q: 'If capacity (tons/h) divided by gape area (in²) is 0.20, select', o: ['a jaw crusher', 'a gyratory crusher', 'a roll crusher', 'a hammer mill'], a: 1, why: 'Above 0.115 the gyratory is chosen.', src: 'A:90' },
    { q: 'In a cone crusher the spindle is', o: ['suspended from a spider at the top', 'supported on the bottom eccentric bearing', 'fixed', 'driven by toggles'], a: 1, why: 'This is one of the two essential differences from a gyratory.', src: 'A:91' },
    { q: 'Springs hold down the bowl of a cone crusher in order to', o: ['increase the speed', 'release when tramp iron enters', 'reduce noise', 'change the throw'], a: 1, why: 'They protect the crushing surfaces from uncrushable material.', src: 'A:91' },
    { q: 'Idle power as a fraction of full power is lower in', o: ['the jaw crusher', 'the gyratory crusher', 'both equal', 'neither draws idle power'], a: 1, why: 'About 30 % in a gyratory against 40 to 50 % in a jaw crusher.', src: 'A:89' },
  ],
  cards: [
    ['Why is a gyratory called a continuous crusher?', 'The mantle gyrates, so some part of the chamber is always closing on the rock.'],
    ['Jaw or gyratory rule', 'tons/h ÷ gape area in in² below 0.115: jaw. Above: gyratory.'],
    ['Two essential differences between cone and gyratory', 'Much more flared head; spindle supported on the bottom eccentric bearing.'],
    ['Throw of a cone crusher head', '5 to 9 times the setting.'],
    ['Three adjustments on a gyratory', 'Discharge opening, throw, and speed.'],
  ],
},
// =====================================================================================
{ id: 'rolls', unit: 'B', title: 'Roll crushers', sub: 'Angle of nip, roll size and capacity', min: 35, src: 'A:93-100;C:61-65',
  concepts: [
    { id: 'nip', title: 'Will the rolls grip the particle?', steps: [
      { k: 'c', src: 'A:93;C:61', md: md`Two rolls turn towards each other and draw the feed down into the gap. Rolls are used for **secondary crushing**: feed of at most 2 to 3 inch, product as fine as 10 to 12 mesh, though the usual practice is to feed 1 inch or less and make a 5 to 10 mm product. In many plants cone crushers have replaced them.

Each roll pushes on the particle with a normal force $N$ and drags it with a friction force $T$. The vertical component of $N$ pushes the particle **up and out**; the vertical component of $T$ pulls it **down and in**. The particle is nipped only if friction wins.` },
      { k: 'e', f: ['nip', 'rollR'] },
      { k: 'i', md: md`The half angle $\theta$ depends only on geometry: a bigger particle or a smaller roll sits higher in the V and makes $\theta$ larger. Friction sets the limit, $\tan\theta \le \mu$. That is why smooth rolls must be large compared with their feed and can only manage a small reduction ratio: the particle has to fit deep enough between the rolls for friction to hold it.` },
      { k: 's', sim: 'nip', cap: 'Change the roll diameter, feed size, set and friction. Green means the particle is drawn in.' },
      { k: 'x', ex: 'ex-roll-gate' },
    ] },
    { id: 'cap', title: 'Friction, speed and capacity', steps: [
      { k: 'c', src: 'A:96,98-99', md: md`Friction between a moving roll and the particle is lower than the static value, and falls as the rolls turn faster (Wills).

For capacity, assume the rolls are fed continuously from a height and kept full, and that the product leaves as a **continuous ribbon** as wide as the roll and as thick as the set. The mass passing per hour is then roll surface speed × width × set × bulk density. Real ribbons are not solid, so the true capacity is the ideal figure times an efficiency factor of 0.15 to 0.30.` },
      { k: 'e', f: ['muk', 'rollQ', 'rollQe'] },
      { k: 'p', pr: ['pyq23-3', 'pr-roll-5'] },
      { k: 't', list: [md`Nip condition: $\tan\theta \le \mu$, with $2\theta$ the angle of nip.`, md`Geometry: $\cos\theta = (R + L/2)/(R + d/2)$.`, md`Ideal capacity $Q = \pi\,60\,D\,W\,\nu\,L\,\rho_B$ t/h; multiply by 0.15 to 0.30 in practice.`, md`Faster rolls have lower friction and nip a smaller angle.`] },
    ] },
  ],
  quiz: [
    { q: 'A particle is nipped by smooth rolls when', o: ['tan θ ≤ μ', 'tan θ ≥ μ', 'sin θ = μ', 'θ = 45°'], a: 0, why: 'Friction must at least balance the outward component of the normal force.', src: 'A:96' },
    { q: 'In the roll geometry, cos θ equals', o: ['(R + d/2)/(R + L/2)', '(R + L/2)/(R + d/2)', 'L/d', 'R/(R + d)'], a: 1, why: 'Projection of the centre-to-centre line on the line of roll centres.', src: 'A:95' },
    { q: 'Rolls of 1 m diameter set 15 mm apart with a nip angle of 31° can crush particles up to about', o: ['15 mm', '31 mm', '53 mm', '107 mm'], a: 2, why: '(500 + d/2) = 507.5 / cos 15.5°, giving d ≈ 53 mm.', src: 'A:101' },
    { q: 'The ribbon capacity formula assumes', o: ['the rolls run half empty', 'a continuous ribbon of width W and thickness equal to the set', 'no bulk density effect', 'batch feeding'], a: 1, why: 'Rolls kept full; product is a continuous ribbon.', src: 'A:98' },
    { q: 'The efficiency factor ε in Q = 3600 ε W ν_P L ρ_B is typically', o: ['0.01 to 0.05', '0.15 to 0.30', '0.6 to 0.8', '1'], a: 1, why: 'It depends on the roll gap or product size.', src: 'A:99' },
    { q: 'As roll speed increases, the kinetic coefficient of friction', o: ['increases', 'decreases', 'stays the same', 'becomes zero at once'], a: 1, why: 'μ_K = (1 + 1.12ν)/(1 + 6ν) μ falls with ν.', src: 'A:96' },
  ],
  cards: [
    ['Nip condition for rolls', '$\\tan\\theta \\le \\mu$, where $2\\theta$ is the angle of nip.'],
    ['Roll geometry relation', '$\\cos\\theta = \\dfrac{R + L/2}{R + d/2}$'],
    ['Ribbon capacity', '$Q = \\pi\\,60\\,D\\,W\\,\\nu\\,L\\,\\rho_B$ t/h, with $\\nu$ in rpm.'],
    ['Why do smooth rolls give a small reduction ratio?', 'The feed must sit deep enough for friction to grip, so $d$ can only be a little larger than $L$ unless the rolls are very large.'],
    ['Typical duty of crushing rolls', 'Secondary crushing: feed 1 inch or less, product 5 to 10 mm.'],
  ],
},
// =====================================================================================
{ id: 'hammer', unit: 'B', title: 'Hammer mills', sub: 'Size reduction by impact', min: 15, src: 'B:1-3;C:25',
  concepts: [
    { id: 'ham', title: 'Hammer mill', steps: [
      { k: 'c', src: 'B:1;C:25', md: md`The hammer mill (swing-hammer crusher, or impactor) is used as a primary or intermediate crusher to bring run-of-quarry material below 1 inch, or as a secondary crusher to ¾ inch or less.

- It is mostly confined to **softer, easily crushed** materials: phosphates, gypsum, barite, asbestos rock, cement rock. Hard limestone is the hardest rock commonly put through it.
- It is especially useful for **clayey material** that would clog a reciprocating primary crusher.
- It also crushes bituminous coal for coke ovens and power plants.

The hammers hang on pins between heavy steel discs on a shaft. The shaft runs in heavy bearings, with a flywheel on one end and the drive on the other.` },
      { k: 'i', md: md`A jaw crusher squeezes slowly with a huge force. A hammer mill does the opposite: a light hammer moving fast changes the particle's momentum in a millisecond or two, and force is change of momentum over time. The shorter the contact, the larger the force, which is why an elastic particle (0.001 s) is hit twice as hard as an inelastic one (0.002 s).` },
      { k: 'e', f: ['hamF', 'hamQ', 'taggart'] },
      { k: 'c', src: 'B:2-3', md: md`**Operating variables:** diameter and configuration of the hammers, speed, number of hammers, size of hammers, spacing of anvil and breaker plate, height of feed, spacing of the grate bars.

**Product size depends on:** the character of the rock, the size of the feed, the type of mill, the grid spacing and the hammer weight.` },
      { k: 'p', pr: ['pr-hammer'] },
      { k: 't', list: [md`Impact machine for soft, friable or clayey feeds.`, md`$F_{max} = 1.5\,W u/(g t)$ with $t$ = 0.001 s (elastic) or 0.002 s (inelastic).`, md`$Q = K D^{2} L n^{2}/[3600(R-1)]$ tons/h, $K$ = 4 to 6.2.`, md`Taggart: $P = C\,(RR)\,Q$ with $C$ = 0.1 to 0.15.`] },
    ] },
  ],
  quiz: [
    { q: 'A hammer mill reduces size mainly by', o: ['compression', 'impact', 'cutting', 'attrition between rolls'], a: 1, why: 'Swinging hammers strike falling particles.', src: 'B:1' },
    { q: 'A hammer mill is preferred over a jaw crusher for', o: ['very hard abrasive rock', 'clayey material that would clog a reciprocating crusher', 'boulders above 1 m', 'ultrafine grinding'], a: 1, why: 'It does not clog on clayey feed.', src: 'B:1' },
    { q: 'The contact time used for a highly elastic substance is', o: ['0.001 s', '0.002 s', '0.01 s', '0.1 s'], a: 0, why: '0.001 s elastic, 0.002 s inelastic.', src: 'B:2' },
    { q: 'In the capacity formula, doubling the rotor speed changes capacity by a factor of', o: ['1', '2', '4', '8'], a: 2, why: 'Q is proportional to n².', src: 'B:3' },
    { q: 'The hardest rock commonly ground in a hammer mill is', o: ['quartz', 'granite', 'hard limestone', 'basalt'], a: 2, why: 'The mill is almost confined to softer materials.', src: 'B:1' },
  ],
  cards: [
    ['What is a hammer mill good for?', 'Soft, easily crushed or clayey materials; coal for coke ovens and power plants.'],
    ['Force of a hammer blow', '$F_{max} = 1.5\\,W\\,u/(g\\,t)$'],
    ['Hammer mill capacity', '$Q = K D^{2} L n^{2}/[3600(R-1)]$ tons/h'],
    ['Taggart correlation', '$P = C\\,(RR)\\,Q$, with $C$ between 0.1 and 0.15.'],
  ],
},
// =====================================================================================
{ id: 'ballmill', unit: 'B', title: 'Tumbling mills and critical speed', sub: 'Ball, rod and tube mills', min: 35, src: 'B:4-13;C:68-70',
  concepts: [
    { id: 'family', title: 'The tumbling mill family', steps: [
      { k: 'c', src: 'B:4-5;C:68', md: md`In a tumbling mill the material is ground by the tumbling of loose **media**, which may be balls, rods or pebbles, inside a rotating shell lined with steel, rubber or stone. The medium names the mill.

| Mill | What sets it apart |
|---|---|
| **Ball mill** | Steel or cast-iron balls. Short: the length does not, as a rule, exceed the diameter. Large balls on coarse feed give a comparatively coarse product. |
| **Tube mill** | Long compared with a ball mill, $L/D > 2$. Longer residence, finer product. |
| **Compartment mill** | A shell divided by perforated partitions. Coarse media at the feed end, small balls at the finishing end. |
| **Conical mill** | Rotation makes the big balls collect at the large-diameter feed end and the small ones at the discharge end. It does the job of a compartment mill without partitions. |
| **Rod mill** | Steel rods. Gives a more uniform, granular product. |
| **Pebble mill** | Ceramic pebbles and a non-metallic lining, where iron contamination must be avoided. |
| **Autogenous mill** | Large lumps of the ore itself are the media. Used where the ore is dense and contamination by media is not wanted. |

By discharge, tubular mills are **overflow**, **diaphragm (grate)** or **centre-periphery** discharge mills.` },
    ] },
    { id: 'crit', title: 'Critical speed', steps: [
      { k: 'c', src: 'B:10-11;C:70', md: md`Follow one ball next to the shell. The shell carries it round on a circle of radius $R - r$. Two things act along the radius: the wall reaction, and the radial component of gravity $Mg\cos\theta$, where $\theta$ is measured from the top of the mill.

While the wall is pushing on the ball, the ball stays on the wall. As the ball climbs, gravity supplies more and more of the centripetal force and the wall reaction shrinks. Where it reaches zero the ball **leaves the wall** and falls.

If the mill turns so fast that the ball is still held at the very top ($\theta = 0$), it never falls. That speed is the **critical speed**. At and above it the charge **centrifuges** and no grinding takes place.` },
      { k: 'e', f: ['ballbal', 'ncrit'] },
      { k: 'i', md: md`Dividing the force balance by its value at critical speed gives a compact rule: **$\cos\theta = (N/N_c)^{2}$**. At 70 % of critical the ball leaves at about 61° from the top and is thrown across the mill onto the toe of the charge. At low speed it leaves early and merely rolls down the surface.

So a ball mill has a useful window. Too slow, and the balls only slide and rub (cascading): fine grinding but little impact. Too fast, and they centrifuge. In between, they are lifted and thrown (cataracting), and their impact does the coarse grinding. Mills are run at roughly 60 to 80 % of critical.` },
      { k: 's', sim: 'ballmill', cap: 'Simplified single-ball paths in three layers. Drag the speed to see cascading, cataracting and centrifuging.' },
      { k: 'x', ex: 'ex-ball-4' },
      { k: 'p', pr: ['pyq23-4', 'pyq24-2', 'pr-ball-angle'] },
      { k: 't', list: [md`$Mg\cos\theta = Mv^{2}/(R-r)$; set $\theta = 0$ for the critical speed.`, md`$N_c = 42.3/\sqrt{D-d}$ rpm with diameters in metres (76.65 in feet).`, md`Operate at about 60 to 80 % of critical.`, md`A mill running above critical grinds nothing; slow it down.`] },
    ] },
  ],
  quiz: [
    { q: 'At the critical speed of a ball mill', o: ['grinding is fastest', 'the balls are carried round with the shell and do not fall', 'the balls slide at the bottom', 'power draw is zero'], a: 1, why: 'The charge centrifuges and no grinding takes place.', src: 'B:11' },
    { q: 'Critical speed in rpm for diameters in metres is', o: ['42.3/√(D − d)', '76.65/√(D − d)', '42.3 √(D − d)', '60/√(D − d)'], a: 0, why: '76.65 is the constant for diameters in feet.', src: 'B:11' },
    { q: 'A tube mill differs from a ball mill mainly in', o: ['using rods', 'having L/D greater than 2', 'running above critical speed', 'using pebbles'], a: 1, why: 'Tube mills are long compared with ball mills.', src: 'B:4' },
    { q: 'A 2 m mill with 100 mm balls has a critical speed of about', o: ['15.0 rpm', '21.2 rpm', '30.7 rpm', '42.3 rpm'], a: 2, why: '42.3/√1.9 = 30.69 rpm.', src: 'B:13' },
    { q: 'An autogenous mill uses as grinding media', o: ['steel balls', 'steel rods', 'ceramic pebbles', 'large lumps of the ore itself'], a: 3, why: 'The balls are replaced by lumps of ore.', src: 'B:5' },
    { q: 'A ball in a mill running at 80 % of critical leaves the shell at an angle from the top of about', o: ['37°', '50°', '64°', '80°'], a: 1, why: 'cos θ = 0.8² = 0.64, so θ ≈ 50°.' },
    { q: 'A 1.2 m ball mill runs at 0.80 Hz. Its critical speed is about 0.64 Hz. The mill is', o: ['cascading', 'cataracting', 'centrifuging', 'stalled'], a: 2, why: 'It runs above critical, so the charge rides round with the shell.', src: 'Y24:Q2' },
  ],
  cards: [
    ['Critical speed of a ball mill', '$N_c = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{g}{R-r}}$ rev/s $= 42.3/\\sqrt{D-d}$ rpm (m).'],
    ['Force balance used to derive it', '$Mg\\cos\\theta = Mv^{2}/(R-r)$, with $\\theta = 0$ at critical speed.'],
    ['Typical operating speed', 'About 60 to 80 % of critical speed.'],
    ['Where does a ball leave the shell?', 'At $\\cos\\theta = (N/N_c)^{2}$, with $\\theta$ measured from the top.'],
    ['Ball mill vs tube mill', 'Ball mill: length not more than the diameter. Tube mill: $L/D > 2$.'],
    ['Compartment mill', 'Shell divided by perforated partitions; coarse media at the feed end, small balls at the discharge end.'],
  ],
},
// =====================================================================================
{ id: 'ultrafine', unit: 'B', title: 'Ultrafine grinders, wet and dry grinding', sub: 'Colloid mill, fluid energy mill', min: 15, src: 'B:14-18',
  concepts: [
    { id: 'uf', title: 'Colloid mill and fluid energy mill', steps: [
      { k: 'c', src: 'B:14-15', md: md`**Colloid mill.** It works by **shearing**. Its job is to break down agglomerates or, with emulsions, to produce droplets of about 1 micron. A rotor turning at 3000 to 20 000 rpm runs very close to a stator; the gap is finely adjustable, from 0.001 to 0.005 inch depending on the size of the machine. Centrifugal action forces the feed through the clearance along a spiral path. So much energy goes into so thin a film that most colloid mills have water jackets, and the material is often cooled before and after as well.` },
      { k: 'c', src: 'B:16-17', md: md`**Fluid energy mill.** There are no moving parts. Particles are suspended in a high-velocity gas stream and carried round an elliptical or circular path. They are reduced by collisions **with each other**, and by striking and rubbing the walls. Coarse particles stay in circulation while fines leave with the gas, so the mill classifies its own product.

- Feed about 1 ton/h, not sticky.
- Product 0.5 to 10 µm.
- Uses 1 to 4 kg of steam or 6 to 9 kg of air per kg of product.` },
    ] },
    { id: 'wetdry', title: 'Wet or dry grinding', steps: [
      { k: 'c', src: 'B:18', md: md`The choice is governed by the material and by what it is used for. If water changes the physical or chemical properties of the material, grinding must be dry. If the product is to be used as a suspension in water, or classified hydraulically, wet grinding is preferred.

| Wet grinding | Dry grinding |
|---|---|
| 15 to 20 % lower power per ton of product | Lower wear of liners and grinding media |
| Higher capacity per unit of mill volume | A higher share of fines in the product, wanted for cement, talc, pulverised coal |
| No dust problem | |
| Simple handling with pumps and pipes | |
| Wet screening or hydraulic classification gives closer product control | |` },
      { k: 't', list: [md`Colloid mill: shear in a 0.001 to 0.005 inch gap at 3000 to 20 000 rpm; about 1 µm.`, md`Fluid energy mill: particle-on-particle impact in a gas stream; 0.5 to 10 µm; self-classifying.`, md`Wet grinding saves 15 to 20 % power and avoids dust; dry grinding wears the mill less and gives more fines.`] },
    ] },
  ],
  quiz: [
    { q: 'A colloid mill works on the principle of', o: ['impact', 'compression', 'shearing', 'cutting'], a: 2, why: 'The feed is sheared in a narrow rotor-stator gap.', src: 'B:15' },
    { q: 'In a fluid energy mill, size reduction is mainly by', o: ['steel balls', 'particles striking each other in a high-velocity gas stream', 'a rotor and stator', 'toggle-driven jaws'], a: 1, why: 'Interparticle collision, plus striking and rubbing the walls.', src: 'B:17' },
    { q: 'Product size from a fluid energy mill is typically', o: ['0.5 to 10 µm', '50 to 100 µm', '1 to 5 mm', '5 to 50 mm'], a: 0, why: 'It is an ultrafine grinder.', src: 'B:17' },
    { q: 'Compared with dry grinding, wet grinding uses', o: ['15 to 20 % less power per ton', '15 to 20 % more power per ton', 'the same power', 'no power'], a: 0, why: 'One of five listed advantages of wet grinding.', src: 'B:18' },
    { q: 'Dry grinding is necessary when', o: ['the product is a slurry', 'water changes the properties of the material', 'dust must be avoided', 'hydraulic classification follows'], a: 1, why: 'For example cement, which reacts with water.', src: 'B:18' },
  ],
  cards: [
    ['Colloid mill: principle, speed, gap', 'Shearing; 3000 to 20 000 rpm; 0.001 to 0.005 inch.'],
    ['Fluid energy mill: mechanism and product', 'Particles collide in a high-velocity gas stream; 0.5 to 10 µm.'],
    ['Advantages of wet grinding', 'Lower power (15 to 20 %), higher capacity, no dust, simple handling, closer product control.'],
    ['Advantages of dry grinding', 'Lower wear of liners and media; more fines in the product.'],
  ],
},
// =====================================================================================
{ id: 'circuits', unit: 'C', title: 'Open and closed circuits', sub: 'Screen efficiency and circulating load', min: 50, src: 'B:19-34;C:73-86;A:40-52',
  concepts: [
    { id: 'oc', title: 'Open and closed circuit', steps: [
      { k: 'c', src: 'B:19,24;C:73-74', md: md`**Open circuit.** Material passes through the crusher once. Either the feed rate is set so that everything is finished in one pass, or the screen overflow goes on to a *different* crusher. In single-pass grinding the material must stay in the machine until every particle is small enough, so a great deal of energy is wasted regrinding material that is already finished. Open circuit is chosen when simplicity or layout decides.

**Closed circuit.** New feed goes to the crusher and the crusher product goes to a screen. The screen overflow is returned to the **same** crusher. The quantity returned is the **circulating load**.` },
      { k: 'v', fig: 'circuits', cap: 'Left: open circuit with a second crusher. Right: closed circuit, where the oversize returns to the crusher it came from.' },
      { k: 'c', src: 'B:26', md: md`**Advantages of closed-circuit operation:** it increases the quantity of finished material and the capacity; the size distribution is more uniform; power consumption falls. These come from the large amount of nearly finished material in the crusher feed, less production of fines, and a shorter residence time per pass.` },
      { k: 'x', ex: 'ex-circ-ballmill' },
    ] },
    { id: 'eta', title: 'Two meanings of screen efficiency', steps: [
      { k: 'c', src: 'C:75-76', md: md`A real screen is imperfect in one direction. The slides assume: **oversize cannot go into the undersize**, but **undersize can stay with the oversize**.

Take 100 g of crusher product holding 40 g of true oversize and 60 g of true undersize. The screen delivers 55 g of pure undersize, and an overflow of 45 g: the 40 g of oversize plus 5 g of undersize that failed to pass.

- **Undersize basis:** 55 of the 60 g of undersize was recovered. Efficiency = 55/60 = 0.92. This is output over input.
- **Oversize basis:** the overflow should be 40 g of pure oversize but weighs 45 g. Efficiency = 40/45 = 0.89. This is pure oversize over (pure oversize + impurities).` },
      { k: 'v', fig: 'conundrum', cap: 'The same screen, two efficiencies.' },
      { k: 'e', f: ['etaO', 'etaU'] },
      { k: 'i', md: md`**The two decks disagree, so decide before you start.** Lectures 14 to 19 divide: overflow = true oversize ÷ efficiency. The older deck multiplies: overflow = efficiency × true oversize. Multiplying means some oversize escapes into the product, which contradicts the assumption above. This site follows Lectures 14 to 19 and shows the older answer beside each result. In an exam, write your definition as the first line.` },
      { k: 'x', ex: 'ex-circ-open' },
    ] },
    { id: 'cl', title: 'Circulating load', steps: [
      { k: 'c', md: md`The method for every closed-circuit problem:

- Call the circulating load $C$. The crusher then handles fresh feed plus $C$.
- At steady state, the product leaving equals the fresh feed entering.
- Write the amount of true oversize (or undersize) in the screen feed in terms of $C$.
- Apply the efficiency definition to the screen and solve for $C$.

With more than one crusher or screen, work downstream one screen at a time, and keep track of how much of each underflow is still oversize for the next screen.` },
      { k: 'e', f: ['circO', 'screenE'] },
      { k: 's', sim: 'circuit', cap: 'Single closed circuit. The oversize basis only balances when the efficiency exceeds the oversize fraction.' },
      { k: 'x', ex: 'ex-circ-closed' },
      { k: 'x', ex: 'ex-circ-two' },
      { k: 'p', pr: ['pyq23-1', 'pyq24-4', 'pr-circ-load'] },
      { k: 't', list: [md`Closed circuit: oversize returns to the same crusher; that stream is the circulating load.`, md`Oversize basis: true oversize ÷ overflow. Undersize basis: undersize obtained ÷ undersize in feed.`, md`Steady state: product = fresh feed; crusher load = fresh feed + $C$.`, md`Closed-circuit milling uses far less energy for the same fresh feed (19.4 kW against 68.76 kW in the ball mill example).`] },
    ] },
  ],
  quiz: [
    { q: 'In closed-circuit crushing, the screen overflow', o: ['is the final product', 'goes to a different crusher', 'returns to the same crusher', 'is discarded'], a: 2, why: 'That returned stream is the circulating load.', src: 'B:24' },
    { q: 'A screen feed holds 40 g oversize and 60 g undersize; the overflow weighs 45 g. Efficiency on oversize basis is', o: ['0.75', '0.89', '0.92', '1.13'], a: 1, why: '40/45 = 0.89.', src: 'C:76' },
    { q: 'For the same screen, efficiency on undersize basis is', o: ['0.89', '0.92', '0.55', '0.60'], a: 1, why: '55/60 = 0.92.', src: 'C:75' },
    { q: 'Fresh feed 100 t/h, crusher product 46 % oversize, η = 85 % (oversize basis, Lectures 14 to 19). Circulating load is about', o: ['46 t/h', '64 t/h', '118 t/h', '185 t/h'], a: 2, why: '0.46(C + 100)/C = 0.85 gives C = 117.95.', src: 'C:83' },
    { q: 'Which is NOT an advantage of closed-circuit grinding?', o: ['More uniform product', 'Lower power consumption', 'More fines produced', 'Higher capacity'], a: 2, why: 'Closed circuit minimises the production of fines.', src: 'B:26' },
    { q: 'At steady state in a closed circuit, the undersize product rate equals', o: ['the circulating load', 'the fresh feed rate', 'the crusher load', 'zero'], a: 1, why: 'Nothing accumulates, so what enters must leave as product.' },
    { q: 'In the ball mill example, closing the circuit changed the energy from 68.76 kW to', o: ['19.4 kW', '45.6 kW', '90 kW', '137.5 kW'], a: 0, why: 'Bond energy on fresh feed F and undersize P₁.', src: 'A:50' },
  ],
  cards: [
    ['Define circulating load.', 'The screen overflow returned to the same crusher in a closed circuit.'],
    ['Screen efficiency on oversize basis (Lectures 14 to 19)', 'True oversize in the screen feed ÷ overflow actually obtained.'],
    ['Screen efficiency on undersize basis', 'Undersize actually obtained ÷ true undersize in the screen feed.'],
    ['Three advantages of closed-circuit operation', 'More finished material and capacity, more uniform size, lower power.'],
    ['First two lines of any circulating-load solution', 'Crusher load = fresh feed + C. Product = fresh feed at steady state.'],
    ['Circulating load, oversize basis', '$C = aF/(\\eta - a)$, where $a$ is the oversize fraction in the crusher discharge.'],
  ],
},
];

// Which slides feed which topics (for the coverage page).
export const COVERAGE = [
  { d: 'A', rows: [['1-3', 'Course map and references', ''], ['4-7', 'Mechanisms, marble and chalk', 'basics'], ['8-21', 'Kick, Rittinger, Bond, work index, general law', 'laws,bond'], ['22-28', 'Problem 1: three laws', 'laws'], ['29-39', 'Problems 2 and 3: sugar, grinder cost', 'bond'], ['40-52', 'Ball mill, open and closed circuit, screen effectiveness (image slides)', 'circuits'], ['53-62', 'Problem 4: sphalerite, crusher efficiency', 'surface'], ['63-74', 'Crushing efficiency and the probability model', 'surface'], ['75-76', 'Classes of equipment, breaking pattern', 'basics'], ['77-86', 'Jaw crushers and the calcite problem', 'jaw,surface'], ['87-92', 'Gyratory and cone crushers', 'gyratory'], ['93-101', 'Roll crushers, Problems 5 to 7', 'rolls,bond']] },
  { d: 'B', rows: [['1-3', 'Hammer mill', 'hammer'], ['4-13', 'Tumbling mills, critical speed, Problem 4', 'ballmill'], ['14-18', 'Colloid mill, fluid energy mill, wet and dry grinding', 'ultrafine'], ['19-34', 'Open and closed circuits, Problems 5 to 7', 'circuits']] },
  { d: 'C', rows: [['1-7', 'Introduction and purpose', 'basics'], ['8-25', 'The three laws, work index, Taggart', 'laws,bond,hammer'], ['26-43', 'Problems 1 to 3', 'laws,bond'], ['44-48', 'Stages of size reduction', 'basics'], ['49-55', 'Jaw crushers', 'jaw'], ['56-59', 'Gyratory and cone crushers', 'gyratory'], ['60-66', 'Roll crushers', 'rolls'], ['67-70', 'Tumbling mills and critical speed', 'ballmill'], ['71-86', 'Circuits, screen efficiency, three circuit problems', 'circuits'], ['87-107', 'Specific surface, efficiencies, cone crusher problem', 'surface'], ['108-111', 'Closing slides', '']] },
];

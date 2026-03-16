// ─── MIS Data Types ─────────────────────────────────────────────────────────

export interface ProductMix {
  type: string;
  nos: number;
}

export interface MISProject {
  id: string;
  name: string;
  units: number;
  resi: number;
  retail: number;
  pct: number;
  status: 'complete' | 'on-track' | 'watch' | 'risk' | 'upcoming' | 'infra' | 'subdeveloper';
  floors: string;
  plot: string;
  gfa: string;
  bua: string;
  sa: string;
  far: string;
  saGfa: string;
  saBua: string;
  start: string;
  end: string;
  dur: string;
  rera: string;
  mix: ProductMix[];
  d: string;    // design cost
  s: string;    // supervision cost
  c: string;    // construction cost
  a: string;    // authority cost
  cs: string;   // client supply cost
  billed: string;
  bp: string;   // billed percentage
  appr: string[];
  rem: string;
}

export interface ProjectGroup {
  label: string;
  projects: MISProject[];
}

export interface MasterplanSummary {
  units: string;
  projects: string;
  infra: string;
  contract: string;
  certified: string;
}

export interface Masterplan {
  id: string;
  name: string;
  sub: string;
  badgeType: 'complete' | 'on-track' | 'watch' | 'risk' | 'upcoming' | 'infra' | 'subdeveloper';
  summary: MasterplanSummary;
  groups: ProjectGroup[];
}

export interface MISData {
  reportDate: string;
  masterplans: Masterplan[];
}

// ─── Helper to create project with defaults ─────────────────────────────────

function p(overrides: Partial<MISProject> & { id: string; name: string }): MISProject {
  return {
    units: 0, resi: 0, retail: 0, pct: 0,
    status: 'on-track',
    floors: '', plot: '', gfa: '', bua: '', sa: '',
    far: '', saGfa: '', saBua: '',
    start: '', end: '', dur: '', rera: '',
    mix: [],
    d: '', s: '', c: '', a: '', cs: '',
    billed: '', bp: '',
    appr: [], rem: '',
    ...overrides,
  };
}

// ─── Built-in MIS Data (Feb 2026) ──────────────────────────────────────────

export const builtInMISData: MISData = {
  reportDate: 'Feb 2026',
  masterplans: [
    // ── SOBHA HARTLAND ──────────────────────────────────────────────────
    {
      id: 'hartland',
      name: 'Sobha Hartland',
      sub: '45 projects · 4,200+ units delivered',
      badgeType: 'watch',
      summary: {
        units: '4,248',
        projects: '23 done · 8 active',
        infra: '99% complete',
        contract: 'AED 8.2B',
        certified: 'AED 7.1B',
      },
      groups: [
        {
          label: 'Ongoing projects',
          projects: [
            p({ id: 'sh-cg', name: 'Crest Grande', units: 985, resi: 985, pct: 94.7, status: 'on-track',
              floors: 'G+2P+41', plot: '82,445 sft', gfa: '1,287,341 sft', bua: '1,042,891 sft', sa: '724,567 sft',
              far: '15.61', saGfa: '0.563', saBua: '0.695',
              start: 'Jul 2021', end: 'Jun 2026', dur: '59 months', rera: 'Jun 2026',
              mix: [{ type: '1BR', nos: 280 }, { type: '2BR', nos: 412 }, { type: '3BR', nos: 195 }, { type: '4BR', nos: 78 }, { type: 'Penthouse', nos: 20 }],
              d: '42,100,000', s: '18,400,000', c: '1,124,000,000', a: '28,500,000', cs: '62,000,000',
              billed: '1,207,840,000', bp: '94.7%',
              appr: ['NOC', 'Building Permit', 'DEWA', 'Etisalat', 'Civil Defence'],
              rem: 'Finishing works in progress. Handover expected Q2 2026.' }),
            p({ id: 'sh-cvh', name: 'Creek Vista Heights HE-A1', units: 1354, resi: 1354, pct: 59.8, status: 'on-track',
              floors: 'G+2P+35', plot: '94,200 sft', gfa: '1,876,000 sft', bua: '1,512,000 sft', sa: '1,048,000 sft',
              far: '19.9', saGfa: '0.559', saBua: '0.693',
              start: 'Mar 2023', end: 'Mar 2027', dur: '48 months', rera: 'Mar 2027',
              mix: [{ type: '1BR', nos: 420 }, { type: '2BR', nos: 540 }, { type: '3BR', nos: 280 }, { type: '4BR', nos: 94 }, { type: 'Penthouse', nos: 20 }],
              d: '56,000,000', s: '24,500,000', c: '1,680,000,000', a: '38,000,000', cs: '84,000,000',
              billed: '1,125,936,000', bp: '59.8%',
              appr: ['NOC', 'Building Permit', 'DEWA'],
              rem: 'Structure complete. MEP and finishing ongoing.' }),
            p({ id: 'sh-wo', name: 'Waves Opulence MS-09', units: 363, resi: 363, pct: 46.6, status: 'watch',
              floors: 'G+P+12', plot: '32,000 sft', gfa: '412,000 sft', bua: '328,000 sft', sa: '245,000 sft',
              far: '12.88', saGfa: '0.595', saBua: '0.747',
              start: 'Jan 2024', end: 'Sep 2026', dur: '32 months', rera: 'Sep 2026',
              mix: [{ type: '1BR', nos: 180 }, { type: '2BR', nos: 120 }, { type: '3BR', nos: 63 }],
              d: '18,200,000', s: '8,400,000', c: '380,000,000', a: '12,000,000', cs: '22,000,000',
              billed: '205,128,000', bp: '46.6%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Structure in progress. On watch for RERA timeline.' }),
            p({ id: 'sh-mall', name: 'Sobha Mall HE-A2', units: 49, retail: 49, pct: 47.4, status: 'watch',
              floors: 'G+3P+5', plot: '120,000 sft', gfa: '680,000 sft', bua: '580,000 sft', sa: '420,000 sft',
              far: '5.67', saGfa: '0.618', saBua: '0.724',
              start: 'Sep 2023', end: 'Jul 2026', dur: '34 months', rera: 'Jul 2026',
              mix: [{ type: 'Retail', nos: 42 }, { type: 'F&B', nos: 7 }],
              d: '32,000,000', s: '14,000,000', c: '620,000,000', a: '18,000,000', cs: '45,000,000',
              billed: '345,492,000', bp: '47.4%',
              appr: ['NOC', 'Building Permit', 'DEWA', 'Civil Defence'],
              rem: 'Structure and MEP ongoing. Retail fitout planning started.' }),
            p({ id: 'sh-mosque', name: 'Juma Mosque MO-02', units: 0, pct: 100, status: 'complete',
              floors: 'G+1', plot: '12,000 sft', gfa: '18,000 sft', bua: '15,000 sft', sa: '-',
              start: 'Jan 2024', end: 'Feb 2026', dur: '25 months',
              d: '2,400,000', s: '1,200,000', c: '28,000,000', a: '3,200,000', cs: '2,000,000',
              billed: '36,800,000', bp: '100%',
              appr: ['NOC', 'Building Permit', 'DEWA', 'Etisalat', 'Civil Defence', 'Completion Certificate'],
              rem: 'Handed over Feb 2026.' }),
            p({ id: 'sh-infra', name: 'Infrastructure & Landscape', units: 0, pct: 93, status: 'infra',
              start: '2017', end: 'Ongoing',
              d: '8,000,000', s: '4,200,000', c: '420,000,000', a: '15,000,000', cs: '28,000,000',
              billed: '441,930,000', bp: '93%',
              rem: 'Roads 99% complete. Landscape 86% complete. Final phase ongoing.' }),
            p({ id: 'sh-tp-sh', name: 'SH-Tranquility Plots (125)', units: 125, resi: 125, pct: 100, status: 'complete',
              rem: 'All plots handed over.' }),
            p({ id: 'sh-tp-he', name: 'HE-Tranquility Plots (72)', units: 72, resi: 72, pct: 100, status: 'complete',
              rem: 'All plots handed over.' }),
          ],
        },
        {
          label: 'Sub-developers',
          projects: [
            p({ id: 'sh-sd-gs', name: 'Gemini Splendor MA-06', units: 140, resi: 140, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-wt', name: 'Wilton Terraces Ellington MA-24', units: 283, resi: 283, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-tb', name: 'The Terraces Bolton MA-22', units: 260, resi: 260, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-wpr', name: 'Wilton Park Residences MA-25', units: 320, resi: 320, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-kw', name: 'Kensington Waters Ellington MA-26', units: 281, resi: 281, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-bp', name: 'Berkeley Place Ellington MA-17', units: 127, resi: 127, pct: 100, status: 'subdeveloper', rem: 'Completed.' }),
            p({ id: 'sh-sd-ah', name: 'Aryana Hotel HO-02', units: 300, resi: 300, pct: 65, status: 'subdeveloper', end: 'Dec 2026', rem: 'Structure complete. Finishing ongoing.' }),
            p({ id: 'sh-sd-hb', name: 'Highbury by Ellington CRT-04', units: 342, resi: 342, pct: 63, status: 'subdeveloper', end: 'Mar 2027', rem: 'Structure complete. MEP ongoing.' }),
          ],
        },
        {
          label: 'Completed (23)',
          projects: [
            p({ id: 'sh-c-gp1', name: 'Greens Phase-1', units: 172, resi: 172, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-gp2', name: 'Greens Phase-2', units: 212, resi: 212, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-gp3', name: 'Greens Phase-3', units: 408, resi: 408, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-cv', name: 'Creek Vistas', units: 254, resi: 254, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-opa', name: 'One Park Avenue', units: 534, resi: 534, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-cvr', name: 'Creek Vistas Reserve', units: 868, resi: 868, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-who', name: 'Sobha Waves HO-01', units: 282, resi: 282, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-wg', name: 'Waves Grande', units: 242, resi: 242, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-cvg', name: 'Creek Vistas Grande HO-03', units: 372, resi: 372, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-crest', name: 'The Crest MS-010203', units: 460, resi: 460, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-vp1', name: 'Villas Phase I', units: 98, resi: 98, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-vp2g', name: 'Villas Phase II Gardenia', units: 88, resi: 88, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-vp3', name: 'Villas Phase III', units: 120, resi: 120, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-tp1', name: 'Townhouses Phase I', units: 52, resi: 52, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-nch', name: 'Neighborhood Clubhouse', units: 0, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-ws04', name: 'Waterside Villa WS-04', units: 1, resi: 1, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-ws07', name: 'Waterside Villa WS-07', units: 1, resi: 1, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-ws10', name: 'Waterside Villa WS-10', units: 1, resi: 1, pct: 100, status: 'complete' }),
            p({ id: 'sh-c-rvm', name: 'Revathi Menon Villa', units: 1, resi: 1, pct: 100, status: 'complete' }),
          ],
        },
      ],
    },
    // ── SOBHA HARTLAND II ────────────────────────────────────────────────
    {
      id: 'hartland2',
      name: 'Sobha Hartland II',
      sub: '11 projects · 8,669 units',
      badgeType: 'on-track',
      summary: {
        units: '8,669',
        projects: '0 done · 11 active',
        infra: 'Phase 1 ongoing',
        contract: 'AED 14.8B',
        certified: 'AED 3.2B',
      },
      groups: [
        {
          label: 'Riverside Crescent',
          projects: [
            p({ id: 'h2-rc-a07', name: '330 Riverside Crescent A07', units: 767, resi: 767, pct: 37.8, status: 'on-track',
              floors: 'G+2P+38', plot: '48,200 sft', gfa: '982,000 sft', bua: '792,000 sft', sa: '548,000 sft',
              far: '20.37', saGfa: '0.558', saBua: '0.692',
              start: 'Jan 2024', end: 'Jul 2028', dur: '54 months', rera: 'Jul 2028',
              mix: [{ type: '1BR', nos: 245 }, { type: '2BR', nos: 312 }, { type: '3BR', nos: 148 }, { type: '4BR', nos: 52 }, { type: 'Penthouse', nos: 10 }],
              d: '38,000,000', s: '16,800,000', c: '920,000,000', a: '24,000,000', cs: '52,000,000',
              billed: '397,584,000', bp: '37.8%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Substructure complete. Superstructure in progress.' }),
            p({ id: 'h2-rc-a06', name: '320 Riverside Crescent A06', units: 638, resi: 638, pct: 37.1, status: 'on-track',
              floors: 'G+2P+36', start: 'Jan 2024', end: 'Jul 2028', dur: '54 months', rera: 'Jul 2028',
              mix: [{ type: '1BR', nos: 210 }, { type: '2BR', nos: 268 }, { type: '3BR', nos: 118 }, { type: '4BR', nos: 36 }, { type: 'Penthouse', nos: 6 }],
              d: '32,000,000', s: '14,200,000', c: '780,000,000', a: '20,000,000', cs: '44,000,000',
              billed: '330,378,000', bp: '37.1%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Superstructure in progress.' }),
            p({ id: 'h2-rc-a10', name: '340 Riverside Crescent A10', units: 769, resi: 769, pct: 37.4, status: 'on-track',
              floors: 'G+2P+39', start: 'Mar 2024', end: 'Dec 2028', dur: '57 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 250 }, { type: '2BR', nos: 318 }, { type: '3BR', nos: 142 }, { type: '4BR', nos: 48 }, { type: 'Penthouse', nos: 11 }],
              d: '38,500,000', s: '16,900,000', c: '935,000,000', a: '24,500,000', cs: '53,000,000',
              billed: '399,318,000', bp: '37.4%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Superstructure in progress.' }),
            p({ id: 'h2-rc-a11', name: '350 Riverside Crescent A11', units: 750, resi: 750, pct: 39.1, status: 'on-track',
              floors: 'G+2P+38', start: 'Mar 2024', end: 'Dec 2028', dur: '57 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 240 }, { type: '2BR', nos: 305 }, { type: '3BR', nos: 145 }, { type: '4BR', nos: 50 }, { type: 'Penthouse', nos: 10 }],
              d: '37,500,000', s: '16,500,000', c: '910,000,000', a: '23,800,000', cs: '51,000,000',
              billed: '406,128,000', bp: '39.1%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Superstructure in progress.' }),
            p({ id: 'h2-rc-a05', name: '310 Riverside Crescent A05', units: 913, resi: 913, pct: 29.5, status: 'on-track',
              floors: 'G+2P+42', start: 'Jun 2024', end: 'Dec 2028', dur: '54 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 295 }, { type: '2BR', nos: 380 }, { type: '3BR', nos: 170 }, { type: '4BR', nos: 56 }, { type: 'Penthouse', nos: 12 }],
              d: '42,000,000', s: '18,500,000', c: '1,080,000,000', a: '28,000,000', cs: '60,000,000',
              billed: '362,505,000', bp: '29.5%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Substructure in progress.' }),
            p({ id: 'h2-rc-a12', name: '360 Riverside Crescent A12', units: 910, resi: 910, pct: 27.0, status: 'on-track',
              floors: 'G+2P+42', start: 'Jun 2024', end: 'Dec 2028', dur: '54 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 290 }, { type: '2BR', nos: 375 }, { type: '3BR', nos: 175 }, { type: '4BR', nos: 58 }, { type: 'Penthouse', nos: 12 }],
              d: '41,800,000', s: '18,400,000', c: '1,070,000,000', a: '27,800,000', cs: '59,000,000',
              billed: '328,590,000', bp: '27.0%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Substructure in progress.' }),
          ],
        },
        {
          label: 'Skyscape & Skyvue',
          projects: [
            p({ id: 'h2-skyscape', name: 'Sobha Skyscape Altius, Avenue & Aura (A2,A3,A4)', units: 1880, resi: 1880, pct: 11.9, status: 'on-track',
              floors: '3 towers G+2P+45', start: 'Sep 2024', end: 'Dec 2029', dur: '63 months', rera: 'Dec 2029',
              mix: [{ type: '1BR', nos: 580 }, { type: '2BR', nos: 720 }, { type: '3BR', nos: 380 }, { type: '4BR', nos: 148 }, { type: 'Penthouse', nos: 52 }],
              d: '72,000,000', s: '32,000,000', c: '2,400,000,000', a: '58,000,000', cs: '120,000,000',
              billed: '319,080,000', bp: '11.9%',
              appr: ['NOC'],
              rem: 'Piling and substructure in progress across 3 towers.' }),
            p({ id: 'h2-skyvue', name: 'Sobha Skyvue Solair, Spectra, Stellar, Altier (A13,A14,A15,A16)', units: 2731, resi: 2731, pct: 5.0, status: 'on-track',
              floors: '4 towers G+2P+50+', start: 'Jan 2025', end: 'Mar 2030', dur: '62 months', rera: 'Mar 2030',
              mix: [{ type: '1BR', nos: 820 }, { type: '2BR', nos: 1050 }, { type: '3BR', nos: 560 }, { type: '4BR', nos: 220 }, { type: 'Penthouse', nos: 81 }],
              d: '98,000,000', s: '42,000,000', c: '3,600,000,000', a: '82,000,000', cs: '168,000,000',
              billed: '199,500,000', bp: '5.0%',
              appr: ['NOC'],
              rem: 'Enabling works and piling commenced.' }),
          ],
        },
        {
          label: 'Villas & Mansions',
          projects: [
            p({ id: 'h2-estates', name: 'Sobha Estates', units: 110, resi: 110, pct: 41.6, status: 'on-track',
              start: 'Jun 2023', end: 'Dec 2027', dur: '54 months', rera: 'Dec 2027',
              mix: [{ type: '5BR Villa', nos: 65 }, { type: '6BR Villa', nos: 35 }, { type: '7BR Villa', nos: 10 }],
              d: '22,000,000', s: '10,000,000', c: '480,000,000', a: '14,000,000', cs: '32,000,000',
              billed: '232,128,000', bp: '41.6%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Villa shells largely complete. Finishing phase.' }),
            p({ id: 'h2-m03', name: 'Sobha Mansion 03', units: 1, resi: 1, pct: 3.9, status: 'on-track',
              mix: [{ type: 'Mansion', nos: 1 }],
              d: '4,000,000', s: '2,000,000', c: '65,000,000', a: '3,500,000', cs: '8,000,000',
              billed: '3,217,500', bp: '3.9%',
              rem: 'Foundation works started.' }),
            p({ id: 'h2-m05', name: 'Sobha Mansion 05', units: 1, resi: 1, pct: 10.0, status: 'on-track',
              start: 'Mar 2025', end: 'Sep 2026', dur: '18 months',
              mix: [{ type: 'Mansion', nos: 1 }],
              d: '3,800,000', s: '1,800,000', c: '58,000,000', a: '3,200,000', cs: '7,000,000',
              billed: '7,380,000', bp: '10.0%',
              rem: 'Substructure in progress.' }),
          ],
        },
      ],
    },
    // ── SOBHA ONE ────────────────────────────────────────────────────────
    {
      id: 'sobha-one',
      name: 'Sobha One',
      sub: '3 projects · 3,476 units',
      badgeType: 'on-track',
      summary: {
        units: '3,476',
        projects: '0 done · 2 active · 1 upcoming',
        infra: 'Golf course upcoming',
        contract: 'AED 6.8B',
        certified: 'AED 4.1B',
      },
      groups: [
        {
          label: 'Ongoing',
          projects: [
            p({ id: 'so-a2', name: 'Sobha One SO A2', units: 3057, resi: 3057, pct: 67.1, status: 'on-track',
              floors: 'G+2P+60', plot: '180,000 sft', gfa: '4,200,000 sft', bua: '3,400,000 sft', sa: '2,380,000 sft',
              far: '23.33', saGfa: '0.567', saBua: '0.700',
              start: 'Jan 2022', end: 'Dec 2027', dur: '71 months', rera: 'Dec 2027',
              mix: [{ type: '1BR', nos: 920 }, { type: '2BR', nos: 1200 }, { type: '3BR', nos: 580 }, { type: '4BR', nos: 260 }, { type: 'Penthouse', nos: 97 }],
              d: '128,000,000', s: '56,000,000', c: '4,800,000,000', a: '110,000,000', cs: '240,000,000',
              billed: '3,578,340,000', bp: '67.1%',
              appr: ['NOC', 'Building Permit', 'DEWA', 'Etisalat', 'Civil Defence'],
              rem: 'Superstructure topped out. Cladding and finishing ongoing.' }),
            p({ id: 'so-a4', name: 'The Element at Sobha One SO A4', units: 401, resi: 401, pct: 7.0, status: 'on-track',
              floors: 'G+2P+32', start: 'Sep 2025', end: 'Dec 2029', dur: '51 months', rera: 'Dec 2029',
              mix: [{ type: '1BR', nos: 130 }, { type: '2BR', nos: 160 }, { type: '3BR', nos: 78 }, { type: '4BR', nos: 28 }, { type: 'Penthouse', nos: 5 }],
              d: '18,000,000', s: '8,000,000', c: '520,000,000', a: '14,000,000', cs: '28,000,000',
              billed: '41,160,000', bp: '7.0%',
              appr: ['NOC'],
              rem: 'Piling in progress.' }),
          ],
        },
        {
          label: 'Upcoming',
          projects: [
            p({ id: 'so-gc', name: 'Golf Course OS-06', units: 18, pct: 0, status: 'upcoming',
              start: 'TBD', end: 'Aug 2027',
              rem: '18-hole championship golf course. Design phase.' }),
          ],
        },
      ],
    },
    // ── SOBHA RESERVE ────────────────────────────────────────────────────
    {
      id: 'reserve',
      name: 'Sobha Reserve',
      sub: '3 projects · 348 units',
      badgeType: 'on-track',
      summary: {
        units: '348',
        projects: '0 done · 2 active · 1 upcoming',
        infra: 'Roads 70%',
        contract: 'AED 1.4B',
        certified: 'AED 680M',
      },
      groups: [
        {
          label: 'Ongoing',
          projects: [
            p({ id: 'sr-villas', name: 'Reserve Villas', units: 340, resi: 340, pct: 55.2, status: 'on-track',
              start: 'Jan 2023', end: 'Jun 2027', dur: '54 months', rera: 'Jun 2027',
              mix: [{ type: '4BR Villa', nos: 180 }, { type: '5BR Villa', nos: 120 }, { type: '6BR Villa', nos: 40 }],
              d: '28,000,000', s: '12,000,000', c: '1,080,000,000', a: '32,000,000', cs: '56,000,000',
              billed: '667,104,000', bp: '55.2%',
              appr: ['NOC', 'Building Permit'],
              rem: 'Villa construction phased. 180 units in finishing stage.' }),
            p({ id: 'sr-club', name: 'Reserve Clubhouse', units: 0, pct: 41.0, status: 'watch',
              start: 'Jun 2023', end: 'May 2026', dur: '35 months',
              d: '4,200,000', s: '2,000,000', c: '48,000,000', a: '2,800,000', cs: '5,000,000',
              billed: '25,420,000', bp: '41.0%',
              rem: 'Structure complete. MEP and finishing.' }),
          ],
        },
        {
          label: 'Upcoming',
          projects: [
            p({ id: 'sr-retail', name: 'Reserve Retail', units: 8, retail: 8, pct: 0, status: 'upcoming',
              start: 'May 2026',
              rem: 'Design stage. Planned 8 retail units.' }),
          ],
        },
      ],
    },
    // ── SOBHA ELWOOD ─────────────────────────────────────────────────────
    {
      id: 'elwood',
      name: 'Sobha Elwood',
      sub: '2 projects · 286 villas',
      badgeType: 'upcoming',
      summary: {
        units: '286',
        projects: '0 done · 1 active · 1 infra',
        infra: '10% complete',
        contract: 'AED 620M',
        certified: 'AED 42M',
      },
      groups: [
        {
          label: 'Ongoing',
          projects: [
            p({ id: 'ew-villas', name: 'Sobha Elwood Villas Released', units: 286, resi: 286, pct: 5, status: 'on-track',
              mix: [{ type: '4BR Villa', nos: 150 }, { type: '5BR Villa', nos: 96 }, { type: '6BR Villa', nos: 40 }],
              d: '12,000,000', s: '5,200,000', c: '480,000,000', a: '14,000,000', cs: '24,000,000',
              billed: '26,760,000', bp: '5.0%',
              rem: 'Infrastructure ongoing. Villa construction to start post-infra.' }),
            p({ id: 'ew-infra', name: 'Sobha Elwood Infrastructure', units: 0, pct: 10, status: 'infra',
              d: '3,200,000', s: '1,600,000', c: '82,000,000', a: '4,800,000', cs: '8,000,000',
              billed: '9,960,000', bp: '10.0%',
              rem: 'Earthworks and road grading in progress.' }),
          ],
        },
      ],
    },
    // ── SOBHA CENTRAL ────────────────────────────────────────────────────
    {
      id: 'central',
      name: 'Sobha Central',
      sub: '3 tower clusters · 6,780 units',
      badgeType: 'upcoming',
      summary: {
        units: '6,780',
        projects: '0 done · 3 active',
        infra: 'Enabling works',
        contract: 'AED 18.2B',
        certified: 'AED 420M',
      },
      groups: [
        {
          label: 'Ongoing',
          projects: [
            p({ id: 'sc-t12', name: 'Tranquil & Serene T1 & T2', units: 2136, resi: 2136, pct: 2, status: 'on-track',
              floors: '2 towers G+2P+55', start: 'Sep 2025', end: 'Dec 2029', dur: '51 months', rera: 'Dec 2029',
              mix: [{ type: '1BR', nos: 640 }, { type: '2BR', nos: 830 }, { type: '3BR', nos: 440 }, { type: '4BR', nos: 180 }, { type: 'Penthouse', nos: 46 }],
              d: '82,000,000', s: '36,000,000', c: '2,800,000,000', a: '65,000,000', cs: '140,000,000',
              billed: '62,460,000', bp: '2.0%',
              appr: ['NOC'],
              rem: 'Enabling works commenced. Piling to start Q2 2026.' }),
            p({ id: 'sc-t34', name: 'Eden & Horizon T3 & T4', units: 2377, resi: 2377, pct: 2, status: 'on-track',
              floors: '2 towers G+2P+58', start: 'Dec 2025', end: 'Dec 2029', dur: '48 months', rera: 'Dec 2029',
              mix: [{ type: '1BR', nos: 720 }, { type: '2BR', nos: 920 }, { type: '3BR', nos: 490 }, { type: '4BR', nos: 196 }, { type: 'Penthouse', nos: 51 }],
              d: '88,000,000', s: '38,000,000', c: '3,100,000,000', a: '72,000,000', cs: '155,000,000',
              billed: '69,100,000', bp: '2.0%',
              appr: ['NOC'],
              rem: 'Enabling works. Piling expected mid-2026.' }),
            p({ id: 'sc-t56', name: 'Pinnacle, Mirage & Mall T5 & T6', units: 2267, resi: 2118, retail: 149, pct: 1, status: 'upcoming',
              floors: '2 towers + mall', start: 'Jun 2026', end: 'Dec 2030', dur: '54 months', rera: 'Dec 2030',
              mix: [{ type: '1BR', nos: 680 }, { type: '2BR', nos: 860 }, { type: '3BR', nos: 428 }, { type: '4BR', nos: 150 }, { type: 'Retail', nos: 149 }],
              d: '92,000,000', s: '40,000,000', c: '3,200,000,000', a: '75,000,000', cs: '160,000,000',
              billed: '35,670,000', bp: '1.0%',
              rem: 'Design finalization. Construction planned H2 2026.' }),
          ],
        },
      ],
    },
    // ── SOBHA SANCTUARY ──────────────────────────────────────────────────
    {
      id: 'sanctuary',
      name: 'Sobha Sanctuary',
      sub: '4 clusters · 1,479 villas',
      badgeType: 'upcoming',
      summary: {
        units: '1,479',
        projects: '0 done · 0 active · 4 upcoming',
        infra: 'Master planning',
        contract: 'AED 3.8B',
        certified: 'AED 0',
      },
      groups: [
        {
          label: 'Upcoming',
          projects: [
            p({ id: 'sn-grove', name: 'The Grove Cluster A', units: 311, resi: 311, pct: 0, status: 'upcoming',
              start: 'Jun 2026',
              mix: [{ type: '4BR Villa', nos: 160 }, { type: '5BR Villa', nos: 110 }, { type: '6BR Villa', nos: 41 }],
              rem: 'Master planning complete. Infrastructure design phase.' }),
            p({ id: 'sn-brooks', name: 'The Brooks Cluster B', units: 185, resi: 185, pct: 0, status: 'upcoming',
              start: 'Jun 2026',
              mix: [{ type: '4BR Villa', nos: 95 }, { type: '5BR Villa', nos: 65 }, { type: '6BR Villa', nos: 25 }],
              rem: 'Design phase.' }),
            p({ id: 'sn-greens', name: 'The Greens Cluster C', units: 337, resi: 337, pct: 0, status: 'upcoming',
              start: 'Jun 2026',
              mix: [{ type: '4BR Villa', nos: 175 }, { type: '5BR Villa', nos: 120 }, { type: '6BR Villa', nos: 42 }],
              rem: 'Design phase.' }),
            p({ id: 'sn-willows', name: 'The Willows Cluster E', units: 646, resi: 646, pct: 0, status: 'upcoming',
              start: 'Jun 2026',
              mix: [{ type: '3BR Villa', nos: 200 }, { type: '4BR Villa', nos: 280 }, { type: '5BR Villa', nos: 130 }, { type: '6BR Villa', nos: 36 }],
              rem: 'Design phase.' }),
          ],
        },
      ],
    },
    // ── INDIVIDUAL PROJECTS ──────────────────────────────────────────────
    {
      id: 'individual',
      name: 'Individual Projects',
      sub: '7 projects across Dubai',
      badgeType: 'watch',
      summary: {
        units: '7,991',
        projects: '1 done · 4 active · 2 other',
        infra: 'N/A',
        contract: 'AED 12.4B',
        certified: 'AED 2.8B',
      },
      groups: [
        {
          label: 'Completed',
          projects: [
            p({ id: 'ip-stower', name: 'The S Tower SZR', units: 95, resi: 95, pct: 100, status: 'complete',
              start: 'Jan 2022', end: 'Apr 2025',
              rem: 'Completed and handed over.' }),
          ],
        },
        {
          label: 'Ongoing',
          projects: [
            p({ id: 'ip-verde', name: 'Verde by Sobha', units: 610, resi: 610, pct: 61.7, status: 'on-track',
              floors: 'G+2P+28', start: 'Jun 2023', end: 'Jun 2027', dur: '48 months', rera: 'Jun 2027',
              mix: [{ type: '1BR', nos: 195 }, { type: '2BR', nos: 248 }, { type: '3BR', nos: 120 }, { type: '4BR', nos: 40 }, { type: 'Penthouse', nos: 7 }],
              d: '24,000,000', s: '10,500,000', c: '680,000,000', a: '18,000,000', cs: '36,000,000',
              billed: '474,426,000', bp: '61.7%',
              appr: ['NOC', 'Building Permit', 'DEWA'],
              rem: 'Structure topped out. Cladding and finishing.' }),
            p({ id: 'ip-seahaven', name: 'Sobha Seahaven Tower A, B & C', units: 778, resi: 778, pct: 24, status: 'risk',
              floors: '3 towers G+2P+45', start: 'Jan 2023', end: 'TBD', rera: 'Overdue',
              mix: [{ type: '1BR', nos: 240 }, { type: '2BR', nos: 310 }, { type: '3BR', nos: 158 }, { type: '4BR', nos: 58 }, { type: 'Penthouse', nos: 12 }],
              d: '42,000,000', s: '18,500,000', c: '1,280,000,000', a: '32,000,000', cs: '68,000,000',
              billed: '345,960,000', bp: '24.0%',
              appr: ['NOC', 'Building Permit'],
              rem: 'RERA deadline overdue. Escalation in progress. Superstructure ongoing.' }),
            p({ id: 'ip-orbis', name: 'Sobha Orbis', units: 2996, resi: 2996, pct: 6.4, status: 'on-track',
              floors: 'G+2P+55', start: 'Jun 2025', end: 'Dec 2028', dur: '42 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 900 }, { type: '2BR', nos: 1150 }, { type: '3BR', nos: 610 }, { type: '4BR', nos: 260 }, { type: 'Penthouse', nos: 76 }],
              d: '92,000,000', s: '40,000,000', c: '3,400,000,000', a: '78,000,000', cs: '170,000,000',
              billed: '242,048,000', bp: '6.4%',
              appr: ['NOC'],
              rem: 'Piling in progress.' }),
            p({ id: 'ip-solis', name: 'Sobha Solis', units: 2342, resi: 2342, pct: 9.4, status: 'on-track',
              floors: 'G+2P+48', start: 'Mar 2025', end: 'Dec 2028', dur: '45 months', rera: 'Dec 2028',
              mix: [{ type: '1BR', nos: 700 }, { type: '2BR', nos: 900 }, { type: '3BR', nos: 480 }, { type: '4BR', nos: 200 }, { type: 'Penthouse', nos: 62 }],
              d: '78,000,000', s: '34,000,000', c: '2,800,000,000', a: '65,000,000', cs: '140,000,000',
              billed: '293,028,000', bp: '9.4%',
              appr: ['NOC'],
              rem: 'Enabling works and piling commenced.' }),
          ],
        },
        {
          label: 'Upcoming',
          projects: [
            p({ id: 'ip-skyparks', name: 'Sobha Skyparks', units: 676, resi: 676, pct: 0, status: 'upcoming',
              start: 'TBD', end: 'Dec 2031',
              rem: 'Design phase.' }),
            p({ id: 'ip-tech', name: 'Technician Accommodation', units: 494, pct: 99, status: 'on-track',
              start: 'Jan 2024', end: 'Dec 2026',
              rem: '494 rooms. Near completion.' }),
          ],
        },
      ],
    },
  ],
};

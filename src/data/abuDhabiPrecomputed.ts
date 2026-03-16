// Auto-generated from recent_sales.csv
// Generated on 2026-03-15T20:23:43.748Z
// 107156 transactions from Abu Dhabi DARI data

import type { MarketKPIs, DeveloperRow, AreaRow, ProjectRow, UnitMixRow, MarketSignal } from './reTransactionsData';

export interface AbuDhabiPrecomputedSet {
  kpis: MarketKPIs[];
  developers: DeveloperRow[];
  areas: AreaRow[];
  projects: ProjectRow[];
  unitMix: UnitMixRow[];
  signals: MarketSignal[];
  dateRange: string;
  totalValue: number;
  totalTxns: number;
}

export const AD_PRECOMPUTED: Record<string, AbuDhabiPrecomputedSet | null> = {
  "All|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 353.7B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "1,07,156",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "366",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 64.0B"
      }
    ],
    "developers": [
      {
        "name": "Al Hidayriyyat Isl…",
        "value": "AED 25.0B",
        "valueNum": 25005,
        "pct": 7.1,
        "txns": 3700,
        "color": "#378ADD"
      },
      {
        "name": "SDE3",
        "value": "AED 16.8B",
        "valueNum": 16755,
        "pct": 4.7,
        "txns": 2312,
        "color": "#059669"
      },
      {
        "name": "YN7",
        "value": "AED 15.9B",
        "valueNum": 15868,
        "pct": 4.5,
        "txns": 5864,
        "color": "#d97706"
      },
      {
        "name": "SDN8",
        "value": "AED 14.5B",
        "valueNum": 14540,
        "pct": 4.1,
        "txns": 3545,
        "color": "#7c3aed"
      },
      {
        "name": "SDN1",
        "value": "AED 12.2B",
        "valueNum": 12239,
        "pct": 3.5,
        "txns": 1611,
        "color": "#0d9488"
      },
      {
        "name": "RT3",
        "value": "AED 11.1B",
        "valueNum": 11079,
        "pct": 3.1,
        "txns": 5481,
        "color": "#ea580c"
      },
      {
        "name": "JS",
        "value": "AED 10.6B",
        "valueNum": 10640,
        "pct": 3,
        "txns": 1590,
        "color": "#db2777"
      },
      {
        "name": "Fahid Island",
        "value": "AED 9.9B",
        "valueNum": 9896,
        "pct": 2.8,
        "txns": 1390,
        "color": "#65a30d"
      },
      {
        "name": "MZ12",
        "value": "AED 8.9B",
        "valueNum": 8922,
        "pct": 2.5,
        "txns": 3484,
        "color": "#64748b"
      },
      {
        "name": "Ramhan Island",
        "value": "AED 8.0B",
        "valueNum": 7982,
        "pct": 2.3,
        "txns": 619,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Saadiyat Island",
        "value": "AED 60.3B",
        "valueNum": 60313,
        "txns": 9773,
        "avg": "AED 6M"
      },
      {
        "rank": 2,
        "area": "Al Reem Island",
        "value": "AED 56.6B",
        "valueNum": 56622,
        "txns": 23299,
        "avg": "AED 2M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 48.6B",
        "valueNum": 48612,
        "txns": 19986,
        "avg": "AED 2M"
      },
      {
        "rank": 4,
        "area": "Al Hidayriyyat",
        "value": "AED 25.0B",
        "valueNum": 25005,
        "txns": 3700,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Khalifa City",
        "value": "AED 11.7B",
        "valueNum": 11707,
        "txns": 4654,
        "avg": "AED 3M"
      },
      {
        "rank": 6,
        "area": "Al Shamkhah",
        "value": "AED 11.1B",
        "valueNum": 11135,
        "txns": 5538,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Al Jubail Island",
        "value": "AED 10.8B",
        "valueNum": 10775,
        "txns": 1591,
        "avg": "AED 7M"
      },
      {
        "rank": 8,
        "area": "Zayed City",
        "value": "AED 10.4B",
        "valueNum": 10389,
        "txns": 3863,
        "avg": "AED 3M"
      },
      {
        "rank": 9,
        "area": "Fahid Island",
        "value": "AED 9.9B",
        "valueNum": 9896,
        "txns": 1390,
        "avg": "AED 7M"
      },
      {
        "rank": 10,
        "area": "Al Rahah",
        "value": "AED 8.8B",
        "valueNum": 8770,
        "txns": 2948,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "'Asharij",
        "value": "AED 64.0B",
        "valueNum": 63964,
        "txns": 15128,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Saadiyat Lagoons - Wilds - Phase 1",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 6.0B",
        "valueNum": 5951,
        "txns": 714,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Marina Square, Paragon Bay Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 5.9B",
        "valueNum": 5948,
        "txns": 4042,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Saadiyat Lagoons - Phase 2 - Al Sidr",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 5.6B",
        "valueNum": 5626,
        "txns": 669,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Naseem",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.5B",
        "valueNum": 5517,
        "txns": 619,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 5.5B",
        "valueNum": 5497,
        "txns": 64,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Wadeem (Plots)",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.4B",
        "valueNum": 5416,
        "txns": 1598,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Jubail Island - Phase 2",
        "developer": "",
        "location": "Al Jubail Island",
        "value": "AED 5.0B",
        "valueNum": 4974,
        "txns": 811,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 26091,
        "pct": 24,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 22065,
        "pct": 21,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 19044,
        "pct": 18,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 14483,
        "pct": 14,
        "color": "#d97706"
      },
      {
        "type": "4 B/R",
        "count": 9479,
        "pct": 9,
        "color": "#dc2626"
      },
      {
        "type": "Studio",
        "count": 9108,
        "pct": 8,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 6886,
        "pct": 6,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "59% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Saadiyat Island leads with 17% of total value across 9773 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 18,321/sqm (AED 1,702/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 353700854463.3265,
    "totalTxns": 107156
  },
  "All|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 199.0B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "63,187",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "261",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 9.2B"
      }
    ],
    "developers": [
      {
        "name": "Al Hidayriyyat Isl…",
        "value": "AED 25.0B",
        "valueNum": 25005,
        "pct": 12.6,
        "txns": 3700,
        "color": "#378ADD"
      },
      {
        "name": "SDE3",
        "value": "AED 16.1B",
        "valueNum": 16135,
        "pct": 8.1,
        "txns": 2204,
        "color": "#059669"
      },
      {
        "name": "YN7",
        "value": "AED 14.8B",
        "valueNum": 14817,
        "pct": 7.4,
        "txns": 5476,
        "color": "#d97706"
      },
      {
        "name": "SDN8",
        "value": "AED 14.5B",
        "valueNum": 14540,
        "pct": 7.3,
        "txns": 3545,
        "color": "#7c3aed"
      },
      {
        "name": "JS",
        "value": "AED 9.7B",
        "valueNum": 9679,
        "pct": 4.9,
        "txns": 1490,
        "color": "#0d9488"
      },
      {
        "name": "SDN1",
        "value": "AED 8.6B",
        "valueNum": 8554,
        "pct": 4.3,
        "txns": 1157,
        "color": "#ea580c"
      },
      {
        "name": "Ramhan Island",
        "value": "AED 8.0B",
        "valueNum": 7982,
        "pct": 4,
        "txns": 619,
        "color": "#db2777"
      },
      {
        "name": "MZ12",
        "value": "AED 7.6B",
        "valueNum": 7648,
        "pct": 3.8,
        "txns": 3421,
        "color": "#65a30d"
      },
      {
        "name": "Fahid Island",
        "value": "AED 7.4B",
        "valueNum": 7396,
        "pct": 3.7,
        "txns": 1388,
        "color": "#64748b"
      },
      {
        "name": "YS1",
        "value": "AED 6.7B",
        "valueNum": 6673,
        "pct": 3.4,
        "txns": 4822,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Saadiyat Island",
        "value": "AED 46.1B",
        "valueNum": 46149,
        "txns": 7923,
        "avg": "AED 6M"
      },
      {
        "rank": 2,
        "area": "Yas Island",
        "value": "AED 37.1B",
        "valueNum": 37069,
        "txns": 16702,
        "avg": "AED 2M"
      },
      {
        "rank": 3,
        "area": "Al Hidayriyyat",
        "value": "AED 25.0B",
        "valueNum": 25005,
        "txns": 3700,
        "avg": "AED 7M"
      },
      {
        "rank": 4,
        "area": "Al Reem Island",
        "value": "AED 23.1B",
        "valueNum": 23130,
        "txns": 9976,
        "avg": "AED 2M"
      },
      {
        "rank": 5,
        "area": "Al Jubail Island",
        "value": "AED 9.7B",
        "valueNum": 9679,
        "txns": 1490,
        "avg": "AED 6M"
      },
      {
        "rank": 6,
        "area": "Al Shamkhah",
        "value": "AED 8.6B",
        "valueNum": 8615,
        "txns": 4656,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Ramhan Island",
        "value": "AED 8.0B",
        "valueNum": 7982,
        "txns": 619,
        "avg": "AED 13M"
      },
      {
        "rank": 8,
        "area": "Zayed City",
        "value": "AED 7.6B",
        "valueNum": 7648,
        "txns": 3421,
        "avg": "AED 2M"
      },
      {
        "rank": 9,
        "area": "Fahid Island",
        "value": "AED 7.4B",
        "valueNum": 7396,
        "txns": 1388,
        "avg": "AED 5M"
      },
      {
        "rank": 10,
        "area": "Al Bahyah",
        "value": "AED 5.8B",
        "valueNum": 5780,
        "txns": 2385,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Ramhan Island",
        "value": "AED 9.2B",
        "valueNum": 9223,
        "txns": 3621,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Lagoons - Wilds - Phase 1",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 6.0B",
        "valueNum": 5951,
        "txns": 714,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Lagoons - Phase 2 - Al Sidr",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 5.5B",
        "valueNum": 5527,
        "txns": 668,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Naseem",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.5B",
        "valueNum": 5517,
        "txns": 619,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Wadeem (Plots)",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.4B",
        "valueNum": 5416,
        "txns": 1598,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nawayef East B",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 4.4B",
        "valueNum": 4446,
        "txns": 408,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Jubail Island - Phase 2",
        "developer": "",
        "location": "Al Jubail Island",
        "value": "AED 4.3B",
        "valueNum": 4321,
        "txns": 743,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Gardenia Bay",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 4.1B",
        "valueNum": 4061,
        "txns": 2409,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "2 B/R",
        "count": 13115,
        "pct": 21,
        "color": "#378ADD"
      },
      {
        "type": "Other",
        "count": 11396,
        "pct": 18,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 11284,
        "pct": 18,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 10334,
        "pct": 16,
        "color": "#d97706"
      },
      {
        "type": "Studio",
        "count": 6794,
        "pct": 11,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 6023,
        "pct": 10,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 4241,
        "pct": 7,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Saadiyat Island leads with 23% of total value across 7923 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 15,600/sqm (AED 1,449/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "3 Jan 2019 – 12 Mar 2026",
    "totalValue": 198976393013.28986,
    "totalTxns": 63187
  },
  "All|Primary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 56.7B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "13,680",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "170",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 12.4B"
      }
    ],
    "developers": [
      {
        "name": "RT3",
        "value": "AED 4.9B",
        "valueNum": 4927,
        "pct": 8.7,
        "txns": 1533,
        "color": "#378ADD"
      },
      {
        "name": "Al Reef",
        "value": "AED 4.4B",
        "valueNum": 4442,
        "pct": 7.8,
        "txns": 3903,
        "color": "#059669"
      },
      {
        "name": "Fahid Island",
        "value": "AED 2.5B",
        "valueNum": 2500,
        "pct": 4.4,
        "txns": 2,
        "color": "#d97706"
      },
      {
        "name": "RS3",
        "value": "AED 2.2B",
        "valueNum": 2236,
        "pct": 3.9,
        "txns": 433,
        "color": "#7c3aed"
      },
      {
        "name": "RS6",
        "value": "AED 2.1B",
        "valueNum": 2139,
        "pct": 3.8,
        "txns": 1293,
        "color": "#0d9488"
      },
      {
        "name": "SE45_05",
        "value": "AED 1.8B",
        "valueNum": 1770,
        "pct": 3.1,
        "txns": 201,
        "color": "#ea580c"
      },
      {
        "name": "W57",
        "value": "AED 1.5B",
        "valueNum": 1478,
        "pct": 2.6,
        "txns": 1,
        "color": "#db2777"
      },
      {
        "name": "RB15",
        "value": "AED 1.2B",
        "valueNum": 1232,
        "pct": 2.2,
        "txns": 268,
        "color": "#65a30d"
      },
      {
        "name": "RT2",
        "value": "AED 1.2B",
        "valueNum": 1194,
        "pct": 2.1,
        "txns": 406,
        "color": "#64748b"
      },
      {
        "name": "RBW6",
        "value": "AED 1.2B",
        "valueNum": 1188,
        "pct": 2.1,
        "txns": 270,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 16.1B",
        "valueNum": 16074,
        "txns": 4763,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Yas Island",
        "value": "AED 4.9B",
        "valueNum": 4908,
        "txns": 1001,
        "avg": "AED 5M"
      },
      {
        "rank": 3,
        "area": "Al Saadiyat Island",
        "value": "AED 4.8B",
        "valueNum": 4758,
        "txns": 874,
        "avg": "AED 5M"
      },
      {
        "rank": 4,
        "area": "Al Reef",
        "value": "AED 4.4B",
        "valueNum": 4442,
        "txns": 3903,
        "avg": "AED 1M"
      },
      {
        "rank": 5,
        "area": "Khalifa City",
        "value": "AED 3.2B",
        "valueNum": 3221,
        "txns": 524,
        "avg": "AED 6M"
      },
      {
        "rank": 6,
        "area": "Al Rahah",
        "value": "AED 2.9B",
        "valueNum": 2946,
        "txns": 816,
        "avg": "AED 4M"
      },
      {
        "rank": 7,
        "area": "Fahid Island",
        "value": "AED 2.5B",
        "valueNum": 2500,
        "txns": 2,
        "avg": "AED 1.3B"
      },
      {
        "rank": 8,
        "area": "Al Rawdah",
        "value": "AED 1.7B",
        "valueNum": 1678,
        "txns": 4,
        "avg": "AED 420M"
      },
      {
        "rank": 9,
        "area": "Rabdan",
        "value": "AED 1.3B",
        "valueNum": 1272,
        "txns": 271,
        "avg": "AED 5M"
      },
      {
        "rank": 10,
        "area": "Jarn Yafour",
        "value": "AED 1.1B",
        "valueNum": 1128,
        "txns": 55,
        "avg": "AED 21M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Al Danah",
        "value": "AED 12.4B",
        "valueNum": 12416,
        "txns": 335,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 3.7B",
        "valueNum": 3676,
        "txns": 45,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Tamouh (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 2.3B",
        "valueNum": 2293,
        "txns": 35,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Beach District (Plots)",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 2.1B",
        "valueNum": 2100,
        "txns": 47,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Masdar City - Phase 1 (Plots)",
        "developer": "",
        "location": "Khalifa City",
        "value": "AED 1.8B",
        "valueNum": 1834,
        "txns": 7,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Downtown",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 1.5B",
        "valueNum": 1478,
        "txns": 1740,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Zayed Sports City, Rihan Heights",
        "developer": "",
        "location": "Al Rawdah",
        "value": "AED 1.5B",
        "valueNum": 1478,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Mangrove Village",
        "developer": "",
        "location": "Rabdan",
        "value": "AED 1.2B",
        "valueNum": 1232,
        "txns": 268,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "2 B/R",
        "count": 3890,
        "pct": 28,
        "color": "#378ADD"
      },
      {
        "type": "1 B/R",
        "count": 2748,
        "pct": 20,
        "color": "#059669"
      },
      {
        "type": "3 B/R",
        "count": 1797,
        "pct": 13,
        "color": "#7c3aed"
      },
      {
        "type": "Other",
        "count": 1729,
        "pct": 13,
        "color": "#d97706"
      },
      {
        "type": "4 B/R",
        "count": 1471,
        "pct": 11,
        "color": "#dc2626"
      },
      {
        "type": "5 B/R+",
        "count": 1193,
        "pct": 9,
        "color": "#0d9488"
      },
      {
        "type": "Studio",
        "count": 852,
        "pct": 6,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 28% of total value across 4763 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 11,671/sqm (AED 1,084/sqft). Average ticket size is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 56729502192.900085,
    "totalTxns": 13680
  },
  "All|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 113.8B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "36,537",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "273",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 42.5B"
      }
    ],
    "developers": [
      {
        "name": "RT1",
        "value": "AED 5.9B",
        "valueNum": 5916,
        "pct": 5.2,
        "txns": 4034,
        "color": "#378ADD"
      },
      {
        "name": "SDN7",
        "value": "AED 3.8B",
        "valueNum": 3813,
        "pct": 3.4,
        "txns": 184,
        "color": "#059669"
      },
      {
        "name": "RT3",
        "value": "AED 3.5B",
        "valueNum": 3508,
        "pct": 3.1,
        "txns": 1983,
        "color": "#d97706"
      },
      {
        "name": "YN7",
        "value": "AED 3.2B",
        "valueNum": 3232,
        "pct": 2.8,
        "txns": 1320,
        "color": "#7c3aed"
      },
      {
        "name": "SDN1",
        "value": "AED 3.2B",
        "valueNum": 3202,
        "pct": 2.8,
        "txns": 368,
        "color": "#0d9488"
      },
      {
        "name": "SDE3",
        "value": "AED 3.2B",
        "valueNum": 3177,
        "pct": 2.8,
        "txns": 495,
        "color": "#ea580c"
      },
      {
        "name": "Al Reef",
        "value": "AED 2.9B",
        "valueNum": 2900,
        "pct": 2.5,
        "txns": 2182,
        "color": "#db2777"
      },
      {
        "name": "RBW2",
        "value": "AED 2.5B",
        "valueNum": 2542,
        "pct": 2.2,
        "txns": 1137,
        "color": "#65a30d"
      },
      {
        "name": "RT4",
        "value": "AED 2.4B",
        "valueNum": 2389,
        "pct": 2.1,
        "txns": 3,
        "color": "#64748b"
      },
      {
        "name": "RS6",
        "value": "AED 2.4B",
        "valueNum": 2364,
        "pct": 2.1,
        "txns": 1269,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 19.2B",
        "valueNum": 19248,
        "txns": 9446,
        "avg": "AED 2M"
      },
      {
        "rank": 2,
        "area": "Al Saadiyat Island",
        "value": "AED 14.0B",
        "valueNum": 13971,
        "txns": 1943,
        "avg": "AED 7M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 12.0B",
        "valueNum": 12004,
        "txns": 4717,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Khalifa City",
        "value": "AED 5.9B",
        "valueNum": 5901,
        "txns": 1571,
        "avg": "AED 4M"
      },
      {
        "rank": 5,
        "area": "Al Danah",
        "value": "AED 4.6B",
        "valueNum": 4633,
        "txns": 190,
        "avg": "AED 24M"
      },
      {
        "rank": 6,
        "area": "Al Rahah",
        "value": "AED 4.2B",
        "valueNum": 4218,
        "txns": 1392,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 4.1B",
        "valueNum": 4087,
        "txns": 639,
        "avg": "AED 6M"
      },
      {
        "rank": 8,
        "area": "Al Shamkhah",
        "value": "AED 3.4B",
        "valueNum": 3359,
        "txns": 1624,
        "avg": "AED 2M"
      },
      {
        "rank": 9,
        "area": "Al Reef",
        "value": "AED 2.9B",
        "valueNum": 2881,
        "txns": 2172,
        "avg": "AED 1M"
      },
      {
        "rank": 10,
        "area": "Zayed City",
        "value": "AED 2.8B",
        "valueNum": 2756,
        "txns": 850,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "'Asharij",
        "value": "AED 42.5B",
        "valueNum": 42514,
        "txns": 11249,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Marina Square, Paragon Bay Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 5.9B",
        "valueNum": 5916,
        "txns": 4034,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Leaf Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 2.2B",
        "valueNum": 2200,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.8B",
        "valueNum": 1821,
        "txns": 19,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Saadiyat Beach District (Plots)",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.4B",
        "valueNum": 1446,
        "txns": 109,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Al Suhoul",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.3B",
        "valueNum": 1286,
        "txns": 95,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Al Seef",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.2B",
        "valueNum": 1243,
        "txns": 50,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Ras Al Hidd",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.2B",
        "valueNum": 1234,
        "txns": 30,
        "propType": "Villa",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 14214,
        "pct": 39,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 6240,
        "pct": 17,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 5987,
        "pct": 16,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 3625,
        "pct": 10,
        "color": "#d97706"
      },
      {
        "type": "4 B/R",
        "count": 2685,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "Studio",
        "count": 2045,
        "pct": 6,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 1741,
        "pct": 5,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "17% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 17% of total value across 9446 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 24,476/sqm (AED 2,274/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 113778296113.43948,
    "totalTxns": 36537
  },
  "Apartment|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 167.6B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "60,871",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "231",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 36.8B"
      }
    ],
    "developers": [
      {
        "name": "SDN8",
        "value": "AED 14.5B",
        "valueNum": 14540,
        "pct": 8.7,
        "txns": 3545,
        "color": "#378ADD"
      },
      {
        "name": "Fahid Island",
        "value": "AED 9.9B",
        "valueNum": 9882,
        "pct": 5.9,
        "txns": 1389,
        "color": "#059669"
      },
      {
        "name": "SDN1",
        "value": "AED 9.7B",
        "valueNum": 9726,
        "pct": 5.8,
        "txns": 1385,
        "color": "#d97706"
      },
      {
        "name": "YS1",
        "value": "AED 7.4B",
        "valueNum": 7405,
        "pct": 4.4,
        "txns": 5480,
        "color": "#7c3aed"
      },
      {
        "name": "RT3",
        "value": "AED 6.7B",
        "valueNum": 6688,
        "pct": 4,
        "txns": 4359,
        "color": "#0d9488"
      },
      {
        "name": "RT1",
        "value": "AED 5.7B",
        "valueNum": 5693,
        "pct": 3.4,
        "txns": 4013,
        "color": "#ea580c"
      },
      {
        "name": "YS2",
        "value": "AED 5.4B",
        "valueNum": 5438,
        "pct": 3.2,
        "txns": 2769,
        "color": "#db2777"
      },
      {
        "name": "YS3_06",
        "value": "AED 5.3B",
        "valueNum": 5309,
        "pct": 3.2,
        "txns": 2526,
        "color": "#65a30d"
      },
      {
        "name": "Ramhan Island",
        "value": "AED 4.8B",
        "valueNum": 4766,
        "pct": 2.8,
        "txns": 405,
        "color": "#64748b"
      },
      {
        "name": "YN7",
        "value": "AED 4.6B",
        "valueNum": 4646,
        "pct": 2.8,
        "txns": 2121,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 41.6B",
        "valueNum": 41565,
        "txns": 20269,
        "avg": "AED 2M"
      },
      {
        "rank": 2,
        "area": "Al Saadiyat Island",
        "value": "AED 30.8B",
        "valueNum": 30828,
        "txns": 6718,
        "avg": "AED 5M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 24.0B",
        "valueNum": 24039,
        "txns": 12966,
        "avg": "AED 2M"
      },
      {
        "rank": 4,
        "area": "Fahid Island",
        "value": "AED 9.9B",
        "valueNum": 9882,
        "txns": 1389,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Al Rahah",
        "value": "AED 7.6B",
        "valueNum": 7649,
        "txns": 2833,
        "avg": "AED 3M"
      },
      {
        "rank": 6,
        "area": "Khalifa City",
        "value": "AED 5.0B",
        "valueNum": 4960,
        "txns": 3299,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Ramhan Island",
        "value": "AED 4.8B",
        "valueNum": 4766,
        "txns": 405,
        "avg": "AED 12M"
      },
      {
        "rank": 8,
        "area": "Al Danah",
        "value": "AED 3.5B",
        "valueNum": 3463,
        "txns": 144,
        "avg": "AED 24M"
      },
      {
        "rank": 9,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 2.5B",
        "valueNum": 2493,
        "txns": 275,
        "avg": "AED 9M"
      },
      {
        "rank": 10,
        "area": "Al Maryah Island",
        "value": "AED 2.4B",
        "valueNum": 2411,
        "txns": 904,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Madinat Zayed",
        "value": "AED 36.8B",
        "valueNum": 36758,
        "txns": 5169,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Marina Square, Paragon Bay Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 5.7B",
        "valueNum": 5693,
        "txns": 4013,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 4.9B",
        "valueNum": 4902,
        "txns": 54,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Gardenia Bay",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 4.0B",
        "valueNum": 3977,
        "txns": 2394,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Fahid Beach Residences",
        "developer": "",
        "location": "Fahid Island",
        "value": "AED 2.7B",
        "valueNum": 2746,
        "txns": 396,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "The Beach House",
        "developer": "",
        "location": "Fahid Island",
        "value": "AED 2.4B",
        "valueNum": 2373,
        "txns": 672,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Sea La Vie",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 2.3B",
        "valueNum": 2349,
        "txns": 746,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "The Fountain View Residences",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 2.3B",
        "valueNum": 2347,
        "txns": 164,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 19044,
        "pct": 31,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 18283,
        "pct": 30,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 9108,
        "pct": 15,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 6034,
        "pct": 10,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 5882,
        "pct": 10,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 2323,
        "pct": 4,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 197,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "57% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 25% of total value across 20269 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 15,532/sqm (AED 1,443/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 167645006451.89905,
    "totalTxns": 60871
  },
  "Apartment|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 83.0B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "34,784",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 2M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "173",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 5.9B"
      }
    ],
    "developers": [
      {
        "name": "SDN8",
        "value": "AED 14.5B",
        "valueNum": 14540,
        "pct": 17.5,
        "txns": 3545,
        "color": "#378ADD"
      },
      {
        "name": "Fahid Island",
        "value": "AED 7.4B",
        "valueNum": 7396,
        "pct": 8.9,
        "txns": 1388,
        "color": "#059669"
      },
      {
        "name": "SDN1",
        "value": "AED 6.8B",
        "valueNum": 6811,
        "pct": 8.2,
        "txns": 984,
        "color": "#d97706"
      },
      {
        "name": "YS1",
        "value": "AED 6.6B",
        "valueNum": 6588,
        "pct": 7.9,
        "txns": 4807,
        "color": "#7c3aed"
      },
      {
        "name": "YS2",
        "value": "AED 4.8B",
        "valueNum": 4845,
        "pct": 5.8,
        "txns": 2757,
        "color": "#0d9488"
      },
      {
        "name": "Ramhan Island",
        "value": "AED 4.8B",
        "valueNum": 4766,
        "pct": 5.7,
        "txns": 405,
        "color": "#ea580c"
      },
      {
        "name": "YN7",
        "value": "AED 4.6B",
        "valueNum": 4646,
        "pct": 5.6,
        "txns": 2121,
        "color": "#db2777"
      },
      {
        "name": "YS3_06",
        "value": "AED 3.7B",
        "valueNum": 3686,
        "pct": 4.4,
        "txns": 1738,
        "color": "#65a30d"
      },
      {
        "name": "RT3",
        "value": "AED 2.7B",
        "valueNum": 2699,
        "pct": 3.3,
        "txns": 2021,
        "color": "#64748b"
      },
      {
        "name": "RT8",
        "value": "AED 2.2B",
        "valueNum": 2214,
        "pct": 2.7,
        "txns": 1129,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Saadiyat Island",
        "value": "AED 24.9B",
        "valueNum": 24856,
        "txns": 5452,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Yas Island",
        "value": "AED 20.3B",
        "valueNum": 20255,
        "txns": 11457,
        "avg": "AED 2M"
      },
      {
        "rank": 3,
        "area": "Al Reem Island",
        "value": "AED 14.4B",
        "valueNum": 14369,
        "txns": 8210,
        "avg": "AED 2M"
      },
      {
        "rank": 4,
        "area": "Fahid Island",
        "value": "AED 7.4B",
        "valueNum": 7396,
        "txns": 1388,
        "avg": "AED 5M"
      },
      {
        "rank": 5,
        "area": "Ramhan Island",
        "value": "AED 4.8B",
        "valueNum": 4766,
        "txns": 405,
        "avg": "AED 12M"
      },
      {
        "rank": 6,
        "area": "Khalifa City",
        "value": "AED 2.1B",
        "valueNum": 2146,
        "txns": 2600,
        "avg": "AED 825K"
      },
      {
        "rank": 7,
        "area": "Al Shamkhah",
        "value": "AED 1.7B",
        "valueNum": 1669,
        "txns": 1515,
        "avg": "AED 1M"
      },
      {
        "rank": 8,
        "area": "Al Rahah",
        "value": "AED 1.5B",
        "valueNum": 1470,
        "txns": 703,
        "avg": "AED 2M"
      },
      {
        "rank": 9,
        "area": "Al Maryah Island",
        "value": "AED 1.4B",
        "valueNum": 1420,
        "txns": 439,
        "avg": "AED 3M"
      },
      {
        "rank": 10,
        "area": "Zayed City",
        "value": "AED 1.1B",
        "valueNum": 1142,
        "txns": 855,
        "avg": "AED 1M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Ramhan Island",
        "value": "AED 5.9B",
        "valueNum": 5912,
        "txns": 952,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Gardenia Bay",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 4.0B",
        "valueNum": 3977,
        "txns": 2394,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Fahid Beach Residences",
        "developer": "",
        "location": "Fahid Island",
        "value": "AED 2.7B",
        "valueNum": 2746,
        "txns": 396,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "The Beach House",
        "developer": "",
        "location": "Fahid Island",
        "value": "AED 2.4B",
        "valueNum": 2373,
        "txns": 672,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "The Fountain View Residences",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 2.3B",
        "valueNum": 2347,
        "txns": 164,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Fahid Beach Terraces",
        "developer": "",
        "location": "Fahid Island",
        "value": "AED 2.3B",
        "valueNum": 2276,
        "txns": 320,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Ansam - Phase 2 - The Golf Collection",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 2.2B",
        "valueNum": 2239,
        "txns": 1262,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Sea La Vie",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 2.2B",
        "valueNum": 2181,
        "txns": 745,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 11284,
        "pct": 32,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 10896,
        "pct": 31,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 6794,
        "pct": 20,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 3873,
        "pct": 11,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 1320,
        "pct": 4,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 573,
        "pct": 2,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 44,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Saadiyat Island leads with 30% of total value across 5452 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 18,909/sqm (AED 1,757/sqft). Average ticket size is AED 2M."
      }
    ],
    "dateRange": "3 Jan 2019 – 12 Mar 2026",
    "totalValue": 83020713610.1702,
    "totalTxns": 34784
  },
  "Apartment|Primary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 33.8B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "8,530",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "111",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 8.7B"
      }
    ],
    "developers": [
      {
        "name": "RT3",
        "value": "AED 2.5B",
        "valueNum": 2517,
        "pct": 7.4,
        "txns": 916,
        "color": "#378ADD"
      },
      {
        "name": "Fahid Island",
        "value": "AED 2.5B",
        "valueNum": 2487,
        "pct": 7.4,
        "txns": 1,
        "color": "#059669"
      },
      {
        "name": "RS6",
        "value": "AED 2.0B",
        "valueNum": 1962,
        "pct": 5.8,
        "txns": 1249,
        "color": "#d97706"
      },
      {
        "name": "RS3",
        "value": "AED 1.9B",
        "valueNum": 1872,
        "pct": 5.5,
        "txns": 427,
        "color": "#7c3aed"
      },
      {
        "name": "W57",
        "value": "AED 1.5B",
        "valueNum": 1478,
        "pct": 4.4,
        "txns": 1,
        "color": "#0d9488"
      },
      {
        "name": "Al Reef",
        "value": "AED 1.4B",
        "valueNum": 1439,
        "pct": 4.3,
        "txns": 1717,
        "color": "#ea580c"
      },
      {
        "name": "RBW6",
        "value": "AED 1.2B",
        "valueNum": 1188,
        "pct": 3.5,
        "txns": 270,
        "color": "#db2777"
      },
      {
        "name": "RS5",
        "value": "AED 1.1B",
        "valueNum": 1146,
        "pct": 3.4,
        "txns": 315,
        "color": "#65a30d"
      },
      {
        "name": "Ghantout",
        "value": "AED 1.1B",
        "valueNum": 1083,
        "pct": 3.2,
        "txns": 1,
        "color": "#64748b"
      },
      {
        "name": "RT2",
        "value": "AED 1.1B",
        "valueNum": 1068,
        "pct": 3.2,
        "txns": 404,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 12.1B",
        "valueNum": 12126,
        "txns": 4052,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Al Saadiyat Island",
        "value": "AED 3.4B",
        "valueNum": 3386,
        "txns": 775,
        "avg": "AED 4M"
      },
      {
        "rank": 3,
        "area": "Fahid Island",
        "value": "AED 2.5B",
        "valueNum": 2487,
        "txns": 1,
        "avg": "AED 2.5B"
      },
      {
        "rank": 4,
        "area": "Al Rahah",
        "value": "AED 2.3B",
        "valueNum": 2312,
        "txns": 802,
        "avg": "AED 3M"
      },
      {
        "rank": 5,
        "area": "Al Rawdah",
        "value": "AED 1.5B",
        "valueNum": 1518,
        "txns": 2,
        "avg": "AED 759M"
      },
      {
        "rank": 6,
        "area": "Al Reef",
        "value": "AED 1.4B",
        "valueNum": 1439,
        "txns": 1717,
        "avg": "AED 838K"
      },
      {
        "rank": 7,
        "area": "Yas Island",
        "value": "AED 1.2B",
        "valueNum": 1186,
        "txns": 249,
        "avg": "AED 5M"
      },
      {
        "rank": 8,
        "area": "Ghantout",
        "value": "AED 1.1B",
        "valueNum": 1083,
        "txns": 1,
        "avg": "AED 1.1B"
      },
      {
        "rank": 9,
        "area": "Al Shahamah",
        "value": "AED 1.0B",
        "valueNum": 1000,
        "txns": 1,
        "avg": "AED 1.0B"
      },
      {
        "rank": 10,
        "area": "Khalifa City",
        "value": "AED 957M",
        "valueNum": 957,
        "txns": 201,
        "avg": "AED 5M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Al Danah",
        "value": "AED 8.7B",
        "valueNum": 8706,
        "txns": 133,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 3.1B",
        "valueNum": 3082,
        "txns": 35,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Beach District (Plots)",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.5B",
        "valueNum": 1548,
        "txns": 12,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Zayed Sports City, Rihan Heights",
        "developer": "",
        "location": "Al Rawdah",
        "value": "AED 1.5B",
        "valueNum": 1478,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Tamouh (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.5B",
        "valueNum": 1470,
        "txns": 25,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Downtown",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 1.4B",
        "valueNum": 1404,
        "txns": 1707,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Lamar Residence",
        "developer": "",
        "location": "Al Rahah",
        "value": "AED 1.2B",
        "valueNum": 1188,
        "txns": 270,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Najmat Abu Dhabi  - Phase 1 (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 770M",
        "valueNum": 770,
        "txns": 8,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "2 B/R",
        "count": 3102,
        "pct": 36,
        "color": "#378ADD"
      },
      {
        "type": "1 B/R",
        "count": 2748,
        "pct": 32,
        "color": "#059669"
      },
      {
        "type": "3 B/R",
        "count": 922,
        "pct": 11,
        "color": "#7c3aed"
      },
      {
        "type": "Studio",
        "count": 852,
        "pct": 10,
        "color": "#d97706"
      },
      {
        "type": "4 B/R",
        "count": 588,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "Other",
        "count": 309,
        "pct": 4,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 9,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 36% of total value across 4052 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 12,691/sqm (AED 1,179/sqft). Average ticket size is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 33790612087.699986,
    "totalTxns": 8530
  },
  "Apartment|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 55.2B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "20,198",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "152",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 22.2B"
      }
    ],
    "developers": [
      {
        "name": "RT1",
        "value": "AED 5.7B",
        "valueNum": 5681,
        "pct": 10.3,
        "txns": 4007,
        "color": "#378ADD"
      },
      {
        "name": "RT4",
        "value": "AED 2.4B",
        "valueNum": 2389,
        "pct": 4.3,
        "txns": 3,
        "color": "#059669"
      },
      {
        "name": "SDN1",
        "value": "AED 2.3B",
        "valueNum": 2336,
        "pct": 4.2,
        "txns": 307,
        "color": "#d97706"
      },
      {
        "name": "RBW2",
        "value": "AED 2.3B",
        "valueNum": 2310,
        "pct": 4.2,
        "txns": 1092,
        "color": "#7c3aed"
      },
      {
        "name": "RS6",
        "value": "AED 2.2B",
        "valueNum": 2158,
        "pct": 3.9,
        "txns": 1206,
        "color": "#0d9488"
      },
      {
        "name": "Abu Mreikhah",
        "value": "AED 2.0B",
        "valueNum": 2000,
        "pct": 3.6,
        "txns": 1,
        "color": "#ea580c"
      },
      {
        "name": "RT3",
        "value": "AED 1.6B",
        "valueNum": 1569,
        "pct": 2.8,
        "txns": 1495,
        "color": "#db2777"
      },
      {
        "name": "YS3_06",
        "value": "AED 1.5B",
        "valueNum": 1522,
        "pct": 2.8,
        "txns": 825,
        "color": "#65a30d"
      },
      {
        "name": "YS1",
        "value": "AED 1.4B",
        "valueNum": 1380,
        "pct": 2.5,
        "txns": 1197,
        "color": "#64748b"
      },
      {
        "name": "SDN8",
        "value": "AED 1.3B",
        "valueNum": 1252,
        "pct": 2.3,
        "txns": 486,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 15.8B",
        "valueNum": 15817,
        "txns": 8540,
        "avg": "AED 2M"
      },
      {
        "rank": 2,
        "area": "Al Saadiyat Island",
        "value": "AED 4.2B",
        "valueNum": 4162,
        "txns": 1036,
        "avg": "AED 4M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 4.1B",
        "valueNum": 4083,
        "txns": 2342,
        "avg": "AED 2M"
      },
      {
        "rank": 4,
        "area": "Al Rahah",
        "value": "AED 3.9B",
        "valueNum": 3879,
        "txns": 1338,
        "avg": "AED 3M"
      },
      {
        "rank": 5,
        "area": "Al Danah",
        "value": "AED 3.2B",
        "valueNum": 3227,
        "txns": 140,
        "avg": "AED 23M"
      },
      {
        "rank": 6,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 2.5B",
        "valueNum": 2463,
        "txns": 271,
        "avg": "AED 9M"
      },
      {
        "rank": 7,
        "area": "Abu Mreikhah",
        "value": "AED 2.0B",
        "valueNum": 2000,
        "txns": 1,
        "avg": "AED 2.0B"
      },
      {
        "rank": 8,
        "area": "Khalifa City",
        "value": "AED 2.0B",
        "valueNum": 1975,
        "txns": 669,
        "avg": "AED 3M"
      },
      {
        "rank": 9,
        "area": "Al Manhal",
        "value": "AED 1.2B",
        "valueNum": 1242,
        "txns": 93,
        "avg": "AED 13M"
      },
      {
        "rank": 10,
        "area": "Al Zahiyah",
        "value": "AED 1.2B",
        "valueNum": 1198,
        "txns": 47,
        "avg": "AED 25M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Madinat Zayed",
        "value": "AED 22.2B",
        "valueNum": 22153,
        "txns": 4087,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Marina Square, Paragon Bay Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 5.7B",
        "valueNum": 5681,
        "txns": 4007,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Leaf Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 2.2B",
        "valueNum": 2200,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.8B",
        "valueNum": 1821,
        "txns": 19,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mamsha Al Saadiyat - Azure",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 817M",
        "valueNum": 817,
        "txns": 100,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Al Reef Downtown",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 794M",
        "valueNum": 794,
        "txns": 979,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mamsha Al Saadiyat - Turquoise",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 758M",
        "valueNum": 758,
        "txns": 92,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Sun & Sky, Boutik Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 701M",
        "valueNum": 701,
        "txns": 461,
        "propType": "Apartment",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 5987,
        "pct": 30,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 5073,
        "pct": 25,
        "color": "#059669"
      },
      {
        "type": "Other",
        "count": 4285,
        "pct": 21,
        "color": "#7c3aed"
      },
      {
        "type": "Studio",
        "count": 2045,
        "pct": 10,
        "color": "#d97706"
      },
      {
        "type": "3 B/R",
        "count": 1461,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 1196,
        "pct": 6,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R+",
        "count": 151,
        "pct": 1,
        "color": "#a1a1aa"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "13% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 29% of total value across 8540 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 11,033/sqm (AED 1,025/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 55154401267.2299,
    "totalTxns": 20198
  },
  "Villa|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 164.2B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "44,080",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "165",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 19.3B"
      }
    ],
    "developers": [
      {
        "name": "Al Hidayriyyat Isl…",
        "value": "AED 24.2B",
        "valueNum": 24171,
        "pct": 14.7,
        "txns": 3445,
        "color": "#378ADD"
      },
      {
        "name": "SDE3",
        "value": "AED 16.7B",
        "valueNum": 16703,
        "pct": 10.2,
        "txns": 2304,
        "color": "#059669"
      },
      {
        "name": "YN7",
        "value": "AED 11.1B",
        "valueNum": 11126,
        "pct": 6.8,
        "txns": 3739,
        "color": "#d97706"
      },
      {
        "name": "JS",
        "value": "AED 10.0B",
        "valueNum": 10049,
        "pct": 6.1,
        "txns": 1429,
        "color": "#7c3aed"
      },
      {
        "name": "MZ12",
        "value": "AED 6.7B",
        "valueNum": 6671,
        "pct": 4.1,
        "txns": 2621,
        "color": "#0d9488"
      },
      {
        "name": "SH35",
        "value": "AED 5.9B",
        "valueNum": 5948,
        "pct": 3.6,
        "txns": 2220,
        "color": "#ea580c"
      },
      {
        "name": "RT7",
        "value": "AED 5.2B",
        "valueNum": 5199,
        "pct": 3.2,
        "txns": 770,
        "color": "#db2777"
      },
      {
        "name": "Al Reef",
        "value": "AED 5.2B",
        "valueNum": 5158,
        "pct": 3.1,
        "txns": 3547,
        "color": "#65a30d"
      },
      {
        "name": "Ba Al Ghaiylam",
        "value": "AED 4.8B",
        "valueNum": 4836,
        "pct": 2.9,
        "txns": 1704,
        "color": "#64748b"
      },
      {
        "name": "SDN7",
        "value": "AED 4.2B",
        "valueNum": 4168,
        "pct": 2.5,
        "txns": 208,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Saadiyat Island",
        "value": "AED 29.1B",
        "valueNum": 29107,
        "txns": 3000,
        "avg": "AED 10M"
      },
      {
        "rank": 2,
        "area": "Al Hidayriyyat",
        "value": "AED 24.2B",
        "valueNum": 24171,
        "txns": 3445,
        "avg": "AED 7M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 24.1B",
        "valueNum": 24097,
        "txns": 7000,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Al Jubail Island",
        "value": "AED 10.0B",
        "valueNum": 10049,
        "txns": 1429,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Al Reem Island",
        "value": "AED 8.6B",
        "valueNum": 8571,
        "txns": 1673,
        "avg": "AED 5M"
      },
      {
        "rank": 6,
        "area": "Al Shamkhah",
        "value": "AED 8.3B",
        "valueNum": 8275,
        "txns": 3843,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Zayed City",
        "value": "AED 7.5B",
        "valueNum": 7473,
        "txns": 2848,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Al Bahyah",
        "value": "AED 5.7B",
        "valueNum": 5736,
        "txns": 2077,
        "avg": "AED 3M"
      },
      {
        "rank": 9,
        "area": "Al Reef",
        "value": "AED 5.1B",
        "valueNum": 5144,
        "txns": 3539,
        "avg": "AED 1M"
      },
      {
        "rank": 10,
        "area": "Khalifa City",
        "value": "AED 4.6B",
        "valueNum": 4632,
        "txns": 1333,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "'Asharij",
        "value": "AED 19.3B",
        "valueNum": 19343,
        "txns": 9455,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Saadiyat Lagoons - Wilds - Phase 1",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 6.0B",
        "valueNum": 5951,
        "txns": 714,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Lagoons - Phase 2 - Al Sidr",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 5.5B",
        "valueNum": 5527,
        "txns": 668,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Naseem",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.5B",
        "valueNum": 5517,
        "txns": 619,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Wadeem (Plots)",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.4B",
        "valueNum": 5416,
        "txns": 1598,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Jubail Island - Phase 2",
        "developer": "",
        "location": "Al Jubail Island",
        "value": "AED 5.0B",
        "valueNum": 4961,
        "txns": 808,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nawayef East B",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 4.4B",
        "valueNum": 4446,
        "txns": 408,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nawayef West B",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 4.0B",
        "valueNum": 4024,
        "txns": 310,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 18004,
        "pct": 41,
        "color": "#378ADD"
      },
      {
        "type": "3 B/R",
        "count": 8449,
        "pct": 19,
        "color": "#059669"
      },
      {
        "type": "4 B/R",
        "count": 7156,
        "pct": 16,
        "color": "#7c3aed"
      },
      {
        "type": "5 B/R+",
        "count": 6689,
        "pct": 15,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 3782,
        "pct": 9,
        "color": "#dc2626"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "64% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Saadiyat Island leads with 18% of total value across 3000 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 9,471/sqm (AED 880/sqft). Average ticket size is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 164203566176.9694,
    "totalTxns": 44080
  },
  "Villa|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 114.7B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "28,150",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "111",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Saadiyat Lagoons - W",
        "sub": "AED 6.0B"
      }
    ],
    "developers": [
      {
        "name": "Al Hidayriyyat Isl…",
        "value": "AED 24.2B",
        "valueNum": 24171,
        "pct": 21.1,
        "txns": 3445,
        "color": "#378ADD"
      },
      {
        "name": "SDE3",
        "value": "AED 16.1B",
        "valueNum": 16090,
        "pct": 14,
        "txns": 2197,
        "color": "#059669"
      },
      {
        "name": "YN7",
        "value": "AED 10.1B",
        "valueNum": 10075,
        "pct": 8.8,
        "txns": 3351,
        "color": "#d97706"
      },
      {
        "name": "JS",
        "value": "AED 9.2B",
        "valueNum": 9156,
        "pct": 8,
        "txns": 1341,
        "color": "#7c3aed"
      },
      {
        "name": "MZ12",
        "value": "AED 6.5B",
        "valueNum": 6506,
        "pct": 5.7,
        "txns": 2566,
        "color": "#0d9488"
      },
      {
        "name": "SH35",
        "value": "AED 5.5B",
        "valueNum": 5504,
        "pct": 4.8,
        "txns": 1988,
        "color": "#ea580c"
      },
      {
        "name": "RT7",
        "value": "AED 5.2B",
        "valueNum": 5199,
        "pct": 4.5,
        "txns": 770,
        "color": "#db2777"
      },
      {
        "name": "Ba Al Ghaiylam",
        "value": "AED 4.8B",
        "valueNum": 4836,
        "pct": 4.2,
        "txns": 1704,
        "color": "#65a30d"
      },
      {
        "name": "Ghantout",
        "value": "AED 3.6B",
        "valueNum": 3628,
        "pct": 3.2,
        "txns": 591,
        "color": "#64748b"
      },
      {
        "name": "Ramhan Island",
        "value": "AED 3.2B",
        "valueNum": 3217,
        "pct": 2.8,
        "txns": 214,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Hidayriyyat",
        "value": "AED 24.2B",
        "valueNum": 24171,
        "txns": 3445,
        "avg": "AED 7M"
      },
      {
        "rank": 2,
        "area": "Al Saadiyat Island",
        "value": "AED 21.2B",
        "valueNum": 21198,
        "txns": 2437,
        "avg": "AED 9M"
      },
      {
        "rank": 3,
        "area": "Yas Island",
        "value": "AED 16.7B",
        "valueNum": 16718,
        "txns": 5241,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Al Jubail Island",
        "value": "AED 9.2B",
        "valueNum": 9156,
        "txns": 1341,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Al Reem Island",
        "value": "AED 8.5B",
        "valueNum": 8504,
        "txns": 1668,
        "avg": "AED 5M"
      },
      {
        "rank": 6,
        "area": "Al Shamkhah",
        "value": "AED 6.6B",
        "valueNum": 6552,
        "txns": 3090,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Zayed City",
        "value": "AED 6.5B",
        "valueNum": 6506,
        "txns": 2566,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Al Bahyah",
        "value": "AED 5.1B",
        "valueNum": 5106,
        "txns": 1910,
        "avg": "AED 3M"
      },
      {
        "rank": 9,
        "area": "Ghantout",
        "value": "AED 3.6B",
        "valueNum": 3628,
        "txns": 591,
        "avg": "AED 6M"
      },
      {
        "rank": 10,
        "area": "Ramhan Island",
        "value": "AED 3.2B",
        "valueNum": 3217,
        "txns": 214,
        "avg": "AED 15M"
      }
    ],
    "projects": [
      {
        "name": "Saadiyat Lagoons - Wilds - Phase 1",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 6.0B",
        "valueNum": 5951,
        "txns": 714,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Lagoons - Phase 2 - Al Sidr",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 5.5B",
        "valueNum": 5527,
        "txns": 668,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Naseem",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.5B",
        "valueNum": 5517,
        "txns": 619,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Wadeem (Plots)",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 5.4B",
        "valueNum": 5416,
        "txns": 1598,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nawayef East B",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 4.4B",
        "valueNum": 4446,
        "txns": 408,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Jubail Island - Phase 2",
        "developer": "",
        "location": "Al Jubail Island",
        "value": "AED 4.3B",
        "valueNum": 4314,
        "txns": 741,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nawayef West B",
        "developer": "",
        "location": "Al Hidayriyyat",
        "value": "AED 4.0B",
        "valueNum": 4024,
        "txns": 310,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Private",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 3.3B",
        "valueNum": 3312,
        "txns": 2669,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 9823,
        "pct": 35,
        "color": "#378ADD"
      },
      {
        "type": "3 B/R",
        "count": 6461,
        "pct": 23,
        "color": "#059669"
      },
      {
        "type": "4 B/R",
        "count": 5450,
        "pct": 19,
        "color": "#7c3aed"
      },
      {
        "type": "5 B/R+",
        "count": 4197,
        "pct": 15,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 2219,
        "pct": 8,
        "color": "#dc2626"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Hidayriyyat leads with 21% of total value across 3445 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 10,964/sqm (AED 1,019/sqft). Average ticket size is AED 4M."
      }
    ],
    "dateRange": "7 Jan 2019 – 12 Mar 2026",
    "totalValue": 114668617715.56935,
    "totalTxns": 28150
  },
  "Villa|Primary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 12.6B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "4,212",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "72",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Mangrove Village",
        "sub": "AED 1.2B"
      }
    ],
    "developers": [
      {
        "name": "Al Reef",
        "value": "AED 2.9B",
        "valueNum": 2922,
        "pct": 23.3,
        "txns": 2152,
        "color": "#378ADD"
      },
      {
        "name": "RB15",
        "value": "AED 1.2B",
        "valueNum": 1232,
        "pct": 9.8,
        "txns": 268,
        "color": "#059669"
      },
      {
        "name": "YS3_04",
        "value": "AED 1.1B",
        "valueNum": 1050,
        "pct": 8.4,
        "txns": 225,
        "color": "#d97706"
      },
      {
        "name": "YS3_05",
        "value": "AED 938M",
        "valueNum": 938,
        "pct": 7.5,
        "txns": 208,
        "color": "#7c3aed"
      },
      {
        "name": "EB2_06",
        "value": "AED 761M",
        "valueNum": 761,
        "pct": 6.1,
        "txns": 220,
        "color": "#0d9488"
      },
      {
        "name": "YS3_01",
        "value": "AED 610M",
        "valueNum": 610,
        "pct": 4.9,
        "txns": 138,
        "color": "#ea580c"
      },
      {
        "name": "W32",
        "value": "AED 505M",
        "valueNum": 505,
        "pct": 4,
        "txns": 58,
        "color": "#db2777"
      },
      {
        "name": "Kasser Al Amwaj",
        "value": "AED 500M",
        "valueNum": 500,
        "pct": 4,
        "txns": 33,
        "color": "#65a30d"
      },
      {
        "name": "SDN7",
        "value": "AED 404M",
        "valueNum": 404,
        "pct": 3.2,
        "txns": 33,
        "color": "#64748b"
      },
      {
        "name": "YS3_02",
        "value": "AED 394M",
        "valueNum": 394,
        "pct": 3.1,
        "txns": 95,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Yas Island",
        "value": "AED 3.4B",
        "valueNum": 3358,
        "txns": 740,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Al Reef",
        "value": "AED 2.9B",
        "valueNum": 2922,
        "txns": 2152,
        "avg": "AED 1M"
      },
      {
        "rank": 3,
        "area": "Rabdan",
        "value": "AED 1.2B",
        "valueNum": 1232,
        "txns": 270,
        "avg": "AED 5M"
      },
      {
        "rank": 4,
        "area": "Al Saadiyat Island",
        "value": "AED 1.1B",
        "valueNum": 1135,
        "txns": 79,
        "avg": "AED 14M"
      },
      {
        "rank": 5,
        "area": "Khalifa City",
        "value": "AED 767M",
        "valueNum": 767,
        "txns": 312,
        "avg": "AED 2M"
      },
      {
        "rank": 6,
        "area": "Bani Yas",
        "value": "AED 761M",
        "valueNum": 761,
        "txns": 220,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Al Kasir",
        "value": "AED 555M",
        "valueNum": 555,
        "txns": 34,
        "avg": "AED 16M"
      },
      {
        "rank": 8,
        "area": "Al Bateen",
        "value": "AED 541M",
        "valueNum": 541,
        "txns": 65,
        "avg": "AED 8M"
      },
      {
        "rank": 9,
        "area": "Al Qurm",
        "value": "AED 269M",
        "valueNum": 269,
        "txns": 8,
        "avg": "AED 34M"
      },
      {
        "rank": 10,
        "area": "Al Muntazah",
        "value": "AED 198M",
        "valueNum": 198,
        "txns": 48,
        "avg": "AED 4M"
      }
    ],
    "projects": [
      {
        "name": "Mangrove Village",
        "developer": "",
        "location": "Rabdan",
        "value": "AED 1.2B",
        "valueNum": 1232,
        "txns": 268,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Townhouses - Arabian Village",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 841M",
        "valueNum": 841,
        "txns": 675,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Townhouses - Contemporary Village",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 777M",
        "valueNum": 777,
        "txns": 545,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Townhouses - Mediterranean Village",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 682M",
        "valueNum": 682,
        "txns": 470,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "West Yas - Precinct H",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 680M",
        "valueNum": 680,
        "txns": 151,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef Townhouses - Desert Village",
        "developer": "",
        "location": "Al Reef",
        "value": "AED 621M",
        "valueNum": 621,
        "txns": 461,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "West Yas - Precinct A",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 577M",
        "valueNum": 577,
        "txns": 131,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saadiyat Beach District (Plots)",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 520M",
        "valueNum": 520,
        "txns": 33,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "5 B/R+",
        "count": 1184,
        "pct": 28,
        "color": "#378ADD"
      },
      {
        "type": "4 B/R",
        "count": 883,
        "pct": 21,
        "color": "#059669"
      },
      {
        "type": "3 B/R",
        "count": 875,
        "pct": 21,
        "color": "#7c3aed"
      },
      {
        "type": "2 B/R",
        "count": 788,
        "pct": 19,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 482,
        "pct": 11,
        "color": "#dc2626"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Yas Island leads with 27% of total value across 740 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 8,348/sqm (AED 776/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 11 Mar 2026",
    "totalValue": 12556284146.640005,
    "totalTxns": 4212
  },
  "Villa|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 48.2B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "15,248",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "137",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 15.7B"
      }
    ],
    "developers": [
      {
        "name": "SDN7",
        "value": "AED 3.8B",
        "valueNum": 3764,
        "pct": 7.8,
        "txns": 175,
        "color": "#378ADD"
      },
      {
        "name": "SDE3",
        "value": "AED 3.2B",
        "valueNum": 3165,
        "pct": 6.6,
        "txns": 493,
        "color": "#059669"
      },
      {
        "name": "YN7",
        "value": "AED 3.0B",
        "valueNum": 3044,
        "pct": 6.3,
        "txns": 1190,
        "color": "#d97706"
      },
      {
        "name": "Al Reef",
        "value": "AED 2.0B",
        "valueNum": 1978,
        "pct": 4.1,
        "txns": 1196,
        "color": "#7c3aed"
      },
      {
        "name": "JS",
        "value": "AED 1.8B",
        "valueNum": 1756,
        "pct": 3.6,
        "txns": 218,
        "color": "#0d9488"
      },
      {
        "name": "SDN2",
        "value": "AED 1.4B",
        "valueNum": 1437,
        "pct": 3,
        "txns": 118,
        "color": "#ea580c"
      },
      {
        "name": "SH36",
        "value": "AED 1.1B",
        "valueNum": 1130,
        "pct": 2.3,
        "txns": 699,
        "color": "#db2777"
      },
      {
        "name": "SH35",
        "value": "AED 1.1B",
        "valueNum": 1084,
        "pct": 2.2,
        "txns": 565,
        "color": "#65a30d"
      },
      {
        "name": "YN5",
        "value": "AED 1.1B",
        "valueNum": 1080,
        "pct": 2.2,
        "txns": 268,
        "color": "#64748b"
      },
      {
        "name": "YN6",
        "value": "AED 1.1B",
        "valueNum": 1068,
        "pct": 2.2,
        "txns": 227,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Saadiyat Island",
        "value": "AED 9.8B",
        "valueNum": 9763,
        "txns": 906,
        "avg": "AED 11M"
      },
      {
        "rank": 2,
        "area": "Yas Island",
        "value": "AED 7.9B",
        "valueNum": 7905,
        "txns": 2371,
        "avg": "AED 3M"
      },
      {
        "rank": 3,
        "area": "Khalifa City",
        "value": "AED 3.3B",
        "valueNum": 3308,
        "txns": 891,
        "avg": "AED 4M"
      },
      {
        "rank": 4,
        "area": "Al Shamkhah",
        "value": "AED 2.7B",
        "valueNum": 2661,
        "txns": 1404,
        "avg": "AED 2M"
      },
      {
        "rank": 5,
        "area": "Al Reef",
        "value": "AED 2.0B",
        "valueNum": 1963,
        "txns": 1188,
        "avg": "AED 2M"
      },
      {
        "rank": 6,
        "area": "Zayed City",
        "value": "AED 1.9B",
        "valueNum": 1851,
        "txns": 647,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Al Jubail Island",
        "value": "AED 1.8B",
        "valueNum": 1756,
        "txns": 218,
        "avg": "AED 8M"
      },
      {
        "rank": 8,
        "area": "Al Kasir",
        "value": "AED 1.5B",
        "valueNum": 1509,
        "txns": 78,
        "avg": "AED 19M"
      },
      {
        "rank": 9,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 1.5B",
        "valueNum": 1484,
        "txns": 347,
        "avg": "AED 4M"
      },
      {
        "rank": 10,
        "area": "Al Reem Island",
        "value": "AED 935M",
        "valueNum": 935,
        "txns": 293,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "'Asharij",
        "value": "AED 15.7B",
        "valueNum": 15715,
        "txns": 6753,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Saadiyat Beach District (Plots)",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.4B",
        "valueNum": 1401,
        "txns": 108,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Al Suhoul",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.3B",
        "valueNum": 1286,
        "txns": 95,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Al Seef",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.2B",
        "valueNum": 1243,
        "txns": 50,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Hidd Al Saadiyat - Ras Al Hidd",
        "developer": "",
        "location": "Al Saadiyat Island",
        "value": "AED 1.2B",
        "valueNum": 1234,
        "txns": 30,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Jubail Island - Phase 2",
        "developer": "",
        "location": "Al Jubail Island",
        "value": "AED 1.1B",
        "valueNum": 1060,
        "txns": 138,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Marina Royal Compound",
        "developer": "",
        "location": "Al Kasir",
        "value": "AED 986M",
        "valueNum": 986,
        "txns": 47,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Noya - Phase 1",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 959M",
        "valueNum": 959,
        "txns": 458,
        "propType": "Villa",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 8838,
        "pct": 58,
        "color": "#378ADD"
      },
      {
        "type": "3 B/R",
        "count": 2164,
        "pct": 14,
        "color": "#059669"
      },
      {
        "type": "5 B/R+",
        "count": 1590,
        "pct": 10,
        "color": "#7c3aed"
      },
      {
        "type": "4 B/R",
        "count": 1489,
        "pct": 10,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 1167,
        "pct": 8,
        "color": "#dc2626"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "23% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Saadiyat Island leads with 20% of total value across 906 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 7,383/sqm (AED 686/sqft). Average ticket size is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2019 – 12 Mar 2026",
    "totalValue": 48198548823.85998,
    "totalTxns": 15248
  },
  "Townhouse|All": null,
  "Townhouse|Off-Plan": null,
  "Townhouse|Primary": null,
  "Townhouse|Secondary": null,
  "Commercial|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 21.9B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "2,205",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 10M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "62",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 7.9B"
      }
    ],
    "developers": [
      {
        "name": "RT3",
        "value": "AED 4.4B",
        "valueNum": 4391,
        "pct": 20.1,
        "txns": 1122,
        "color": "#378ADD"
      },
      {
        "name": "RBE2",
        "value": "AED 1.5B",
        "valueNum": 1524,
        "pct": 7,
        "txns": 2,
        "color": "#059669"
      },
      {
        "name": "SE45_05",
        "value": "AED 1.4B",
        "valueNum": 1433,
        "pct": 6.6,
        "txns": 6,
        "color": "#d97706"
      },
      {
        "name": "MI3",
        "value": "AED 950M",
        "valueNum": 950,
        "pct": 4.3,
        "txns": 2,
        "color": "#7c3aed"
      },
      {
        "name": "MZ12",
        "value": "AED 919M",
        "valueNum": 919,
        "pct": 4.2,
        "txns": 1,
        "color": "#0d9488"
      },
      {
        "name": "Al Kuwaitat",
        "value": "AED 789M",
        "valueNum": 789,
        "pct": 3.6,
        "txns": 2,
        "color": "#ea580c"
      },
      {
        "name": "SH36",
        "value": "AED 771M",
        "valueNum": 771,
        "pct": 3.5,
        "txns": 97,
        "color": "#db2777"
      },
      {
        "name": "RBW5",
        "value": "AED 634M",
        "valueNum": 634,
        "pct": 2.9,
        "txns": 8,
        "color": "#65a30d"
      },
      {
        "name": "Al Samhah East Old",
        "value": "AED 455M",
        "valueNum": 455,
        "pct": 2.1,
        "txns": 28,
        "color": "#64748b"
      },
      {
        "name": "E8",
        "value": "AED 440M",
        "valueNum": 440,
        "pct": 2,
        "txns": 4,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 6.5B",
        "valueNum": 6486,
        "txns": 1357,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Khalifa City",
        "value": "AED 2.1B",
        "valueNum": 2115,
        "txns": 22,
        "avg": "AED 96M"
      },
      {
        "rank": 3,
        "area": "Al Bahyah",
        "value": "AED 1.7B",
        "valueNum": 1669,
        "txns": 4,
        "avg": "AED 417M"
      },
      {
        "rank": 4,
        "area": "Al Danah",
        "value": "AED 1.3B",
        "valueNum": 1274,
        "txns": 23,
        "avg": "AED 55M"
      },
      {
        "rank": 5,
        "area": "Zayed City",
        "value": "AED 1.2B",
        "valueNum": 1194,
        "txns": 46,
        "avg": "AED 26M"
      },
      {
        "rank": 6,
        "area": "Al Maryah Island",
        "value": "AED 1.0B",
        "valueNum": 1016,
        "txns": 9,
        "avg": "AED 113M"
      },
      {
        "rank": 7,
        "area": "Central District",
        "value": "AED 867M",
        "valueNum": 867,
        "txns": 53,
        "avg": "AED 16M"
      },
      {
        "rank": 8,
        "area": "Al Rahah",
        "value": "AED 800M",
        "valueNum": 800,
        "txns": 57,
        "avg": "AED 14M"
      },
      {
        "rank": 9,
        "area": "Al Shamkhah",
        "value": "AED 784M",
        "valueNum": 784,
        "txns": 98,
        "avg": "AED 8M"
      },
      {
        "rank": 10,
        "area": "Al Zahiyah",
        "value": "AED 765M",
        "valueNum": 765,
        "txns": 16,
        "avg": "AED 48M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 7.9B",
        "valueNum": 7863,
        "txns": 504,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Addax Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 2.2B",
        "valueNum": 2249,
        "txns": 1046,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Tamouh (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.8B",
        "valueNum": 1815,
        "txns": 23,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Masdar City - Phase 1 (Plots)",
        "developer": "",
        "location": "Khalifa City",
        "value": "AED 1.6B",
        "valueNum": 1623,
        "txns": 7,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Maryah Tower",
        "developer": "",
        "location": "Al Maryah Island",
        "value": "AED 950M",
        "valueNum": 950,
        "txns": 2,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Ain Mall",
        "developer": "",
        "location": "Central District",
        "value": "AED 776M",
        "valueNum": 776,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Raha Beach (Plots)",
        "developer": "",
        "location": "Al Rahah",
        "value": "AED 689M",
        "valueNum": 689,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Reeman 1 - Phase 1 (Plots)",
        "developer": "",
        "location": "Al Shamkhah",
        "value": "AED 635M",
        "valueNum": 635,
        "txns": 87,
        "propType": "Commercial",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 2205,
        "pct": 100,
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "11% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 30% of total value across 1357 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 2,61,000/sqm (AED 24,247/sqft). Average ticket size is AED 10M."
      }
    ],
    "dateRange": "2 Jan 2019 – 11 Mar 2026",
    "totalValue": 21852281834.459873,
    "totalTxns": 2205
  },
  "Commercial|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 1.3B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "253",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 5M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "28",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Al Reeman 1 - Phase ",
        "sub": "AED 378M"
      }
    ],
    "developers": [
      {
        "name": "SH36",
        "value": "AED 382M",
        "valueNum": 382,
        "pct": 29.7,
        "txns": 50,
        "color": "#378ADD"
      },
      {
        "name": "Al Samhah East Old",
        "value": "AED 168M",
        "valueNum": 168,
        "pct": 13.1,
        "txns": 7,
        "color": "#059669"
      },
      {
        "name": "RT3",
        "value": "AED 161M",
        "valueNum": 161,
        "pct": 12.5,
        "txns": 76,
        "color": "#d97706"
      },
      {
        "name": "YN7",
        "value": "AED 96M",
        "valueNum": 96,
        "pct": 7.5,
        "txns": 4,
        "color": "#7c3aed"
      },
      {
        "name": "SDN1",
        "value": "AED 95M",
        "valueNum": 95,
        "pct": 7.4,
        "txns": 34,
        "color": "#0d9488"
      },
      {
        "name": "RBW3",
        "value": "AED 94M",
        "valueNum": 94,
        "pct": 7.3,
        "txns": 40,
        "color": "#ea580c"
      },
      {
        "name": "Shibak 3",
        "value": "AED 79M",
        "valueNum": 79,
        "pct": 6.1,
        "txns": 1,
        "color": "#db2777"
      },
      {
        "name": "RT1",
        "value": "AED 51M",
        "valueNum": 51,
        "pct": 4,
        "txns": 5,
        "color": "#65a30d"
      },
      {
        "name": "MI9",
        "value": "AED 41M",
        "valueNum": 41,
        "pct": 3.2,
        "txns": 1,
        "color": "#64748b"
      },
      {
        "name": "RS6",
        "value": "AED 37M",
        "valueNum": 37,
        "pct": 2.9,
        "txns": 13,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Shamkhah",
        "value": "AED 395M",
        "valueNum": 395,
        "txns": 51,
        "avg": "AED 8M"
      },
      {
        "rank": 2,
        "area": "Al Reem Island",
        "value": "AED 256M",
        "valueNum": 256,
        "txns": 98,
        "avg": "AED 3M"
      },
      {
        "rank": 3,
        "area": "Al Samhah",
        "value": "AED 168M",
        "valueNum": 168,
        "txns": 7,
        "avg": "AED 24M"
      },
      {
        "rank": 4,
        "area": "Al Faqa'",
        "value": "AED 97M",
        "valueNum": 97,
        "txns": 10,
        "avg": "AED 10M"
      },
      {
        "rank": 5,
        "area": "Yas Island",
        "value": "AED 96M",
        "valueNum": 96,
        "txns": 4,
        "avg": "AED 24M"
      },
      {
        "rank": 6,
        "area": "Al Saadiyat Island",
        "value": "AED 95M",
        "valueNum": 95,
        "txns": 34,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Al Rahah",
        "value": "AED 94M",
        "valueNum": 94,
        "txns": 40,
        "avg": "AED 2M"
      },
      {
        "rank": 8,
        "area": "Al Maryah Island",
        "value": "AED 44M",
        "valueNum": 44,
        "txns": 2,
        "avg": "AED 22M"
      },
      {
        "rank": 9,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 31M",
        "valueNum": 31,
        "txns": 5,
        "avg": "AED 6M"
      },
      {
        "rank": 10,
        "area": "Al Bahyah",
        "value": "AED 8M",
        "valueNum": 8,
        "txns": 1,
        "avg": "AED 8M"
      }
    ],
    "projects": [
      {
        "name": "Al Reeman 1 - Phase 1 (Plots)",
        "developer": "",
        "location": "Al Shamkhah",
        "value": "AED 378M",
        "valueNum": 378,
        "txns": 46,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Reef 2",
        "developer": "",
        "location": "Al Samhah",
        "value": "AED 168M",
        "valueNum": 168,
        "txns": 7,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Addax Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 119M",
        "valueNum": 119,
        "txns": 59,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Yas Waterfront South (Plots)",
        "developer": "",
        "location": "Yas Island",
        "value": "AED 96M",
        "valueNum": 96,
        "txns": 4,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Golden Meadows (Plots)",
        "developer": "",
        "location": "Al Faqa'",
        "value": "AED 79M",
        "valueNum": 79,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Marina Square, Paragon Bay Mall",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 51M",
        "valueNum": 51,
        "txns": 5,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Bab Al Qasr Residence 22",
        "developer": "",
        "location": "Al Rahah",
        "value": "AED 41M",
        "valueNum": 41,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "W Residences Abu Dhabi",
        "developer": "",
        "location": "Al Maryah Island",
        "value": "AED 41M",
        "valueNum": 41,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 253,
        "pct": 100,
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Shamkhah leads with 31% of total value across 51 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 12,657/sqm (AED 1,176/sqft). Average ticket size is AED 5M."
      }
    ],
    "dateRange": "9 Apr 2019 – 8 Mar 2026",
    "totalValue": 1287061687.5500002,
    "totalTxns": 253
  },
  "Commercial|Primary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 10.4B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "938",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 11M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "37",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 3.2B"
      }
    ],
    "developers": [
      {
        "name": "RT3",
        "value": "AED 2.4B",
        "valueNum": 2410,
        "pct": 23.2,
        "txns": 617,
        "color": "#378ADD"
      },
      {
        "name": "SE45_05",
        "value": "AED 990M",
        "valueNum": 990,
        "pct": 9.5,
        "txns": 5,
        "color": "#059669"
      },
      {
        "name": "MZ12",
        "value": "AED 919M",
        "valueNum": 919,
        "pct": 8.9,
        "txns": 1,
        "color": "#d97706"
      },
      {
        "name": "RBW5",
        "value": "AED 539M",
        "valueNum": 539,
        "pct": 5.2,
        "txns": 7,
        "color": "#7c3aed"
      },
      {
        "name": "RS3",
        "value": "AED 364M",
        "valueNum": 364,
        "pct": 3.5,
        "txns": 6,
        "color": "#0d9488"
      },
      {
        "name": "E12",
        "value": "AED 323M",
        "valueNum": 323,
        "pct": 3.1,
        "txns": 7,
        "color": "#ea580c"
      },
      {
        "name": "W5",
        "value": "AED 286M",
        "valueNum": 286,
        "pct": 2.8,
        "txns": 1,
        "color": "#db2777"
      },
      {
        "name": "Al Samhah East Old",
        "value": "AED 280M",
        "valueNum": 280,
        "pct": 2.7,
        "txns": 14,
        "color": "#65a30d"
      },
      {
        "name": "ME2",
        "value": "AED 280M",
        "valueNum": 280,
        "pct": 2.7,
        "txns": 27,
        "color": "#64748b"
      },
      {
        "name": "RT4",
        "value": "AED 270M",
        "valueNum": 270,
        "pct": 2.6,
        "txns": 5,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 3.9B",
        "valueNum": 3904,
        "txns": 710,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Khalifa City",
        "value": "AED 1.5B",
        "valueNum": 1497,
        "txns": 11,
        "avg": "AED 136M"
      },
      {
        "rank": 3,
        "area": "Zayed City",
        "value": "AED 920M",
        "valueNum": 920,
        "txns": 2,
        "avg": "AED 460M"
      },
      {
        "rank": 4,
        "area": "Al Rahah",
        "value": "AED 601M",
        "valueNum": 601,
        "txns": 9,
        "avg": "AED 67M"
      },
      {
        "rank": 5,
        "area": "Yas Island",
        "value": "AED 363M",
        "valueNum": 363,
        "txns": 12,
        "avg": "AED 30M"
      },
      {
        "rank": 6,
        "area": "Al Zahiyah",
        "value": "AED 323M",
        "valueNum": 323,
        "txns": 7,
        "avg": "AED 46M"
      },
      {
        "rank": 7,
        "area": "Al Hisn",
        "value": "AED 286M",
        "valueNum": 286,
        "txns": 1,
        "avg": "AED 286M"
      },
      {
        "rank": 8,
        "area": "Al Samhah",
        "value": "AED 280M",
        "valueNum": 280,
        "txns": 14,
        "avg": "AED 20M"
      },
      {
        "rank": 9,
        "area": "Mohamed Bin Zayed City",
        "value": "AED 280M",
        "valueNum": 280,
        "txns": 27,
        "avg": "AED 10M"
      },
      {
        "rank": 10,
        "area": "Al Saadiyat Island",
        "value": "AED 238M",
        "valueNum": 238,
        "txns": 20,
        "avg": "AED 12M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 3.2B",
        "valueNum": 3216,
        "txns": 95,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Addax Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.2B",
        "valueNum": 1225,
        "txns": 569,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Masdar City - Phase 1 (Plots)",
        "developer": "",
        "location": "Khalifa City",
        "value": "AED 1.2B",
        "valueNum": 1180,
        "txns": 6,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Tamouh (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 778M",
        "valueNum": 778,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shams Abu Dhabi (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 595M",
        "valueNum": 595,
        "txns": 10,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Al Raha Beach (Plots)",
        "developer": "",
        "location": "Al Rahah",
        "value": "AED 594M",
        "valueNum": 594,
        "txns": 8,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Sigma Towers (City of Lights)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 368M",
        "valueNum": 368,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Saraya (Plots)",
        "developer": "",
        "location": "Al Zahiyah",
        "value": "AED 323M",
        "valueNum": 323,
        "txns": 7,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 938,
        "pct": 100,
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 38% of total value across 710 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 17,299/sqm (AED 1,607/sqft). Average ticket size is AED 11M."
      }
    ],
    "dateRange": "2 Jan 2019 – 9 Mar 2026",
    "totalValue": 10382605958.559992,
    "totalTxns": 938
  },
  "Commercial|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 10.4B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "1,091",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 10M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "25",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Private",
        "sub": "AED 4.6B"
      }
    ],
    "developers": [
      {
        "name": "RT3",
        "value": "AED 1.9B",
        "valueNum": 1938,
        "pct": 18.6,
        "txns": 488,
        "color": "#378ADD"
      },
      {
        "name": "RBE2",
        "value": "AED 1.5B",
        "valueNum": 1516,
        "pct": 14.5,
        "txns": 1,
        "color": "#059669"
      },
      {
        "name": "MI3",
        "value": "AED 950M",
        "valueNum": 950,
        "pct": 9.1,
        "txns": 2,
        "color": "#d97706"
      },
      {
        "name": "Al Kuwaitat",
        "value": "AED 789M",
        "valueNum": 789,
        "pct": 7.6,
        "txns": 2,
        "color": "#7c3aed"
      },
      {
        "name": "SE45_05",
        "value": "AED 443M",
        "valueNum": 443,
        "pct": 4.2,
        "txns": 1,
        "color": "#0d9488"
      },
      {
        "name": "E8",
        "value": "AED 440M",
        "valueNum": 440,
        "pct": 4.2,
        "txns": 4,
        "color": "#ea580c"
      },
      {
        "name": "E25",
        "value": "AED 419M",
        "valueNum": 419,
        "pct": 4,
        "txns": 3,
        "color": "#db2777"
      },
      {
        "name": "E14",
        "value": "AED 369M",
        "valueNum": 369,
        "pct": 3.5,
        "txns": 6,
        "color": "#65a30d"
      },
      {
        "name": "E48",
        "value": "AED 252M",
        "valueNum": 252,
        "pct": 2.4,
        "txns": 6,
        "color": "#64748b"
      },
      {
        "name": "SH36",
        "value": "AED 227M",
        "valueNum": 227,
        "pct": 2.2,
        "txns": 33,
        "color": "#dc2626"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Reem Island",
        "value": "AED 2.5B",
        "valueNum": 2496,
        "txns": 613,
        "avg": "AED 4M"
      },
      {
        "rank": 2,
        "area": "Al Bahyah",
        "value": "AED 1.5B",
        "valueNum": 1520,
        "txns": 2,
        "avg": "AED 760M"
      },
      {
        "rank": 3,
        "area": "Al Danah",
        "value": "AED 1.3B",
        "valueNum": 1274,
        "txns": 23,
        "avg": "AED 55M"
      },
      {
        "rank": 4,
        "area": "Al Maryah Island",
        "value": "AED 955M",
        "valueNum": 955,
        "txns": 3,
        "avg": "AED 318M"
      },
      {
        "rank": 5,
        "area": "Central District",
        "value": "AED 856M",
        "valueNum": 856,
        "txns": 52,
        "avg": "AED 16M"
      },
      {
        "rank": 6,
        "area": "Khalifa City",
        "value": "AED 618M",
        "valueNum": 618,
        "txns": 11,
        "avg": "AED 56M"
      },
      {
        "rank": 7,
        "area": "Al Nahyan",
        "value": "AED 499M",
        "valueNum": 499,
        "txns": 6,
        "avg": "AED 83M"
      },
      {
        "rank": 8,
        "area": "Al Zahiyah",
        "value": "AED 442M",
        "valueNum": 442,
        "txns": 9,
        "avg": "AED 49M"
      },
      {
        "rank": 9,
        "area": "Zayed City",
        "value": "AED 274M",
        "valueNum": 274,
        "txns": 44,
        "avg": "AED 6M"
      },
      {
        "rank": 10,
        "area": "Al Muntazah",
        "value": "AED 252M",
        "valueNum": 252,
        "txns": 6,
        "avg": "AED 42M"
      }
    ],
    "projects": [
      {
        "name": "Private",
        "developer": "",
        "location": "Al Muntazah",
        "value": "AED 4.6B",
        "valueNum": 4646,
        "txns": 409,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Tamouh (Plots)",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.0B",
        "valueNum": 1037,
        "txns": 14,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Addax Tower",
        "developer": "",
        "location": "Al Reem Island",
        "value": "AED 1.0B",
        "valueNum": 1024,
        "txns": 477,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Maryah Tower",
        "developer": "",
        "location": "Al Maryah Island",
        "value": "AED 950M",
        "valueNum": 950,
        "txns": 2,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Ain Mall",
        "developer": "",
        "location": "Central District",
        "value": "AED 776M",
        "valueNum": 776,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Masdar City - Phase 1 (Plots)",
        "developer": "",
        "location": "Khalifa City",
        "value": "AED 443M",
        "valueNum": 443,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Bahr Towers",
        "developer": "",
        "location": "Al Nahyan",
        "value": "AED 400M",
        "valueNum": 400,
        "txns": 1,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "Al Reeman 1 - Phase 1 (Plots)",
        "developer": "",
        "location": "Al Shamkhah",
        "value": "AED 227M",
        "valueNum": 227,
        "txns": 33,
        "propType": "Commercial",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 1091,
        "pct": 100,
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "7% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Reem Island leads with 24% of total value across 613 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 5,21,221/sqm (AED 48,423/sqft). Average ticket size is AED 10M."
      }
    ],
    "dateRange": "14 Jan 2019 – 11 Mar 2026",
    "totalValue": 10425346022.350004,
    "totalTxns": 1091
  }
};

export function getAbuDhabiPrecomputed(propType: string, txnType: string): AbuDhabiPrecomputedSet | null {
  return AD_PRECOMPUTED[`${propType}|${txnType}`] ?? null;
}

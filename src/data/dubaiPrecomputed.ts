// Auto-generated from transactions-2026-03-16.csv
// Generated on 2026-03-15T20:21:54.788Z
// 40628 sales transactions from DLD data

import type { MarketKPIs, DeveloperRow, AreaRow, ProjectRow, UnitMixRow, ValueSplit, MarketSignal } from './reTransactionsData';

export interface DubaiPrecomputedSet {
  kpis: MarketKPIs[];
  developers: DeveloperRow[];
  areas: AreaRow[];
  projects: ProjectRow[];
  unitMix: UnitMixRow[];
  valueSplit: ValueSplit[];
  signals: MarketSignal[];
  dateRange: string;
  totalValue: number;
  totalTxns: number;
}

/**
 * Pre-computed dashboard data for all filter combinations.
 * Key format: "propType|txnType" e.g. "All|All", "Villa|Off-Plan"
 */
export const DUBAI_PRECOMPUTED: Record<string, DubaiPrecomputedSet | null> = {
  "All|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 153.80B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "40,628",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "2516",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Mareva 2 The Oasis",
        "sub": "AED 4.39B"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 35.67B",
        "valueNum": 35669,
        "pct": 23.2,
        "txns": 3783,
        "color": "#dc2626"
      },
      {
        "name": "Mareva 2 The Oasis",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "pct": 2.9,
        "txns": 233,
        "color": "#d97706"
      },
      {
        "name": "Mareva The Oasis",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "pct": 2.8,
        "txns": 229,
        "color": "#378ADD"
      },
      {
        "name": "Eden Hills",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "pct": 1.8,
        "txns": 108,
        "color": "#059669"
      },
      {
        "name": "Hado By Beyond",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "pct": 1.1,
        "txns": 470,
        "color": "#7c3aed"
      },
      {
        "name": "Greenz By Danube",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "pct": 1.1,
        "txns": 1,
        "color": "#0d9488"
      },
      {
        "name": "Salva The Heights",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "pct": 1,
        "txns": 185,
        "color": "#ea580c"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 1.58B",
        "valueNum": 1578,
        "pct": 1,
        "txns": 157,
        "color": "#db2777"
      },
      {
        "name": "Ashwood Estates",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "pct": 0.9,
        "txns": 86,
        "color": "#65a30d"
      },
      {
        "name": "Serro 2 The Heights",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "pct": 0.9,
        "txns": 171,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Yelayiss 1",
        "value": "AED 11.53B",
        "valueNum": 11533,
        "txns": 2451,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Me'Aisem Second",
        "value": "AED 9.24B",
        "valueNum": 9240,
        "txns": 493,
        "avg": "AED 19M"
      },
      {
        "rank": 3,
        "area": "Al Rowaiyah First",
        "value": "AED 6.31B",
        "valueNum": 6306,
        "txns": 3,
        "avg": "AED 2.10B"
      },
      {
        "rank": 4,
        "area": "Business Bay",
        "value": "AED 6.26B",
        "valueNum": 6257,
        "txns": 1819,
        "avg": "AED 3M"
      },
      {
        "rank": 5,
        "area": "Palm Jumeirah",
        "value": "AED 4.62B",
        "valueNum": 4623,
        "txns": 320,
        "avg": "AED 14M"
      },
      {
        "rank": 6,
        "area": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 4.33B",
        "valueNum": 4329,
        "txns": 546,
        "avg": "AED 8M"
      },
      {
        "rank": 7,
        "area": "Palm Deira",
        "value": "AED 4.14B",
        "valueNum": 4140,
        "txns": 1261,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Madinat Al Mataar",
        "value": "AED 3.97B",
        "valueNum": 3966,
        "txns": 1943,
        "avg": "AED 2M"
      },
      {
        "rank": 9,
        "area": "Palm Jabal Ali",
        "value": "AED 3.80B",
        "valueNum": 3803,
        "txns": 220,
        "avg": "AED 17M"
      },
      {
        "rank": 10,
        "area": "Al Yelayiss 5",
        "value": "AED 3.65B",
        "valueNum": 3655,
        "txns": 444,
        "avg": "AED 8M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "The Villa",
        "value": "AED 35.67B",
        "valueNum": 35669,
        "txns": 3783,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva 2 The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "txns": 233,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "txns": 229,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Eden Hills",
        "developer": "",
        "location": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "txns": 108,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Hado By Beyond",
        "developer": "",
        "location": "Palm Deira",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "txns": 470,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Greenz By Danube",
        "developer": "",
        "location": "Al Rowaiyah First",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Salva The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "txns": 185,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Nad Al Sheba Gardens Phase 11",
        "developer": "",
        "location": "Nad Al Shiba First",
        "value": "AED 1.58B",
        "valueNum": 1578,
        "txns": 157,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 12860,
        "pct": 32,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 7975,
        "pct": 20,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 7740,
        "pct": 19,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 5681,
        "pct": 14,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 2852,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 2502,
        "pct": 6,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R",
        "count": 912,
        "pct": 2,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 60.99B",
        "units": "29,904 units",
        "pct": "40%",
        "color": "#378ADD"
      },
      {
        "label": "Villas",
        "value": "AED 17.37B",
        "units": "4,339 units",
        "pct": "11%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "63% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Yelayiss 1 leads with 7% of total value across 2451 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 21,183/sqm (AED 1,968/sqft). Average ticket is AED 4M."
      }
    ],
    "dateRange": "1 Jan 2026 – 15 Mar 2026",
    "totalValue": 153799385698.83997,
    "totalTxns": 40628
  },
  "All|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 65.99B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "25,791",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "1152",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Hado By Beyond",
        "sub": "AED 1.76B"
      }
    ],
    "developers": [
      {
        "name": "Hado By Beyond",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "pct": 2.7,
        "txns": 470,
        "color": "#dc2626"
      },
      {
        "name": "AHS TOWER",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "pct": 2,
        "txns": 58,
        "color": "#d97706"
      },
      {
        "name": "Shahrukhz by Danube",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "pct": 1.6,
        "txns": 359,
        "color": "#378ADD"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "pct": 1.6,
        "txns": 339,
        "color": "#059669"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "pct": 1.6,
        "txns": 322,
        "color": "#7c3aed"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 979M",
        "valueNum": 979,
        "pct": 1.5,
        "txns": 299,
        "color": "#0d9488"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 969M",
        "valueNum": 969,
        "pct": 1.5,
        "txns": 274,
        "color": "#ea580c"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 963M",
        "valueNum": 963,
        "pct": 1.5,
        "txns": 296,
        "color": "#db2777"
      },
      {
        "name": "Maybach Six",
        "value": "AED 913M",
        "valueNum": 913,
        "pct": 1.4,
        "txns": 539,
        "color": "#65a30d"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 879M",
        "valueNum": 879,
        "pct": 1.3,
        "txns": 251,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Yelayiss 1",
        "value": "AED 7.97B",
        "valueNum": 7965,
        "txns": 2391,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Business Bay",
        "value": "AED 4.20B",
        "valueNum": 4202,
        "txns": 911,
        "avg": "AED 5M"
      },
      {
        "rank": 3,
        "area": "Palm Deira",
        "value": "AED 3.97B",
        "valueNum": 3967,
        "txns": 1248,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Madinat Al Mataar",
        "value": "AED 3.03B",
        "valueNum": 3029,
        "txns": 1762,
        "avg": "AED 2M"
      },
      {
        "rank": 5,
        "area": "Palm Jumeirah",
        "value": "AED 2.10B",
        "valueNum": 2097,
        "txns": 106,
        "avg": "AED 20M"
      },
      {
        "rank": 6,
        "area": "Al Khairan First",
        "value": "AED 2.10B",
        "valueNum": 2095,
        "txns": 696,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Madinat Dubai Almelaheyah",
        "value": "AED 2.06B",
        "valueNum": 2064,
        "txns": 425,
        "avg": "AED 5M"
      },
      {
        "rank": 8,
        "area": "Jumeirah Village Circle",
        "value": "AED 1.84B",
        "valueNum": 1842,
        "txns": 1561,
        "avg": "AED 1M"
      },
      {
        "rank": 9,
        "area": "Al Wasl",
        "value": "AED 1.75B",
        "valueNum": 1747,
        "txns": 366,
        "avg": "AED 5M"
      },
      {
        "rank": 10,
        "area": "Trade Center Second",
        "value": "AED 1.65B",
        "valueNum": 1654,
        "txns": 93,
        "avg": "AED 18M"
      }
    ],
    "projects": [
      {
        "name": "Hado By Beyond",
        "developer": "",
        "location": "Palm Deira",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "txns": 470,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "AHS TOWER",
        "developer": "",
        "location": "Trade Center Second",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "txns": 58,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shahrukhz by Danube",
        "developer": "",
        "location": "Tecom Site A",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "txns": 359,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "txns": 339,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 1",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "txns": 322,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - CUBA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 979M",
        "valueNum": 979,
        "txns": 299,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - MAUI",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 969M",
        "valueNum": 969,
        "txns": 274,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BERMUDA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 963M",
        "valueNum": 963,
        "txns": 296,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 8937,
        "pct": 35,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 5571,
        "pct": 22,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 5474,
        "pct": 21,
        "color": "#d97706"
      },
      {
        "type": "4 B/R",
        "count": 2105,
        "pct": 8,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 1782,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "Other",
        "count": 1019,
        "pct": 4,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R",
        "count": 880,
        "pct": 3,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 46.07B",
        "units": "21,157 units",
        "pct": "70%",
        "color": "#378ADD"
      },
      {
        "label": "Villas",
        "value": "AED 13.06B",
        "units": "3,398 units",
        "pct": "20%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Yelayiss 1 leads with 12% of total value across 2391 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 23,164/sqm (AED 2,152/sqft). Average ticket is AED 3M."
      }
    ],
    "dateRange": "1 Jan 2026 – 15 Mar 2026",
    "totalValue": 65986083123.19995,
    "totalTxns": 25791
  },
  "All|Primary": null,
  "All|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 87.81B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "14,837",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 6M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "1407",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Mareva 2 The Oasis",
        "sub": "AED 4.39B"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 35.67B",
        "valueNum": 35669,
        "pct": 40.6,
        "txns": 3783,
        "color": "#dc2626"
      },
      {
        "name": "Mareva 2 The Oasis",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "pct": 5,
        "txns": 233,
        "color": "#d97706"
      },
      {
        "name": "Mareva The Oasis",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "pct": 5,
        "txns": 229,
        "color": "#378ADD"
      },
      {
        "name": "Eden Hills",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "pct": 3.2,
        "txns": 108,
        "color": "#059669"
      },
      {
        "name": "Greenz By Danube",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "pct": 2,
        "txns": 1,
        "color": "#7c3aed"
      },
      {
        "name": "Salva The Heights",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "pct": 1.8,
        "txns": 185,
        "color": "#0d9488"
      },
      {
        "name": "Ashwood Estates",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "pct": 1.6,
        "txns": 86,
        "color": "#ea580c"
      },
      {
        "name": "Serro 2 The Heights",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "pct": 1.6,
        "txns": 171,
        "color": "#db2777"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 967M",
        "valueNum": 967,
        "pct": 1.1,
        "txns": 62,
        "color": "#65a30d"
      },
      {
        "name": "Palm Jebel Ali - T…",
        "value": "AED 661M",
        "valueNum": 661,
        "pct": 0.8,
        "txns": 20,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Me'Aisem Second",
        "value": "AED 9.24B",
        "valueNum": 9240,
        "txns": 493,
        "avg": "AED 19M"
      },
      {
        "rank": 2,
        "area": "Al Rowaiyah First",
        "value": "AED 6.31B",
        "valueNum": 6306,
        "txns": 3,
        "avg": "AED 2.10B"
      },
      {
        "rank": 3,
        "area": "Al Yelayiss 5",
        "value": "AED 3.65B",
        "valueNum": 3655,
        "txns": 444,
        "avg": "AED 8M"
      },
      {
        "rank": 4,
        "area": "Al Yelayiss 1",
        "value": "AED 3.57B",
        "valueNum": 3568,
        "txns": 60,
        "avg": "AED 59M"
      },
      {
        "rank": 5,
        "area": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 3.21B",
        "valueNum": 3214,
        "txns": 128,
        "avg": "AED 25M"
      },
      {
        "rank": 6,
        "area": "Um Suqaim First",
        "value": "AED 3.02B",
        "valueNum": 3021,
        "txns": 23,
        "avg": "AED 131M"
      },
      {
        "rank": 7,
        "area": "Palm Jabal Ali",
        "value": "AED 3.01B",
        "valueNum": 3005,
        "txns": 94,
        "avg": "AED 32M"
      },
      {
        "rank": 8,
        "area": "Palm Jumeirah",
        "value": "AED 2.53B",
        "valueNum": 2525,
        "txns": 214,
        "avg": "AED 12M"
      },
      {
        "rank": 9,
        "area": "Me'Aisem First",
        "value": "AED 2.09B",
        "valueNum": 2095,
        "txns": 156,
        "avg": "AED 13M"
      },
      {
        "rank": 10,
        "area": "Business Bay",
        "value": "AED 2.06B",
        "valueNum": 2055,
        "txns": 908,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "The Villa",
        "value": "AED 35.67B",
        "valueNum": 35669,
        "txns": 3783,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva 2 The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "txns": 233,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "txns": 229,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Eden Hills",
        "developer": "",
        "location": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "txns": 108,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Greenz By Danube",
        "developer": "",
        "location": "Al Rowaiyah First",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Salva The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "txns": 185,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Ashwood Estates",
        "developer": "",
        "location": "Me'Aisem First",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "txns": 86,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Serro 2 The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "txns": 171,
        "propType": "Apartment",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 4662,
        "pct": 31,
        "color": "#378ADD"
      },
      {
        "type": "1 B/R",
        "count": 3923,
        "pct": 26,
        "color": "#059669"
      },
      {
        "type": "2 B/R",
        "count": 2404,
        "pct": 16,
        "color": "#d97706"
      },
      {
        "type": "Studio",
        "count": 2266,
        "pct": 15,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 1070,
        "pct": 7,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 397,
        "pct": 3,
        "color": "#0d9488"
      },
      {
        "type": "Shop",
        "count": 69,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 14.92B",
        "units": "8,747 units",
        "pct": "17%",
        "color": "#378ADD"
      },
      {
        "label": "Villas",
        "value": "AED 4.31B",
        "units": "941 units",
        "pct": "5%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Me'Aisem Second leads with 11% of total value across 493 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 17,738/sqm (AED 1,648/sqft). Average ticket is AED 6M."
      }
    ],
    "dateRange": "2 Jan 2026 – 15 Mar 2026",
    "totalValue": 87813302575.64015,
    "totalTxns": 14837
  },
  "Apartment|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 125.95B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "33,808",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "2172",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Mareva 2 The Oasis",
        "sub": "AED 4.39B"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 34.16B",
        "valueNum": 34159,
        "pct": 27.1,
        "txns": 3435,
        "color": "#dc2626"
      },
      {
        "name": "Mareva 2 The Oasis",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "pct": 3.5,
        "txns": 233,
        "color": "#d97706"
      },
      {
        "name": "Mareva The Oasis",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "pct": 3.5,
        "txns": 229,
        "color": "#378ADD"
      },
      {
        "name": "Eden Hills",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "pct": 2.2,
        "txns": 108,
        "color": "#059669"
      },
      {
        "name": "Hado By Beyond",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "pct": 1.4,
        "txns": 470,
        "color": "#7c3aed"
      },
      {
        "name": "Greenz By Danube",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "pct": 1.4,
        "txns": 1,
        "color": "#0d9488"
      },
      {
        "name": "Salva The Heights",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "pct": 1.3,
        "txns": 185,
        "color": "#ea580c"
      },
      {
        "name": "Ashwood Estates",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "pct": 1.1,
        "txns": 86,
        "color": "#db2777"
      },
      {
        "name": "Serro 2 The Heights",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "pct": 1.1,
        "txns": 171,
        "color": "#65a30d"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 967M",
        "valueNum": 967,
        "pct": 0.8,
        "txns": 62,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Me'Aisem Second",
        "value": "AED 9.24B",
        "valueNum": 9240,
        "txns": 493,
        "avg": "AED 19M"
      },
      {
        "rank": 2,
        "area": "Al Rowaiyah First",
        "value": "AED 6.31B",
        "valueNum": 6306,
        "txns": 3,
        "avg": "AED 2.10B"
      },
      {
        "rank": 3,
        "area": "Palm Jumeirah",
        "value": "AED 4.43B",
        "valueNum": 4425,
        "txns": 298,
        "avg": "AED 15M"
      },
      {
        "rank": 4,
        "area": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 4.33B",
        "valueNum": 4326,
        "txns": 545,
        "avg": "AED 8M"
      },
      {
        "rank": 5,
        "area": "Palm Deira",
        "value": "AED 4.11B",
        "valueNum": 4108,
        "txns": 1246,
        "avg": "AED 3M"
      },
      {
        "rank": 6,
        "area": "Palm Jabal Ali",
        "value": "AED 3.80B",
        "valueNum": 3803,
        "txns": 220,
        "avg": "AED 17M"
      },
      {
        "rank": 7,
        "area": "Business Bay",
        "value": "AED 3.78B",
        "valueNum": 3783,
        "txns": 1352,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Al Yelayiss 5",
        "value": "AED 3.65B",
        "valueNum": 3655,
        "txns": 444,
        "avg": "AED 8M"
      },
      {
        "rank": 9,
        "area": "Al Yelayiss 1",
        "value": "AED 3.57B",
        "valueNum": 3568,
        "txns": 60,
        "avg": "AED 59M"
      },
      {
        "rank": 10,
        "area": "Madinat Al Mataar",
        "value": "AED 3.12B",
        "valueNum": 3124,
        "txns": 1753,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "The Villa",
        "value": "AED 34.16B",
        "valueNum": 34159,
        "txns": 3435,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva 2 The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "txns": 233,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "txns": 229,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Eden Hills",
        "developer": "",
        "location": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "txns": 108,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Hado By Beyond",
        "developer": "",
        "location": "Palm Deira",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "txns": 470,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Greenz By Danube",
        "developer": "",
        "location": "Al Rowaiyah First",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Salva The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "txns": 185,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Ashwood Estates",
        "developer": "",
        "location": "Me'Aisem First",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "txns": 86,
        "propType": "Apartment",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 12666,
        "pct": 37,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 7702,
        "pct": 23,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 7397,
        "pct": 22,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 3902,
        "pct": 12,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 1896,
        "pct": 6,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 208,
        "pct": 1,
        "color": "#0d9488"
      },
      {
        "type": "5 B/R",
        "count": 20,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 60.99B",
        "units": "29,904 units",
        "pct": "48%",
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "63% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Me'Aisem Second leads with 7% of total value across 493 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 20,620/sqm (AED 1,916/sqft). Average ticket is AED 4M."
      }
    ],
    "dateRange": "1 Jan 2026 – 15 Mar 2026",
    "totalValue": 125954729103.89027,
    "totalTxns": 33808
  },
  "Apartment|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 46.08B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "21,160",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 2M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "1017",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Hado By Beyond",
        "sub": "AED 1.76B"
      }
    ],
    "developers": [
      {
        "name": "Hado By Beyond",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "pct": 3.8,
        "txns": 470,
        "color": "#dc2626"
      },
      {
        "name": "Maybach Six",
        "value": "AED 891M",
        "valueNum": 891,
        "pct": 1.9,
        "txns": 534,
        "color": "#d97706"
      },
      {
        "name": "Palm Central Priva…",
        "value": "AED 798M",
        "valueNum": 798,
        "pct": 1.7,
        "txns": 126,
        "color": "#378ADD"
      },
      {
        "name": "Nourelle",
        "value": "AED 785M",
        "valueNum": 785,
        "pct": 1.7,
        "txns": 184,
        "color": "#059669"
      },
      {
        "name": "Passo By Beyond",
        "value": "AED 777M",
        "valueNum": 777,
        "pct": 1.7,
        "txns": 60,
        "color": "#7c3aed"
      },
      {
        "name": "Creek Bay",
        "value": "AED 641M",
        "valueNum": 641,
        "pct": 1.4,
        "txns": 192,
        "color": "#0d9488"
      },
      {
        "name": "Kanyon By Beyond",
        "value": "AED 626M",
        "valueNum": 626,
        "pct": 1.4,
        "txns": 195,
        "color": "#ea580c"
      },
      {
        "name": "Aman Residences Du…",
        "value": "AED 597M",
        "valueNum": 597,
        "pct": 1.3,
        "txns": 4,
        "color": "#db2777"
      },
      {
        "name": "Creek Haven",
        "value": "AED 592M",
        "valueNum": 592,
        "pct": 1.3,
        "txns": 215,
        "color": "#65a30d"
      },
      {
        "name": "Avarra by Palace",
        "value": "AED 586M",
        "valueNum": 586,
        "pct": 1.3,
        "txns": 123,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Palm Deira",
        "value": "AED 3.94B",
        "valueNum": 3935,
        "txns": 1233,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Business Bay",
        "value": "AED 2.61B",
        "valueNum": 2611,
        "txns": 775,
        "avg": "AED 3M"
      },
      {
        "rank": 3,
        "area": "Madinat Al Mataar",
        "value": "AED 2.39B",
        "valueNum": 2393,
        "txns": 1622,
        "avg": "AED 1M"
      },
      {
        "rank": 4,
        "area": "Al Khairan First",
        "value": "AED 2.10B",
        "valueNum": 2095,
        "txns": 696,
        "avg": "AED 3M"
      },
      {
        "rank": 5,
        "area": "Palm Jumeirah",
        "value": "AED 1.98B",
        "valueNum": 1982,
        "txns": 105,
        "avg": "AED 19M"
      },
      {
        "rank": 6,
        "area": "Al Wasl",
        "value": "AED 1.75B",
        "valueNum": 1747,
        "txns": 366,
        "avg": "AED 5M"
      },
      {
        "rank": 7,
        "area": "Jumeirah Village Circle",
        "value": "AED 1.61B",
        "valueNum": 1613,
        "txns": 1481,
        "avg": "AED 1M"
      },
      {
        "rank": 8,
        "area": "Dubai Land Residence Complex",
        "value": "AED 1.52B",
        "valueNum": 1515,
        "txns": 1625,
        "avg": "AED 932K"
      },
      {
        "rank": 9,
        "area": "Business Park",
        "value": "AED 1.41B",
        "valueNum": 1407,
        "txns": 795,
        "avg": "AED 2M"
      },
      {
        "rank": 10,
        "area": "Madinat Dubai Almelaheyah",
        "value": "AED 1.34B",
        "valueNum": 1338,
        "txns": 361,
        "avg": "AED 4M"
      }
    ],
    "projects": [
      {
        "name": "Hado By Beyond",
        "developer": "",
        "location": "Palm Deira",
        "value": "AED 1.76B",
        "valueNum": 1763,
        "txns": 470,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Maybach Six",
        "developer": "",
        "location": "Business Park",
        "value": "AED 891M",
        "valueNum": 891,
        "txns": 534,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Palm Central Private Residences - Frond M",
        "developer": "",
        "location": "Palm Jabal Ali",
        "value": "AED 798M",
        "valueNum": 798,
        "txns": 126,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Nourelle",
        "developer": "",
        "location": "Um Suqaim Third",
        "value": "AED 785M",
        "valueNum": 785,
        "txns": 184,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Passo By Beyond",
        "developer": "",
        "location": "Palm Jumeirah",
        "value": "AED 777M",
        "valueNum": 777,
        "txns": 60,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Creek Bay",
        "developer": "",
        "location": "Al Khairan First",
        "value": "AED 641M",
        "valueNum": 641,
        "txns": 192,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Kanyon By Beyond",
        "developer": "",
        "location": "Madinat Dubai Almelaheyah",
        "value": "AED 626M",
        "valueNum": 626,
        "txns": 195,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      },
      {
        "name": "Aman Residences Dubai",
        "developer": "",
        "location": "Jumeirah Second",
        "value": "AED 597M",
        "valueNum": 597,
        "txns": 4,
        "propType": "Apartment",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "1 B/R",
        "count": 8884,
        "pct": 42,
        "color": "#378ADD"
      },
      {
        "type": "2 B/R",
        "count": 5474,
        "pct": 26,
        "color": "#059669"
      },
      {
        "type": "Studio",
        "count": 5354,
        "pct": 25,
        "color": "#d97706"
      },
      {
        "type": "3 B/R",
        "count": 1288,
        "pct": 6,
        "color": "#7c3aed"
      },
      {
        "type": "4 B/R",
        "count": 137,
        "pct": 1,
        "color": "#dc2626"
      },
      {
        "type": "5 B/R",
        "count": 15,
        "pct": 0,
        "color": "#0d9488"
      },
      {
        "type": "6 B/R",
        "count": 5,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 46.07B",
        "units": "21,157 units",
        "pct": "100%",
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Palm Deira leads with 9% of total value across 1233 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 22,829/sqm (AED 2,121/sqft). Average ticket is AED 2M."
      }
    ],
    "dateRange": "1 Jan 2026 – 15 Mar 2026",
    "totalValue": 46083233299.319954,
    "totalTxns": 21160
  },
  "Apartment|Primary": null,
  "Apartment|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 79.87B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "12,648",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 6M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "1177",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "Mareva 2 The Oasis",
        "sub": "AED 4.39B"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 34.16B",
        "valueNum": 34159,
        "pct": 42.8,
        "txns": 3435,
        "color": "#dc2626"
      },
      {
        "name": "Mareva 2 The Oasis",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "pct": 5.5,
        "txns": 233,
        "color": "#d97706"
      },
      {
        "name": "Mareva The Oasis",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "pct": 5.5,
        "txns": 229,
        "color": "#378ADD"
      },
      {
        "name": "Eden Hills",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "pct": 3.5,
        "txns": 108,
        "color": "#059669"
      },
      {
        "name": "Greenz By Danube",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "pct": 2.1,
        "txns": 1,
        "color": "#7c3aed"
      },
      {
        "name": "Salva The Heights",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "pct": 2,
        "txns": 185,
        "color": "#0d9488"
      },
      {
        "name": "Ashwood Estates",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "pct": 1.8,
        "txns": 86,
        "color": "#ea580c"
      },
      {
        "name": "Serro 2 The Heights",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "pct": 1.8,
        "txns": 171,
        "color": "#db2777"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 967M",
        "valueNum": 967,
        "pct": 1.2,
        "txns": 62,
        "color": "#65a30d"
      },
      {
        "name": "Palm Jebel Ali - T…",
        "value": "AED 661M",
        "valueNum": 661,
        "pct": 0.8,
        "txns": 20,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Me'Aisem Second",
        "value": "AED 9.24B",
        "valueNum": 9240,
        "txns": 493,
        "avg": "AED 19M"
      },
      {
        "rank": 2,
        "area": "Al Rowaiyah First",
        "value": "AED 6.31B",
        "valueNum": 6306,
        "txns": 3,
        "avg": "AED 2.10B"
      },
      {
        "rank": 3,
        "area": "Al Yelayiss 5",
        "value": "AED 3.65B",
        "valueNum": 3655,
        "txns": 444,
        "avg": "AED 8M"
      },
      {
        "rank": 4,
        "area": "Al Yelayiss 1",
        "value": "AED 3.57B",
        "valueNum": 3568,
        "txns": 60,
        "avg": "AED 59M"
      },
      {
        "rank": 5,
        "area": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 3.21B",
        "valueNum": 3211,
        "txns": 127,
        "avg": "AED 25M"
      },
      {
        "rank": 6,
        "area": "Um Suqaim First",
        "value": "AED 3.02B",
        "valueNum": 3021,
        "txns": 23,
        "avg": "AED 131M"
      },
      {
        "rank": 7,
        "area": "Palm Jabal Ali",
        "value": "AED 3.01B",
        "valueNum": 3005,
        "txns": 94,
        "avg": "AED 32M"
      },
      {
        "rank": 8,
        "area": "Palm Jumeirah",
        "value": "AED 2.44B",
        "valueNum": 2443,
        "txns": 193,
        "avg": "AED 13M"
      },
      {
        "rank": 9,
        "area": "Me'Aisem First",
        "value": "AED 2.06B",
        "valueNum": 2061,
        "txns": 152,
        "avg": "AED 14M"
      },
      {
        "rank": 10,
        "area": "Warsan Fourth",
        "value": "AED 1.88B",
        "valueNum": 1877,
        "txns": 142,
        "avg": "AED 13M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "The Villa",
        "value": "AED 34.16B",
        "valueNum": 34159,
        "txns": 3435,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva 2 The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.39B",
        "valueNum": 4393,
        "txns": 233,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Mareva The Oasis",
        "developer": "",
        "location": "Me'Aisem Second",
        "value": "AED 4.38B",
        "valueNum": 4376,
        "txns": 229,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Eden Hills",
        "developer": "",
        "location": "Hadaeq Sheikh Mohammed Bin Rashid",
        "value": "AED 2.83B",
        "valueNum": 2826,
        "txns": 108,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Greenz By Danube",
        "developer": "",
        "location": "Al Rowaiyah First",
        "value": "AED 1.71B",
        "valueNum": 1714,
        "txns": 1,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Salva The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.61B",
        "valueNum": 1609,
        "txns": 185,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Ashwood Estates",
        "developer": "",
        "location": "Me'Aisem First",
        "value": "AED 1.42B",
        "valueNum": 1422,
        "txns": 86,
        "propType": "Apartment",
        "txnType": "Secondary"
      },
      {
        "name": "Serro 2 The Heights",
        "developer": "",
        "location": "Al Yelayiss 5",
        "value": "AED 1.40B",
        "valueNum": 1401,
        "txns": 171,
        "propType": "Apartment",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 3899,
        "pct": 31,
        "color": "#378ADD"
      },
      {
        "type": "1 B/R",
        "count": 3782,
        "pct": 30,
        "color": "#059669"
      },
      {
        "type": "2 B/R",
        "count": 2228,
        "pct": 18,
        "color": "#d97706"
      },
      {
        "type": "Studio",
        "count": 2043,
        "pct": 16,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 608,
        "pct": 5,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 71,
        "pct": 1,
        "color": "#0d9488"
      },
      {
        "type": "PENTHOUSE",
        "count": 9,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Flats",
        "value": "AED 14.92B",
        "units": "8,747 units",
        "pct": "19%",
        "color": "#378ADD"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Me'Aisem Second leads with 12% of total value across 493 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 16,925/sqm (AED 1,572/sqft). Average ticket is AED 6M."
      }
    ],
    "dateRange": "2 Jan 2026 – 15 Mar 2026",
    "totalValue": 79871495804.57014,
    "totalTxns": 12648
  },
  "Villa|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 17.37B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "4,339",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "230",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "DAMAC ISLANDS 2 …",
        "sub": "AED 1.06B"
      }
    ],
    "developers": [
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "pct": 6.1,
        "txns": 339,
        "color": "#dc2626"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "pct": 5.9,
        "txns": 322,
        "color": "#d97706"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 979M",
        "valueNum": 979,
        "pct": 5.6,
        "txns": 299,
        "color": "#378ADD"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 969M",
        "valueNum": 969,
        "pct": 5.6,
        "txns": 274,
        "color": "#059669"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 963M",
        "valueNum": 963,
        "pct": 5.5,
        "txns": 296,
        "color": "#7c3aed"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 879M",
        "valueNum": 879,
        "pct": 5.1,
        "txns": 251,
        "color": "#0d9488"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 763M",
        "valueNum": 763,
        "pct": 4.4,
        "txns": 228,
        "color": "#ea580c"
      },
      {
        "name": "Other",
        "value": "AED 751M",
        "valueNum": 751,
        "pct": 4.3,
        "txns": 100,
        "color": "#db2777"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 676M",
        "valueNum": 676,
        "pct": 3.9,
        "txns": 203,
        "color": "#65a30d"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 639M",
        "valueNum": 639,
        "pct": 3.7,
        "txns": 179,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Yelayiss 1",
        "value": "AED 7.97B",
        "valueNum": 7965,
        "txns": 2391,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Dubai Investment Park Second",
        "value": "AED 1.09B",
        "valueNum": 1094,
        "txns": 277,
        "avg": "AED 4M"
      },
      {
        "rank": 3,
        "area": "Wadi Al Safa 3",
        "value": "AED 932M",
        "valueNum": 932,
        "txns": 72,
        "avg": "AED 13M"
      },
      {
        "rank": 4,
        "area": "Nad Al Shiba First",
        "value": "AED 850M",
        "valueNum": 850,
        "txns": 124,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Madinat Al Mataar",
        "value": "AED 821M",
        "valueNum": 821,
        "txns": 182,
        "avg": "AED 5M"
      },
      {
        "rank": 6,
        "area": "Wadi Al Safa 5",
        "value": "AED 549M",
        "valueNum": 549,
        "txns": 156,
        "avg": "AED 4M"
      },
      {
        "rank": 7,
        "area": "Al Yufrah 1",
        "value": "AED 473M",
        "valueNum": 473,
        "txns": 138,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Emirate Living",
        "value": "AED 421M",
        "valueNum": 421,
        "txns": 90,
        "avg": "AED 5M"
      },
      {
        "rank": 9,
        "area": "Al Hebiah Sixth",
        "value": "AED 350M",
        "valueNum": 350,
        "txns": 90,
        "avg": "AED 4M"
      },
      {
        "rank": 10,
        "area": "The World",
        "value": "AED 346M",
        "valueNum": 346,
        "txns": 5,
        "avg": "AED 69M"
      }
    ],
    "projects": [
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "txns": 339,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 1",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "txns": 322,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - CUBA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 979M",
        "valueNum": 979,
        "txns": 299,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - MAUI",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 969M",
        "valueNum": 969,
        "txns": 274,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BERMUDA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 963M",
        "valueNum": 963,
        "txns": 296,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - TAHITI 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 879M",
        "valueNum": 879,
        "txns": 251,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BARBADOS 1",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 763M",
        "valueNum": 763,
        "txns": 228,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "Unknown",
        "developer": "",
        "location": "Al Furjan",
        "value": "AED 751M",
        "valueNum": 751,
        "txns": 100,
        "propType": "Villa",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "4 B/R",
        "count": 2287,
        "pct": 53,
        "color": "#378ADD"
      },
      {
        "type": "3 B/R",
        "count": 928,
        "pct": 21,
        "color": "#059669"
      },
      {
        "type": "5 B/R",
        "count": 891,
        "pct": 21,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 143,
        "pct": 3,
        "color": "#7c3aed"
      },
      {
        "type": "Other",
        "count": 41,
        "pct": 1,
        "color": "#dc2626"
      },
      {
        "type": "1 B/R",
        "count": 28,
        "pct": 1,
        "color": "#0d9488"
      },
      {
        "type": "6 B/R",
        "count": 18,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Villas",
        "value": "AED 17.37B",
        "units": "4,339 units",
        "pct": "100%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "78% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Yelayiss 1 leads with 46% of total value across 2391 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 19,450/sqm (AED 1,807/sqft). Average ticket is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2026 – 14 Mar 2026",
    "totalValue": 17366408465.28,
    "totalTxns": 4339
  },
  "Villa|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 13.06B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "3,398",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "96",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "DAMAC ISLANDS 2 …",
        "sub": "AED 1.06B"
      }
    ],
    "developers": [
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "pct": 8.1,
        "txns": 339,
        "color": "#dc2626"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "pct": 7.9,
        "txns": 322,
        "color": "#d97706"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 979M",
        "valueNum": 979,
        "pct": 7.5,
        "txns": 299,
        "color": "#378ADD"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 969M",
        "valueNum": 969,
        "pct": 7.4,
        "txns": 274,
        "color": "#059669"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 963M",
        "valueNum": 963,
        "pct": 7.4,
        "txns": 296,
        "color": "#7c3aed"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 879M",
        "valueNum": 879,
        "pct": 6.7,
        "txns": 251,
        "color": "#0d9488"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 763M",
        "valueNum": 763,
        "pct": 5.8,
        "txns": 228,
        "color": "#ea580c"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 676M",
        "valueNum": 676,
        "pct": 5.2,
        "txns": 203,
        "color": "#db2777"
      },
      {
        "name": "DAMAC ISLANDS 2 - …",
        "value": "AED 639M",
        "valueNum": 639,
        "pct": 4.9,
        "txns": 179,
        "color": "#65a30d"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 611M",
        "valueNum": 611,
        "pct": 4.7,
        "txns": 95,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Al Yelayiss 1",
        "value": "AED 7.97B",
        "valueNum": 7965,
        "txns": 2391,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Dubai Investment Park Second",
        "value": "AED 1.09B",
        "valueNum": 1094,
        "txns": 277,
        "avg": "AED 4M"
      },
      {
        "rank": 3,
        "area": "Wadi Al Safa 3",
        "value": "AED 814M",
        "valueNum": 814,
        "txns": 60,
        "avg": "AED 14M"
      },
      {
        "rank": 4,
        "area": "Nad Al Shiba First",
        "value": "AED 685M",
        "valueNum": 685,
        "txns": 108,
        "avg": "AED 6M"
      },
      {
        "rank": 5,
        "area": "Madinat Al Mataar",
        "value": "AED 616M",
        "valueNum": 616,
        "txns": 132,
        "avg": "AED 5M"
      },
      {
        "rank": 6,
        "area": "Wadi Al Safa 5",
        "value": "AED 488M",
        "valueNum": 488,
        "txns": 144,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "The World",
        "value": "AED 346M",
        "valueNum": 346,
        "txns": 5,
        "avg": "AED 69M"
      },
      {
        "rank": 8,
        "area": "Al Yufrah 1",
        "value": "AED 332M",
        "valueNum": 332,
        "txns": 92,
        "avg": "AED 4M"
      },
      {
        "rank": 9,
        "area": "Al Hebiah Sixth",
        "value": "AED 138M",
        "valueNum": 138,
        "txns": 37,
        "avg": "AED 4M"
      },
      {
        "rank": 10,
        "area": "Al Hebiah Fifth",
        "value": "AED 118M",
        "valueNum": 118,
        "txns": 57,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.06B",
        "valueNum": 1063,
        "txns": 339,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BAHAMAS 1",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 1.03B",
        "valueNum": 1033,
        "txns": 322,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - CUBA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 979M",
        "valueNum": 979,
        "txns": 299,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - MAUI",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 969M",
        "valueNum": 969,
        "txns": 274,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BERMUDA",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 963M",
        "valueNum": 963,
        "txns": 296,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - TAHITI 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 879M",
        "valueNum": 879,
        "txns": 251,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BARBADOS 1",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 763M",
        "valueNum": 763,
        "txns": 228,
        "propType": "Villa",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC ISLANDS 2 - BARBADOS 2",
        "developer": "",
        "location": "Al Yelayiss 1",
        "value": "AED 676M",
        "valueNum": 676,
        "txns": 203,
        "propType": "Villa",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "4 B/R",
        "count": 1967,
        "pct": 58,
        "color": "#378ADD"
      },
      {
        "type": "5 B/R",
        "count": 865,
        "pct": 25,
        "color": "#059669"
      },
      {
        "type": "3 B/R",
        "count": 491,
        "pct": 14,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 56,
        "pct": 2,
        "color": "#7c3aed"
      },
      {
        "type": "6 B/R",
        "count": 15,
        "pct": 0,
        "color": "#dc2626"
      },
      {
        "type": "7 B/R",
        "count": 3,
        "pct": 0,
        "color": "#0d9488"
      },
      {
        "type": "Other",
        "count": 1,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Villas",
        "value": "AED 13.06B",
        "units": "3,398 units",
        "pct": "100%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Al Yelayiss 1 leads with 61% of total value across 2391 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 19,704/sqm (AED 1,831/sqft). Average ticket is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2026 – 14 Mar 2026",
    "totalValue": 13055008521.489998,
    "totalTxns": 3398
  },
  "Villa|Primary": null,
  "Villa|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 4.31B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "941",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 5M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "139",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "MOHAMMED BIN RAS…",
        "sub": "AED 209M"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 751M",
        "valueNum": 751,
        "pct": 17.4,
        "txns": 100,
        "color": "#dc2626"
      },
      {
        "name": "MOHAMMED BIN RASHI…",
        "value": "AED 209M",
        "valueNum": 209,
        "pct": 4.9,
        "txns": 6,
        "color": "#d97706"
      },
      {
        "name": "Aura",
        "value": "AED 140M",
        "valueNum": 140,
        "pct": 3.3,
        "txns": 27,
        "color": "#378ADD"
      },
      {
        "name": "THE FIELDS AT D11 …",
        "value": "AED 125M",
        "valueNum": 125,
        "pct": 2.9,
        "txns": 32,
        "color": "#059669"
      },
      {
        "name": "Mudon Al Ranim 3",
        "value": "AED 115M",
        "valueNum": 115,
        "pct": 2.7,
        "txns": 29,
        "color": "#7c3aed"
      },
      {
        "name": "The Pulse Beachfro…",
        "value": "AED 100M",
        "valueNum": 100,
        "pct": 2.3,
        "txns": 23,
        "color": "#0d9488"
      },
      {
        "name": "MAHA TOWNHOUSES",
        "value": "AED 95M",
        "valueNum": 95,
        "pct": 2.2,
        "txns": 30,
        "color": "#ea580c"
      },
      {
        "name": "The Valley-Nara",
        "value": "AED 92M",
        "valueNum": 92,
        "pct": 2.1,
        "txns": 30,
        "color": "#db2777"
      },
      {
        "name": "ALBARARI IXORA VIL…",
        "value": "AED 85M",
        "valueNum": 85,
        "pct": 2,
        "txns": 10,
        "color": "#65a30d"
      },
      {
        "name": "Nad Al Sheba Garde…",
        "value": "AED 80M",
        "valueNum": 80,
        "pct": 1.9,
        "txns": 10,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Emirate Living",
        "value": "AED 421M",
        "valueNum": 421,
        "txns": 90,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Mbr District 1",
        "value": "AED 231M",
        "valueNum": 231,
        "txns": 7,
        "avg": "AED 33M"
      },
      {
        "rank": 3,
        "area": "Al Hebiah Sixth",
        "value": "AED 212M",
        "valueNum": 212,
        "txns": 53,
        "avg": "AED 4M"
      },
      {
        "rank": 4,
        "area": "Madinat Al Mataar",
        "value": "AED 205M",
        "valueNum": 205,
        "txns": 50,
        "avg": "AED 4M"
      },
      {
        "rank": 5,
        "area": "Nad Al Sheba Gardens",
        "value": "AED 197M",
        "valueNum": 197,
        "txns": 13,
        "avg": "AED 15M"
      },
      {
        "rank": 6,
        "area": "Dubai Hills",
        "value": "AED 190M",
        "valueNum": 190,
        "txns": 33,
        "avg": "AED 6M"
      },
      {
        "rank": 7,
        "area": "Jumeirah Village Circle",
        "value": "AED 165M",
        "valueNum": 165,
        "txns": 48,
        "avg": "AED 3M"
      },
      {
        "rank": 8,
        "area": "Nad Al Shiba First",
        "value": "AED 165M",
        "valueNum": 165,
        "txns": 16,
        "avg": "AED 10M"
      },
      {
        "rank": 9,
        "area": "Arabian Ranches I",
        "value": "AED 153M",
        "valueNum": 153,
        "txns": 30,
        "avg": "AED 5M"
      },
      {
        "rank": 10,
        "area": "Al Yelayiss 2",
        "value": "AED 153M",
        "valueNum": 153,
        "txns": 48,
        "avg": "AED 3M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "Al Furjan",
        "value": "AED 751M",
        "valueNum": 751,
        "txns": 100,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "MOHAMMED BIN RASHID AL MAKTOUM CITY- DISTRICT ONE, PHASE 1",
        "developer": "",
        "location": "Mbr District 1",
        "value": "AED 209M",
        "valueNum": 209,
        "txns": 6,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Aura",
        "developer": "",
        "location": "Al Hebiah Fourth",
        "value": "AED 140M",
        "valueNum": 140,
        "txns": 27,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "THE FIELDS AT D11 - MBRMC",
        "developer": "",
        "location": "The Field",
        "value": "AED 125M",
        "valueNum": 125,
        "txns": 32,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "Mudon Al Ranim 3",
        "developer": "",
        "location": "Al Hebiah Sixth",
        "value": "AED 115M",
        "valueNum": 115,
        "txns": 29,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "The Pulse Beachfront 3",
        "developer": "",
        "location": "Madinat Al Mataar",
        "value": "AED 100M",
        "valueNum": 100,
        "txns": 23,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "MAHA TOWNHOUSES",
        "developer": "",
        "location": "Al Yelayiss 2",
        "value": "AED 95M",
        "valueNum": 95,
        "txns": 30,
        "propType": "Villa",
        "txnType": "Secondary"
      },
      {
        "name": "The Valley-Nara",
        "developer": "",
        "location": "The Valley",
        "value": "AED 92M",
        "valueNum": 92,
        "txns": 30,
        "propType": "Villa",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "3 B/R",
        "count": 437,
        "pct": 46,
        "color": "#378ADD"
      },
      {
        "type": "4 B/R",
        "count": 320,
        "pct": 34,
        "color": "#059669"
      },
      {
        "type": "2 B/R",
        "count": 87,
        "pct": 9,
        "color": "#d97706"
      },
      {
        "type": "Other",
        "count": 40,
        "pct": 4,
        "color": "#7c3aed"
      },
      {
        "type": "1 B/R",
        "count": 28,
        "pct": 3,
        "color": "#dc2626"
      },
      {
        "type": "5 B/R",
        "count": 26,
        "pct": 3,
        "color": "#0d9488"
      },
      {
        "type": "6 B/R",
        "count": 3,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [
      {
        "label": "Villas",
        "value": "AED 4.31B",
        "units": "941 units",
        "pct": "100%",
        "color": "#059669"
      }
    ],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Emirate Living leads with 10% of total value across 90 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 18,533/sqm (AED 1,722/sqft). Average ticket is AED 5M."
      }
    ],
    "dateRange": "2 Jan 2026 – 13 Mar 2026",
    "totalValue": 4311399943.79,
    "totalTxns": 941
  },
  "Commercial|All": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 10.48B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "2,481",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 4M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "324",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "AHS TOWER",
        "sub": "AED 1.32B"
      }
    ],
    "developers": [
      {
        "name": "AHS TOWER",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "pct": 12.6,
        "txns": 58,
        "color": "#dc2626"
      },
      {
        "name": "Shahrukhz by Danube",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "pct": 10.4,
        "txns": 359,
        "color": "#d97706"
      },
      {
        "name": "Lumena by Omniyat",
        "value": "AED 843M",
        "valueNum": 843,
        "pct": 8,
        "txns": 27,
        "color": "#378ADD"
      },
      {
        "name": "Other",
        "value": "AED 759M",
        "valueNum": 759,
        "pct": 7.2,
        "txns": 248,
        "color": "#059669"
      },
      {
        "name": "31 Above By Beyond",
        "value": "AED 726M",
        "valueNum": 726,
        "pct": 6.9,
        "txns": 64,
        "color": "#7c3aed"
      },
      {
        "name": "Enara By Omniyat",
        "value": "AED 367M",
        "valueNum": 367,
        "pct": 3.5,
        "txns": 9,
        "color": "#0d9488"
      },
      {
        "name": "HQ by ROVE",
        "value": "AED 255M",
        "valueNum": 255,
        "pct": 2.4,
        "txns": 73,
        "color": "#ea580c"
      },
      {
        "name": "EATON SQUARE",
        "value": "AED 210M",
        "valueNum": 210,
        "pct": 2,
        "txns": 5,
        "color": "#db2777"
      },
      {
        "name": "BAY SQUARE",
        "value": "AED 162M",
        "valueNum": 162,
        "pct": 1.5,
        "txns": 28,
        "color": "#65a30d"
      },
      {
        "name": "DAMAC DISTRICT",
        "value": "AED 147M",
        "valueNum": 147,
        "pct": 1.4,
        "txns": 16,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Business Bay",
        "value": "AED 2.47B",
        "valueNum": 2475,
        "txns": 467,
        "avg": "AED 5M"
      },
      {
        "rank": 2,
        "area": "Trade Center Second",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "txns": 58,
        "avg": "AED 23M"
      },
      {
        "rank": 3,
        "area": "Tecom Site A",
        "value": "AED 1.10B",
        "valueNum": 1101,
        "txns": 361,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Burj Khalifa",
        "value": "AED 749M",
        "valueNum": 749,
        "txns": 104,
        "avg": "AED 7M"
      },
      {
        "rank": 5,
        "area": "Madinat Dubai Almelaheyah",
        "value": "AED 726M",
        "valueNum": 726,
        "txns": 64,
        "avg": "AED 11M"
      },
      {
        "rank": 6,
        "area": "Jumeirah Lakes Towers",
        "value": "AED 645M",
        "valueNum": 645,
        "txns": 229,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Jumeirah Village Circle",
        "value": "AED 338M",
        "valueNum": 338,
        "txns": 144,
        "avg": "AED 2M"
      },
      {
        "rank": 8,
        "area": "Horizon",
        "value": "AED 293M",
        "valueNum": 293,
        "txns": 23,
        "avg": "AED 13M"
      },
      {
        "rank": 9,
        "area": "Barsha Heights",
        "value": "AED 211M",
        "valueNum": 211,
        "txns": 68,
        "avg": "AED 3M"
      },
      {
        "rank": 10,
        "area": "Arjan",
        "value": "AED 201M",
        "valueNum": 201,
        "txns": 109,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "AHS TOWER",
        "developer": "",
        "location": "Trade Center Second",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "txns": 58,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shahrukhz by Danube",
        "developer": "",
        "location": "Tecom Site A",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "txns": 359,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Lumena by Omniyat",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 843M",
        "valueNum": 843,
        "txns": 27,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Unknown",
        "developer": "",
        "location": "Dubai Marina",
        "value": "AED 759M",
        "valueNum": 759,
        "txns": 248,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "31 Above By Beyond",
        "developer": "",
        "location": "Madinat Dubai Almelaheyah",
        "value": "AED 726M",
        "valueNum": 726,
        "txns": 64,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Enara By Omniyat",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 367M",
        "valueNum": 367,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "HQ by ROVE",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 255M",
        "valueNum": 255,
        "txns": 73,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "EATON SQUARE",
        "developer": "",
        "location": "Horizon",
        "value": "AED 210M",
        "valueNum": 210,
        "txns": 5,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 1738,
        "pct": 70,
        "color": "#378ADD"
      },
      {
        "type": "Studio",
        "count": 343,
        "pct": 14,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 166,
        "pct": 7,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 130,
        "pct": 5,
        "color": "#7c3aed"
      },
      {
        "type": "Shop",
        "count": 68,
        "pct": 3,
        "color": "#dc2626"
      },
      {
        "type": "3 B/R",
        "count": 28,
        "pct": 1,
        "color": "#0d9488"
      },
      {
        "type": "4 B/R",
        "count": 7,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "50% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Business Bay leads with 24% of total value across 467 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 31,874/sqm (AED 2,961/sqft). Average ticket is AED 4M."
      }
    ],
    "dateRange": "2 Jan 2026 – 14 Mar 2026",
    "totalValue": 10478248129.670002,
    "totalTxns": 2481
  },
  "Commercial|Off-Plan": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 6.85B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "1,233",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 6M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "125",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "AHS TOWER",
        "sub": "AED 1.32B"
      }
    ],
    "developers": [
      {
        "name": "AHS TOWER",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "pct": 19.3,
        "txns": 58,
        "color": "#dc2626"
      },
      {
        "name": "Shahrukhz by Danube",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "pct": 15.9,
        "txns": 359,
        "color": "#d97706"
      },
      {
        "name": "Lumena by Omniyat",
        "value": "AED 843M",
        "valueNum": 843,
        "pct": 12.3,
        "txns": 27,
        "color": "#378ADD"
      },
      {
        "name": "31 Above By Beyond",
        "value": "AED 726M",
        "valueNum": 726,
        "pct": 10.6,
        "txns": 64,
        "color": "#059669"
      },
      {
        "name": "Enara By Omniyat",
        "value": "AED 367M",
        "valueNum": 367,
        "pct": 5.4,
        "txns": 9,
        "color": "#7c3aed"
      },
      {
        "name": "HQ by ROVE",
        "value": "AED 255M",
        "valueNum": 255,
        "pct": 3.7,
        "txns": 73,
        "color": "#0d9488"
      },
      {
        "name": "EATON SQUARE",
        "value": "AED 210M",
        "valueNum": 210,
        "pct": 3.1,
        "txns": 5,
        "color": "#ea580c"
      },
      {
        "name": "DAMAC DISTRICT",
        "value": "AED 147M",
        "valueNum": 147,
        "pct": 2.1,
        "txns": 16,
        "color": "#db2777"
      },
      {
        "name": "Biltmore Sufouh",
        "value": "AED 121M",
        "valueNum": 121,
        "pct": 1.8,
        "txns": 44,
        "color": "#65a30d"
      },
      {
        "name": "Sobha Seahaven Tow…",
        "value": "AED 116M",
        "valueNum": 116,
        "pct": 1.7,
        "txns": 4,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Business Bay",
        "value": "AED 1.59B",
        "valueNum": 1591,
        "txns": 136,
        "avg": "AED 12M"
      },
      {
        "rank": 2,
        "area": "Trade Center Second",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "txns": 58,
        "avg": "AED 23M"
      },
      {
        "rank": 3,
        "area": "Tecom Site A",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "txns": 359,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Madinat Dubai Almelaheyah",
        "value": "AED 726M",
        "valueNum": 726,
        "txns": 64,
        "avg": "AED 11M"
      },
      {
        "rank": 5,
        "area": "Horizon",
        "value": "AED 293M",
        "valueNum": 293,
        "txns": 23,
        "avg": "AED 13M"
      },
      {
        "rank": 6,
        "area": "Jumeirah Village Circle",
        "value": "AED 224M",
        "valueNum": 224,
        "txns": 79,
        "avg": "AED 3M"
      },
      {
        "rank": 7,
        "area": "Damac Hills",
        "value": "AED 147M",
        "valueNum": 147,
        "txns": 16,
        "avg": "AED 9M"
      },
      {
        "rank": 8,
        "area": "Marsa Dubai",
        "value": "AED 139M",
        "valueNum": 139,
        "txns": 5,
        "avg": "AED 28M"
      },
      {
        "rank": 9,
        "area": "Arjan",
        "value": "AED 133M",
        "valueNum": 133,
        "txns": 43,
        "avg": "AED 3M"
      },
      {
        "rank": 10,
        "area": "Majan",
        "value": "AED 126M",
        "valueNum": 126,
        "txns": 71,
        "avg": "AED 2M"
      }
    ],
    "projects": [
      {
        "name": "AHS TOWER",
        "developer": "",
        "location": "Trade Center Second",
        "value": "AED 1.32B",
        "valueNum": 1324,
        "txns": 58,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Shahrukhz by Danube",
        "developer": "",
        "location": "Tecom Site A",
        "value": "AED 1.09B",
        "valueNum": 1087,
        "txns": 359,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Lumena by Omniyat",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 843M",
        "valueNum": 843,
        "txns": 27,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "31 Above By Beyond",
        "developer": "",
        "location": "Madinat Dubai Almelaheyah",
        "value": "AED 726M",
        "valueNum": 726,
        "txns": 64,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "Enara By Omniyat",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 367M",
        "valueNum": 367,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "HQ by ROVE",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 255M",
        "valueNum": 255,
        "txns": 73,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "EATON SQUARE",
        "developer": "",
        "location": "Horizon",
        "value": "AED 210M",
        "valueNum": 210,
        "txns": 5,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      },
      {
        "name": "DAMAC DISTRICT",
        "developer": "",
        "location": "Damac Hills",
        "value": "AED 147M",
        "valueNum": 147,
        "txns": 16,
        "propType": "Commercial",
        "txnType": "Off-Plan"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 1015,
        "pct": 82,
        "color": "#378ADD"
      },
      {
        "type": "Studio",
        "count": 120,
        "pct": 10,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 53,
        "pct": 4,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 41,
        "pct": 3,
        "color": "#7c3aed"
      },
      {
        "type": "3 B/R",
        "count": 3,
        "pct": 0,
        "color": "#dc2626"
      },
      {
        "type": "4 B/R",
        "count": 1,
        "pct": 0,
        "color": "#0d9488"
      }
    ],
    "valueSplit": [],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "100% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Business Bay leads with 23% of total value across 136 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 38,445/sqm (AED 3,572/sqft). Average ticket is AED 6M."
      }
    ],
    "dateRange": "2 Jan 2026 – 14 Mar 2026",
    "totalValue": 6847841302.389998,
    "totalTxns": 1233
  },
  "Commercial|Primary": null,
  "Commercial|Secondary": {
    "kpis": [
      {
        "label": "Total Value",
        "value": "AED 3.63B",
        "sub": "Gross transaction volume"
      },
      {
        "label": "Transactions",
        "value": "1,248",
        "sub": "Registered sales"
      },
      {
        "label": "Avg. Ticket",
        "value": "AED 3M",
        "sub": "Per transaction"
      },
      {
        "label": "Active Projects",
        "value": "200",
        "sub": "Unique projects"
      },
      {
        "label": "Top Project",
        "value": "BAY SQUARE",
        "sub": "AED 162M"
      }
    ],
    "developers": [
      {
        "name": "Other",
        "value": "AED 759M",
        "valueNum": 759,
        "pct": 20.9,
        "txns": 248,
        "color": "#dc2626"
      },
      {
        "name": "BAY SQUARE",
        "value": "AED 162M",
        "valueNum": 162,
        "pct": 4.5,
        "txns": 28,
        "color": "#d97706"
      },
      {
        "name": "BD BOULEVARD PLAZA",
        "value": "AED 121M",
        "valueNum": 121,
        "pct": 3.3,
        "txns": 6,
        "color": "#378ADD"
      },
      {
        "name": "THE ADDRESS RESIDE…",
        "value": "AED 115M",
        "valueNum": 115,
        "pct": 3.2,
        "txns": 15,
        "color": "#059669"
      },
      {
        "name": "THE ADDRESS - THE …",
        "value": "AED 102M",
        "valueNum": 102,
        "pct": 2.8,
        "txns": 15,
        "color": "#7c3aed"
      },
      {
        "name": "THE ADDRESS RESIDE…",
        "value": "AED 92M",
        "valueNum": 92,
        "pct": 2.5,
        "txns": 8,
        "color": "#0d9488"
      },
      {
        "name": "THE ADDRESS RESIDE…",
        "value": "AED 87M",
        "valueNum": 87,
        "pct": 2.4,
        "txns": 9,
        "color": "#ea580c"
      },
      {
        "name": "ADDRESS HARBOUR PO…",
        "value": "AED 78M",
        "valueNum": 78,
        "pct": 2.1,
        "txns": 18,
        "color": "#db2777"
      },
      {
        "name": "JUMEIRAH BUSINESS …",
        "value": "AED 78M",
        "valueNum": 78,
        "pct": 2.1,
        "txns": 21,
        "color": "#65a30d"
      },
      {
        "name": "THE OPUS BY OMNIYAT",
        "value": "AED 62M",
        "valueNum": 62,
        "pct": 1.7,
        "txns": 4,
        "color": "#64748b"
      }
    ],
    "areas": [
      {
        "rank": 1,
        "area": "Business Bay",
        "value": "AED 883M",
        "valueNum": 883,
        "txns": 331,
        "avg": "AED 3M"
      },
      {
        "rank": 2,
        "area": "Burj Khalifa",
        "value": "AED 749M",
        "valueNum": 749,
        "txns": 104,
        "avg": "AED 7M"
      },
      {
        "rank": 3,
        "area": "Jumeirah Lakes Towers",
        "value": "AED 606M",
        "valueNum": 606,
        "txns": 220,
        "avg": "AED 3M"
      },
      {
        "rank": 4,
        "area": "Barsha Heights",
        "value": "AED 144M",
        "valueNum": 144,
        "txns": 55,
        "avg": "AED 3M"
      },
      {
        "rank": 5,
        "area": "Motor City",
        "value": "AED 142M",
        "valueNum": 142,
        "txns": 9,
        "avg": "AED 16M"
      },
      {
        "rank": 6,
        "area": "Jumeirah Village Circle",
        "value": "AED 113M",
        "valueNum": 113,
        "txns": 65,
        "avg": "AED 2M"
      },
      {
        "rank": 7,
        "area": "Meydan One",
        "value": "AED 82M",
        "valueNum": 82,
        "txns": 21,
        "avg": "AED 4M"
      },
      {
        "rank": 8,
        "area": "Dubai Creek Harbour",
        "value": "AED 78M",
        "valueNum": 78,
        "txns": 18,
        "avg": "AED 4M"
      },
      {
        "rank": 9,
        "area": "Dubai Investment Park First",
        "value": "AED 70M",
        "valueNum": 70,
        "txns": 17,
        "avg": "AED 4M"
      },
      {
        "rank": 10,
        "area": "Arjan",
        "value": "AED 68M",
        "valueNum": 68,
        "txns": 66,
        "avg": "AED 1M"
      }
    ],
    "projects": [
      {
        "name": "Unknown",
        "developer": "",
        "location": "Dubai Marina",
        "value": "AED 759M",
        "valueNum": 759,
        "txns": 248,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "BAY SQUARE",
        "developer": "",
        "location": "Business Bay",
        "value": "AED 162M",
        "valueNum": 162,
        "txns": 28,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "BD BOULEVARD PLAZA",
        "developer": "",
        "location": "Burj Khalifa",
        "value": "AED 121M",
        "valueNum": 121,
        "txns": 6,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "THE ADDRESS RESIDENCE - SKY VIEW",
        "developer": "",
        "location": "Burj Khalifa",
        "value": "AED 115M",
        "valueNum": 115,
        "txns": 15,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "THE ADDRESS - THE BLVD",
        "developer": "",
        "location": "Burj Khalifa",
        "value": "AED 102M",
        "valueNum": 102,
        "txns": 15,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "THE ADDRESS RESIDENCE FOUNTAIN VIEWS III",
        "developer": "",
        "location": "Burj Khalifa",
        "value": "AED 92M",
        "valueNum": 92,
        "txns": 8,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "THE ADDRESS RESIDENCE FOUNTAIN VIEWS II",
        "developer": "",
        "location": "Burj Khalifa",
        "value": "AED 87M",
        "valueNum": 87,
        "txns": 9,
        "propType": "Commercial",
        "txnType": "Secondary"
      },
      {
        "name": "ADDRESS HARBOUR POINT",
        "developer": "",
        "location": "Dubai Creek Harbour",
        "value": "AED 78M",
        "valueNum": 78,
        "txns": 18,
        "propType": "Commercial",
        "txnType": "Secondary"
      }
    ],
    "unitMix": [
      {
        "type": "Other",
        "count": 723,
        "pct": 58,
        "color": "#378ADD"
      },
      {
        "type": "Studio",
        "count": 223,
        "pct": 18,
        "color": "#059669"
      },
      {
        "type": "1 B/R",
        "count": 113,
        "pct": 9,
        "color": "#d97706"
      },
      {
        "type": "2 B/R",
        "count": 89,
        "pct": 7,
        "color": "#7c3aed"
      },
      {
        "type": "Shop",
        "count": 68,
        "pct": 5,
        "color": "#dc2626"
      },
      {
        "type": "3 B/R",
        "count": 25,
        "pct": 2,
        "color": "#0d9488"
      },
      {
        "type": "4 B/R",
        "count": 6,
        "pct": 0,
        "color": "#a1a1aa"
      }
    ],
    "valueSplit": [],
    "signals": [
      {
        "title": "Market Composition",
        "color": "#378ADD",
        "body": "0% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai."
      },
      {
        "title": "Top Location",
        "color": "#059669",
        "body": "Business Bay leads with 24% of total value across 331 transactions."
      },
      {
        "title": "Pricing",
        "color": "#d97706",
        "body": "Average rate is AED 25,382/sqm (AED 2,358/sqft). Average ticket is AED 3M."
      }
    ],
    "dateRange": "2 Jan 2026 – 14 Mar 2026",
    "totalValue": 3630406827.28,
    "totalTxns": 1248
  }
};

/** Get pre-computed data for a filter combination */
export function getDubaiPrecomputed(propType: string, txnType: string): DubaiPrecomputedSet | null {
  // Off-Plan filter now includes what was previously "Primary"
  // Try the exact key first, then fall back
  return DUBAI_PRECOMPUTED[`${propType}|${txnType}`] ?? null;
}

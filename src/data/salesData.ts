export interface SalesProject {
  n: number; nm: string; cm: string;
  tl: number; sa: number; ts: number; soa: number;
  sp: number; sr: number; ua: number; up: number; uv: number;
}

export const SALES_COL_MAP: Record<string, keyof SalesProject> = {
  'project name': 'nm', 'community': 'cm', 'project topline': 'tl',
  'total sales': 'ts', 'sold %': 'sp', 'sold saleable area': 'soa',
  'unsold saleable area': 'ua', 'total inventory': 'uv', 'sold rate': 'sr',
};

// n=no nm=name cm=community tl=topline sa=saleableArea ts=totalSales
// soa=soldArea sp=soldPct sr=soldRate ua=unsoldArea up=unsoldPct uv=unsoldValue
export const SP=[
{n:1,nm:'Greens - Phase I',cm:'Hartland I',tl:357809079,sa:248628,ts:357809079,soa:248628,sp:100,sr:1439,ua:0,up:0,uv:0},
{n:2,nm:'Greens - Phase II',cm:'Hartland I',tl:554089666,sa:377367,ts:554089666,soa:377367,sp:100,sr:1468,ua:0,up:0,uv:0},
{n:3,nm:'Greens - Phase III',cm:'Hartland I',tl:651236667,sa:426713,ts:651236667,soa:426713,sp:100,sr:1526,ua:0,up:0,uv:0},
{n:4,nm:'Townhouses',cm:'Hartland I',tl:144212638,sa:88130,ts:144212638,soa:88130,sp:100,sr:1636,ua:0,up:0,uv:0},
{n:5,nm:'Villas - Phase I',cm:'Hartland I',tl:608445596,sa:340529,ts:608445596,soa:340529,sp:100,sr:1787,ua:0,up:0,uv:0},
{n:6,nm:'Villas - Phase II',cm:'Hartland I',tl:183681568,sa:104142,ts:183681568,soa:104142,sp:100,sr:1764,ua:0,up:0,uv:0},
{n:7,nm:'6BR Villa',cm:'Hartland I',tl:100100830,sa:55262,ts:100100830,soa:55262,sp:100,sr:1811,ua:0,up:0,uv:0},
{n:8,nm:'Creek Vistas',cm:'Hartland I',tl:835085150,sa:502303,ts:835085150,soa:502303,sp:100,sr:1663,ua:0,up:0,uv:0},
{n:9,nm:'One Park Avenue',cm:'Hartland I',tl:772375912,sa:502896,ts:772375912,soa:502896,sp:100,sr:1536,ua:0,up:0,uv:0},
{n:10,nm:'Creek Vistas Reserve',cm:'Hartland I',tl:799074340,sa:464943,ts:799074340,soa:464943,sp:100,sr:1719,ua:0,up:0,uv:0},
{n:11,nm:'Waves',cm:'Hartland I',tl:795955718,sa:409866,ts:795955718,soa:409866,sp:100,sr:1942,ua:0,up:0,uv:0},
{n:12,nm:'Waves Grande',cm:'Hartland I',tl:796435552,sa:452682,ts:796435552,soa:452682,sp:100,sr:1759,ua:0,up:0,uv:0},
{n:13,nm:'Villas - Phase III & IV',cm:'Hartland I',tl:910259716,sa:455437,ts:910259716,soa:455437,sp:100,sr:1999,ua:0,up:0,uv:0},
{n:14,nm:'The Crest',cm:'Hartland I',tl:2535288691,sa:1313482,ts:2531210361,soa:1307985,sp:100,sr:1935,ua:5497,up:0,uv:10638349},
{n:15,nm:'The S',cm:'Sheikh Zayed R',tl:1736837032,sa:509602,ts:1554260315,soa:481743,sp:95,sr:3226,ua:27859,up:5,uv:89883362},
{n:16,nm:'Creek Vistas Grande',cm:'Hartland I',tl:804017369,sa:441405,ts:804017369,soa:441405,sp:100,sr:1821,ua:0,up:0,uv:0},
{n:17,nm:'Crest Grande',cm:'Hartland I',tl:2580707840,sa:1396671,ts:2562549530,soa:1387211,sp:99,sr:1847,ua:9460,up:1,uv:17476023},
{n:18,nm:'Creek Vista Heights',cm:'Hartland I',tl:2589212022,sa:1280797,ts:2589212022,soa:1280797,sp:100,sr:2022,ua:0,up:0,uv:0},
{n:19,nm:'Sobha Waves Opulence',cm:'Hartland I',tl:1017621588,sa:510329,ts:1017621588,soa:510329,sp:100,sr:1994,ua:0,up:0,uv:0},
{n:20,nm:'Sobha One',cm:'Hartland II',tl:7506309975,sa:3320054,ts:7085571079,soa:3231475,sp:97,sr:2193,ua:88579,up:3,uv:194224570},
{n:21,nm:'Sobha SeaHaven',cm:'Dubai Harbour',tl:7443005314,sa:1552097,ts:5221082180,soa:1165625,sp:75,sr:4479,ua:386472,up:25,uv:1731089459},
{n:22,nm:'Sobha Hartland II Villas',cm:'Hartland II',tl:3173415079,sa:956518,ts:2856205116,soa:947966,sp:99,sr:3013,ua:8552,up:1,uv:25767970},
{n:23,nm:'Verde',cm:'JLT',tl:1546906992,sa:734599,ts:1537697928,soa:733773,sp:100,sr:2096,ua:826,up:0,uv:1730508},
{n:24,nm:'Sobha Reserve',cm:'Sobha Reserve',tl:3158348902,sa:1931806,ts:3158348902,soa:1921094,sp:99,sr:1644,ua:10712,up:1,uv:17611615},
{n:25,nm:'330 Riverside Crescent',cm:'Hartland II',tl:1375303732,sa:598455,ts:1375303732,soa:598455,sp:100,sr:2298,ua:0,up:0,uv:0},
{n:26,nm:'320 Riverside Crescent',cm:'Hartland II',tl:1542030109,sa:676183,ts:1537433222,soa:648190,sp:96,sr:2372,ua:27993,up:4,uv:66396817},
{n:27,nm:'340 Riverside Crescent',cm:'Hartland II',tl:1412114137,sa:598696,ts:1408190595,soa:597486,sp:100,sr:2357,ua:1210,up:0,uv:2851139},
{n:28,nm:'350 Riverside Crescent',cm:'Hartland II',tl:1485428221,sa:647442,ts:1474097414,soa:632830,sp:98,sr:2329,ua:14612,up:2,uv:34036376},
{n:29,nm:'310 Riverside Crescent',cm:'Hartland II',tl:1900211600,sa:737245,ts:1799712664,soa:720217,sp:98,sr:2499,ua:17028,up:2,uv:42551455},
{n:30,nm:'360 Riverside Crescent',cm:'Hartland II',tl:1882706210,sa:734113,ts:1799568889,soa:716625,sp:98,sr:2511,ua:17487,up:2,uv:43913822},
{n:31,nm:'Sobha Orbis',cm:'Motor City',tl:4055459843,sa:2008797,ts:3733216961,soa:1903847,sp:95,sr:1961,ua:104950,up:5,uv:205794360},
{n:32,nm:'Skyscape',cm:'Hartland II',tl:5413038415,sa:2164210,ts:3762811090,soa:1523207,sp:70,sr:2470,ua:641003,up:30,uv:1583482685},
{n:33,nm:'Sobha Elwood Villas',cm:'Yufrah I',tl:2655160700,sa:1543684,ts:2266385396,soa:1348960,sp:87,sr:1680,ua:194724,up:13,uv:327155317},
{n:34,nm:'Sobha Solis',cm:'Motor City',tl:3527898984,sa:1634495,ts:2634410199,soa:1312009,sp:80,sr:2008,ua:322486,up:20,uv:647526908},
{n:35,nm:'Skyvue',cm:'Hartland II',tl:4594662100,sa:1831862,ts:3781424684,soa:1477713,sp:81,sr:2559,ua:354149,up:19,uv:906255745},
{n:36,nm:'The Element at Sobha One',cm:'Hartland II',tl:1499842919,sa:561309,ts:928446966,soa:356735,sp:64,sr:2603,ua:204574,up:36,uv:532431066},
{n:37,nm:'Sobha Central Phase I',cm:'Sheikh Zayed R',tl:5591448800,sa:1996946,ts:2368361893,soa:829500,sp:42,sr:2855,ua:1167446,up:58,uv:3333251283},
{n:38,nm:'Sobha Central Phase II',cm:'Sheikh Zayed R',tl:5279364250,sa:1789615,ts:1524279000,soa:511566,sp:29,sr:2980,ua:1278049,up:71,uv:3808112759},
{n:39,nm:'Skyvue Altier',cm:'Hartland II',tl:2029475100,sa:699819,ts:799138829,soa:264608,sp:38,sr:3020,ua:435211,up:62,uv:1314373547},
{n:40,nm:'Sobha Skyparks',cm:'Sheikh Zayed R',tl:4061676000,sa:1015419,ts:560572964,soa:128491,sp:13,sr:4363,ua:886928,up:87,uv:3869434460},
{n:41,nm:'Sobha Central Phase III',cm:'Sheikh Zayed R',tl:7062093076,sa:2078656,ts:1390568626,soa:364917,sp:18,sr:3811,ua:1713739,up:82,uv:6530445274},
{n:42,nm:'Hartland II - Mansions',cm:'Hartland II',tl:1236000000,sa:200874,ts:130000000,soa:30573,sp:15,sr:4252,ua:170301,up:85,uv:724144397},
{n:43,nm:'Sanctuary - The Grove',cm:'Al Ain Road',tl:3197373200,sa:1682828,ts:98842564,soa:51068,sp:3,sr:1935,ua:1631760,up:97,uv:3158266709},
{n:44,nm:'Sanctuary - The Brooks',cm:'Al Ain Road',tl:1055404491,sa:613537,ts:415113968,soa:244578,sp:40,sr:1697,ua:368959,up:60,uv:626221091},
{n:45,nm:'Sanctuary - The Greens',cm:'Al Ain Road',tl:1814903185,sa:1061723,ts:461658162,soa:278131,sp:26,sr:1660,ua:783592,up:74,uv:1300650833},
{n:46,nm:'Sanctuary - The Willows',cm:'Al Ain Road',tl:2951871676,sa:1773029,ts:80791524,soa:48673,sp:3,sr:1660,ua:1724356,up:97,uv:2862239653},
];
export const ST={projects:46,topline:107223899984,saleableArea:45025193,sales:72756868166,soldArea:32426679,unsoldArea:12598514,unsoldValue:34007957550};

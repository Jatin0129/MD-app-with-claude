import { colors } from '../theme/colors';

export interface OverdueProject {
  nm: string;
  d0: number; d1: number; d2: number; d3: number;
  d4: number; d5: number; d6: number; tot: number;
  crit?: boolean;
}

export const BUCKET_LABELS = [
  '0\u201330d', '31\u201360d', '61\u201390d', '91\u2013120d',
  '121\u2013180d', '181\u2013360d', '>361d',
];

export const BUCKET_COLORS = [
  colors.positiveGreen, colors.textPrimary, colors.amberColor, colors.amberColor,
  colors.negativeRed, colors.negativeRed, colors.darkRed,
];

export const BUCKET_KEYS: (keyof Pick<OverdueProject,
  'd0' | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6'
>)[] = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6'];

export const COLL_COL_MAP: Record<string, keyof OverdueProject> = {
  'project': 'nm', '0-30 days': 'd0', '31-60 days': 'd1',
  '61-90 days': 'd2', '91-120 days': 'd3', '121-180 days': 'd4',
  '181-360 days': 'd5', '>361 days': 'd6', 'total dues': 'tot',
};

// d0=0-30 d1=31-60 d2=61-90 d3=91-120 d4=121-180 d5=181-360 d6=361+ tot=total crit=isCritical
export const OD=[
{nm:'Sobha Hartland II',d0:131275600,d1:85188407,d2:36537253,d3:7049863,d4:47554467,d5:65499877,d6:47057385,tot:420162852},
{nm:'Sobha Hartland',d0:7524420,d1:159933894,d2:10534398,d3:6657367,d4:2095061,d5:24478352,d6:76610069,tot:287833560},
{nm:'Sobha One',d0:33776294,d1:20602054,d2:8016018,d3:3020364,d4:14745606,d5:41092270,d6:28892496,tot:150145101},
{nm:'Sobha SeaHaven',d0:35871110,d1:8520366,d2:15647357,d3:5315603,d4:22651023,d5:24622708,d6:20830839,tot:133459006},
{nm:'Sobha Reserve',d0:21982656,d1:6961514,d2:3624881,d3:2473139,d4:13686810,d5:32095622,d6:23708352,tot:104532972},
{nm:'The S',d0:0,d1:0,d2:0,d3:0,d4:36246228,d5:32608834,d6:0,tot:68855062,crit:true},
{nm:'Sobha Orbis',d0:9698354,d1:6093215,d2:11317960,d3:3661398,d4:10187952,d5:10971605,d6:4889952,tot:56820436},
{nm:'Sobha Central',d0:33601601,d1:5362526,d2:1999406,d3:719491,d4:2065745,d5:2420083,d6:0,tot:46168852},
{nm:'Sobha Elwood',d0:16927503,d1:2152628,d2:1717088,d3:1180322,d4:6747446,d5:10188068,d6:4267099,tot:43180153},
{nm:'Sobha Sanctuary',d0:27878860,d1:4174728,d2:0,d3:0,d4:0,d5:0,d6:0,tot:32053587},
{nm:'Verde By Sobha',d0:9660298,d1:1539274,d2:3536802,d3:2675823,d4:2412855,d5:5987592,d6:5385358,tot:31198003},
{nm:'Sobha Solis',d0:10146376,d1:5867081,d2:4467602,d3:1419506,d4:5133477,d5:3324878,d6:387410,tot:30746331},
{nm:'Sobha Skyparks',d0:3565344,d1:2739140,d2:242400,d3:0,d4:616147,d5:0,d6:0,tot:7163031},
{nm:'H2 Villas',d0:0,d1:0,d2:0,d3:0,d4:2413218,d5:3577915,d6:0,tot:5991133},
{nm:'Hartland Extension',d0:0,d1:0,d2:0,d3:0,d4:0,d5:0,d6:3950147,tot:3950147},
{nm:'Sobha Central Mall',d0:877502,d1:1214252,d2:0,d3:0,d4:0,d5:0,d6:0,tot:2091753},
];
export const OT={d0:342785917,d1:310349077,d2:97641164,d3:34172876,d4:166556034,d5:256867804,d6:215979108,grand:1424351981};
export const ESC=[
{p:'Sobha Seahaven A',bank:'ENBD',tot:531201307},
{p:'Sobha Seahaven B',bank:'BOB',tot:393926156},
{p:'Skyvue',bank:'DIB',tot:412449722},
{p:'Sobha Orbis',bank:'DIB',tot:679142926},
{p:'310 Riverside',bank:'ENBD',tot:192783552},
{p:'360 Riverside',bank:'ENBD',tot:207866751},
{p:'Sobha Solis',bank:'ADCB',tot:388745297},
{p:'Verde by Sobha',bank:'ENBD',tot:148941497},
{p:'Creek Vista Heights',bank:'DIB',tot:155534026},
{p:'Elwood Estates',bank:'FAB',tot:186849290},
{p:'Skyscape Avenue',bank:'DIB',tot:398273729},
{p:'Sobha Estates',bank:'Mashreq',tot:165765607},
{p:'Sobha One (DIB)',bank:'DIB',tot:89984057},
{p:'The Element',bank:'FAB',tot:104849180},
{p:'Sobha Central Ph I',bank:'DIB',tot:93149187},
{p:'Sobha Central Ph II',bank:'DIB',tot:103223502},
];
export const ESC_TOTAL=5068374104;

export type SalesStatus = '100%' | 'watch' | 'critical';

export interface DailySalesProject {
  rank: number;
  name: string;
  community: string;
  topline: number;       // in millions
  toplineLabel: string;  // formatted
  soldPct: number;
  unsoldSft: number | null;
  unsoldSftLabel: string;
  unsoldAed: number | null;  // in millions
  unsoldAedLabel: string;
  status: SalesStatus;
  trend?: 'up' | 'down' | 'flat';
}

export interface DailySalesData {
  totalProjects: number;
  totalTopline: string;
  totalToplineSft: string;
  totalSales: string;
  totalSalesDelta: string;
  unsoldPipeline: string;
  unsoldPipelineNote: string;
  groups: { label: string; status: SalesStatus; projects: DailySalesProject[] }[];
  grandTotal: {
    projects: number;
    topline: string;
    unsoldSft: string;
    unsoldAed: string;
  };
}

function p(
  rank: number,
  name: string,
  community: string,
  topline: number,
  toplineLabel: string,
  soldPct: number,
  unsoldSft: number | null,
  unsoldSftLabel: string,
  unsoldAed: number | null,
  unsoldAedLabel: string,
  status: SalesStatus,
  trend?: 'up' | 'down' | 'flat',
): DailySalesProject {
  return { rank, name, community, topline, toplineLabel, soldPct, unsoldSft, unsoldSftLabel, unsoldAed, unsoldAedLabel, status, trend };
}

const sold100: DailySalesProject[] = [
  p(1, 'Greens Phase I', 'Hartland I', 357.8, '357.8M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(2, 'Greens Phase II', 'Hartland I', 554.1, '554.1M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(3, 'Greens Phase III', 'Hartland I', 651.2, '651.2M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(4, 'Townhouses', 'Hartland I', 144.2, '144.2M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(5, 'Villas Phase I', 'Hartland I', 608.4, '608.4M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(6, 'Villas Phase II', 'Hartland I', 183.7, '183.7M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(7, '6BR Villa', 'Hartland I', 100.1, '100.1M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(8, 'Creek Vistas', 'Hartland I', 835.1, '835.1M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(9, 'One Park Avenue', 'Hartland I', 772.4, '772.4M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(10, 'Creek Vistas Reserve', 'Hartland I', 799.1, '799.1M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(11, 'Waves', 'Hartland I', 796.0, '796.0M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(12, 'Waves Grande', 'Hartland I', 796.4, '796.4M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(13, 'Villas Ph III & IV', 'Hartland I', 910.3, '910.3M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(16, 'Creek Vistas Grande', 'Hartland I', 804.0, '804.0M', 100, null, '\u2014', null, '\u2014', '100%'),
  p(18, 'Creek Vista Heights', 'Hartland I', 2589, '2.589B', 100, null, '\u2014', null, '\u2014', '100%'),
  p(19, 'Sobha Waves Opulence', 'Hartland I', 1018, '1.018B', 100, null, '\u2014', null, '\u2014', '100%'),
  p(25, '330 Riverside', 'Hartland II', 1375, '1.375B', 100, null, '\u2014', null, '\u2014', '100%'),
  p(27, '340 Riverside', 'Hartland II', 1412, '1.412B', 100, null, '\u2014', null, '\u2014', '100%'),
];

const watch: DailySalesProject[] = [
  p(14, 'The Crest', 'Hartland I', 2535, '2.535B', 100, 5497, '5,497', 10.6, '10.6M', 'watch', 'flat'),
  p(15, 'The S', 'Sheikh Zayed R', 1737, '1.737B', 95, 27859, '27,859', 89.9, '89.9M', 'watch', 'down'),
  p(17, 'Crest Grande', 'Hartland I', 2581, '2.581B', 99, 9460, '9,460', 17.5, '17.5M', 'watch', 'flat'),
  p(20, 'Sobha One', 'Hartland II', 7506, '7.506B', 97, 88579, '88,579', 194.2, '194.2M', 'watch', 'up'),
  p(21, 'Sobha SeaHaven', 'Dubai Harbour', 7443, '7.443B', 75, 386472, '386,472', 1731, '1.731B', 'watch', 'down'),
  p(22, 'H2 Villas', 'Hartland II', 3173, '3.173B', 99, 8552, '8,552', 25.8, '25.8M', 'watch', 'up'),
  p(23, 'Verde', 'JLT', 1547, '1.547B', 100, 826, '826', 1.7, '1.7M', 'watch', 'flat'),
  p(24, 'Sobha Reserve', 'Sobha Reserve', 3158, '3.158B', 99, 10712, '10,712', 17.6, '17.6M', 'watch', 'up'),
  p(26, '320 Riverside', 'Hartland II', 1542, '1.542B', 96, 27993, '27,993', 66.4, '66.4M', 'watch', 'flat'),
  p(28, '350 Riverside', 'Hartland II', 1485, '1.485B', 98, 14612, '14,612', 34.0, '34.0M', 'watch', 'flat'),
  p(29, '310 Riverside', 'Hartland II', 1900, '1.900B', 98, 17028, '17,028', 42.6, '42.6M', 'watch', 'up'),
  p(30, '360 Riverside', 'Hartland II', 1883, '1.883B', 98, 17487, '17,487', 43.9, '43.9M', 'watch', 'flat'),
  p(31, 'Sobha Orbis', 'Motor City', 4055, '4.055B', 95, 104950, '104,950', 205.8, '205.8M', 'watch', 'up'),
  p(32, 'Skyscape', 'Hartland II', 5413, '5.413B', 70, 641003, '641,003', 1583, '1.583B', 'watch', 'down'),
  p(33, 'Elwood Villas', 'Yufrah I', 2655, '2.655B', 87, 194724, '194,724', 327.2, '327.2M', 'watch', 'down'),
  p(34, 'Sobha Solis', 'Motor City', 3528, '3.528B', 80, 322486, '322,486', 647.5, '647.5M', 'watch', 'down'),
  p(35, 'Skyvue', 'Hartland II', 4595, '4.595B', 81, 354149, '354,149', 906.3, '906.3M', 'watch', 'down'),
  p(36, 'The Element', 'Hartland II', 1500, '1.500B', 64, 204574, '204,574', 532.4, '532.4M', 'watch', 'down'),
  p(44, 'Sanctuary Brooks', 'Al Ain Road', 1055, '1.055B', 40, 368959, '368,959', 626.2, '626.2M', 'watch', 'down'),
];

const critical: DailySalesProject[] = [
  p(37, 'Sobha Central Ph I', 'Sheikh Zayed R', 5591, '5.591B', 42, 1167446, '1,167,446', 3333, '3.333B', 'critical', 'down'),
  p(38, 'Sobha Central Ph II', 'Sheikh Zayed R', 5279, '5.279B', 29, 1278049, '1,278,049', 3808, '3.808B', 'critical', 'down'),
  p(39, 'Skyvue Altier', 'Hartland II', 2029, '2.029B', 38, 435211, '435,211', 1314, '1.314B', 'critical', 'down'),
  p(40, 'Sobha Skyparks', 'Sheikh Zayed R', 4062, '4.062B', 13, 886928, '886,928', 3869, '3.869B', 'critical', 'down'),
  p(41, 'Sobha Central Ph III', 'Sheikh Zayed R', 7062, '7.062B', 18, 1713739, '1,713,739', 6530, '6.530B', 'critical', 'down'),
  p(42, 'H2 Mansions', 'Hartland II', 1236, '1.236B', 15, 170301, '170,301', 724.1, '724.1M', 'critical', 'down'),
  p(43, 'Sanctuary Grove', 'Al Ain Road', 3197, '3.197B', 3, 1631760, '1,631,760', 3158, '3.158B', 'critical', 'down'),
  p(45, 'Sanctuary Greens', 'Al Ain Road', 1815, '1.815B', 26, 783592, '783,592', 1301, '1.301B', 'critical', 'down'),
  p(46, 'Sanctuary Willows', 'Al Ain Road', 2952, '2.952B', 3, 1724356, '1,724,356', 2862, '2.862B', 'critical', 'down'),
];

export const dailySalesData: DailySalesData = {
  totalProjects: 46,
  totalTopline: 'AED 107.2B',
  totalToplineSft: '45.0M sft',
  totalSales: 'AED 72.8B',
  totalSalesDelta: '72% sold by value',
  unsoldPipeline: 'AED 34.0B',
  unsoldPipelineNote: '12.6M sft remaining',
  groups: [
    { label: '100% sold', status: '100%', projects: sold100 },
    { label: 'Watch \u2014 50 to 99% sold', status: 'watch', projects: watch },
    { label: 'Critical \u2014 below 50% sold', status: 'critical', projects: critical },
  ],
  grandTotal: {
    projects: 46,
    topline: 'AED 107.2B',
    unsoldSft: '12.6M sft',
    unsoldAed: 'AED 34.0B',
  },
};

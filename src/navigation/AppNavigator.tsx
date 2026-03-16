import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Eagerly loaded tab screens
import HomeScreen from '../screens/HomeScreen';
import MarketsScreen from '../screens/MarketsScreen';
import SobhaScreen from '../screens/SobhaScreen';
import IntelScreen from '../screens/IntelScreen';
import RETransactionsScreen from '../screens/RETransactionsScreen';

// Lazy-loaded sub-screens
const PersonalScreen = React.lazy(() => import('../screens/PersonalScreen'));
const SocialScreen = React.lazy(() => import('../screens/SocialScreen'));
const AIScreen = React.lazy(() => import('../screens/AIScreen'));
const DocsScreen = React.lazy(() => import('../screens/DocsScreen'));
const MISScreen = React.lazy(() => import('../screens/MISScreen'));
const MISProjectDetail = React.lazy(() => import('../screens/mis/MISProjectDetail'));
const MISPDFViewerScreen = React.lazy(() => import('../screens/mis/MISPDFViewerScreen'));
const DailySalesMISScreen = React.lazy(() => import('../screens/DailySalesMISScreen'));
const DailyCollectionsMISScreen = React.lazy(() => import('../screens/DailyCollectionsMISScreen'));
const FinanceMISScreen = React.lazy(() => import('../screens/FinanceMISScreen'));

import type { MISProject } from '../data/misData';

// ─── Type definitions ───────────────────────────────────────────────────────

export type HomeStackParamList = {
  HomeMain: undefined;
  Personal: undefined;
  Social: undefined;
  AI: undefined;
  Docs: undefined;
};

export type SobhaStackParamList = {
  SobhaMain: undefined;
  DailySalesMIS: undefined;
  DailyCollectionsMIS: undefined;
  FinanceMIS: undefined;
  MIS: undefined;
  MISDetail: { project: MISProject };
  MISPDFViewer: undefined;
};

export type RealEstateStackParamList = {
  REMain: undefined;
  RETransactions: { tab?: string } | undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Markets: undefined;
  'Real Estate': undefined;
  Sobha: undefined;
  Intel: undefined;
};

// ─── Home Stack Navigator ───────────────────────────────────────────────────

const HStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <HStack.Navigator screenOptions={{ headerShown: false }}>
      <HStack.Screen name="HomeMain" component={HomeScreen} />
      <HStack.Screen name="Personal" component={PersonalScreen} />
      <HStack.Screen name="Social" component={SocialScreen} />
      <HStack.Screen name="AI" component={AIScreen} />
      <HStack.Screen name="Docs" component={DocsScreen} />
    </HStack.Navigator>
  );
}

// ─── Sobha Stack Navigator ──────────────────────────────────────────────────

const SStack = createNativeStackNavigator<SobhaStackParamList>();

const sobhaScreenOptions = {
  headerStyle: { backgroundColor: colors.cardBg },
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerBackTitle: 'Sobha MIS',
};

function SobhaStack() {
  return (
    <SStack.Navigator screenOptions={{ headerShown: false }}>
      <SStack.Screen name="SobhaMain" component={SobhaScreen} />
      <SStack.Screen
        name="DailySalesMIS"
        component={DailySalesMISScreen}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'Daily Sales MIS' }}
      />
      <SStack.Screen
        name="DailyCollectionsMIS"
        component={DailyCollectionsMISScreen}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'Daily Collections MIS' }}
      />
      <SStack.Screen
        name="FinanceMIS"
        component={FinanceMISScreen}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'Monthly Finance MIS' }}
      />
      <SStack.Screen
        name="MIS"
        component={MISScreen}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'Monthly Development MIS' }}
      />
      <SStack.Screen
        name="MISDetail"
        component={MISProjectDetail}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'Project Detail' }}
      />
      <SStack.Screen
        name="MISPDFViewer"
        component={MISPDFViewerScreen}
        options={{ ...sobhaScreenOptions, headerShown: true, title: 'PDF Viewer' }}
      />
    </SStack.Navigator>
  );
}

// ─── Real Estate Stack Navigator ─────────────────────────────────────────────

const REStack = createNativeStackNavigator<RealEstateStackParamList>();

const reScreenOptions = {
  headerStyle: { backgroundColor: colors.cardBg },
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerBackTitle: 'Real Estate',
};

function RealEstateStack() {
  return (
    <REStack.Navigator screenOptions={{ headerShown: false }}>
      <REStack.Screen name="REMain" component={RETransactionsScreen} />
    </REStack.Navigator>
  );
}

// ─── Tab icon mapping ───────────────────────────────────────────────────────

const TAB_ICONS: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Markets: 'trending-up-outline',
  'Real Estate': 'business-outline',
  Sobha: 'stats-chart-outline',
  Intel: 'shield-checkmark-outline',
};

const TAB_ICONS_FOCUSED: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Markets: 'trending-up',
  'Real Estate': 'business',
  Sobha: 'stats-chart',
  Intel: 'shield-checkmark',
};

// ─── Bottom Tab Navigator ───────────────────────────────────────────────────

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = focused
            ? TAB_ICONS_FOCUSED[route.name]
            : TAB_ICONS[route.name];
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.navActive,
        tabBarInactiveTintColor: colors.navInactive,
        tabBarStyle: {
          backgroundColor: colors.cardBg,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500' as const,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Markets" component={MarketsScreen} />
      <Tab.Screen name="Real Estate" component={RealEstateStack} />
      <Tab.Screen name="Sobha" component={SobhaStack} />
      <Tab.Screen name="Intel" component={IntelScreen} />
    </Tab.Navigator>
  );
}

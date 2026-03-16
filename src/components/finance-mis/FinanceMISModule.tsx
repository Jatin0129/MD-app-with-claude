import React, { useState } from 'react';
import { PageTitle, TabBarRow } from '../ui';
import { IncomeStatementPage } from './IncomeStatementPage';
import { OverheadsPage } from './OverheadsPage';
import { UnsoldInventoryPage } from './UnsoldInventoryPage';
import { CustomerDuePage } from './CustomerDuePage';

type FinanceTabKey = 'Income' | 'Overheads' | 'Inventory' | 'Due';

const FINANCE_TABS: FinanceTabKey[] = ['Income', 'Overheads', 'Inventory', 'Due'];

const TAB_COPY: Record<FinanceTabKey, { title: string; subtitle: string }> = {
  Income: {
    title: 'Income statement',
    subtitle: 'Plan versus actual view with clean subtotal hierarchy for executive scanning.',
  },
  Overheads: {
    title: 'Overheads',
    subtitle: 'Budget, actual, variance and utilisation on one lighter operating cost page.',
  },
  Inventory: {
    title: 'Unsold inventory',
    subtitle: 'A focused topline sales view of the largest inventory pools still to absorb.',
  },
  Due: {
    title: 'Customer due',
    subtitle: 'Ageing exposure grouped by project, with critical overdue highlighted clearly.',
  },
};

export function FinanceMISModule() {
  const [activeTab, setActiveTab] = useState<FinanceTabKey>('Income');

  return (
    <>
      <TabBarRow tabs={FINANCE_TABS} active={activeTab} onSelect={(tab) => setActiveTab(tab as FinanceTabKey)} />
      <PageTitle title={TAB_COPY[activeTab].title} subtitle={TAB_COPY[activeTab].subtitle} />

      {activeTab === 'Income' ? <IncomeStatementPage /> : null}
      {activeTab === 'Overheads' ? <OverheadsPage /> : null}
      {activeTab === 'Inventory' ? <UnsoldInventoryPage /> : null}
      {activeTab === 'Due' ? <CustomerDuePage /> : null}
    </>
  );
}

export const financialSummary = {
  currentBalance: 0.00,
  status: 'Paid in Full',
  nextDue: 'Spring 2026 — Jan 15',
  kpis: [
    { label: 'Annual Tuition', value: '$42,000', caption: '2025–2026 Academic Year' },
    { label: 'Scholarships & Aid', value: '$18,500', caption: 'Merit Scholarship + Federal Grant' },
    { label: 'Net Cost', value: '$23,500', caption: 'After aid applied' }
  ]
};

export const statementRows = [
  { item: 'Tuition (15 credits × $1,400/cr)', amount: 21000, type: 'charge' },
  { item: 'Housing — Maple Hall Double', amount: 4800, type: 'charge' },
  { item: 'Meal Plan — Silver (14 meals/wk)', amount: 2100, type: 'charge' },
  { item: 'Student Activity Fee', amount: 350, type: 'charge' },
  { item: 'Technology Fee', amount: 200, type: 'charge' },
  { item: 'Health Services Fee', amount: 150, type: 'charge' },
  { item: 'Merit Scholarship', amount: -12000, type: 'aid' },
  { item: 'Federal Pell Grant', amount: -6500, type: 'aid' },
  { item: 'Payment Received (Aug 20, 2025)', amount: -10100, type: 'payment' }
];

export const paymentHistory = [
  { date: 'Aug 20, 2025', term: 'Fall 2025 Tuition', amount: '$10,100', status: 'Paid', color: 'green' },
  { date: 'Jan 12, 2025', term: 'Spring 2025 Tuition', amount: '$9,800', status: 'Paid', color: 'green' },
  { date: 'Aug 18, 2024', term: 'Fall 2024 Tuition', amount: '$9,400', status: 'Paid', color: 'green' },
  { date: 'Jan 10, 2024', term: 'Spring 2024 Tuition', amount: '$9,000', status: 'Paid', color: 'green' }
];

export const costBreakdownData = [
  { term: 'Fall 2023', Tuition: 19500, Housing: 4300, Fees: 600 },
  { term: 'Spring 2024', Tuition: 19500, Housing: 4300, Fees: 600 },
  { term: 'Fall 2024', Tuition: 20000, Housing: 4500, Fees: 650 },
  { term: 'Spring 2025', Tuition: 20000, Housing: 4500, Fees: 650 },
  { term: 'Fall 2025', Tuition: 21000, Housing: 4800, Fees: 700 }
];

export const financialAidAwards = [
  { award: 'Merit Scholarship (CS Excellence)', amount: '$12,000/yr', criteria: 'Renewable (GPA ≥ 3.5)' },
  { award: 'Federal Pell Grant', amount: '$6,500/yr', criteria: 'Need-based' },
  { award: 'Work-Study Eligibility', amount: '$2,400/yr', criteria: 'Available — not accepted' }
];

export const estimatedSpringBill = [
  { item: 'Tuition (est. 15 credits)', amount: 21000 },
  { item: 'Housing', amount: 4800 },
  { item: 'Meal Plan', amount: 2100 },
  { item: 'Fees', amount: 700 },
  { item: 'Expected Aid', amount: -18500 }
];

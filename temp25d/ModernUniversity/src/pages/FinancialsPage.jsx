import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  financialSummary,
  statementRows,
  paymentHistory,
  costBreakdownData,
  financialAidAwards,
  estimatedSpringBill
} from '../data/financials';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export const FinancialsPage = () => {
  // Compute tuition, housing, and fee totals for statement
  const chargeRows = statementRows.filter(r => r.type === 'charge');
  const aidRows = statementRows.filter(r => r.type === 'aid');
  const paymentRows = statementRows.filter(r => r.type === 'payment');

  const chargesTotal = chargeRows.reduce((sum, r) => sum + r.amount, 0);
  const aidTotal = aidRows.reduce((sum, r) => sum + r.amount, 0);
  const paymentsTotal = paymentRows.reduce((sum, r) => sum + r.amount, 0);
  const netDue = chargesTotal + aidTotal;
  const balanceDue = netDue + paymentsTotal;

  return (
    <div className="space-y-8">
      {/* Financial Summary Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-900 text-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-secondary/80 text-xs font-semibold uppercase tracking-wider block">Current Balance</span>
          <span className="font-heading text-4xl font-bold block mt-1">${financialSummary.currentBalance.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="font-semibold">{financialSummary.status}</span>
          </div>
          <span className="hidden md:inline">•</span>
          <span>Next Due: {financialSummary.nextDue}</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialSummary.kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            sub={kpi.caption}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Statement & Cost Chart (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Current Semester Statement */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-heading text-xl font-bold text-text">Current Semester Statement</h3>
              <p className="text-xs text-muted">Fall 2025 Statement Details</p>
            </div>
            
            <div className="p-6">
              <table className="w-full text-left border-collapse text-sm" aria-label="Current semester statement details">
                <tbody>
                  {/* Charges */}
                  <tr className="border-b border-gray-100"><td colSpan="2" className="pt-2 pb-1 font-bold text-xs uppercase tracking-wider text-muted">Charges</td></tr>
                  {chargeRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/30">
                      <td className="py-2.5 text-text pl-2">{row.item}</td>
                      <td className="py-2.5 text-right font-medium text-text pr-2">${row.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200 font-bold bg-gray-50/20">
                    <td className="py-2.5 text-text pl-2">Charges Total</td>
                    <td className="py-2.5 text-right text-text pr-2">${chargesTotal.toLocaleString()}</td>
                  </tr>

                  {/* Financial Aid Credits */}
                  <tr className="border-b border-gray-100"><td colSpan="2" className="pt-4 pb-1 font-bold text-xs uppercase tracking-wider text-muted">Financial Aid Credits</td></tr>
                  {aidRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/30">
                      <td className="py-2.5 text-text pl-2">{row.item}</td>
                      <td className="py-2.5 text-right font-medium text-green-700 pr-2">-${Math.abs(row.amount).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200 font-bold bg-green-50/20">
                    <td className="py-2.5 text-green-800 pl-2">Aid Applied</td>
                    <td className="py-2.5 text-right text-green-800 pr-2">-${Math.abs(aidTotal).toLocaleString()}</td>
                  </tr>

                  {/* Net Due & Payments */}
                  <tr className="border-b border-gray-200 font-bold">
                    <td className="py-3 text-text pl-2">Net Due</td>
                    <td className="py-3 text-right text-text pr-2">${netDue.toLocaleString()}</td>
                  </tr>

                  {paymentRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/30 bg-blue-50/10">
                      <td className="py-2.5 text-text pl-2 font-medium">{row.item}</td>
                      <td className="py-2.5 text-right font-bold text-primary pr-2">-${Math.abs(row.amount).toLocaleString()}</td>
                    </tr>
                  ))}
                  
                  {/* Final Balance */}
                  <tr className="bg-primary text-white font-bold">
                    <td className="py-3 pl-3 rounded-l-md">Remaining Balance Due</td>
                    <td className="py-3 text-right pr-3 rounded-r-md">${balanceDue.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recharts Bar Chart - Annual Cost Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-heading text-xl font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Annual Cost Breakdown
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costBreakdownData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="term" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '6px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Tuition" stackId="costs" fill="#1E3A8A" name="Tuition" />
                  <Bar dataKey="Housing" stackId="costs" fill="#38BDF8" name="Housing" />
                  <Bar dataKey="Fees" stackId="costs" fill="#F59E0B" name="Fees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-heading text-xl font-bold text-text">Payment History</h3>
              <p className="text-xs text-muted">Past transaction receipts and statuses</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm" aria-label="Payment transaction history">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                    <th className="p-4 pl-6">Transaction Date</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-center">Amount Paid</th>
                    <th className="p-4 text-center pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paymentHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                      <td className="p-4 pl-6 text-muted font-medium">{item.date}</td>
                      <td className="p-4 font-semibold text-text">{item.term}</td>
                      <td className="p-4 text-center font-semibold text-primary">{item.amount}</td>
                      <td className="p-4 text-center pr-6">
                        <Badge label={item.status} color={item.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Financial Aid + Spring 2026 Estimated Bill (1/3 width) */}
        <div className="space-y-6">
          
          {/* Financial Aid Awards */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Financial Aid Awards
            </h3>
            
            <div className="space-y-4">
              {financialAidAwards.map((item) => (
                <div key={item.award} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <h4 className="font-bold text-sm text-text leading-snug">{item.award}</h4>
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-xs font-semibold text-primary">{item.amount}</span>
                    <span className="text-xs font-medium text-muted">{item.criteria}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spring 2026 Estimated Bill */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm opacity-80 select-none relative overflow-hidden">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Spring 2026 Estimated Bill
            </h3>
            
            <div className="space-y-2 text-sm text-text">
              {estimatedSpringBill.map((item) => {
                const isAid = item.amount < 0;
                return (
                  <div key={item.item} className="flex justify-between items-center py-1.5 border-b border-gray-100/50">
                    <span className="text-muted">{item.item}</span>
                    <span className={`font-semibold ${isAid ? 'text-green-700' : 'text-text'}`}>
                      {isAid ? '-' : ''}${Math.abs(item.amount).toLocaleString()}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-3 font-bold border-t border-gray-200">
                <span>Estimated Net Due</span>
                <span className="text-primary">$10,100</span>
              </div>
            </div>

            {/* Overlay warning/info */}
            <div className="mt-5 p-3.5 bg-gray-100 border border-gray-200 rounded text-center">
              <p className="text-xs font-semibold text-muted leading-normal">
                Register for Spring 2026 to confirm your enrollment and finalize your billing statement.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FinancialsPage;

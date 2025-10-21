import React, { useMemo, useState, useContext } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import PlatformHeader from './PlatformHeader';
import { RiskRegisterItem, TrustPassport } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DocumentTextIcon, DownloadIcon, ShieldCheckIcon, ExclamationCircleIcon, CheckCircleIcon } from './Icon';
import { exportBoardSummaryPdf } from '../services/deliverableService';
import { AuditLogContext } from '../context/AuditLogContext';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const Reports: React.FC = () => {
    const { passports, loading, error } = usePortfolio();
    const { logAction } = useContext(AuditLogContext);
    const [exporting, setExporting] = useState(false);

    const reportData = useMemo(() => {
        if (!passports) return null;

        const totalModels = passports.length;
        const statusCounts = passports.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<TrustPassport['status'], number>);

        const riskCounts = passports.flatMap(p => p.risk_register || []).reduce((acc, risk) => {
            acc[risk.severity] = (acc[risk.severity] || 0) + 1;
            return acc;
        }, {} as Record<RiskRegisterItem['severity'], number>);

        const ninetyDaysFromNow = new Date();
        ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
        const expiringSoon = passports.filter(p => new Date(p.expiration) <= ninetyDaysFromNow).sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime());

        return {
            totalModels,
            statusCounts,
            riskCounts,
            expiringSoon
        };
    }, [passports]);

    const handleExport = async () => {
        if (!passports || exporting) return;
        try {
            setExporting(true);
            await exportBoardSummaryPdf(passports);
            logAction('Board Summary Exported', `Models included: ${passports.length}`);
        } catch (err) {
            console.error(err);
            logAction('Board Summary Export Failed', 'Unable to generate board-ready packet.');
            alert('Unable to export the summary at this time.');
        } finally {
            setExporting(false);
        }
    };

    if (loading) {
        return <div>Loading report data...</div>;
    }

    if (error || !reportData) {
        return <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error || "Could not generate report data."}</div>;
    }

    const { totalModels, statusCounts, riskCounts, expiringSoon } = reportData;

    const pieData = [
        { name: 'Verified', value: statusCounts.verified || 0 },
        { name: 'Under Review', value: statusCounts['under-review'] || 0 },
        { name: 'Expired', value: statusCounts.expired || 0 },
        { name: 'Draft', value: statusCounts.draft || 0 },
    ];
    const PIE_COLORS = ['#16a34a', '#f59e0b', '#dc2626', '#64748b'];
    
    const barData = [
        { name: 'Low', count: riskCounts.low || 0 },
        { name: 'Medium', count: riskCounts.medium || 0 },
        { name: 'High', count: riskCounts.high || 0 },
        { name: 'Critical', count: riskCounts.critical || 0 },
    ];


    return (
        <div>
            <div className="flex justify-between items-center">
                <PlatformHeader title="Board-Ready Reporting" description="An executive overview of your AI portfolio's compliance and risk posture." />
                <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:cursor-not-allowed"
                >
                   <DownloadIcon className="h-5 w-5" />
                   {exporting ? 'Generating…' : 'Export Summary (PDF)'}
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Models" value={totalModels} icon={<DocumentTextIcon className="h-6 w-6 text-blue-600" />} />
                <StatCard title="Verified" value={statusCounts.verified || 0} icon={<CheckCircleIcon className="h-6 w-6 text-blue-600" />} />
                <StatCard title="Under Review" value={statusCounts['under-review'] || 0} icon={<ExclamationCircleIcon className="h-6 w-6 text-blue-600" />} />
                <StatCard title="Expired" value={statusCounts.expired || 0} icon={<ShieldCheckIcon className="h-6 w-6 text-blue-600" />} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Status Distribution</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Severity Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Passport Expirations (Next 90 Days)</h3>
                 {expiringSoon.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                             <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Organization</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiration Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {expiringSoon.map(passport => (
                                    <tr key={passport.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{passport.subject.product}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{passport.subject.org}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{new Date(passport.expiration).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-slate-500 py-8">No passports are expiring in the next 90 days.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;

import React from 'react';
import { Verification, VerificationMetrics } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface VerificationDetailsProps {
    verification?: Verification;
}

const MetricCard: React.FC<{ title: string; value: string | number; unit: string; description: string }> = ({ title, value, unit, description }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">
            {value}<span className="text-lg font-medium text-slate-400 ml-1">{unit}</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">{description}</p>
    </div>
);

const VerificationDetails: React.FC<VerificationDetailsProps> = ({ verification }) => {
    if (!verification || !verification.runs.length) {
        return <div className="text-center text-slate-500">No verification data available.</div>;
    }
    
    const run = verification.runs[0]; // Assuming one run for simplicity
    const metrics = run.metrics;

    const radarData = [
        { subject: 'Reliability', A: metrics.reliability_score, fullMark: 100 },
        { subject: 'Resilience', A: metrics.prompt_injection_resilience, fullMark: 100 },
        { subject: 'Low Hallucination', A: 100 - (metrics.hallucination_rate * 10), fullMark: 100 }, // Inverting for visual good
        { subject: 'Low Bias', A: 100 - (metrics.bias_parity_gap * 100), fullMark: 100 },
        { subject: 'PHI Safety', A: 100 - (metrics.phi_leakage_rate * 100), fullMark: 100 },
    ];
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Verification Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <MetricCard title="Reliability Score" value={metrics.reliability_score} unit="%" description="Model accuracy on task-specific ground truth."/>
                <MetricCard title="Injection Resilience" value={metrics.prompt_injection_resilience} unit="%" description="Resistance to canned security attack prompts."/>
                <MetricCard title="Hallucination Rate" value={metrics.hallucination_rate} unit="%" description="Rate of deviation from provided ground truth."/>
                <MetricCard title="Bias Parity Gap" value={metrics.bias_parity_gap} unit="" description="Disparity in performance across protected classes."/>
                <MetricCard title="PHI Leakage Rate" value={metrics.phi_leakage_rate} unit="%" description="Rate of protected health information leakage."/>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4">Model Performance Profile</h3>
                 <p className="text-sm text-slate-500 mb-6">A holistic view of the model's performance across key trust and safety dimensions. Higher scores towards the edge are better.</p>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4">Verification Run Details</h3>
                 <div className="text-sm space-y-2">
                    <p><span className="font-semibold">Run ID:</span> {run.run_id}</p>
                    <p><span className="font-semibold">Started:</span> {new Date(run.started_at).toLocaleString()}</p>
                    <p><span className="font-semibold">Finished:</span> {new Date(run.finished_at).toLocaleString()}</p>
                    <p><span className="font-semibold">Frameworks Tested:</span> {verification.frameworks.join(', ')}</p>
                 </div>
            </div>
        </div>
    );
};

export default VerificationDetails;

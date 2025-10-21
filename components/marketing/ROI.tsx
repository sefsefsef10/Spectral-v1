import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from '../Icon';

const ROI: React.FC = () => {
    const [vendors, setVendors] = useState<number>(10);
    const [hours, setHours] = useState<number>(80);
    const loadedRate = 125; // Blended loaded rate for security/compliance/legal

    const savings = useMemo(() => {
        const manualCost = vendors * hours * loadedRate;
        const spectralHours = hours * 0.1; // 90% reduction
        const spectralCost = vendors * spectralHours * loadedRate;
        return {
            manualCost: manualCost.toLocaleString(),
            timeSaved: (vendors * (hours - spectralHours)).toLocaleString(),
            costSavings: (manualCost - spectralCost).toLocaleString()
        };
    }, [vendors, hours]);

    return (
        <section id="roi" className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6">
                <div className="bg-blue-600 rounded-2xl p-10 md:p-16 text-white grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">ROI Calculator</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold">Stop Wasting Time on Spreadsheets</h2>
                        <p className="mt-4 text-lg text-blue-100 opacity-90">
                           See how much your organization could save by switching from manual, spreadsheet-based vendor reviews to Spectral's automated Watchtower platform.
                        </p>
                        
                        <div className="mt-8 grid sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="vendors" className="block text-sm font-medium text-blue-100">AI Vendors Evaluated per Year</label>
                                <input
                                    type="range"
                                    id="vendors"
                                    min="1"
                                    max="100"
                                    value={vendors}
                                    onChange={(e) => setVendors(Number(e.target.value))}
                                    className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer mt-2"
                                />
                                 <div className="text-center font-bold text-2xl mt-1">{vendors}</div>
                            </div>
                             <div>
                                <label htmlFor="hours" className="block text-sm font-medium text-blue-100">Avg. Hours per Vendor Review</label>
                                <input
                                    type="range"
                                    id="hours"
                                    min="20"
                                    max="200"
                                    step="10"
                                    value={hours}
                                    onChange={(e) => setHours(Number(e.target.value))}
                                    className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer mt-2"
                                />
                                <div className="text-center font-bold text-2xl mt-1">{hours}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
                         <h3 className="text-xl font-bold text-center">Your Estimated Annual Savings</h3>
                         <div className="mt-6 space-y-4">
                            <div className="text-center">
                                <p className="text-blue-100">Hours Saved</p>
                                <p className="text-4xl font-extrabold">{savings.timeSaved}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-blue-100">Cost Savings</p>
                                <p className="text-4xl font-extrabold">${savings.costSavings}</p>
                            </div>
                             <p className="text-xs text-center text-blue-200 opacity-80 pt-4">
                                Based on a 90% reduction in review time and a blended loaded rate of ${loadedRate}/hour.
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROI;

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export type PieDonutDatum = {
    label: string;
    value: number;
    color?: string;
};

type Props = {
    data: PieDonutDatum[];
    height?: number;
};

const ShortTooltip: React.FC<{
    active?: boolean;
    payload?: Array<{ name?: string; value?: number; payload?: { percent?: string } }>;
}> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const d = payload[0];
        return (
            <div className="bg-white/90 text-gray-800 px-3 py-2 rounded shadow-lg">
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm">{d.value} ({d.payload?.percent}%)</div>
            </div>
        );
    }
    return null;
};

const PieDonut: React.FC<Props> = ({ data, height = 220 }) => {
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0);
    const compliant = data.find((d) => d.label === "Compliant")?.value || 0;
    const percent = total > 0 ? Math.round((compliant / total) * 100) : 0;

    // decorate data with percent for tooltip
    const chartData = data.map((d) => ({ ...d, percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : "0" }));

    return (
        <div className="relative w-full h-[260px] md:h-auto flex items-center justify-center">
            <div className="w-full h-full" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            innerRadius={68}
                            outerRadius={96}
                            paddingAngle={4}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.label} fill={entry.color || "#8884d8"} />
                            ))}
                        </Pie>
                        <Tooltip content={<ShortTooltip />} wrapperStyle={{ zIndex: 9999 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Center overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-3xl md:text-4xl font-semibold text-white">{percent}%</div>
                <div className="text-xs md:text-sm text-white/70">Compliant</div>
            </div>
        </div>
    );
};

export default PieDonut;

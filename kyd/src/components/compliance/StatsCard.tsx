interface StatsCardProps {
    label: string;
    value: number;
    total: number;
    color: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    subtitle: string;
}

const StatsCard: React.ComponentType<StatsCardProps> = ({
    label,
    value,
    total,
    color,
    icon: Icon,
    subtitle,
}) => {
    const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;

    return (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{label}</span>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-white/40 text-sm mb-1">/ {total}</span>
            </div>
            {subtitle && (
                <p className="text-xs text-white/50 mt-1">{subtitle}</p>
            )}
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color.replace("text-", "bg-")} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default StatsCard;

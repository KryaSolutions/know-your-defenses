interface InsightCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: string | number;
    description: string;
    color: string;
    className: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
    icon: Icon,
    title,
    value,
    description,
    color = "text-white",
    className,
}) => {
    const bgColor = color ? color.replace("text-", "bg-") + "/10" : "bg-white/5";

    return (
        <div className={`bg-white/5 rounded-lg p-4 border border-white/10 ${className}`}>
            <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    <Icon className={`w-5 h-5 ${color}`} aria-hidden />
                </div>
            </div>

            <h3 className="text-white/60 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white mb-2">{typeof (value) === "string" ? `${value}%` : value}</p>
            {description && <p className="text-xs text-white/50">{description}</p>}
        </div>
    );
};

export default InsightCard;

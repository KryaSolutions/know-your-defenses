import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeType {
    status: string;
}

const StatusBadge: React.ComponentType<StatusBadgeType> = ({ status }) => {
    type Config = {
        [status: string]: {
            color: string;
            bg: string;
            icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        };
    };

    const config: Config = {
        Compliant: {
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            icon: CheckCircle,
        },
        "Partial Gap": {
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            icon: AlertCircle,
        },
        "Non-Compliant": {
            color: "text-red-400",
            bg: "bg-red-400/10",
            icon: XCircle,
        },
        "In-Progress": {
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            icon: Clock,
        },
        "Not Assessed": {
            color: "text-gray-400",
            bg: "bg-gray-400/10",
            icon: AlertCircle,
        },
    };

    const { color, bg, icon: Icon } = config[status] || config["Not Assessed"];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${color} ${bg}`}
        >
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
};

export default StatusBadge;

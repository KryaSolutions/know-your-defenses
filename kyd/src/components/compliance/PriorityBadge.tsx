interface PriorityBadgeType {
    priority: string;
}

const PriorityBadge: React.FC<PriorityBadgeType> = ({ priority }) => {
    type Colors = {
        [color: string]: string;
    };

    const colors: Colors = {
        Critical: "text-red-400 bg-red-400/10 border-red-400/20",
        High: "text-orange-400 bg-orange-400/10 border-orange-400/20",
        Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        Low: "text-green-400 bg-green-400/10 border-green-400/20",
    };

    return (
        <span
            className={`px-2 py-1 rounded border text-xs font-medium ${colors[priority]}`}
        >
            {priority}
        </span>
    );
};

export default PriorityBadge;

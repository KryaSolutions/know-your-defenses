import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropDownType {
    label: string;
    value: string;
    options: string[];
    onChange: (newChange: string) => void;
    icon: React.ComponentType<{ className: string }>;
}

const FilterDropdown: React.FC<FilterDropDownType> = ({ label, value, options, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/90 min-w-[140px] justify-between"
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-white/60" />}
                    <span className="text-white/60">{label}:</span>
                    <span className="font-medium">{value}</span>
                </div>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 left-0 bg-[#1a4270] border border-white/10 rounded-lg shadow-xl z-20 min-w-[200px] max-h-[300px] overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${value === option
                                    ? "bg-white/5 text-white font-medium"
                                    : "text-white/80"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterDropdown;

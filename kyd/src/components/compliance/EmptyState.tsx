import { Plus, Target } from "lucide-react";

type EmptyStateType = {
    onAddControl: () => void;
};

const EmptyState: React.FC<EmptyStateType> = ({ onAddControl }) => {
    return (
        <div className="bg-white/5 rounded-lg border border-white/10 p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                    No Controls Added Yet
                </h3>
                <p className="text-white/60 mb-6">
                    Start building your compliance framework by adding your
                    first control. Track compliance status, priorities, and risk
                    levels across multiple frameworks.
                </p>
                <button
                    onClick={onAddControl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Your First Control
                </button>
            </div>
        </div>
    );
};

export default EmptyState;

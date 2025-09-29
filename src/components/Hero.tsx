import React, { useState, createContext } from "react";
import Survey from "./Survey";
import Results from "./Results";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, TrendingUp, Users, ArrowRight } from "lucide-react";

export type ResponseContextType = {
    response: responseType;
    setResponse: React.Dispatch<React.SetStateAction<responseType>>;
};
export type responseType = {
    [title: string]: {
        [category: string]: {
            [questionIndex: number]: string;
            score: number;
        };
    };
};

export const ResponseContext = createContext<ResponseContextType | null>(null);

const Hero = () => {
    const [response, setResponse] = useState<responseType>({});
    const [open, setOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [form, setForm] = useState({
        name: "",
        org: "",
        email: "",
    });

    const isValid = form.name && form.org && /\S+@\S+\.\S+/.test(form.email);

    const handleSubmit = () => {
        if (!isValid) return;
        setShowResults(true);
        setOpen(false);
    };

    return (
        <div id="hero-section" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 border border-blue-300 rounded-full"></div>
                <div className="absolute top-40 right-20 w-48 h-48 border border-cyan-300 rounded-full"></div>
                <div className="absolute bottom-40 left-1/4 w-80 h-80 border border-purple-300 rounded-full"></div>
                <div className="absolute bottom-20 right-1/3 w-32 h-32 border border-green-300 rounded-full"></div>
            </div>

            {/* Floating Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative max-w-5xl mx-auto px-6 py-12">
                <ResponseContext.Provider value={{ response, setResponse }}>
                    {/* Main Content Container */}
                    <div className="bg-white/60 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-600/5 to-cyan-600/5 p-8 border-b border-blue-100/50">
                            <div className="flex items-center justify-center space-x-4 mb-6">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                                    {!showResults ? "Security Assessment" : "Your Security Report"}
                                </h2>
                            </div>

                            {!showResults && (
                                <div className="flex justify-center space-x-8 text-sm">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Comprehensive Analysis</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <TrendingUp className="w-4 h-4 text-blue-500" />
                                        <span>Actionable Insights</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span>Expert Recommendations</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Assessment/Results Content */}
                        <div className="p-8">
                            {!showResults ? <Survey /> : <Results />}
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 p-8 border-t border-blue-100/50">
                            <div className="flex justify-center">
                                {!showResults ? (
                                    <Button
                                        onClick={() => setOpen(true)}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center space-x-3"
                                    >
                                        <span>Get My Results</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowResults(false)}
                                        className="border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        Return to Assessment
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="w-full max-w-sm p-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-gray-900">
                                    Generate Your Report
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                <Input
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="h-10"
                                />

                                <Input
                                    placeholder="Organization"
                                    value={form.org}
                                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                                    className="h-10"
                                />

                                <Input
                                    placeholder="Work Email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="h-10"
                                />

                                <Button
                                    className="w-full"
                                    onClick={handleSubmit}
                                    disabled={!isValid}
                                >
                                    Continue
                                </Button>

                                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-2">
                                    <Shield className="w-3 h-3" />
                                    <span>Your information is secure with us</span>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </ResponseContext.Provider>
            </div>
        </div>
    );
};

export default Hero;

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
        setOpen(false); // close the dialog
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 space-y-8">
            <ResponseContext.Provider value={{ response, setResponse }}>
                {/* Toggle between Survey and Results */}
                {!showResults ? <Survey /> : <Results />}

                {/* Buttons below the assessment/results */}
                <div className="space-x-4">
                    {!showResults && (
                        <Button onClick={() => setOpen(true)}>Fetch Results</Button>
                    )}

                    {showResults && (
                        <Button
                            variant="default"
                            onClick={() => setShowResults(false)}
                        >
                            Return to Assessments
                        </Button>
                    )}
                </div>

                {/* Form Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="w-full max-w-md">
                        <DialogHeader>
                            <DialogTitle>Enter Your Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3">
                            <Input
                                placeholder="Full Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Organization"
                                value={form.org}
                                onChange={(e) =>
                                    setForm({ ...form, org: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Work Email"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <Button
                                className="w-full"
                                onClick={handleSubmit}
                                disabled={!isValid}
                            >
                                Continue
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </ResponseContext.Provider>
        </div>
    );
};

export default Hero;

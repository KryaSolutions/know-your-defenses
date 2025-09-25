import React, { useState, createContext } from "react";
import Hero from "./Hero";
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

const App = () => {
    const [response, setResponse] = useState<responseType>({});
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"form" | "results">("form");
    const [form, setForm] = useState({
        name: "",
        org: "",
        email: "",
    });

    const isValid = form.name && form.org && /\S+@\S+\.\S+/.test(form.email);

    const handleSubmit = () => {
        if (!isValid) return;
        setStep("results");
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <ResponseContext.Provider value={{ response, setResponse }}>
                <Hero />

                {/* Fetch Results Button */}
                <div className="p-4 flex justify-center">
                    <Button onClick={() => setOpen(true)}>Fetch Results</Button>
                </div>

                {/* Popup */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                        className="w-full max-w-6xl h-[90vh] p-8"
                    >
                        <DialogHeader>
                            <DialogTitle>
                                {step === "form" ? "Enter Your Details" : "Your Results"}
                            </DialogTitle>
                        </DialogHeader>

                        {step === "form" ? (
                            <div className="space-y-3">
                                <Input
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Organization"
                                    value={form.org}
                                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                                />
                                <Input
                                    placeholder="Work Email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                <Button className="w-full" onClick={handleSubmit} disabled={!isValid}>
                                    Continue
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full overflow-auto">
                                <Results />
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </ResponseContext.Provider>
        </div>
    );
};

export default App;

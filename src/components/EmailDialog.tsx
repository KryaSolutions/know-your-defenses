import React, { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { ResponseContext } from "@/components/Hero";
import type { ResponseContextType } from "@/components/Hero";
import run from "@/utilities/mistral";

const personalEmailDomains: string[] = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "protonmail.com",
    "yandex.com",
    "mail.com",
    "zoho.com",
    "rediffmail.com",
    "live.com",
    "msn.com",
    "yahoo.co.uk",
    "yahoo.ca",
    "yahoo.in",
    "googlemail.com",
    "hotmail.co.uk",
    "hotmail.fr",
    "outlook.co.uk",
];

const isValidOrganizationalEmail = (email: string) => {
    const basicEmailRegex = /\S+@\S+\.\S+/;
    if (!basicEmailRegex.test(email)) return false;
    const domain = email.split("@")[1]?.toLowerCase();
    return domain ? !personalEmailDomains.includes(domain) : false;
};

const getEmailValidationMessage = (email: string) => {
    if (!email) return "";
    if (!/\S+@\S+\.\S+/.test(email))
        return "Please enter a valid email address";
    const domain = email.split("@")[1]?.toLowerCase();
    if (personalEmailDomains.includes(domain))
        return "Please use your work email address";
    return "";
};

type ReportDialogProps = {
    onSubmit: (form: { name: string; org: string; email: string }) => void;
    triggerButtonText?: string;
    title?: string;
    variant?: "default" | "outline";
};

const EmailDialog: React.FC<ReportDialogProps> = ({
    onSubmit,
    triggerButtonText = "Get My Results",
    title = "Generate Your Report",
    variant = "default",
}) => {
    const context = useContext<ResponseContextType | null>(ResponseContext);
    if (!context) return null;
    const { response } = context;

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", org: "", email: "" });
    const [emailError, setEmailError] = useState("");

    const isValid =
        form.name && form.org && isValidOrganizationalEmail(form.email);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setForm({ ...form, email });
        setEmailError(getEmailValidationMessage(email));
    };

    async function appendCustomer() {

        const summary = (await run(response)) ?? "No summary available";

        axios({
            method: "POST",
            url: "https://api.baserow.io/api/database/rows/table/690134/?user_field_names=true",
            headers: {
                Authorization: "Token sLB1RDWLQ6ABUP005wEGArDnVEq21p9K",
                "Content-Type": "application/json",
            },
            data: {
                Name: form.name,
                Organization: form.org,
                Email: form.email,
                "Stat Summary": summary,
            },
        });
    }

    const handleSubmit = async () => {
        if (!isValid) return;
        await appendCustomer();
        onSubmit(form);
        setOpen(false);
    };

    return (
        <>
            <Button
                className={
                    variant === "default"
                        ? "bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-3"
                        : "border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold flex items-center space-x-3"
                }
                onClick={() => setOpen(true)}
            >
                <span>{triggerButtonText}</span>
                <ArrowRight className="w-5 h-5" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-full max-w-sm p-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                            {title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="h-10"
                        />

                        <Input
                            placeholder="Organization"
                            value={form.org}
                            onChange={(e) =>
                                setForm({ ...form, org: e.target.value })
                            }
                            className="h-10"
                        />

                        <div>
                            <Input
                                placeholder="Work Email"
                                type="email"
                                value={form.email}
                                onChange={handleEmailChange}
                                className={`h-10 ${emailError ? "border-red-500" : ""}`}
                            />
                            {emailError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {emailError}
                                </p>
                            )}
                        </div>

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
        </>
    );
};

export default EmailDialog;

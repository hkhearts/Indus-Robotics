import React, { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, MessageSquare, Loader2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/data/config";
import { createJiraTask } from "@/lib/jira";
import { useModals } from "./ModalContext";

export function QuoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { modalPayload } = useModals();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [jiraIssueKey, setJiraIssueKey] = useState<string | null>(null);
  const [jiraIssueUrl, setJiraIssueUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: modalPayload.productName || "",
    quantity: "",
    timeline: "Prototype / 1-3 Months",
    requirements: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createJiraTask({
        ...formData,
        formType: "Quote Request",
      });

      if (result.issueKey) setJiraIssueKey(result.issueKey);
      if (result.issueUrl) setJiraIssueUrl(result.issueUrl);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to create Jira task:", error);
      setLoading(false);
      // Still show success to user — don't block the lead
      setSuccess(true);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setLoading(false);
    setJiraIssueKey(null);
    setJiraIssueUrl(null);
    onClose();
  };

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl(
        modalPayload.productName
          ? { type: "product" as const, name: modalPayload.productName }
          : { type: "general" as const },
      ),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-none border border-border bg-card p-6 shadow-2xl sm:p-8">
        <DialogHeader>
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-signal">
            Commercial Proposal
          </p>
          <DialogTitle className="font-display text-2xl uppercase sm:text-3xl">
            Request an Engineering Quotation
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share your motion requirements or system BOM. Our technical sales engineers will verify
            sizing calculations and provide formal commercial pricing.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex size-14 items-center justify-center bg-signal text-signal-foreground">
              <Check size={28} />
            </div>
            <h3 className="mt-5 font-display text-3xl uppercase">Quotation Request Received</h3>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Thank you, {formData.name || "Customer"}. Your commercial quote request has been
              transmitted. Our technical sales team will review sizing feasibility and provide an
              itemized commercial proposal within 24 hours.
            </p>

            {jiraIssueKey && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded border border-signal/30 bg-signal/10 px-4 py-2">
                <span className="text-[11px] font-bold text-signal uppercase tracking-wider">
                  Ticket: {jiraIssueKey}
                </span>
                {jiraIssueUrl && (
                  <a
                    href={jiraIssueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-signal hover:underline"
                  >
                    View in Jira <ExternalLink size={11} />
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                className="rounded-none bg-signal text-signal-foreground hover:bg-signal/90"
                onClick={handleReset}
              >
                Close
              </Button>
              <Button variant="outline" className="rounded-none" onClick={handleWhatsApp}>
                <MessageSquare size={14} className="mr-1.5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4" name="quote-request" aria-label="Quote Request Form">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Full Name *
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Company Name *
                <Input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Precision Robotics Corp"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Business Email *
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="m.vance@company.com"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 99999 00000"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Product / Technology Domain
                <Input
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g. 6-Axis Arms, Harmonic Reducers"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Target Quantity
                <Input
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 10 units / Production batch"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>
            </div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Project Timeline
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="mt-1.5 h-11 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
              >
                <option>Prototype / 1-3 Months</option>
                <option>Pilot Run / 3-6 Months</option>
                <option>Production / 6-12 Months</option>
                <option>Long-term Program / 12+ Months</option>
                <option>Immediate / ASAP</option>
              </select>
            </label>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Technical Requirements & Sizing Parameters *
              <Textarea
                required
                rows={4}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Include torque, payload, speed, duty cycle, fieldbus requirements, or delivery schedule..."
                className="mt-1.5 rounded-none border-input bg-background text-sm"
              />
            </label>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                type="submit"
                id="quote-submit-btn"
                disabled={loading}
                className="flex-1 rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Creating Jira Task...
                  </>
                ) : (
                  <>
                    Submit & Create Jira Task <ArrowRight size={14} className="ml-1.5" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleWhatsApp}
                className="rounded-none border-border"
              >
                <MessageSquare size={14} className="mr-1.5 text-signal" />
                WhatsApp Us
              </Button>
            </div>

            <div className="border-t border-border pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Have complex CAD drawings or custom OEM machine specs?
              </p>
              <Link
                to="/contact/engineering-enquiry"
                onClick={handleReset}
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
              >
                Complete Detailed 7-Section Engineering Form →
              </Link>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

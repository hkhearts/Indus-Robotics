import React, { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, MessageSquare, Loader2 } from "lucide-react";
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

export function QuickEnquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { modalPayload } = useModals();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    application: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJiraTask({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        product: modalPayload.productName || formData.application || "General Enquiry",
        quantity: formData.quantity,
        timeline: "",
        requirements: formData.message,
        formType: "Quick Enquiry",
      });
    } catch (err) {
      console.error("Quick enquiry Jira error:", err);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };


  const handleReset = () => {
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const productContext = modalPayload.productName;

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl(
        productContext
          ? { type: "product" as const, name: productContext }
          : { type: "general" as const },
      ),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto rounded-none border border-border bg-card p-6 shadow-2xl">
        <DialogHeader>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-signal">
            Quick Contact
          </p>
          <DialogTitle className="font-display text-2xl uppercase sm:text-3xl">
            {productContext ? `Enquire About ${productContext}` : "Quick Engineering Enquiry"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {productContext
              ? `Submit an expedited inquiry for ${productContext}. Our application team will review specifications and respond promptly.`
              : "Share your automation requirement and our team will get in touch with you."}
          </DialogDescription>
        </DialogHeader>

        {productContext && (
          <div className="border border-signal/30 bg-surface-elevated/40 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
              Product Context
            </span>
            <p className="font-display text-base uppercase text-foreground">{productContext}</p>
          </div>
        )}

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center bg-signal text-signal-foreground">
              <Check size={24} />
            </div>
            <h3 className="mt-4 font-display text-2xl uppercase">Enquiry Received</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Thank you{formData.name ? `, ${formData.name}` : ""}. Your enquiry has been received.
              Our application engineering team will review your specifications and contact you
              shortly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                className="rounded-none bg-signal text-signal-foreground hover:bg-signal/90"
                onClick={handleReset}
              >
                Close
              </Button>
              <Button variant="outline" className="rounded-none" onClick={handleWhatsApp}>
                <MessageSquare size={14} className="mr-1.5" />
                Continue on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Full Name *
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Company Name *
                <Input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Automation Dynamics LLC"
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
                  placeholder="name@company.com"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Estimated Quantity
                <Input
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. Prototype / 5-10 units"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>

              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Application Industry
                <Input
                  value={formData.application}
                  onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                  placeholder="e.g. Automotive, Electronics"
                  className="mt-1.5 h-11 rounded-none border-input bg-background text-sm"
                />
              </label>
            </div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Technical Requirement / Message *
              <Textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your load, speed, duty cycle, or machine integration requirements..."
                className="mt-1.5 rounded-none border-input bg-background text-sm"
              />
            </label>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry <ArrowRight size={14} className="ml-1.5" />
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
                WhatsApp Instead
              </Button>
            </div>

            <div className="border-t border-border pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Need to provide more technical specifications?
              </p>
              <Link
                to="/contact/engineering-enquiry"
                onClick={handleReset}
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
              >
                Open Full Engineering Form →
              </Link>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

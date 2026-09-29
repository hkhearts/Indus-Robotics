import React, { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Upload, ArrowRight, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJiraTask } from "@/lib/jira";

export function EngineeringEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unknownSpecs, setUnknownSpecs] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Section 1: Contact Details
    fullName: "",
    company: "",
    businessEmail: "",
    phoneNumber: "",
    jobRole: "Engineer",

    // Section 2: Project Details
    industry: "Automotive",
    applicationDescription: "",
    projectStage: "Concept",

    // Section 3: Product Requirement
    productCategory: "Robotic Arm",
    quantity: "",
    deployment: "Production Line",

    // Section 4: Technical Requirements
    payload: "",
    torque: "",
    speed: "",
    accuracy: "",
    reach: "",
    stroke: "",
    environment: "",
    dutyCycle: "",
    voltage: "",
    fieldbus: "",

    // Section 6: Additional Information
    notes: "",

    // Section 7: Preferred Contact
    preferredContact: "Email",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createJiraTask({
        name: formData.fullName,
        company: formData.company,
        email: formData.businessEmail,
        phone: formData.phoneNumber,
        product: formData.productCategory,
        quantity: formData.quantity,
        timeline: formData.projectStage || "",
        requirements: `
Project Stage: ${formData.projectStage}
Industry: ${formData.industry}
Application: ${formData.applicationDescription}

Technical Specs:
Payload: ${formData.payload}
Torque: ${formData.torque}
Speed: ${formData.speed}
Accuracy: ${formData.accuracy}
Reach: ${formData.reach}
Stroke: ${formData.stroke}
Environment: ${formData.environment}
Duty Cycle: ${formData.dutyCycle}
Voltage: ${formData.voltage}
Fieldbus: ${formData.fieldbus}

Notes:
${formData.notes}
          `.trim(),
        formType: "Engineering Enquiry",
      });
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0]?.name ?? "");
    }
  };

  if (success) {
    return (
      <div className="border border-border bg-card p-8 text-center sm:p-14 animate-in fade-in duration-200">
        <div className="mx-auto flex size-16 items-center justify-center bg-signal text-signal-foreground">
          <Check size={36} />
        </div>
        <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
          Thank You
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Your engineering enquiry has been received. Our application engineering team will review
          your specifications, dynamic parameters, and application requirements, and contact you
          using your preferred method (
          <span className="font-semibold text-foreground">{formData.preferredContact}</span>).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            className="h-12 rounded-none bg-signal px-8 font-bold uppercase text-signal-foreground hover:bg-signal/90"
          >
            <Link to="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-none border-border px-8 font-bold uppercase"
          >
            <Link to="/products">Continue Exploring Products →</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* SECTION 1: CONTACT DETAILS */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 01 · Contact Details
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Full Name *
            <Input
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. John Henderson"
              className="mt-2 h-12 rounded-none border-input bg-background text-sm"
            />
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Company Name *
            <Input
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Advanced Automation Technologies Ltd"
              className="mt-2 h-12 rounded-none border-input bg-background text-sm"
            />
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Business Email *
            <Input
              type="email"
              required
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              placeholder="j.henderson@automation.com"
              className="mt-2 h-12 rounded-none border-input bg-background text-sm"
            />
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Phone Number *
            <Input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+1 (555) 234-5678"
              className="mt-2 h-12 rounded-none border-input bg-background text-sm"
            />
          </label>

          <label className="sm:col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Job Role
            <select
              value={formData.jobRole}
              onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
              className="mt-2 flex h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
            >
              <option>Engineer</option>
              <option>Procurement</option>
              <option>Project Manager</option>
              <option>System Integrator</option>
              <option>OEM Machine Builder</option>
              <option>R&D Specialist</option>
              <option>Plant Operations / Maintenance</option>
              <option>Other</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* SECTION 2: PROJECT DETAILS */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 02 · Project Details
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Industry *
            <select
              required
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="mt-2 flex h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
            >
              <option>Automotive</option>
              <option>Electronics</option>
              <option>Manufacturing</option>
              <option>Warehousing</option>
              <option>Logistics</option>
              <option>Food & Packaging</option>
              <option>Pharmaceuticals</option>
              <option>Welding & Fabrication</option>
              <option>Other</option>
            </select>
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Project Stage
            <select
              value={formData.projectStage}
              onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
              className="mt-2 flex h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
            >
              <option>Research</option>
              <option>Concept</option>
              <option>Prototype</option>
              <option>Development</option>
              <option>Production</option>
              <option>Existing System Upgrade</option>
            </select>
          </label>

          <label className="sm:col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Application Description *
            <Textarea
              required
              rows={4}
              value={formData.applicationDescription}
              onChange={(e) => setFormData({ ...formData, applicationDescription: e.target.value })}
              placeholder="Describe what you are trying to automate. Detail the work process, part handling, target cycle time, and mechanical obstacles..."
              className="mt-2 rounded-none border-input bg-background text-sm"
            />
          </label>
        </div>
      </fieldset>

      {/* SECTION 3: PRODUCT REQUIREMENT */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 03 · Product Requirement
        </legend>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Product Category
            <select
              value={formData.productCategory}
              onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
              className="mt-2 flex h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
            >
              <option>Actuator</option>
              <option>Precision Reducer</option>
              <option>Robotic Wheel / Drive Module</option>
              <option>Robotic Arm</option>
              <option>Industrial Robot</option>
              <option>Control System</option>
              <option>Custom Robotics</option>
              <option>Not Sure</option>
            </select>
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Required Quantity
            <Input
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="e.g. 1 (Prototype) / 20 / Annual 100+"
              className="mt-2 h-12 rounded-none border-input bg-background text-sm"
            />
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Expected Deployment
            <select
              value={formData.deployment}
              onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
              className="mt-2 flex h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:border-signal"
            >
              <option>Single Machine</option>
              <option>Pilot Testing</option>
              <option>Production Line</option>
              <option>Multiple Sites</option>
              <option>Not Yet Decided</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* SECTION 4: TECHNICAL REQUIREMENTS */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
            Section 04 · Technical Requirements (Optional)
          </legend>

          <label className="flex items-center gap-2 text-xs font-bold uppercase text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={unknownSpecs}
              onChange={(e) => setUnknownSpecs(e.target.checked)}
              className="size-4 rounded-none accent-signal"
            />
            <span>I don't know the technical specifications</span>
          </label>
        </div>

        {unknownSpecs ? (
          <div className="mt-5 flex items-start gap-3 border border-signal/40 bg-surface-elevated/40 p-5">
            <Info size={20} className="shrink-0 text-signal mt-0.5" />
            <div>
              <p className="font-display text-base uppercase text-foreground">No problem.</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Describe your application in Section 02, and our application engineering team will
                calculate your dynamic inertia, required torque ratings, and recommended drivetrain
                envelope.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Payload (kg)
              <Input
                value={formData.payload}
                onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                placeholder="e.g. 15 kg"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Torque (Nm)
              <Input
                value={formData.torque}
                onChange={(e) => setFormData({ ...formData, torque: e.target.value })}
                placeholder="e.g. 120 Nm"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Speed / Velocity
              <Input
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                placeholder="e.g. 2.0 m/s or 180°/s"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Accuracy / Repeatability
              <Input
                value={formData.accuracy}
                onChange={(e) => setFormData({ ...formData, accuracy: e.target.value })}
                placeholder="e.g. ±0.03 mm"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Reach / Radius (mm)
              <Input
                value={formData.reach}
                onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                placeholder="e.g. 1200 mm"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Stroke (mm)
              <Input
                value={formData.stroke}
                onChange={(e) => setFormData({ ...formData, stroke: e.target.value })}
                placeholder="e.g. 500 mm"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Operating Environment
              <Input
                value={formData.environment}
                onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                placeholder="e.g. Cleanroom, Washdown, Dusty"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Duty Cycle (%)
              <Input
                value={formData.dutyCycle}
                onChange={(e) => setFormData({ ...formData, dutyCycle: e.target.value })}
                placeholder="e.g. Continuous 80%"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Bus Voltage (V)
              <Input
                value={formData.voltage}
                onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                placeholder="e.g. 24V / 48V / 400V"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Fieldbus Protocol
              <Input
                value={formData.fieldbus}
                onChange={(e) => setFormData({ ...formData, fieldbus: e.target.value })}
                placeholder="e.g. EtherCAT, PROFINET"
                className="mt-2 h-11 rounded-none border-input bg-background text-sm"
              />
            </label>
          </div>
        )}
      </fieldset>

      {/* SECTION 5: DOCUMENT UPLOAD */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 05 · Reference Documentation (Optional)
        </legend>
        <p className="text-xs text-muted-foreground">
          Upload drawings, specifications, CAD snapshots, datasheets, BOMs, or application documents
          (Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, DWG).
        </p>

        <div className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-border/80 bg-background/50 p-6 text-center transition-colors hover:border-signal">
          <Upload size={24} className="text-signal" />
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-foreground">
            {selectedFileName
              ? `Selected: ${selectedFileName}`
              : "Click to select or drag and drop reference files"}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">Maximum file size: 25MB</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.dwg"
            onChange={handleFileChange}
            className="mt-3 text-xs file:mr-3 file:border-0 file:bg-surface-elevated file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:text-foreground cursor-pointer"
          />
        </div>
      </fieldset>

      {/* SECTION 6: REQUIREMENT DESCRIPTION */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 06 · Requirement Description
        </legend>

        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Tell us anything else our engineering team should know.
          <Textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Special certifications needed, delivery deadlines, physical envelope restrictions, or prior vendor pain points..."
            className="mt-2 rounded-none border-input bg-background text-sm"
          />
        </label>
      </fieldset>

      {/* SECTION 7: PREFERRED CONTACT */}
      <fieldset className="border border-border bg-card p-6 sm:p-8">
        <legend className="px-3 font-display text-lg uppercase tracking-wider text-signal">
          Section 07 · Preferred Contact Method
        </legend>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Email", "Phone", "WhatsApp"].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${
                formData.preferredContact === method
                  ? "border-signal bg-signal/5 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-border/80"
              }`}
            >
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={formData.preferredContact === method}
                onChange={() => setFormData({ ...formData, preferredContact: method })}
                className="size-4 accent-signal"
              />
              <span className="font-display text-base uppercase font-bold text-foreground">
                {method}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* SUBMISSION BUTTON */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-none bg-signal font-display text-lg font-bold uppercase tracking-wider text-signal-foreground shadow-lg hover:bg-signal/90"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" /> Submitting your requirement...
            </>
          ) : (
            <>
              Submit Engineering Enquiry <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

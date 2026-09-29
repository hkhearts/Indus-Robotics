import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  ShieldCheck,
  Wrench,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/about/engineering")({
  head: () => ({
    meta: [
      { title: "Engineering Approach & Core Architecture | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Explore the engineering philosophy and physical first-principles behind INDUS robotics: drivetrain dynamics, sub-micron feedback, zero-backlash gearing, and deterministic fieldbus control.",
      },
    ],
  }),
  component: EngineeringApproachPage,
});

export function EngineeringApproachPage() {
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Link
              to="/about"
              className="text-xs font-bold uppercase tracking-[.2em] text-signal hover:underline"
            >
              About
            </Link>
            <span className="text-surface-foreground/40">/</span>
            <span className="text-xs uppercase tracking-wider text-surface-foreground/60">
              Engineering Architecture
            </span>
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Physical Principles & Design Methodology
          </p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Engineering the Technologies Behind Automation
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            High-precision industrial robotics requires seamless physical harmony across mechanical
            stiffness, electromagnetic torque regulation, high-resolution optical feedback, and
            microsecond-level deterministic software execution.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
            >
              <Link to="/contact/engineering-enquiry">
                Submit Your Project Requirements <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("engineer")}
            >
              Consult an Application Engineer
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-5 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={14} className="mr-1.5 text-signal" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* 4 Technical Deep-Dive Pillars */}
      <section className="px-5 py-20 lg:px-10 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1360px] space-y-16">
          {/* Pillar 1 */}
          <div className="grid gap-10 lg:grid-cols-2 items-center border-b border-border pb-16">
            <div>
              <span className="font-display text-2xl text-signal font-bold">01</span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Drivetrain Inertia Matching & Dynamic Sizing
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                In multi-axis robotics, selecting an actuator based merely on static torque rating
                is a recipe for control instability. When an arm decelerates rapidly, reflected load
                inertia through the gear reduction ratio ($J_{load} / i^2$) must remain balanced
                against motor rotor inertia ($J_{motor}$).
              </p>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">
                Our sizing methodology calculates continuous Root-Mean-Square (RMS) torque across
                complete duty cycles, factoring in gravity vectors, centrifugal and Coriolis
                coupling forces, and emergency stop impact moments.
              </p>
            </div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-border pb-3">
                Key Sizing Parameters Verified
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> RMS Torque vs Continuous Thermal
                  Rating
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Peak Acceleration Torque vs
                  Demagnetization Limits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Load-to-Motor Inertia Ratio ($J_L
                  / J_M \le 10:1$)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Emergency Stop Shock Torque
                  ($500\%$ Momentary Reserve)
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="grid gap-10 lg:grid-cols-2 items-center border-b border-border pb-16">
            <div>
              <span className="font-display text-2xl text-signal font-bold">02</span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Zero-Backlash Gearing & Torsional Stiffness
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                Backlash introduces deadbands where the controller has zero control over output
                position, inducing hunting, vibration, and settling lag. In high-precision robotic
                wrists, we deploy strain wave (harmonic) gearing utilizing elastic tooth deformation
                to achieve true zero-backlash across the operating life.
              </p>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">
                For base and shoulder axes subject to heavy bending moments and high shock loads,
                our cycloidal reducers utilize rolling pin discs that distribute loads over 30% of
                teeth simultaneously, providing exceptional torsional stiffness.
              </p>
            </div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-border pb-3">
                Gearing Performance Benchmarks
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Harmonic Backlash: $\le 0.1$
                  arcmin (Zero Backlash)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Cycloidal Lost Motion: $\le 1.0$
                  arcmin
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Large Hollow Bore: Internal
                  Routing for Clean Envelopes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> High Tilting Moment Bearings
                  (Integrated Crossed Roller)
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="grid gap-10 lg:grid-cols-2 items-center border-b border-border pb-16">
            <div>
              <span className="font-display text-2xl text-signal font-bold">03</span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Deterministic Real-Time Control Loops
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                Commanding a multi-axis path without deterministic clock synchronization produces
                axis skew that manifests as dimensional errors in machined or welded parts. Our
                control architectures run on real-time fieldbuses (EtherCAT DC / PROFINET IRT) with
                sub-microsecond clock jitter.
              </p>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">
                Current loops close at 32 kHz using Field-Oriented Control (FOC), while velocity
                loops execute at 8 kHz and trajectory interpolation updates at 4 kHz, delivering
                smooth jerk-limited motion.
              </p>
            </div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-border pb-3">
                Closed-Loop Specifications
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Current Loop Bandwidth: 32 kHz
                  (SiC PWM Bridge)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Distributed Clock
                  Synchronization: $\le 100\text{ns}$ Jitter
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Optical Encoder Resolution:
                  26-bit (&gt;67M counts/rev)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Integrated STO (Safe Torque Off)
                  SIL 3 / PLe
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="font-display text-2xl text-signal font-bold">04</span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Quality Verification & Accelerated Life Testing
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                Industrial reliability cannot be assumed from computer models alone. Every prototype
                design undergoes accelerated life testing (ALT) under elevated thermal conditions,
                maximum tilting moment loads, and continuous reversing cycles.
              </p>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">
                All production units are 100% serialized and tested on dyno testbeds measuring
                efficiency, lost motion, backlash, acoustic sound emission, and thermal dissipation,
                with calibration certificates provided with shipments.
              </p>
            </div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-border pb-3">
                Quality Assurance Protocols
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> 100% Serialized Dyno Inspection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Sub-Arcminute Laser
                  Interferometry Verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> Ingress Protection Sealing
                  Verification (IP67 / IP69K)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal font-bold">•</span> EMC Electrical Noise & Surge
                  Immunity (EN 61000-6-2)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-surface-dark px-5 py-16 text-surface-foreground lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Ready to Review Your Automation Requirements?
            </h3>
            <p className="mt-2 text-xs text-surface-foreground/65 sm:text-sm">
              Our engineering team is ready to analyze your kinematic paths, duty cycles, and
              mechanical constraints.
            </p>
          </div>
          <Button
            asChild
            className="h-12 rounded-none bg-signal px-8 font-bold uppercase text-signal-foreground hover:bg-signal/90"
          >
            <Link to="/contact/engineering-enquiry">
              Complete Detailed Engineering Form <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

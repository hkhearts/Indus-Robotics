/**
 * #12 Predictive Maintenance Intelligence (returning customers)
 */
import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/ModalContext";
import { useIntelligence } from "./IntelligenceProvider";

interface Alert { productName: string; percentUsed: number; recommendedParts: string[]; urgency: string; hoursUntilMaintenance: number }

export function MaintenanceBanner() {
  const { visitor } = useIntelligence();
  const { openModal } = useModals();
  const [alerts, setAlerts] = useState<Alert[]>(() =>
    (visitor?.purchaseHistory?.products ?? []).slice(0, 2).map((p) => ({ productName: p.productName, percentUsed: 92, recommendedParts: ["Lubrication Kit", "Seal Kit"], urgency: "upcoming", hoursUntilMaintenance: 800 })),
  );

  useEffect(() => {
    if (!visitor?.recordId) return;
    fetch(`/api/predictive-maintenance?recordId=${encodeURIComponent(visitor.recordId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j?.alerts?.length) setAlerts(j.alerts.slice(0, 2)); })
      .catch(() => {});
  }, [visitor?.recordId]);

  if (!alerts.length) return null;
  const a = alerts[0];
  if (!a) return null;
  return (
    <div className="border-b border-amber-500/40 bg-amber-500/10 px-5 py-3">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 text-sm">
        <Wrench size={15} className="text-amber-500" />
        <p className="text-xs text-foreground">
          <strong>Maintenance due:</strong> Your {a.productName} is approaching its 10,000-hour interval ({Math.round(a.percentUsed)}% used). Order {a.recommendedParts.slice(0, 2).join(" + ")} now to avoid downtime.
        </p>
        <Button size="sm" className="ml-auto rounded-none bg-signal text-[11px] font-bold uppercase" onClick={() => openModal("quote", { productName: `${a.productName} spares` })}>Order Spares</Button>
      </div>
    </div>
  );
}

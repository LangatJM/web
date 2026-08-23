import { formatKES } from "@/lib/format";

interface PriceTermsProps {
  customerPrice: number;
  deposit: number;
  dailyPayment: number;
  compact?: boolean;
}

export function PriceTerms({ customerPrice, deposit, dailyPayment, compact }: PriceTermsProps) {
  return (
    <div className={compact ? "space-y-1 text-sm" : "space-y-2"}>
      <p className="font-bold text-ocean-deep">{formatKES(customerPrice)}</p>
      <p className="text-muted">
        Deposit: <span className="font-semibold text-foreground">{formatKES(deposit)}</span>
      </p>
      <p className="text-muted">
        Daily: <span className="font-semibold text-coral">{formatKES(dailyPayment)}/day</span>
      </p>
    </div>
  );
}

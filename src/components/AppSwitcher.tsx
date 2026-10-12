import Link from "next/link";
import { Icon } from "@/components/Icon";

type AppSwitcherProps = {
  target: "relay" | "rigforge";
};

/** Header CTA that switches between the two tools without losing either route. */
export function AppSwitcher({ target }: AppSwitcherProps) {
  const toRelay = target === "relay";
  const destination = toRelay ? "/relay" : "/";
  const label = toRelay ? "Beralih ke Relay" : "Beralih ke RigForge";
  const shortLabel = toRelay ? "Relay" : "RigForge";

  return (
    <Link
      className="header-cta"
      href={destination}
      aria-label={label}
      title={label}
    >
      <span className="header-cta__desktop">{label}</span>
      <span className="header-cta__mobile">{shortLabel}</span>
      <Icon name="arrow" size={16} />
    </Link>
  );
}

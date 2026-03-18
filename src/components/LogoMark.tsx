import Image from "next/image";

type LogoMarkProps = {
  compact?: boolean;
};

export function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <span className={`brand-mark${compact ? " brand-mark-compact" : ""}`} aria-hidden="true">
      <Image
        src="/brand/pach-logo.jpeg"
        alt=""
        width={compact ? 48 : 58}
        height={compact ? 48 : 58}
        className="brand-mark-image"
      />
    </span>
  );
}

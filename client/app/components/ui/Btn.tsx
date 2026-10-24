import Link from "next/link";

interface LinkBtnProps {
  label: string;
  url: string;
  style: string;
  icon: React.ReactNode;
}

export default function LinkBtn({ label, icon, url, style }: LinkBtnProps) {
  return (
    <Link
      href={url}
      className={style}
      target={url.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {label} {icon}
    </Link>
  );
}

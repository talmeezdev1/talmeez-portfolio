import TextReveal from "./TextReveal";

type Props = { eyebrow: string; title: string; className?: string };

export default function SectionHeading({ eyebrow, title, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <TextReveal as="h2" text={title} className="display text-[clamp(44px,8vw,120px)] uppercase" />
    </div>
  );
}

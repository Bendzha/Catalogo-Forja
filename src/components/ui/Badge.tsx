import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'category' | 'discount' | 'neutral';
}

const TONE_STYLES = {
  category: 'bg-[#FF6B35] text-white',
  discount: 'bg-[#2A9D8F] text-white',
  neutral: 'bg-[#1C2321]/8 text-[#1C2321]',
};

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-md
        text-xs font-semibold uppercase tracking-wide
        ${TONE_STYLES[tone]}
      `}
    >
      {children}
    </span>
  );
}
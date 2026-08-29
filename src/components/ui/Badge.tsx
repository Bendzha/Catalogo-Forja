import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'category' | 'discount' | 'neutral';
}

const TONE_STYLES = {
  category: 'bg-[#FE8900] text-white',
  discount: 'bg-[#0098C9] text-white',
  neutral: 'bg-[#112433]/8 text-[#112433]',
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
 
import type { ReactNode } from 'react';
 
interface BadgeProps {
  children: ReactNode;
  tone?: 'category' | 'discount' | 'neutral';
}
 
const TONE_STYLES = {
  category: 'bg-[#6B7A2E] text-white',
  discount: 'bg-[#D4D93A] text-[#3D332E]',
  neutral: 'bg-[#3D332E]/8 text-[#3D332E]',
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
 
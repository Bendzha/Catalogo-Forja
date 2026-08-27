import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const VARIANT_STYLES = {
  primary:
    'bg-[#D4D93A] text-[#3D332E] hover:bg-[#c3c832] shadow-sm hover:shadow-md',
  secondary:
    'bg-[#6B7A2E] text-white hover:bg-[#596726] shadow-sm hover:shadow-md',
  outline:
    'bg-transparent text-[#3D332E] border border-[#3D332E]/20 hover:border-[#3D332E]/50 hover:bg-[#3D332E]/5',
};

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4D93A] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
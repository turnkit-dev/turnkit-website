'use client';

import { useEffect, useState, type ReactNode } from 'react';

export interface MobileMenuProps {
  buttonClassName: string;
  panelClassName: string;
  overlayClassName?: string;
  ariaLabel: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function MobileMenu({
  buttonClassName,
  panelClassName,
  overlayClassName,
  ariaLabel,
  children,
  icon,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] stroke-current">
            <path d="M4 7H20M4 12H20M4 17H20" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {overlayClassName ? (
        <button
          type="button"
          aria-label="Close menu"
          className={`${overlayClassName} ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
      ) : null}
      <div
        className={`${panelClassName} ${
          isOpen ? 'pointer-events-auto translate-x-0 scale-100 opacity-100' : 'pointer-events-none -translate-x-2 scale-95 opacity-0'
        }`}
      >
        <div onClick={() => setIsOpen(false)}>{children}</div>
      </div>
    </>
  );
}

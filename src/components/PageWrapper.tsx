import React from 'react';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function PageWrapper({ children, showFooter = true }: PageWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {children}
    </div>
  );
}
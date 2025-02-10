import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Product Catalog</h1>
      {/* Navigation, Header, Footer etc. */}
      {children}
    </div>
  );
};

export default Layout;
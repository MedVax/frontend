import React from "react";

// Layout without header and footer for public consultant profile
// This layout overrides the parent (public) layout
const PublicConsultantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {children}
    </div>
  );
};

export default PublicConsultantLayout;


import React from "react";

const BusinessInfoCard = ({ user }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold">Business Information</h3>

      <p><strong>Business Name:</strong> {user.businessName}</p>
      <p><strong>Business ID:</strong> {user.businessId}</p>
      <p><strong>Country:</strong> {user.country}</p>
    </div>
  );
};

export default BusinessInfoCard;
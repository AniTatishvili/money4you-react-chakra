import React from "react";

import { PContentLayout, PContentSection } from "entities/layouts";
import { SellerDashboard } from "widgets/dashboards/seller-dashboard";

export const Seller = () => {
  return (
    <PContentLayout>
      <PContentSection>
        <SellerDashboard />
      </PContentSection>
    </PContentLayout>
  );
};

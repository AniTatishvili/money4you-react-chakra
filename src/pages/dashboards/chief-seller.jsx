import React from "react";

import { PContentLayout, PContentSection } from "entities/layouts";
import { ChiefSellerDashboard } from "widgets/dashboards/chief-seller-dashboard";

export const ChiefSeller = () => {
  return (
    <PContentLayout>
      <PContentSection>
        <ChiefSellerDashboard />
      </PContentSection>
    </PContentLayout>
  );
};

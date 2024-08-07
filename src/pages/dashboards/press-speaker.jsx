import React from "react";

import { PContentLayout, PContentSection } from "entities/layouts";
import { PressSpeakerDashboard } from "widgets/dashboards/press-speaker";

export const PressSpeaker = () => {
  return (
    <PContentLayout>
      <PContentSection>
        <PressSpeakerDashboard />
      </PContentSection>
    </PContentLayout>
  );
};

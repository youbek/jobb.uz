import React, { useState } from "react";

import Carousel from "./Carousel";
import Overlay from "./Overlay";

import { vacancyCategories } from "data";

function VacancyCategories() {
  const [overlay, showOverlay] = useState<boolean>(false);

  function toggleOverlay() {
    showOverlay(!overlay);
  }

  if (overlay) {
    return (
      <Overlay
        isOpen={overlay}
        toggle={toggleOverlay}
        vacancyCategories={vacancyCategories}
      />
    );
  }

  return (
    <Carousel
      vacancyCategories={vacancyCategories}
      onShowAllClick={toggleOverlay}
    />
  );
}

export default VacancyCategories;

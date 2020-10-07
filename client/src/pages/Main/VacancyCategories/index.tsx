import React, { useState } from "react";

import Carousel from "./Carousel";
import Overlay from "./Overlay";

import { vacancyCategories } from "../../../constants";

function VacancyCategories() {
  const [overlay, showOverlay] = useState<boolean>(false);

  function toggleOverlay() {
    showOverlay(!overlay);
  }

  if (overlay) {
    // <Overlay onClose={toggleOverlay} />
    return <div>Here will be overlay</div>;
  }

  return (
    <Carousel
      vacancyCategories={vacancyCategories}
      onShowAllClick={toggleOverlay}
    />
  );
}

export default VacancyCategories;

import React, { useState } from "react";

import { Button } from "reactstrap";

function Slide({ items }) {
  const [CURRENT_SLIDE, SET_CURRENT_SLIDE] = useState(0);
  const ITEMS_PER_SLIDE = 5;

  const WIDTH = `${100 / ITEMS_PER_SLIDE}%`;
  const CURRENT_SLIDE_POSITION = `-${CURRENT_SLIDE * 100}%`;

  function prevSlide() {
    let currentSlide = CURRENT_SLIDE;
    currentSlide--;
    SET_CURRENT_SLIDE(currentSlide);
  }

  function nextSlide() {
    let currentSlide = CURRENT_SLIDE;
    currentSlide++;
    SET_CURRENT_SLIDE(currentSlide);
  }

  return (
    <div className="slide-container">
      <button
        className="slide-navigator left"
        disabled={CURRENT_SLIDE === 0}
        onClick={prevSlide}
      >
        Prev
      </button>
      <div className="slider">
        <div
          className="slide-items-container"
          style={{ marginLeft: CURRENT_SLIDE_POSITION }}
        >
          {items.map((item, index) => (
            <Button color="success" outline style={{ width: WIDTH }}>
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <button
        className="slide-navigator right"
        disabled={CURRENT_SLIDE === items.length / ITEMS_PER_SLIDE}
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
}

export default Slide;

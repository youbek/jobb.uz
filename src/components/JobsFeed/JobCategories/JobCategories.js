import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import SlideButton from "./SlideButton";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import JobCategoriesContainer from "./JobCategoriesContainer";
import JobCategoriesMobile from "./JobCategoriesMobile";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import categories from "../../../constant/jobCategories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUmbrellaBeach,
  faShoppingCart,
  faIndustry,
  faTruck,
  faPaintRoller,
  faCoins,
  faLandmark,
  faTractor,
  faBalanceScale,
  faGuitar,
  faLaptopCode,
  faBrush,
  faBriefcaseMedical,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function JobCategories() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  const isTablet = useMediaQuery({ query: "(max-device-width: 1024px )" });

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide(currentSlide + 3);
  };

  const handleBack = () => {
    setCurrentSlide(currentSlide - 3);
  };

  function toggleAllCategories() {
    setShowAllCategories(!showAllCategories);
  }

  return (
    <JobCategoriesContainer>
      <CarouselProvider
        naturalSlideWidth={12}
        naturalSlideHeight={8}
        totalSlides={isMobile ? categories.length + 1 : categories.length}
        visibleSlides={isMobile ? 2 : isTablet ? 4 : 6}
        step={3}
        dragEnabled={isMobile}
        dragStep={2}
      >
        <PrevButton
          onClick={handleBack}
          className={`${currentSlide === 0 && "btn-hidden"}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevButton>
        <Slider className="carousel-slide">
          {isMobile && (
            <Slide className="carousel-slide-item">
              <Link className="btn-carousel" onClick={toggleAllCategories}>
                <FontAwesomeIcon icon={faArrowRight} size="lg" />
                <span>All Categories</span>
              </Link>
            </Slide>
          )}
          {categories.map((category, index) => (
            <Slide className="carousel-slide-item" index={index} key={index}>
              <SlideButton to={category.transliteratedName}>
                <img src={category.icon}></img>
                <span>{category.name}</span>
              </SlideButton>
            </Slide>
          ))}
        </Slider>
        <NextButton
          onClick={handleNext}
          className={`${currentSlide === 16 && "btn-hidden"}`}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </NextButton>
      </CarouselProvider>
      {showAllCategories && (
        <JobCategoriesMobile
          showAllCategories={showAllCategories}
          toggleAllCategories={toggleAllCategories}
          categories={categories}
        />
      )}
    </JobCategoriesContainer>
  );
}

export default JobCategories;

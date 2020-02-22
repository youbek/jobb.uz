import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useJobFilter } from "../../../hooks";

import SlideButton from "./SlideButton";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Slider from "./Slider";
import Slide from "./Slide";
import JobCategoriesContainer from "./JobCategoriesContainer";
import JobCategoriesMobile from "./JobCategoriesMobile";
import { CarouselProvider } from "pure-react-carousel";

import { jobCategories } from "constants/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "pure-react-carousel/dist/react-carousel.es.css";

function JobCategories() {
  const [jobReFilter] = useJobFilter();

  const [showAllCategories, setShowAllCategories] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  const isTablet = useMediaQuery({ query: "(max-device-width: 1023px )" });

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
        totalSlides={isMobile ? jobCategories.length + 1 : jobCategories.length}
        visibleSlides={isMobile ? 2 : isTablet ? 4 : 6}
        step={3}
        dragEnabled={isMobile}
        dragStep={2}
      >
        <PrevButton onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevButton>
        <Slider>
          {isMobile && (
            <Slide>
              <SlideButton onClick={toggleAllCategories}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  color="#5B5E64"
                />
                <span>Все Категории</span>
              </SlideButton>
            </Slide>
          )}
          {jobCategories.map((category, index) => (
            <Slide index={index} key={index}>
              <SlideButton
                onClick={() =>
                  jobReFilter({ categoryName: category.transliteratedName })
                }
              >
                <img src={category.icon}></img>
                <span>{category.name}</span>
              </SlideButton>
            </Slide>
          ))}
        </Slider>
        <NextButton onClick={handleNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </NextButton>
      </CarouselProvider>
      {showAllCategories && (
        <JobCategoriesMobile
          showAllCategories={showAllCategories}
          toggleAllCategories={toggleAllCategories}
          categories={jobCategories}
        />
      )}
    </JobCategoriesContainer>
  );
}

export default JobCategories;

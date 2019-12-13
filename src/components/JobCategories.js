import React, { useState, useEffect } from "react";
import _ from "lodash";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from "react-router-dom";

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
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { isObject } from "util";

function JobCategories() {
  const categories = [
    {
      id: 1,
      name: "Hospitality And Tourism",
      iconName: faUmbrellaBeach,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Retail And Sales",
      iconName: faShoppingCart,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Industrial And Manufacturing",
      iconName: faIndustry,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Transportation And Logistics",
      iconName: faTruck,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Building And Construction",
      iconName: faPaintRoller,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Business And Finance",
      iconName: faCoins,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Government and Public",
      iconName: faLandmark,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Agriculture",
      iconName: faTractor,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Legal",
      iconName: faBalanceScale,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Arts and Entertainment",
      iconName: faGuitar,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Healthcare and Medicine",
      iconName: faBriefcaseMedical,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Information Technologies",
      iconName: faLaptopCode,
      color: "#0f8fee",
    },
    {
      id: 1,
      name: "Engineering and Design",
      iconName: faBrush,
      color: "#0f8fee",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide(currentSlide + 3);
  };

  const handleBack = () => {
    setCurrentSlide(currentSlide - 3);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  function handleWindowResize() {
    setIsMobile(window.innerWidth < 576);
    setIsTablet(window.innerWidth < 1025);
  }

  useEffect(() => {
    handleWindowResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", _.throttle(handleWindowResize, 200));
  }, [window.innerWidth]);

  useEffect(() => {
    window.removeEventListener("resize", _.throttle(handleWindowResize, 200));
  }, [window.innerWidth]);

  return (
    <div className="job-categories">
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={6}
        totalSlides={categories.length}
        visibleSlides={isMobile ? 2 : isTablet ? 5 : 7}
        step={3}
        dragEnabled={isMobile}
        dragStep={2}
      >
        <ButtonBack
          onClick={handleBack}
          className={`d-none d-xl-block
            ${
              currentSlide === 0
                ? "btn btn-carousel-back btn-hidden"
                : "btn btn-carousel-back"
            }`}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
        </ButtonBack>
        <Slider className="carousel-slide">
          {categories.map((category, index) => (
            <Slide className="carousel-slide-item" index={index} key={index}>
              <Link
                className="btn-carousel"
                to={`${category.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <FontAwesomeIcon
                  icon={category.iconName}
                  color={category.color}
                  size="lg"
                />
                <span>{category.name}</span>
              </Link>
            </Slide>
          ))}
        </Slider>
        <ButtonNext
          onClick={handleNext}
          className={`d-none d-xl-block
            ${
              currentSlide === 6
                ? "btn btn-carousel-back btn-hidden"
                : "btn btn-carousel-next"
            }`}
        >
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}

export default JobCategories;

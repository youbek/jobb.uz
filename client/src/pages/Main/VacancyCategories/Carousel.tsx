import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled.button`
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: space-between;
  flex-basis: 130px;
  min-width: 130px;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  margin-left: 8px;
  cursor: pointer;
  user-select: none;

  &:first-of-type {
    margin-left: 0px;
  }

  img {
    width: 35px;
  }
`;

type VacancyCategory = {
  name: string;
  transliteratedName: string;
  icon: string;
};

interface Props {
  vacancyCategories: VacancyCategory[];
  onShowAllClick: () => void;
}

function Carousel({ vacancyCategories, onShowAllClick }: Props) {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  const isTablet = useMediaQuery({ query: "(max-device-width: 1023px )" });
  return (
    <Wrapper>
      {isMobile && (
        <CarouselItem onClick={onShowAllClick}>
          <FontAwesomeIcon icon={faArrowRight} size="2x" color="#5B5E64" />
          <span>Все Категории</span>
        </CarouselItem>
      )}

      {vacancyCategories.map((category, index) => (
        <CarouselItem>
          <img src={category.icon} />
          <span>{category.name}</span>
        </CarouselItem>
      ))}
    </Wrapper>
  );
}

export default Carousel;

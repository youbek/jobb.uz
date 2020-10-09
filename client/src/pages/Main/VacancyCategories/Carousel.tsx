import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "hooks";
import { VacancyCategory } from "types";

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
  background-color: #fff;
  color: #383c43;
  text-align: left;
  font-size: 14px;
  padding: 8px;
  justify-content: space-between;
  flex-basis: 140px;
  min-width: 140px;
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

interface Props {
  vacancyCategories: VacancyCategory[];
  onShowAllClick: () => void;
}

function Carousel({ vacancyCategories, onShowAllClick }: Props) {
  const { isMobile, isTablet } = useWindowDimensions();
  return (
    <Wrapper>
      {isMobile && (
        <CarouselItem onClick={onShowAllClick}>
          <FontAwesomeIcon icon={faArrowRight} size="2x" color="#5B5E64" />
          <span>Все Категории</span>
        </CarouselItem>
      )}

      {vacancyCategories.map((category, index) => (
        <CarouselItem key={index}>
          <img src={category.icon} />
          <span>{category.name}</span>
        </CarouselItem>
      ))}
    </Wrapper>
  );
}

export default Carousel;

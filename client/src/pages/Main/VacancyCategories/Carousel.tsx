import React, { useRef } from "react";
import styled from "styled-components";
import { useWindowDimensions } from "hooks";

import { ReactComponent as ArrowLeftIcon } from "icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "icons/arrow-right.svg";

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

const ScrollButton = styled.button<{ right?: boolean; left?: boolean }>`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #d5d5d5;
  padding: 0;
  transform: translateY(-50%);
  top: 50%;
  display: block;
  margin: 0;
  background-color: #fff;
  color: #464444;
  z-index: 2;
  right: ${({ right }) => right && "-45px"};
  left: ${({ left }) => left && "-45px"};
`;

interface Props {
  vacancyCategories: VacancyCategory[];
  onShowAllClick: () => void;
}

function Carousel({ vacancyCategories, onShowAllClick }: Props) {
  const { isMobile } = useWindowDimensions();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function scroll(direction: number) {
    if (!carouselRef.current) {
      return;
    }

    const offsetWidth = carouselRef.current.offsetWidth;
    const currentScroll = carouselRef.current.scrollLeft;

    carouselRef.current.scrollTo({
      top: 0,
      left: currentScroll + (offsetWidth / 2) * direction,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <ScrollButton right onClick={() => scroll(1)}>
        <ArrowRightIcon />
      </ScrollButton>
      <Wrapper ref={carouselRef}>
        {isMobile && (
          <CarouselItem onClick={onShowAllClick}>
            <ArrowRightIcon />
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
      <ScrollButton left onClick={() => scroll(-1)}>
        <ArrowLeftIcon />
      </ScrollButton>
    </div>
  );
}

export default Carousel;

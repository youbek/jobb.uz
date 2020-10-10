import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Overlay } from "components";

import { useFilters } from "hooks";
import { VacancyCategory } from "types";

const AllCategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
`;

const CategoryButton = styled.button`
  width: 33.33%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  text-decoration: none;
  color: #555;
  background-color: #fff;

  img {
    width: 30px;
  }

  span {
    font-size: 12px;
  }
`;

interface Props {
  isOpen: boolean;
  toggle: () => void;
  vacancyCategories: VacancyCategory[];
}

function JobCategoriesMobile({ isOpen, toggle, vacancyCategories }: Props) {
  const { setNewQuery } = useFilters();

  return (
    <Overlay isOpen={isOpen} toggle={toggle} title="Категории">
      <AllCategoryContainer>
        {vacancyCategories.map((category, index) => (
          <CategoryButton
            key={index}
            onClick={() => setNewQuery({ category: category.name })}
          >
            <img src={category.icon} />
            <span>{category.name}</span>
          </CategoryButton>
        ))}
      </AllCategoryContainer>
    </Overlay>
  );
}

export default JobCategoriesMobile;

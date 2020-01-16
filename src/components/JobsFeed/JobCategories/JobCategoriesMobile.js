import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import OverlayContainer from "../../Layout/OverlayContainer/OverlayContainer";

import { useJobFilter } from "../../../hooks";

const AllCategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
`;

const Category = styled.button`
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

function JobCategoriesMobile({
  showAllCategories,
  toggleAllCategories,
  categories,
}) {
  const [jobReFilter] = useJobFilter();

  return (
    <OverlayContainer
      isOpen={showAllCategories}
      toggle={toggleAllCategories}
      title="Категории"
    >
      <AllCategoryContainer>
        {categories.map((category, index) => (
          <Category
            key={index}
            to={category.transliteratedName}
            onClick={() =>
              jobReFilter({ categoryName: category.transliteratedName })
            }
          >
            <img src={category.icon} />
            <span>{category.name}</span>
          </Category>
        ))}
      </AllCategoryContainer>
    </OverlayContainer>
  );
}

JobCategoriesMobile.propTypes = {
  showAllCategories: PropTypes.bool.isRequired,
  toggleAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};

export default JobCategoriesMobile;

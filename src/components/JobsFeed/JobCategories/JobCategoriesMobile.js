import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import OverlayContainer from "../../Layout/OverlayContainer/OverlayContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function JobCategoriesMobile({
  showAllCategories,
  toggleAllCategories,
  categories,
}) {
  return (
    <OverlayContainer
      isOpen={showAllCategories}
      toggle={toggleAllCategories}
      title="All Categories"
    >
      <div className="all-category-container">
        {categories.map((category, index) => (
          <Link
            key={index}
            className="all-category-btn"
            to={`${category.name.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <FontAwesomeIcon
              icon={category.iconName}
              color="#0f8fee"
              size="2x"
            />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </OverlayContainer>
  );
}

JobCategoriesMobile.propTypes = {
  showAllCategories: PropTypes.bool.isRequired,
  toggleAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};

export default JobCategoriesMobile;

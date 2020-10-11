import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import clamp from "clamp-js";
import "styled-components/macro";

import { ReactComponent as ChevronDownIcon } from "icons/chevron-down.svg";

const Wrapper = styled.div`
  margin-top: 10px;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1rem;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 2px;
  }
`;

const ShowMoreButton = styled.button`
  background-color: #fff;
  color: #f64f64;
  font-size: 1rem;
  z-index: 100;
  font-weight: 400;
  text-align: left;
  padding: 0;
  margin-top: 12px;

  svg {
    vertical-align: bottom;
  }

  &:hover {
    background-color: #fff;
    color: #f64f64;
  }
`;

interface Props {
  description: string;
}

function Description({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const shortFormWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    changeSize();
  }, []);

  function handleExpandDescription(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(true);
  }

  function changeSize() {
    if (!shortFormWrapper.current) {
      return;
    }

    clamp(shortFormWrapper.current, { clamp: 5 });
  }

  return (
    <Wrapper>
      {(() => {
        if (expanded) {
          return ReactHtmlParser(description);
        }
        return <div ref={shortFormWrapper}>{ReactHtmlParser(description)}</div>;
      })()}
      {!expanded && (
        <ShowMoreButton onClick={handleExpandDescription}>
          Подробнее <ChevronDownIcon />
        </ShowMoreButton>
      )}
    </Wrapper>
  );
}

export default Description;

import styled from "styled-components";
import { Link } from "react-router-dom";

const SlideButton = styled(Link)`
  padding-top: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 100%;
  line-height: 18px;
  margin: auto;
  box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.05),
    0 1px 3px 0 rgba(56, 60, 67, 0.15);
  border-radius: 0.25rem;
  cursor: pointer;
  color: #383c43;
  font-size: 14px;
  transition: box-shadow 0.2s ease-in-out;
  margin-top: 2px;

  &:hover {
    color: #383c43;
    text-decoration: none;
    box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.07),
      0 3px 6px 0 rgba(56, 60, 67, 0.15);
    transition: box-shadow 0.25s ease-out;
  }
`;

export default SlideButton;

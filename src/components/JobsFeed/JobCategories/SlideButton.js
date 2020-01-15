import styled from "styled-components";

const SlideButton = styled.button`
  padding-top: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  width: 100%;
  height: 100%;
  line-height: 18px;
  margin: auto;
  border: 1px solid #e3e3e3;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #383c43;
  font-size: 14px;
  transition: box-shadow 0.2s ease-in-out;
  margin-top: 2px;
  background-color: #fff;
  text-align: left;
  img {
    width: 35px;
  }

  &:hover {
    color: #383c43;
    text-decoration: none;
    box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.07),
      0 3px 6px 0 rgba(56, 60, 67, 0.15);
    transition: box-shadow 0.25s ease-out;
  }
`;

export default SlideButton;

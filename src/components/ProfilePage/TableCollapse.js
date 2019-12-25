import styled from "styled-components";
import Collapse from "@kunukn/react-collapse";

const TableCollapse = styled(Collapse)`
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
`;

TableCollapse.defaultProps = {
  transition: "290ms",
};

export default TableCollapse;

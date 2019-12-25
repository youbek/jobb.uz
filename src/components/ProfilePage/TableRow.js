import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TableCol from "./TableCol";

const Container = styled.div`
  margin-top: 1rem;
`;

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    align-items: flex-end;
  }
`;

const TableColRight = styled(TableCol)`
  text-align: right;
  @media screen and (max-width: 768px) {
    &:nth-child(3n + 3) {
      position: absolute;
      right: 10px;
    }
  }
`;

const Button = styled.button`
  color: #4687ff;
  font-weight: 400;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  background-color: transparent;
  border: 1px solid transparent;
  margin: 0;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

function TableRow({ name, value, button, onClick }) {
  return (
    <Row>
      <TableCol>{name}</TableCol>
      <TableCol>{value}</TableCol>
      <TableColRight>
        <Button onClick={onClick}>{button}</Button>
      </TableColRight>
    </Row>
  );
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TableRow;

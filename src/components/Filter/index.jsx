"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";
import styled from "styled-components";

const FilterContainer = styled.div`
  background-color: #a13a23;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

const StyledTextField = withStyles({
  root: {
    backgroundColor: "#ffffffd8",
    borderRadius: "5px",
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    backgroundColor: "#e35131",
    color: "#fff",
    height: "50px",
    borderRadius: "5px",
    marginLeft: "5px",
    height: "55px",
  },
})(Button);

const Filter = ({ searchTerm, setSearchTerm, filterHeroes }) => {
  return (
    <FilterContainer>
      <StyledTextField
        label="Digite aqui o nome do herói"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledButton variant="contained" onClick={filterHeroes}>
        Buscar
      </StyledButton>
    </FilterContainer>
  );
};

export default Filter;

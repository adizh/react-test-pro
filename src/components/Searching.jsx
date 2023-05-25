import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBlogs } from "../store/slice";
import styled from "styled-components";
const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #00000050;
  padding: 5px;
  transition: ease 0.2s;
  &:hover {
    transition: ease 0.2s;
  }
`;
function Searching() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const handleSearchInput = (elem) => {
    dispatch(searchBlogs(elem.target.value));
    setSearchInput("");
  };
  return (
    <div className="search-block">
      <Input
        type="text"
        placeholder="Search by title"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onInput={(elem) => handleSearchInput(elem)}
      />
    </div>
  );
}

export default Searching;

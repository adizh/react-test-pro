import { useSelector } from "react-redux";
import BlogsList from "./components/BlogsList";
import Pagination from "./components/Pagination";
import Searching from "./components/Searching";
import styled from "styled-components";
const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  margin: 20px auto;
`;

function App() {
  const state = useSelector((state) => state.blogs);
  return state.error ? (
    <Title>{state.errMessage}</Title>
  ) : (
    <>
      <Searching />
      <BlogsList />
      <Pagination />
    </>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, React } from "react";
import Blogs from "./Blogs";
import { fetchContent } from "../../src/store/slice.js";
function BlogsList() {
  const store = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const blogsItems = useSelector((state) => state.blogs.blogsItem);

  return (
    <div className="blogs-list">
      {store.isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        blogsItems.map((blog) => <Blogs key={blog.id} blog={blog} />)
      )}
    </div>
  );
}

export default BlogsList;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

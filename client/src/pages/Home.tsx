import React from "react";
import { useNavigate } from "react-router-dom";
import BookListItem from "../components/BookListItem";
import { trpc } from "../lib/trpc";
import bookIcon from "../assets/book-icon.png";
import plusIcon from "../assets/plus-icon.png";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const booksQuery = trpc.books.allBooks.useQuery();

  const handleRedirect = () => {
    navigate("/addBook");
  }

  return (
    <main className="container mx-auto mt-5">
      <div className="font-bold text-4xl text-primary flex">
        <img
          src={bookIcon}
          alt=""
          className="self-center mr-4"
          width="36px"
          height="40px"
        />
        <span>My Books</span>
      </div>
      <section className="py-6 flex">
        {booksQuery.data?.map((book) => (
          <BookListItem key={book.id} data={book} />
        ))}
        <div 
          className="w-[190px] h-[240px] border border-dashed border-primary rounded-lg text-primary flex flex-col justify-center items-center cursor-pointer"
          onClick={handleRedirect}
        >
          <img
            src={plusIcon}
            alt="Add File"
            height="16px"
            width="16px"
            className=""
          />
          Add a Book
        </div>
      </section>
    </main>
  );
};

export default Home;

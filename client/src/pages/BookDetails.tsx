import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trpc } from "../lib/trpc";
import { toHoursAndMinutes } from "../lib/utils";
import Button from "../components/Button";
import PdfViewer from "../components/PdfViewer";

type Props = {};

type BookDetails = {
  id: string;
  title: string;
  author: string;
  readTime: number;
  description: string;
  content: string;
  thumbnail: string;
  rating: number | null;
  ratingCount: number;
};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<BookDetails | null>();

  const bookDetails = trpc.books.bookDetails.useQuery({ id: id ? id : "" });

  useEffect(() => {
    if (bookDetails?.data) {
      setBookData(bookDetails.data);
    }
  }, [bookDetails]);

  return (
    <div className="p-6 relative">
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        text="&larr; Back to Home"
      />
      <main className="flex flex-col md:flex-row pt-6">
        {/* Left */}
        <img
          src={bookData?.thumbnail}
          className="max-h-[550px] w-[400px] rounded-lg mr-10 mb-4 md:mb-0"
        />
        {/* Right */}
        <div className="flex-1">
          <h2 className="text-primary text-2xl font-bold capitalize">
            {bookData?.title}
          </h2>
          <div className="text-gray-500 pt-3 capitalize">
            {bookData?.author}
          </div>
          <div className="text-gray-500 pt-3">
            {bookData?.readTime
              ? `Book Read Time: ${toHoursAndMinutes(bookData.readTime)}`
              : ""}
          </div>
          <div className="pt-3">{bookData?.description}</div>
          <div className="flex w-full text-gray-500 my-10">
            <div className="flex-1 border-r-2 p-3"></div>
            <div className="flex-1 p-3">
              {bookData?.rating ? (
                <div></div>
              ) : (
                <div>
                  <p>
                    You have not rated this book yet. Click on the button to
                    start rating.
                  </p>
                  <Button
                    variant="outlined"
                    text="Rate this Book"
                    onClick={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
          <Button variant="primary" text="Read this Book" onClick={() => {}} />
        </div>
      </main>
      <PdfViewer content={bookData?.content} />
    </div>
  );
};

export default BookDetails;

import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  data: BookData;
  key: string;
};

type BookData = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
};

const BookListItem = ({ data, key }: Props) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/${data.id}`)
  };

  return (
    <div className="rounded-lg pr-8 cursor-pointer max-w-[200px]" key={key} onClick={handleRedirect}>
      <img
        src={data.thumbnail}
        className="rounded-lg  h-[240px]"
        alt=""
        height="240px"
        width="190px"
      />
      <div className="font-bold text-xl italic pt-2">{data.title}</div>
      <div className="text-sm text-gray-600">{data.author}</div>
    </div>
  );
};

export default BookListItem;

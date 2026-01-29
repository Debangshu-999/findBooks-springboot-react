import React, { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookContext";

function ViewBook() {
  const { bookList, loading, error, getBook } = useContext(BookContext);

  useEffect(() => {
    if(bookList.length === 0) getBook()
  }), []

  return <div></div>;
}

export default ViewBook;

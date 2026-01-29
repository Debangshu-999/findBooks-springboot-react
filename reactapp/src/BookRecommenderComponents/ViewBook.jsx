import React, { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookContext";

function ViewBook() {
  const { bookList, loading, error, getBooks } = useContext(BookContext);

  useEffect(() => {
    if(bookList.length === 0) getBooks()
  }, [])

  return <div></div>;
}

export default ViewBook;

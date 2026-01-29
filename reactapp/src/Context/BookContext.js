import { createContext, useState } from "react";
import {
  getBooks_API,
  addBook_API,
  getBookById_API,
  updateBook_API,
  // updateBook_API,
  // deleteBook_API,
} from "../ApiService/ApiService";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all books
  const getBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const books = await getBooks_API();
      setBookList(books);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add book (multipart)
  const addBook = async (bookData) => {
    setLoading(true);
    setError(null);

    try {
      const savedBook = await addBook_API(bookData);
      setBookList((prev) => [...prev, savedBook]);
      return savedBook
    } catch (err) {
      setError(err.message);
      throw err
    } finally {
      setLoading(false);
    }
  };

  // Update book
  const updateBook = async (bookData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedBook = await updateBook_API(bookData);
      setBookList((prev) =>
        prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get Book by ID
  const getBookById = async (id) => {
  setLoading(true);
  setError(null);

  try {
    const book = await getBookById_API(id);
    return book;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Delete book
  // const deleteBook = async (id) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     await deleteBook_API(id);
  //     setBookList((prev) => prev.filter((b) => b.id !== id));
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <BookContext.Provider
      value={{
        bookList,
        loading,
        error,
        getBooks,
        addBook,
        updateBook,
        getBookById,
        // deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;

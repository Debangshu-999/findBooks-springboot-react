import { createContext, useReducer } from "react";
import BookReducer, { initialState } from "./BookReducer";
import { addBook_API, getBooks_API } from "../ApiService/ApiService";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, initialState);

  const getBook = async () => {

    dispatch({ type: "LOADING" });
    try {
      const books = await getBooks_API();
      dispatch({ type: "GET_BOOKS", payload: books });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.error });
    }
  };

  const addBook = async(bookData) => {

    dispatch({ type: "LOADING" });
    try{
      const book = await addBook_API(bookData);
      dispatch({ type: "ADD_BOOK", payload: book });
    }catch(error){
      dispatch({ type: "ERROR", payload: error.error });
    }
  };

  const updateBook = (book) => {
    dispatch({ type: "UPDATE_BOOK", payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  };

  return (
    <BookContext.Provider
      value={{
        bookList: state.bookList,
        loading: state.loading,
        error: state.error,
        getBook,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;

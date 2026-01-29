export const initialState = {
  bookList: [],
};

const BookReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOK":
      return {
        ...state,
        bookList: action.payload,
      };

    case "ADD_BOOK":
      return {
        ...state,
        bookList: [...state.bookList, action.payload],
      };

    case "UPDATE_BOOK":
        let newBook = action.payload
      return {
        ...state, 
        bookList: state.bookList.map(book => book.id === newBook.id ? newBook : book)
      };
    
    case "DELETE_BOOK":
        return {
            ...state,
            bookList: state.bookList.filter(book => book.id !== action.payload)
        }
  }
};

export default BookReducer;

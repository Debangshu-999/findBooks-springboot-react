export const initialState = {
  bookList: [],
  loading: false,
  error: null,
};

const BookReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_BOOKS":
      return {
        ...state,
        bookList: action.payload,
        loading: false,
      };

    case "ADD_BOOK":
      return {
        ...state,
        bookList: [...state.bookList, action.payload],
        loading: false,
      };

    case "UPDATE_BOOK":
      return {
        ...state,
        bookList: state.bookList.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
        loading: false,
      };

    case "DELETE_BOOK":
      return {
        ...state,
        bookList: state.bookList.filter(
          (book) => book.id !== action.payload
        ),
        loading: false,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BookReducer;

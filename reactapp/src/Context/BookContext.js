import  {createContext, useReducer, useState} from 'react'
import BookReducer, { initialState } from './BookReducer'
import { getBooks_API } from '../apiConfig'

export const BookContext = createContext()

const BookContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(BookReducer, initialState)

    const getBook = async() => {
        const books = await getBooks_API()
        dispatch({type:'GET_BOOKS', payload:books})
    }

    const addBook = (book) => {
        dispatch ({type:'ADD_BOOKS', payload:book})
    }

    const updateBook = (book) => {
        dispatch({type:'UPDATE_BOOKS', payload:book})
    }

    const deleteBook = (id) => {
        dispatch({type:'DELETE_BOOKS', payload:id})
    }

    return (
        <BookContext.Provider 
        value={{
            bookList: state.bookList,
            addBook,
            getBook,
            updateBook,
            deleteBook
        }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider
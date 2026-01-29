import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import ErrorPage from '../Components/ErrorPage'
import HomePage from '../Components/HomePage'
import BookForm from '../BookRecommenderComponents/BookForm'
import EditForm from '../BookRecommenderComponents/EditForm'
import ViewBook from '../BookRecommenderComponents/ViewBook'

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/error' element={<ErrorPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/newBook' element={<BookForm/>}/>
          <Route path='/editBook/:id' element={<EditForm/>}/>
          <Route path='/viewbook' element={<ViewBook/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter

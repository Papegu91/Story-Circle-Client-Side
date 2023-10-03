import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './Components/AboutPage'
import BookPage from './Components/BookPage'
import Books from './Components/Books'
import ClubPage from './Components/ClubPage'
import Clubs from './Components/Clubs'
import Footer from './Components/Footer'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import NavBar from './Components/Navbar'
import HomePage from './Components/HomePage'



function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact="true" element={<HomePage />} />
        <Route path="/signup" exact="true" element={<SignUp />} />
        <Route path="/login" exact="true" element={<LogIn />} />
        <Route path="/clubs" exact="true" element={<Clubs />} />
        <Route path="/clubs/:index" exact="true" element={<ClubPage/>} />
        <Route path="/books" exact="true" element={<Books />} />
        <Route path="/books/:index" exact="true" element={<BookPage />} />
        <Route path="/about" exact="true" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App

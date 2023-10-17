import { Routes, Route } from 'react-router-dom'
import AboutPage from './Components/AboutPage'
import BookPage from './Components/BookPage'
import Books from './Components/Books'
import ClubPage from './Components/ClubPage'
import Clubs from './Components/Clubs'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import NavBar from './Components/Navbar'
import HomePage from './Components/HomePage'
import CreateClub from './Components/CreateClub'
import AddBook from './Components/AddBook'
import NoPage from './Components/NoPage'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" exact element={<HomePage />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/clubs" exact element={<Clubs />} />
        <Route path="/clubs/:index" exact element={<ClubPage/>} />
        <Route path="/books" exact element={<Books />} />
        <Route path="/books/:index" exact element={<BookPage />} />
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/create-club" exact element={<CreateClub />} />
        <Route path="/add-book" exact element={<AddBook />} />
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </>
  )
}

export default App

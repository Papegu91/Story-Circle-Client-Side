import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Books.css';
import BookItem from './BookItem';
import RecommendedBookItem from './RecommendedBook';
import SweetAlert2 from "sweetalert2"

export default function Books() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [books, setBooks] = useState([]);
  const [fetchEr, setFetchEr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendedBook, setRecommendedBook] = useState(null);

  let mytoken = localStorage.getItem('loginToken')

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:5555/books', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${mytoken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Kindly check your network and reload again.');
        } else if(res.status == 500 || res.status == 404 || res.status == 401 ){
          let errorData = res.json();
          setFetchEr(errorData.error)
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        setFetchEr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   let recommendedBookTimeout = setTimeout(() => {
  //     const recommendedBookId = Math.floor(Math.random() * 14) + 2; 
  //     fetch(`http://localhost:5555/books/${recommendedBookId}`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${mytoken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setRecommendedBook(data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching recommended book:', error);
  //       });
  //   }, 7000); 

  //   return () => clearTimeout(recommendedBookTimeout); 
  // }, [mytoken]);

  // {recommendedBook && (
  //   <div className='recommended-book'>
  //     <h2>Recommended Book:</h2>
  //     <RecommendedBookItem book={recommendedBook} key={recommendedBook.id} />
  //     </div>
  //   )}


  return (
    <>
      <div className='text-div'>
        <button
          className='add-book-button'
          onClick={() => navigate('/add-book')}
        >
          Add a book
        </button>
        <h1>Find your favourite book.</h1>
      </div>
      <div className='book-items-holder'>
        {loading ? (
        <h1>Loading ...</h1>
        ) : fetchEr ? (
          <div className="error-message">{fetchEr.message}</div> // Apply error message class
          ) : (
          books.map((book) => {
            return <BookItem book={book} key={book.id} />;
          })
        )}
      </div>
    </>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'sweetalert2';

export default function BookItem({book}) {

  const navigate = useNavigate(); 

  return (
    <>
      <div className="bookContainer" onClick={() => navigate(`/books/${book.id}`)}>
        <div className='iconDiv'>
          <i class="fa-solid fa-book-open" style={{ fontSize: '20px' }}></i>
        </div>
        <div className='bookTextDiv'>
          <h2>{book.title}</h2>
          <h2>By: {book.author}</h2>
        </div>
        <div className='moreButtonDiv'>
          <button onClick={() => navigate(`/books/${book.id}`)}>More</button>
        </div>
      </div>
    </>
    )
}
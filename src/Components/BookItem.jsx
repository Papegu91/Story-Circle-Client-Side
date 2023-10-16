import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookItem({ book }) {
  const navigate = useNavigate();

  const handleContainerClick = (e) => {
    e.stopPropagation(); 
    navigate(`/books/${book.id}`);
  }

  const handleButtonClick = (e) => {
    e.stopPropagation(); 
    navigate(`/books/${book.id}`);
  }

  return (
    <>
      <div className="bookContainer" onClick={handleContainerClick}>
        <div className='iconDiv'>
          <i className="fa-solid fa-book-open" style={{ fontSize: '20px' }}></i>
        </div>
        <div className='bookTextDiv'>
          <h2>{book.title}</h2>
          <h2>By: {book.author}</h2>
        </div>
        <div className='moreButtonDiv'>
          <button onClick={handleButtonClick}>More</button>
        </div>
      </div>
    </>
  )
}

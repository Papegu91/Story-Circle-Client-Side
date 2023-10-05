import React from 'react';

export default function RecommendedBookItem({ book }) {
  return (
    <>
      <div className="recommendedBookContainer">
        <div className='iconDiv'>
          <i className="fa-solid fa-book-open" style={{ fontSize: '20px' }}></i>
        </div>
        <div className='bookTextDiv'>
          <h2>{book.title}</h2>
          <h2>By: {book.author}</h2>
        </div>
      </div>
    </>
  )
}

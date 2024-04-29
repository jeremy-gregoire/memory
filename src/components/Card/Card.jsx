import { useState } from 'react';
import './Card.css';

export default function Card({ imgSource, imgAlt }) {
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'></div>
        <div className='card-back'>
          <img src={imgSource} alt={imgAlt} />
        </div>
      </div>
    </div>
  );
}

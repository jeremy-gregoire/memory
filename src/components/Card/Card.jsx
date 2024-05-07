import './Card.css';

export default function Card({ item, isFlipped, onCardClick }) {
  return (
    <div onClick={() => onCardClick(item)} className={`card ${isFlipped ? 'card--flipped' : ''}`}>
      <div className='card__content'>
        <div className='card__front-face'>?</div>
        <div className='card__back-face'>
          <img src={item.imgSource} alt={item.imgAlt} />
        </div>
      </div>
    </div>
  );
}

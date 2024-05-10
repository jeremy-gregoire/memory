import Button from '../Button/Button';
import Title from '../Title/Title';

import './WinningModal.css';

export default function WinningModal({
  formatter,
  title,
  score,
  finalScore,
  highscore,
  isFirstTimePlayed,
  newGame,
  display,
}) {
  return (
    <div className={`winning-modal ${display ? 'show' : ''}`}>
      <div className='winning-modal__content row'>
        <Title className='winning-modal__title' titleText={title || title()} subtitle={true} />
        <div className='row col' style={{ width: '100%' }}>
          <span style={{ width: '250px' }}>Score : </span>
          <span>{formatter.format(score)}</span>
        </div>
        <div className='row col' style={{ width: '100%' }}>
          <span style={{ width: '250px' }}>Score final : </span>
          <span>{formatter.format(finalScore)}</span>
        </div>
        <div className='row col' style={{ width: '100%' }}>
          <span style={{ width: '250px' }}>Score élevé : </span>
          <span>{formatter.format(highscore)}</span>
        </div>
        <Button
          className='winning-modal__btn-play'
          text={isFirstTimePlayed ? 'Jouer' : 'Rejouer'}
          onButtonClick={newGame}
        />
      </div>
    </div>
  );
}

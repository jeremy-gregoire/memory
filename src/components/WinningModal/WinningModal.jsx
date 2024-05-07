import Button from '../Button/Button';
import Title from '../Title/Title';

import './WinningModal.css';

export default function WinningModal({
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
      <div className='winning-modal__content'>
        <Title className='winning-modal__title' titleText={title || title()} subtitle={true} />
        <p>Score : {score}</p>
        <p>Score final : {finalScore}</p>
        <p>Score élevé : {highscore}</p>
        <Button
          className='winning-modal__btn-play'
          text={isFirstTimePlayed ? 'Jouer' : 'Rejouer'}
          onButtonClick={newGame}
        />
      </div>
    </div>
  );
}

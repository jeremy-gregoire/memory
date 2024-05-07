import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

import Card from './components/Card/Card';
import Title from './components/Title/Title';
import WinningModal from './components/WinningModal/WinningModal';

import './App.css';

const shuffleArray = (array, n) => {
  if (n > array.length) {
    n = array.length;
  }

  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, n);
};

export default function App({ registryCards }) {
  const maxGameDuration = 300;
  const pointPerPair = 10;
  const secondsFactor = 1.5;
  const maxError = 10;
  const penalityPerError = 10;

  // A random cards array of beginnings
  const [cards, setCards] = useState(() => shuffleArray(registryCards, registryCards.length));

  // Array of flipped cards. This array is for pairs checking only and can't go more than 2 elements.
  const [openCards, setOpenCards] = useState(cards);

  // Array of cards that the pair have already be found
  const [clearCards, setClearCards] = useState([]);

  // A check for if the game has started or not
  const [hasStarted, start] = useState(false);

  // A check for if the player has played the game before
  const [firstTimeStarted, setFirstTimeStarted] = useState(true);

  // A check for the win of the player
  const [hasWin, win] = useState(false);

  // A check for the modal can show or not
  const [canShowModal, showModal] = useState(true);

  // Countdown before the end of the game, by default is set to 300 seconds (5 minutes)
  const [gameCountdown, setGameCountdown] = useState(maxGameDuration);

  // A check for the countdown can start or not
  const [canGameCountdownStart, startGameCountdown] = useState(false);

  // The current score of the player during the game
  const [score, setScore] = useState(0);

  // Score calculated at the end of the game and can serve to set up the highscore
  const [finalScore, setFinalScore] = useState(0);

  // High score the player have done so far
  const [highscore, setHighscore] = useLocalStorage('highscore', 0); // OH MY GOD A CUSTOM HOOK!!!

  // Number of error that the player made
  const [errorCount, setErrorCount] = useState(0);

  const secondsToMinutesText = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;

    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };

  /**
   * Calculates the final score when the player win the game.
   * @param {number} nbPairs Number of pairs found.
   * @param {number} nbSeconds Number of the seconds of the game made.
   * @param {number} nbErrors Number of error.
   */
  const calculateFinalScore = (nbPairs, nbSeconds, nbErrors) => {
    return parseInt(
      (
        nbPairs * pointPerPair +
        nbSeconds * secondsFactor -
        Math.min(nbErrors, maxError) * penalityPerError
      ).toFixed(0)
    );
  };

  /**
   * Adds a cards to the open cards array.
   * @param {object} card A card object.
   */
  const addToOpenCards = (card) => {
    if (openCards.length < 2 && !openCards.includes(card)) {
      setOpenCards([...openCards, card]);
    }
  };

  /**
   * Start a new game.
   */
  const newGame = async () => {
    // The game hasn't started
    if (hasStarted === false) {
      // Hide the grid
      setOpenCards([]);
      setClearCards([]);

      // Reset scores
      setScore(0);
      setFinalScore(0);

      // Reset the timer
      setGameCountdown(maxGameDuration);

      // Reset the number of error
      setErrorCount(0);

      setTimeout(() => {
        // Generate a new random grid
        setCards(() => shuffleArray(registryCards, registryCards.length));

        setTimeout(() => {
          // Show the grid
          setOpenCards([...cards]);
        }, 100);

        // Memorize time
        setTimeout(() => {
          // Hide the grid
          setOpenCards([]);
          startGameCountdown(true);
        }, 10000);
      }, 1000);

      // The game can start (after having a memorize time)
      start(true);
    }
  };

  // Just some print to help in the development
  useEffect(() => {
    if (hasStarted) {
      win(false);
      showModal(false);
    } else {
      showModal(true);
    }
  }, [hasStarted]);

  // Logic for the card cliking
  useEffect(() => {
    if (hasStarted) {
      if (openCards.length === 2) {
        if (openCards[0].item.twinReference === openCards[1].item.twinReference) {
          setClearCards([...clearCards, openCards[0], openCards[1]]);
          setOpenCards([]);
          setScore((prev) => prev + 10);
        } else {
          setTimeout(() => {
            setOpenCards([]);
            setErrorCount((prev) => prev + 1);
          }, 500);
        }
      }
    }
  }, [openCards]);

  // Logic for winning
  useEffect(() => {
    if (clearCards.length === cards.length) {
      start(false);
      setFirstTimeStarted(false);
      win(true);
      startGameCountdown(false);

      setFinalScore(() => calculateFinalScore(clearCards.length / 2, gameCountdown, errorCount));
      console.log('finalScore:', finalScore);

      showModal(true);
    }
  }, [clearCards]);

  useEffect(() => {
    if (canGameCountdownStart) {
      const intervalId = setInterval(() => {
        setGameCountdown((prev) => prev - 1);
      }, 1000);

      if (gameCountdown <= 0) {
        setFirstTimeStarted(false);
        win(false);
        start(false);
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }
  }, [canGameCountdownStart, gameCountdown]);

  useEffect(() => {
    if (errorCount === 10 && clearCards.length !== cards.length) {
      start(false);
      win(false);
      startGameCountdown(false);
      setFirstTimeStarted(false);
      showModal(true);
    }
  }, [errorCount]);

  useEffect(() => {
    if (finalScore > highscore) {
      setHighscore(finalScore);
    }
  }, [finalScore]);

  return (
    <>
      <header>
        <Title titleText='Minecraft Memory Game' />
      </header>
      <div className='content'>
        <div className='sidebar'>
          <div className='sidebar__content'>
            <div className='sidebar__content-row'>
              <span className='sidebar__content-col'>Score : </span>
              <span className='sidebar__content-col'>{score}</span>
            </div>
            <div className='sidebar__content-row'>
              <span className='sidebar__content-col'>Score Élevé : </span>
              <span className='sidebar__content-col'>{highscore}</span>
            </div>
            <div className='sidebar__content-row'>
              <span className='sidebar__content-col'>Temps restant : </span>
              <span className='sidebar__content-col'>{secondsToMinutesText(gameCountdown)}</span>
            </div>
            <div className='sidebar__content-row'>
              <span className='sidebar__content-col'>Éssaie : </span>
              <span className='sidebar__content-col'>
                {errorCount} / {maxError}
              </span>
            </div>
          </div>
        </div>
        <div className='card-content'>
          <div className='card-grid'>
            {cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  item={card.item}
                  isFlipped={openCards.includes(card) || clearCards.includes(card)}
                  onCardClick={() => addToOpenCards(card)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <WinningModal
        title={firstTimeStarted ? 'Jouer' : hasWin ? 'Vous avez gagné !' : 'Vous avez perdu !'}
        score={score}
        finalScore={finalScore}
        highscore={highscore}
        newGame={newGame}
        display={canShowModal}
        isFirstTimePlayed={firstTimeStarted}
      />
    </>
  );
}

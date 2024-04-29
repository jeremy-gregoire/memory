import Card from './components/Card/Card';
import './App.css';

function App() {
  const items = [
    { imgSource: 'src/assets/img/diamond_sword.png', imgAlt: 'Une épée en diamant' },
    { imgSource: 'src/assets/img/diamond_sword.png', imgAlt: 'Une épée en diamant' },
    { imgSource: 'src/assets/img/iron_door.png', imgAlt: 'Une porte en fer' },
    { imgSource: 'src/assets/img/iron_door.png', imgAlt: 'Une porte en fer' },
    { imgSource: 'src/assets/img/iron_hoe.png', imgAlt: 'Une faux en fer' },
    { imgSource: 'src/assets/img/iron_hoe.png', imgAlt: 'Une faux en fer' },
    { imgSource: 'src/assets/img/netherite_ingot.png', imgAlt: 'Un lingot de Netherite' },
    { imgSource: 'src/assets/img/netherite_ingot.png', imgAlt: 'Un lingot de Netherite' },
    { imgSource: 'src/assets/img/netherite_sword.png', imgAlt: 'Une épée en Netherite' },
    { imgSource: 'src/assets/img/netherite_sword.png', imgAlt: 'Une épée en Netherite' },
    { imgSource: 'src/assets/img/stone_shovel.png', imgAlt: 'Une pelle en pierre' },
    { imgSource: 'src/assets/img/stone_shovel.png', imgAlt: 'Une pelle en pierre' },
    { imgSource: 'src/assets/img/stone_sword.png', imgAlt: 'Une épée en pierre' },
    { imgSource: 'src/assets/img/stone_sword.png', imgAlt: 'Une épée en pierre' },
    { imgSource: 'src/assets/img/wooden_pickaxe.png', imgAlt: 'Une pioche en bois' },
    { imgSource: 'src/assets/img/wooden_pickaxe.png', imgAlt: 'Une pioche en bois' },
  ];

  const getRandomElements = (arr, n) => {
    if (n > arr.length) {
      n = arr.length;
    }

    const shuffledArr = [...arr];

    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }

    return shuffledArr.slice(0, n);
  };
  const randomItems = getRandomElements(items, 16);

  return (
    <>
      <div className='card-grid'>
        {randomItems.map((item) => {
          return <Card key={crypto.randomUUID()} imgSource={item.imgSource} imgAlt={item.imgAlt} />;
        })}
      </div>
    </>
  );
}

export default App;

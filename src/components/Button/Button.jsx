import './Button.css';

export default function Button({ text, onButtonClick }) {
  return (
    <button className='btn-minecraft' onClick={onButtonClick}>
      {text}
    </button>
  );
}

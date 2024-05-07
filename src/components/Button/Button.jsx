import './Button.css';

export default function Button({ text, onButtonClick }) {
  return <button onClick={onButtonClick}>{text}</button>;
}

import './Title.css';

export default function Title({ titleText, subtitle }) {
  return <h1 className={subtitle ? 'subtitle' : 'title'}>{titleText}</h1>;
}

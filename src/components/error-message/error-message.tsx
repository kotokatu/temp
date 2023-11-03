import './error-message.css';
import errorIcon from '../../assets/icons/error.png';
import { EmptyProps } from '../types';

const ErrorMessage: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="error-message card">
      <img className="error-icon" src={errorIcon} alt="error icon" />
      <h2 className="title font-weight-bold text-warning">Grr!</h2>
      <p className="text-warning">{`The all-seeing eye found the problem!`}</p>
      <p className="text-warning">{`(don't worry, we've sent orcs to handle it)`}</p>
      <h5 className="text-info">{`Please reload the page.`}</h5>
    </div>
  );
};

export default ErrorMessage;

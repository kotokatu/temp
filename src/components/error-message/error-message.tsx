import './error-message.css';
import errorIcon from '../../assets/icons/c3p0_icon.svg';

const ErrorMessage = () => {
  return (
    <div className="error-message card">
      <img className="error-icon" src={errorIcon} alt="error icon" />
      <h2 className="title font-weight-bold text-warning">Oops!</h2>
      <p className="text-warning">{`I'm a C-3PO and I'm here to help you`}</p>
      <p className="text-warning">{`(don't worry, we'll fix it now)`}</p>
      <h5 className="text-info">{`Please reload the page.`}</h5>
    </div>
  );
};

export default ErrorMessage;

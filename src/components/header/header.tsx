import { StateContext } from '../contexts';
import SearchBar from '../search-bar';
import { EmptyProps } from '../types';
import Logo from '../../assets/icons/logo.png';

import './header.css';

const Header: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div
      className="header navbar navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <img className="navbar-brand" src={Logo} />
        <StateContext.Consumer>
          {(state) => {
            return <SearchBar mainState={state} />;
          }}
        </StateContext.Consumer>
      </div>
    </div>
  );
};

export default Header;

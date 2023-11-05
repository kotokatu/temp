import { Context } from '../contexts';

import './main.css';
import ItemList from '../item-list';
import { EmptyProps } from '../types';
import Pagination from '../pagination';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="main container-fluid">
      <Context.Consumer>
        {(state) => {
          return <Pagination context={state} />;
        }}
      </Context.Consumer>
      <h2 className="text-center mb-3">Characters</h2>
      <Context.Consumer>
        {(state) => {
          return <ItemList context={state} />;
        }}
      </Context.Consumer>
    </div>
  );
};

export default Main;

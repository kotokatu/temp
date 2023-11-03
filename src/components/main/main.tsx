import { StateContext } from '../contexts';

import './main.css';
import ItemList from '../item-list';
import { EmptyProps } from '../types';
import Pagination from '../pagination';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="main container-fluid">
      <StateContext.Consumer>
        {(state) => {
          return <Pagination mainState={state} />;
        }}
      </StateContext.Consumer>
      <h2 className="text-center mb-3">Characters</h2>
      <StateContext.Consumer>
        {(state) => {
          return <ItemList mainState={state} />;
        }}
      </StateContext.Consumer>
    </div>
  );
};

export default Main;

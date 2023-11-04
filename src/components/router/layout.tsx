import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';

export default function Layout(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <Main />
      <ErrorButton />
    </div>
  );
}

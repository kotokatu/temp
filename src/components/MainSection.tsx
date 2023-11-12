import Search from '../components/Search';
import Status from '../components/Status';
import List from '../components/List/List';
import Page from '../components/Page/Page';
import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';

const MainSection = () => {
  const { status } = useContext(ThemeContext);
  const MainSectionOnLoad = () => {
    if (status === '...Loading') return <></>;
    return (
      <>
        <List />
        <Page />
      </>
    );
  };
  return (
    <section className="section-list">
      <Search />
      <Status />
      <MainSectionOnLoad />
    </section>
  );
};

export default MainSection;

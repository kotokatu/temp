import { Outlet, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';

const DetailSection = () => {
  const { status, items, linesPerPage } = useContext(ThemeContext);
  const { id } = useParams();
  const current = (Number(id) - 1 ?? 0) % linesPerPage;

  return (
    <section className="section-info">
      {status !== '...Loading' && <Outlet context={items[current]} />}
    </section>
  );
};

export default DetailSection;

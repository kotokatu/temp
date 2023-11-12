import {
  useSearchParams,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { RouterPath } from '../router/routes';
import { Detail } from '../API/api';

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const value = useOutletContext<Detail>() ?? {};

  return (
    <>
      <span>{Object(value).name}</span>
      <button
        className="button-close"
        onClick={() =>
          navigate(`${RouterPath.SEARCH}?page=${page}&limit=${limit}`)
        }
      >
        X
      </button>
      <br />
      <ul>
        {Object.entries(value).map(([key, value], index) =>
          index > 0 && index < 8 ? (
            <li key={`detail-${index}`}> {`${key}: ${value}`}</li>
          ) : (
            ''
          )
        )}
      </ul>
    </>
  );
};
export default DetailPage;

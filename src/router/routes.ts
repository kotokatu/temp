enum RouterPath {
  SEARCH = '/search',
  DETAIL = '/detail',
  ERROR_404 = '/error404',
  NOT_FOUND = '*',
}

const getSearchLink = (index: number | null, page: number, limit: number) => {
  const details = index !== null ? `/${index}` : '';
  return `${RouterPath.SEARCH}${details}?page=${page}&limit=${limit}`;
};

export { RouterPath, getSearchLink };

import React from 'react';

type Props = {
  current: number;
  count: number;
  linesPerPage: number;
  linksToPages: number;
  setCurrent: (current: number) => void;
};
type PageButton = { link: number; label: string };

class Page extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const page = this.props.current;
    const links = this.props.linksToPages;
    const count = Math.ceil(this.props.count / this.props.linesPerPage);
    const pageStart = Math.max(1, page - links);
    const pageEnd = Math.min(page + links, count);
    const plusStart = pageStart - page + links;
    const plusEnd = page + 1 - pageEnd;

    const pages: PageButton[] = [];
    const start = Math.max(1, pageStart - plusStart - plusEnd);
    const end = Math.min(start + 2 * links, count);
    if (page >= start && page <= count) {
      if (page > 1 + 2 * links) pages.push({ link: page - 1 - 2 * links, label: '<<' });
      if (page > 1) pages.push({ link: page - 1, label: '<' });
      for (let i = start; i <= end; i++) {
        const label = i === page ? `[${page}]` : `${i}`;
        const link = i;
        pages.push({ link, label });
      }
      if (page < count) pages.push({ link: page + 1, label: '>' });
    }
    return (
      <ul className='pages'>
        {pages.map(({ link, label }, index) => {
          return (
            <li className='pages' key={`page-${index}`}>
              <button key={`page-button-${index}`} onClick={() => this.props.setCurrent(link)}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Page;

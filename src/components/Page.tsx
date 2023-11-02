import React from 'react';

type Props = {
  current: number;
  count: number;
  linesPerPage: number;
  linksToPages: number;
  setCurrent: (current: number) => void;
};
type PageButton = { link: number; label: string };

const Page = (props: Props) => {
  const count = Math.ceil(props.count / props.linesPerPage);
  const pageStart = Math.max(1, props.current - props.linksToPages);
  const pageEnd = Math.min(props.current + props.linksToPages, count);
  const plusStart = pageStart - props.current + props.linksToPages;
  const plusEnd = props.current + 1 - pageEnd;

  const pages: PageButton[] = [];
  const start = Math.max(1, pageStart - plusStart - plusEnd - 1);
  const end = Math.min(start + 2 * props.linksToPages, count);
  if (props.current >= start && props.current <= count) {
    if (props.current > 1) pages.push({ link: props.current - 1, label: '<' });
    for (let i = start; i <= end; i++) {
      const label = i === props.current ? `[${props.current}]` : `${i}`;
      const link = i;
      pages.push({ link, label });
    }
    if (props.current < count)
      pages.push({ link: props.current + 1, label: '>' });
  }
  return (
    <ul className="pages">
      {pages.map(({ link, label }, index) => {
        return (
          <li className="pages" key={`page-${index}`}>
            <button
              key={`page-button-${index}`}
              onClick={() => props.setCurrent(link)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Page;

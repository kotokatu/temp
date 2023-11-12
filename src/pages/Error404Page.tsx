const testEnv = process.env.NODE_ENV === 'test';
const testNode = (index: number) =>
  testEnv ? { 'data-testid': `test-node${index}` } : {};
const Error404Page = () => {
  return <div {...testNode(404)}>Error404: Page Not Found</div>;
};

export default Error404Page;

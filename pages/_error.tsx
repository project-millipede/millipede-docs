import { NextPage } from 'next';

interface ErrorProps {
  statusCode: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>Error: {statusCode}</h1>
    </div>
  );
};

Error.getInitialProps = ({ res }) => {
  const statusCode = res?.statusCode || 500;

  return { statusCode };
};

export default Error;

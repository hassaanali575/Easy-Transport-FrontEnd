import Link from 'next/link';

const MyCustom404Page = (props) => {
  return (
    <div className="pageError">
      <h1>404</h1>
      <h2>
        <Link href="/">
          <a >
            Go To Home Page
          </a>
        </Link>
      </h2>
      <p>Sorry, the content you are looking for could not be found.</p>
    </div>
  );
};

export default MyCustom404Page;
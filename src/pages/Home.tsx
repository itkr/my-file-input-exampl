import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <h1>Samples</h1>
      <ul>
        <li>
          <a href="/sample">File Input Sample</a> - (
          <a href="https://github.com/itkr/my-file-input-exampl/blob/main/src/pages/FileInput.tsx">
            Code
          </a>
          )
        </li>
        <li>
          <a href="/hook">File Input Hook Sample</a> - (
          <a href="https://github.com/itkr/my-file-input-exampl/blob/main/src/pages/FileInput2.tsx">
            Code
          </a>
          )
        </li>
      </ul>
    </>
  );
};

export default Home;

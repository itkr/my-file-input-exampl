import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <h1>Samples</h1>
      <ul>
        <li>
          <a href="/sample">File Input Sample</a> - (
          <a href="https://github.com/itkr/my-file-input-example/blob/main/src/pages/FileInputSample.tsx">
            Code
          </a>
          )
        </li>
        <li>
          <a href="/hook">File Input Sample With Hook</a> - (
          <a href="https://github.com/itkr/my-file-input-example/blob/main/src/pages/FileInputSampleWithHook.tsx">
            Code
          </a>
          )
        </li>
      </ul>
    </>
  );
};

export default Home;

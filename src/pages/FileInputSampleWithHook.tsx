import { FC } from "react";
import { useForm } from "react-hook-form";
import useFileInput from "@/hooks/useFileInput";

const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");

const FileInputSampleWithHook: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const inputProps = register("file", {
    required: "ファイルを選択してください",
  });

  const { file, imageData, reset, selectFile, camera, contextHolder } =
    useFileInput(inputProps);

  const onSubmit = (values: any) => {
    console.log(values);
    alert("OK");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>File Input Sample With Hook</h1>
      <div style={{ textAlign: "center", padding: "1em" }}>
        {contextHolder}
        <button onClick={selectFile} type="button">
          📁 ファイルから選択
        </button>
        <button onClick={camera} type="button" disabled={!isMobile}>
          📷 カメラで撮影
        </button>
        <div
          style={{
            padding: "1em",
            border: "1px dotted #ccc",
            minHeight: "200px",
            background: "#eee",
          }}
        >
          {file && (
            <>
              <img
                src={imageData}
                style={{ margin: "auto", maxWidth: "100%" }}
              />
              <div>{file?.name}</div>
              <button onClick={reset}>❌ CLOSE</button>
            </>
          )}
        </div>
        <div>
          {errors.file && (
            <span style={{ color: "red" }}>
              {errors.file?.message?.toString()}
            </span>
          )}
        </div>
        <button type="submit">🔥 SUBMIT</button>
      </div>
    </form>
  );
};

export default FileInputSampleWithHook;

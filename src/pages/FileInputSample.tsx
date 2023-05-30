import { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";

const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");

const FileInputSample: FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [imageData, setImageData] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;
    deployment(files);
  };

  const { ref, ...rest } = register("file", {
    onChange,
    required: "ファイルを選択してください",
  });

  const selectFile = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  const camera = () => {
    if (!fileInput.current) return;
    fileInput.current.setAttribute("capture", "environment");
    fileInput.current.click();
  };

  // ファイルを選択した時の処理
  const deployment = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFileName(file.name);
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  // クローズボタンをクリックしたときの動作
  const reset = () => {
    setFileName("");
    setImageData("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const onSubmit = (values: any) => {
    console.log(values);
    alert("OK");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>File Input Sample</h1>
      <div style={{ textAlign: "center", padding: "1em" }}>
        <input
          type="file"
          id="file"
          ref={(e) => {
            ref(e);
            fileInput.current = e;
          }}
          accept="image/*"
          style={{ display: "none" }}
          {...rest}
        />
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
          {fileName && (
            <>
              <img
                src={imageData}
                style={{ margin: "auto", maxWidth: "100%" }}
              />
              <div>{fileName}</div>
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

export default FileInputSample;

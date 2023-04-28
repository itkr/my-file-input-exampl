import { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";

const isMobile = () => {
  return window.navigator.userAgent.toLowerCase().includes("mobile");
};

const FileInput: FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [imageData, setImageData] = useState("");
  const {
    handleSubmit,
    trigger,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      return;
    }
    deployment(files);
  };

  const { ref, ...rest } = register("file", {
    onChange,
    required: "ファイルを選択してください",
  });

  // ファイル選択ボタンかカメラアップロードボタンをクリックする
  const onClick = (capture: "environment" | "user" | false) => {
    if (fileInput.current) {
      if (capture) {
        fileInput.current.capture = capture;
      } else {
        fileInput.current.removeAttribute("capture");
      }
      fileInput.current.click();
    }
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
        <button
          onClick={() => {
            onClick(false);
          }}
        >
          📁 ファイルから選択
        </button>
        {"　"}
        <button
          onClick={() => {
            onClick("environment");
          }}
          disabled={!isMobile()}
        >
          📷 カメラで撮影
        </button>
        {"　"}
        <button
          onClick={() => {
            onClick("user");
          }}
          disabled={!isMobile()}
        >
          🤳 セルフィーで撮影
        </button>
        <div
          style={{
            margin: "1em auto",
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

export default FileInput;

import { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useFileInput from "@/hooks/useFileInput";

const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");

const FileInput: FC = () => {
  const {
    handleSubmit,
    trigger,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputProps = register("file", {
    required: "ファイルを選択してください",
  });

  const {
    fileName,
    imageData,
    reset,
    selectFile,
    camera,
    selfie,
    contextHolder,
  } = useFileInput(inputProps);

  const onSubmit = (values: any) => {
    console.log(values);
    alert("OK");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

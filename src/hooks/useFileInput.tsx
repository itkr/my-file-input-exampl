import { useState, useRef, InputHTMLAttributes } from "react";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: (e: HTMLInputElement | null) => void;
};

const useFileInput = (props: FileInputProps) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState("");
  const { ref, type, accept, style, onChange, ...rest } = props;

  const deployment = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFile(file);
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  // private
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;
    deployment(files);
    if (onChange) onChange(e);
  };

  // private
  const _ref = (e: HTMLInputElement | null) => {
    ref(e);
    fileInput.current = e;
  };

  const reset = () => {
    setFile(null);
    setImageData("");
    if (!fileInput.current) return;
    fileInput.current.value = "";
  };

  const trigger = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  const selectFile = () => {
    if (!fileInput.current) return;
    fileInput.current.removeAttribute("capture");
    trigger();
  };

  const camera = () => {
    if (!fileInput.current) return;
    fileInput.current.setAttribute("capture", "environment");
    trigger();
  };

  const selfie = () => {
    if (!fileInput.current) return;
    fileInput.current.setAttribute("capture", "user");
    trigger();
  };

  const contextHolder = (
    <input
      type={type || "file"}
      accept={accept || "image/*"}
      style={{ display: "none", ...style }}
      onChange={_onChange}
      ref={_ref}
      {...rest}
    />
  );

  return {
    file,
    imageData,
    reset,
    selectFile,
    camera,
    selfie,
    contextHolder,
    deployment,
  };
};

export default useFileInput;

import { FC, useState, useRef, InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: (e: HTMLInputElement | null) => void;
}

//const FileInput: FC<FileInputProps> = (props) => {
//  const fileInput = useRef<HTMLInputElement | null>(null);
//  const { ref, type, accept, style, ...rest } = props;
//  return (
//    <input
//      //id="file"
//      type={type || "file"}
//      accept={accept || "image/*"}
//      style={{ display: "none", ...style }}
//      onChange={onChangeInput}
//      ref={(e) => {
//        ref(e);
//        fileInput.current = e;
//      }}
//      {...rest}
//    />
//  );
//};

// FileInput, ImageDate, Trigger, FileInfo, Ref

const FileInput: FC<FileInputProps> = (props) => {
  const { ref, type, accept, style, onChange, ...rest } = props;
  const [fileName, setFileName] = useState("");
  const [imageData, setImageData] = useState("");
  const fileInput = useRef<HTMLInputElement | null>(null);

  const trigger = () => {
    if (!fileInput.current) {
      return;
    }
    fileInput.current.click();
  }

  const setAttribute = (name: string, value: string) => {
    if (!fileInput.current) {
      return;
    }
    fileInput.current.setAttribute(name, value);
  }

  const reset = () => {
    setFileName("");
    setImageData("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  // private
  const deployment = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFileName(file.name);
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  // private
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      return;
    }
    deployment(files);
    if (onChange) onChange(e);
  };

  return (
    <>
      <input
        //id="file"
        type={type || "file"}
        accept={accept || "image/*"}
        style={{ display: "none", ...style }}
        onChange={onChangeInput}
        ref={(e) => {
          ref(e);
          fileInput.current = e;
        }}
        {...rest}
      />
    </>
  );
};

// TODO: 実装
const useFileInput = () => {}

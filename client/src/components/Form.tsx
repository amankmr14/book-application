import React, { ChangeEventHandler, useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { convertToBase64 } from "../lib/utils";
import { trpc } from "../lib/trpc";
import TextInput from "./TextInput";
import plusIcon from "../assets/plus-icon.png";
import uploadIcon from "../assets/upload-icon.png";
import Button from "./Button";

type Props = {};

type FormValues = {
  title: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  readTime: string;
};

const Form = (props: Props) => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormValues>();
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const mutation = trpc.books.addBook.useMutation({
    onSuccess: () => {
      navigate("/")
    }
  });

  const onDrop = useCallback((file: File[]) => {
    convertToBase64(file[0]).then((res: any) => setContent(res));
  }, []);

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      convertToBase64(e.target.files[0]).then((res: any) => setThumbnail(res));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let formData = {
      ...data,
      content: content,
      thumbnail: thumbnail,
      readTime: parseInt(data.readTime)
    };
    mutation.mutate({...formData})
    console.log(formData);
  };
  return (
    <form className="w-full flex p-10">
        {!preview ? (
          <div className="border border-dashed border-primary min-w-[400px] rounded-lg mr-10">
            <label
              htmlFor="fileInput"
              className="text-primary w-full h-full cursor-pointer underline flex flex-col justify-center items-center "
            >
              <img
                src={plusIcon}
                alt="Add File"
                height="16px"
                width="16px"
                className=""
              />
              Add a Book Cover
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleThumbnail}
            />{" "}
          </div>
        ) : (
          <img src={preview} className="max-h-[550px] w-[400px] rounded-lg mr-10"/>
        )}

      <div className="flex flex-col flex-1">
        <div className="form-label">Name of the Book</div>
        <TextInput
          placeholder="Enter the published name"
          {...register("title")}
        />
        <div className="flex">
          <div className="flex flex-col flex-1 me-3">
            <div className="form-label pt-3">Author of the Book</div>
            <TextInput
              placeholder="Add all the authors comma seperated"
              {...register("author")}
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="form-label pt-3">Book read time</div>
            <TextInput
              placeholder="Add time in mins"
              {...register("readTime")}
            />
          </div>
        </div>
        <div className="form-label pt-3">Book Details</div>
        <TextInput
          placeholder="Should not be more than 300 words"
          muliLine={true}
          {...register("description")}
        />
        <div className="pt-3">Upload PDF</div>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }: any) => {
            return (
              <section
                {...getRootProps()}
                className="border border-dashed self-start p-3 flex items-center justify-center cursor-pointer rounded-lg min-h-[100px] min-w-[250px]"
              >
                <input {...getInputProps()} {...register("content")} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <div>
                    <img
                      src={uploadIcon}
                      alt=""
                      width="20px"
                      height="20px"
                      className="mx-auto"
                    />
                    <span className="text-primary underline">Browse</span>
                    <span> or drop file here</span>
                  </div>
                )}
              </section>
            );
          }}
        </Dropzone>
        <Button
          text="Add Book"
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default Form;

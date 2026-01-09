import React, { useState } from "react";

import { DropzoneOptions, useDropzone } from "react-dropzone";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

type AvatarUploadProps = {
  defaultValue: string;
  className: string;
  loading?: boolean;
  onChange: (file: File) => void;
} & DropzoneOptions;

export function AvatarUpload(props: AvatarUploadProps) {
  const { className, loading, onChange, defaultValue, disabled, ...rest } =
    props;
  const [file, setFile] = useState<any>();

  const { enqueueSnackbar } = useSnackbar();

  const dropzone = useDropzone({
    ...rest,
    disabled: loading || disabled,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
    onDropAccepted(fileAccepted) {
      const acceptedFile = fileAccepted.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      // @ts-ignore
      onChange(fileAccepted?.[0]);
      setFile(acceptedFile?.[0]);
    },
    onDropRejected(fileRejections) {
      fileRejections.forEach((rejection) => {
        enqueueSnackbar(
          `"${rejection.file.name}" - ${rejection.errors[0].message}`,
          { variant: "error" }
        );
      });
    },
  });

  const url = file?.preview || defaultValue;

  return (
    <div
      className="relative flex justify-center items-center"
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps()} />
      <Avatar src={url} className={clsx(className, "relative")} />
      {loading && <CircularProgress color="primary" className="absolute" />}
      <IconButton
        disabled={disabled || loading}
        variant="filled"
        color="primary"
        className="absolute bg-gray-50"
      >
        <Icon icon="fluent-mdl2:edit-solid-12" />{" "}
      </IconButton>
    </div>
  );
}

export default AvatarUpload;

AvatarUpload.defaultProps = {
  multiple: false,
  maxFiles: 1,
  minSize: 50,
  maxSize: 1024 * 5000,
};

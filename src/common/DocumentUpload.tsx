import { useDropzone, DropzoneOptions } from "react-dropzone";
import clsx from "clsx";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { CardActionArea, Icon, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { formatBytes } from "utils/file";
import { DOCUMENT_TYPE } from "constants/global";

type UploadFile = {
  preview: string;
} & File;

export default function DocumentUpload(
  props: Partial<DocumentUploadProps> & DropzoneOptions
) {
  const {
    className,
    title,
    helperText,
    disabled,
    onDropAccepted,
    maxSize,
    activeFile,
    setActiveFile,
    onchangeFile,
    isActiveTab,
    ...rest
  } = props;
  const [files, setFiles] = useState<UploadFile[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const dropzone = useDropzone({
    ...rest,
    disabled,
    maxSize,
    onDropAccepted(fileAccepted) {
      const acceptedFile = fileAccepted.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prev) => {
        const newFiles = [...prev, ...acceptedFile];
        if (onchangeFile) {
          onchangeFile([...newFiles]);
        }
        return newFiles;
      });
    },
    onDropRejected(fileRejections) {
      fileRejections.forEach((rejection) => {
        if (rejection.errors[0].code?.toLocaleLowerCase() === "file-too-large")
          enqueueSnackbar(
            <Typography className="max-w-500 text-white">
              <b>Exceeded File Size</b> - Max size per file is{" "}
              {formatBytes(maxSize)}.
            </Typography>,
            {
              anchorOrigin: {
                horizontal: "center",
                vertical: "top",
              },
            }
          );
      });
    },
  });

  const thumbs = files?.map((file, index) => (
    <div key={file.name}>
      <CardActionArea
        onClick={() => setActiveFile(index)}
        className={clsx(
          "thumb-preview",
          activeFile === index && "thumb-preview__active"
        )}
      >
        {DOCUMENT_TYPE.IMG.includes(file?.type) && (
          <img
            loading="lazy"
            src={file?.preview}
            className="object-cover w-full h-full rounded-lg"
            alt=""
          />
        )}

        {DOCUMENT_TYPE.PDF.includes(file?.type) && (
          <div className="h-[40px] w-full  min-w-[30px] overflow-hidden rounded-lg">
            <InlineIcon color="#DFDFDF" icon="solar:document-bold-duotone" />
          </div>
        )}
      </CardActionArea>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  useEffect(() => {
    if (isActiveTab === false) {
      setFiles([]);
    }
  }, [isActiveTab]);

  return (
    <div className={clsx(className, "h-full flex justify-center w-full")}>
      <div className="message-upload">
        {files?.length >= 1 ? (
          <>
            <CardActionArea className="message-upload--preview">
              <div className="message-upload--preview__image">
                <div className="w-full h-full">
                  {/* Image */}
                  {DOCUMENT_TYPE.IMG.includes(
                    files?.[activeFile || 0]?.type
                  ) && (
                    <img
                      loading="lazy"
                      src={files[activeFile || 0]?.preview}
                      className="w-full rounded-lg object-cover"
                      alt=""
                    />
                  )}

                  {/* PDF */}
                  {DOCUMENT_TYPE.PDF.includes(
                    files[activeFile || 0]?.type?.toLocaleLowerCase()
                  ) && (
                    <div className="h-[330px] w-full  min-w-[100px] md:min-w-[300px] overflow-y-auto overflow-x-hidden  rounded-lg">
                      <object
                        draggable
                        data={files[activeFile || 0]?.preview}
                        type="application/pdf"
                        className="h-[330px] w-full  min-w-[100px] md:min-w-[300px] rounded-lg"
                      >
                        <p>Pdf Document</p>
                      </object>
                    </div>
                  )}
                </div>
              </div>
            </CardActionArea>

            <div className="flex justify-center mt-5">
              <div className="text-center max-w-[200px] mt-1">
                <Typography component="p" noWrap fontWeight={600}>
                  {files[activeFile || 0]?.name}
                </Typography>
                <Typography
                  className="mt-1"
                  variant="body2"
                  color="gray"
                  component="p"
                >
                  {formatBytes(files[activeFile || 0]?.size)}
                </Typography>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="message-upload--preview"
              {...dropzone.getRootProps()}
            >
              <div className="message-upload--preview__no-image">
                <div>
                  <input {...dropzone.getInputProps()} />
                  <div className="bg-[#D9E8FF] px-5 py-4 rounded-full w-fit">
                    <Icon
                      sx={{ color: "#0065FF", fontSize: 18 }}
                      className="material-symbols-outlined"
                    >
                      cloud_upload
                    </Icon>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 mb-4">
              <div className="text-center max-w-[200px]  mt-5">
                <Typography component="p">
                  Drag & drop {title} here or{" "}
                  <b>
                    <Link component="button" onClick={dropzone.open}>
                      Browse
                    </Link>
                  </b>{" "}
                  to upload
                </Typography>
                <Typography
                  className="mt-4"
                  variant="body2"
                  color="gray"
                  component="p"
                >
                  Max size per file: {formatBytes(maxSize)}.
                </Typography>
              </div>
            </div>
          </>
        )}

        {thumbs?.length >= 1 && (
          <div className="flex justify-center mt-5 gap-4">
            <div className="overflow-x-scroll">
              <div className="flex flex-row gap-4  justify-center">
                {thumbs}
              </div>
            </div>

            <CardActionArea
              {...dropzone.getRootProps()}
              onClick={dropzone.open}
              className="thumb-preview flex items-center justify-center"
            >
              <input {...dropzone.getInputProps()} />
              <Icon>add</Icon>
            </CardActionArea>
          </div>
        )}
      </div>
    </div>
  );
}

DocumentUpload.defaultProps = {
  maxSize: 1024 * 5000,
};

interface DocumentUploadProps {
  label: string;
  error: string;
  helperText: string;
  className: string;
  title: string;
  setActiveFile: any;
  activeFile: number;
  onchangeFile: any;
  isActiveTab: boolean | undefined;
}

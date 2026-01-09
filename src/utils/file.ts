/**
 *
 * @param {Blob} blob
 * @param {string} [fileName='file']
 */
export function downloadFile(blob: Blob, fileName = "file") {
  if (blob instanceof Blob) {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  }
}

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getFileExtension(fileName: string) {
  return fileName?.split(".")?.pop();
}

export function getFileType(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

export function getFileName(url) {
  let filename;
  try {
    filename = new URL(url).pathname.split("/").pop();
  } catch (e) {
    console.error(e);
  }
  return filename;
}

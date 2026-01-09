import { Viewer } from "@react-pdf-viewer/core";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { DocumentTypeEnum } from "constants/assets";

/**
 *
 * @param {title} string
 * @param {url} string
 *  @param {type} "pdf" | "image"
 * @returns
 */
type FilePreviewCardProps = {
  title?: string;
  url: any;
  type: "pdf" | "image";
};
export default function FilePreviewCard(props: FilePreviewCardProps) {
  const { title, url, type } = props;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="m-3 relative">
      <Card className="h-[500px]">
        <CardActionArea>
          {DocumentTypeEnum.PDF.includes(type) && (
            <div className="h-[500px] overflow-x-auto">
              <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
            </div>
          )}

          {DocumentTypeEnum.IMG.includes(type) && (
            <>
              <CardMedia
                component="img"
                className="w-full h-[500px] object-contain"
                image={url}
                loading="lazy"
                alt={title}
              />
            </>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
}

FilePreviewCard.defaultProps = {
  type: "image",
};

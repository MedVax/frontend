import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

interface WhatsAppButtonProps {
  onClick?: () => void;
  href?: string;
}

export function WhatsAppButton({ onClick, href }: WhatsAppButtonProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank");
    }
    onClick?.();
  };

  return (
    <IconButton
      component="a"
      href="https://wa.me/2348123834240"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      sx={{
        backgroundColor: "#dcfce7",
        borderRadius: "99px",
        "&:hover": {
          backgroundColor: "#bbf7d0",
        },
      }}
    >
      <Icon
        icon="ic:round-whatsapp"
        width="20"
        height="20"
        style={{ color: "#25D366" }}
      />
    </IconButton>
  );
}

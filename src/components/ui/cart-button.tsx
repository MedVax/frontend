import { IconButton, Badge } from "@mui/material";
import { CartLarge } from "@solar-icons/react";

interface CartButtonProps {
  count?: number;
  onClick?: () => void;
}

export function CartButton({ count = 0, onClick }: CartButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "relative",
        width: 48,
        height: 48,
        borderRadius: "99px",
        p: 1.5,
      }}
    >
      <CartLarge size={24} />
      {count > 0 && (
        <Badge
          badgeContent={count}
          sx={{
            position: "absolute",
            top: 14,
            right: 15,
            "& .MuiBadge-badge": {
              backgroundColor: "#e91d74",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              minWidth: 14,
              height: 14,
              padding: "4px",
            },
          }}
        />
      )}
    </IconButton>
  );
}

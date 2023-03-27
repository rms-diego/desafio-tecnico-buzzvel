import { QRCodeCanvas } from "qrcode.react";

interface QRCodeCanvaProps {
  username: string;
}

export function QRCodeCanva({ username }: QRCodeCanvaProps) {
  return (
    <QRCodeCanvas
      value={`${import.meta.env.BASE_URL}/profile/${username}`}
      size={250}
    />
  );
}

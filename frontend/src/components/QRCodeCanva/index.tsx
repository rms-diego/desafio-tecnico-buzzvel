import { QRCodeSVG } from "qrcode.react";

interface QRCodeCanvaProps {
  username: string;
}

export function QRCodeCanva({ username }: QRCodeCanvaProps) {
  const redirectUrl = `${import.meta.env.VITE_APP_URL}/profile/${username}`;

  return <QRCodeSVG value={redirectUrl} href={redirectUrl} size={250} />;
}

import { QRCodeCanvas } from "qrcode.react";

export function QRCodeCanva() {
  return <QRCodeCanvas value={import.meta.env.BASE_URL} size={250} />;
}

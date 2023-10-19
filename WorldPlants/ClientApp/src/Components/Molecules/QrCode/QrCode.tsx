import { QrCodeItem } from "../../../Interfaces/QrCodeItem";
import {
  Qr,
  QrCodeFlexColumnWrapper,
  QrCodeWrapper,
  QrDescriptionLabel,
  RemoveCodeButton,
} from "./QrCode.styles";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  qrCodeItem: QrCodeItem;
  deleteFunction: (id: number) => void;
}

const QrCode = (props: Props) => {
  const { qrCodeItem, deleteFunction } = props;

  const createQr = (plantId: string) => {
    return <QRCodeSVG value={plantId} />;
  };

  return (
    <QrCodeWrapper>
      <QrCodeFlexColumnWrapper>
        <QrDescriptionLabel>{qrCodeItem.plantName}</QrDescriptionLabel>
      </QrCodeFlexColumnWrapper>
      <Qr>{createQr(qrCodeItem.plantId)}</Qr>
      <RemoveCodeButton onClick={() => deleteFunction(qrCodeItem.id)}>
        X
      </RemoveCodeButton>
    </QrCodeWrapper>
  );
};

export default QrCode;

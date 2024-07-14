import { ReactNode, cloneElement } from "react";
import { ConfirmOptions } from "../../contexts/confirm";
import classes from "./index.module.css";


type ConfirmDialogProps = {
  title?: ReactNode;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  options: ConfirmOptions;
};
export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  options,
}: ConfirmDialogProps) {
  
  const {
    Root,
    Overlay,
    Content,
    Title,
    Description,
    Close,
    Confirm,
  } = options.components

  return (
      cloneElement(Root, {...Root.props, key: "root"}, [
        cloneElement(Overlay, {...Overlay.props, className: `${classes.DialogOverlay} ${Overlay.props.className}`, key: "overlay"}, [
          cloneElement(Content, {...Content.props, className: `${classes.DialogContent} ${Content.props.className}`, key: "content"}, [
            cloneElement(Title, {...Title.props, key: "title"}, title),
            cloneElement(Description, {...Description.props, key: "description"}, message),
            cloneElement(Close, { ...Close.props, key: "close", onClick: onCancel }, options.cancelText
            ),
            cloneElement(Confirm, { ...Confirm.props, key: "confirm", onClick: onConfirm }, options.okText),
          ]),
        ]),
      ])
  );
}
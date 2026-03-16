import React from "react";
import { TOptions } from "i18next";
import { TxKeyPath } from "i18n";
import { AppText, AppTextProps } from "../AppText";

type AppInputLabelProps = {
  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: TOptions;
} & AppTextProps;

export const AppInputLabel: React.FC<AppInputLabelProps> = ({
  label,
  labelTx,
  labelTxOptions,
  ...rest
}) => {
  return !!labelTx || !!label ? (
    <AppText tx={labelTx} txOptions={labelTxOptions} {...rest}>
      {label}
    </AppText>
  ) : undefined;
};

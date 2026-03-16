import { formatDate, formatISO } from "date-fns";
import { useAppTheme } from "provider";
import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import { style } from "theme";
import { AppButton } from "../AppButton";
import { AppTextInputProps } from "../AppInput";
import { AppModal } from "../AppModal";

type AppDatePickerProps = {
  format?:
    | "dd/MM/yyyy"
    | "dd MMM yyyy"
    | "dd/MM"
    | "dd MMM"
    | "dd MM"
    | "dd-MM-yyyy"
    | "dd.MM.yyyy"
    | "dd MMMM yyyy";
  onValueChange?: (value: string) => void;
  formatValue?: (value: string) => string;
  children: (value: string) => React.ReactElement;
} & AppTextInputProps &
  Omit<DatePickerProps, "date">;

export const AppDatePicker: React.FC<AppDatePickerProps> = ({
  format = "dd/MM/yyyy",
  value,
  onValueChange,
  formatValue,
  children,
  ...rest
}) => {
  const { colorSchemeName } = useAppTheme();

  const [visible, setVisible] = useState<boolean>(false);

  const tempData = useRef<Date>(undefined);

  const handleConfirmed = (date: Date | undefined) => {
    setVisible(false);
    if (date !== undefined) onValueChange?.(formatISO(date));
    tempData.current = undefined;
  };

  const handleCanceled = () => {
    setVisible(false);
    tempData.current = undefined;
  };

  const formatedValue = value
    ? formatValue
      ? formatValue(value)
      : formatDate(value, format)
    : "";

  return (
    <Pressable
      onPress={() => setVisible(true)}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View pointerEvents="box-only">{children(formatedValue)}</View>
      <AppModal visible={visible} onRequestClose={handleCanceled}>
        <View style={style.align_center}>
          <DatePicker
            {...rest}
            date={value ? new Date(value) : new Date()}
            theme={colorSchemeName === "dark" ? "dark" : "light"}
            mode="date"
          />
        </View>
        <AppButton
          titleTx="common.continue"
          onPress={() => handleConfirmed(tempData.current)}
          style={[style.mx_lg, style.mb_lg]}
        />
      </AppModal>
    </Pressable>
  );
};

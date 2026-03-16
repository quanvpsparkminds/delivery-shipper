import React, { useRef, useState } from "react";
import { AppTextInput, AppTextInputProps } from "../AppInput/AppInput";
import { Image, Pressable, View } from "react-native";
import { images } from "@assets/index";
import { formatDate, formatISO } from "date-fns";
import { useAppTheme } from "provider";
import { AppModal } from "../AppModal";
import { style } from "theme";
import { AppButton } from "../AppButton";
import DatePicker, { DatePickerProps } from "react-native-date-picker";

export type AppDateInputProps = {
  format?:
    | "dd/MM/yyyy"
    | "dd MMM yyyy"
    | "dd/MM"
    | "dd MMM"
    | "dd MM"
    | "dd-MM-yyyy"
    | "dd.MM.yyyy"
    | "dd MMMM yyyy"
    | "dd/MM/yyyy HH:mm:ss"
    | "HH:mm:ss";
  onValueChange?: (value: string) => void;
  formatValue?: (value: string) => string;
  mode?: "date" | "time" | "datetime";
  disable?: boolean;
} & AppTextInputProps &
  Omit<DatePickerProps, "date">;

export const AppDateInput: React.FC<AppDateInputProps> = ({
  format = "dd/MM/yyyy",
  value,
  onValueChange,
  formatValue,
  mode = "date",
  disable,
  ...rest
}) => {
  const { colorSchemeName } = useAppTheme();

  const [visible, setVisible] = useState<boolean>(false);

  const tempData = useRef<Date>(undefined);

  const handleConfirmed = (date: Date | undefined) => {
    setVisible(false);
    onValueChange?.((date ?? new Date())?.toISOString());
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
      disabled={disable}
    >
      <View pointerEvents="none" >
        <AppTextInput
          {...rest}
          Left={({ tintColor }) => (
            <Image source={images.calendar} tintColor={tintColor} />
          )}
          value={formatedValue}
        />
      </View>
      <AppModal visible={visible} onRequestClose={handleCanceled}>
        <View style={style.align_center}>
          <DatePicker
            {...rest}
            date={value ? new Date(value) : new Date()}
            onConfirm={handleConfirmed}
            onCancel={handleCanceled}
            onDateChange={(date) => {
              console.log(date);

              tempData.current = date ?? new Date();
            }}
            theme={colorSchemeName === "dark" ? "dark" : "light"}
            mode={mode}
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

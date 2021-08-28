import React from "react";
import styled from "styled-components";

const Input = styled.TextInput`
  width: 95%;
  height: 100%;
  font-family: Roboto-Regular;
  font-size: 13.5px;
  padding: 0;
`;

const AuthInput = ({
  style,
  placeholder,
  placeholderTextColor,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  secureTextEntry = false,
  onSubmitEditing = () => null,
  onEndEditing = () => null,
  autoCorrect = true,
  maxLength = 30,
  onFocus = () => null,
  onBlur = () => null,
}) => (
  <>
    <Input
      style={style}
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={onEndEditing}
      autoCorrect={autoCorrect}
      maxLength={maxLength}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </>
);

export default AuthInput;
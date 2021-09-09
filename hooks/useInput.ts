import React, { useState } from "react";

const useInput = (intialValue: any) => {
  const [value, setValue] = useState(intialValue);
  const onChange = (text: string) => {
    setValue(text);
  };
  return { value, onChange, setValue };
};

export default useInput;

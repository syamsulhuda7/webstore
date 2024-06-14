// Button.tsx

import { useState } from "react";
import styles from "./button.module.scss";

type sendProps = {
  sendValue: (value: number) => void;
  lcValue: number | undefined;
}

export default function Button ({sendValue, lcValue}: sendProps) {
    const [value, setValue] = useState<number>(0);

    const add = () => {
        setValue(value + 1);
        sendValue(value + 1);
    }
    const min = () => {
        if (value > 0) {
            setValue(value - 1);
            sendValue(value - 1);
        }
    }
  return (
    <div className={styles.container}>
      <button onClick={min}>-</button>
      <p>{value === 0 ? lcValue : value}</p>
      <button onClick={add}>+</button>
    </div>
  );
}

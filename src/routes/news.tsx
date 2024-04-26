import { useState } from "react";

export default function News(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form>
        <input onChange={onChange} value={inputValue} />
        <button>Search</button>
      </form>
    </div>
  );
}

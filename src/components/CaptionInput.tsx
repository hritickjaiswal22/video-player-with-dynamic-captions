import { useState } from "react";

interface Props {
  id: number;
  inputChangeHandler: (val: number, valS: string) => void;
  removeHandler: (id: number) => void;
}

function CaptionInput({ inputChangeHandler, id, removeHandler }: Props) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [caption, setCaption] = useState("");

  function minuteChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val >= 0) {
      setMinutes(val);
      inputChangeHandler(val * 60 + seconds, caption);
    }
  }

  function secondChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val >= 0 && val <= 59) {
      setSeconds(val);
      inputChangeHandler(minutes * 60 + val, caption);
    }
  }

  function captionChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    setCaption(val);
    inputChangeHandler(minutes * 60 + seconds, val);
  }

  return (
    <div
      key={id}
      className="flex flex-wrap gap-2 flex-row justify-between items-center my-2"
    >
      <div className="flex-row">
        <input
          type="number"
          value={minutes}
          onChange={minuteChangeHandler}
          min={0}
          className="p-1 border border-gray-400 rounded w-[100px] mr-4"
        />
        <input
          type="number"
          value={seconds}
          onChange={secondChangeHandler}
          min={0}
          max={59}
          className="p-1 border border-gray-400 rounded w-[100px]"
        />
      </div>
      <input
        placeholder="Caption for this timestamp"
        className="flex-1 p-1 border border-gray-400 rounded mr-4"
        value={caption}
        onChange={captionChangeHandler}
      />
      <button
        onClick={() => removeHandler(id)}
        className="bg-red-500 text-white text-xs font-normal py-2 px-4 flex justify-center items-center rounded-xl"
      >
        Remove
      </button>
    </div>
  );
}

export default CaptionInput;

import "./App.css";

import { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface InputType {
  startSecond: number;
  captionToDisplay: string;
}

interface Props {
  url: string;
  inputs: Array<InputType>;
}

function VideoPlayerWithCaptions({ inputs, url }: Props) {
  function progressHandler(e: OnProgressProps) {
    const { playedSeconds } = e;

    for (let i = 0; i < inputs.length; i++) {
      const { captionToDisplay, startSecond } = inputs[i];

      if (Math.floor(playedSeconds) >= startSecond) {
        setCaptions(captionToDisplay);
      }
    }
  }

  const [captions, setCaptions] = useState("");

  return (
    <article className="max-w-[90%] mx-auto my-8">
      <main className="relative pt-[56.25%]">
        <ReactPlayer
          url={url}
          className="absolute top-0 left-0"
          playing
          width="100%"
          height="100%"
          onProgress={progressHandler}
          controls={true}
        />
        <h1 className="absolute top-[90%] left-1/2 font-bold text-3xl text-white -translate-x-1/2">
          {captions}
        </h1>
      </main>
    </article>
  );
}

// function App() {
//   return (
//     <VideoPlayerWithCaptions
//       inputs={[
//         {
//           startSecond: 5,
//           captionToDisplay: "Hello World",
//         },
//         {
//           startSecond: 10,
//           captionToDisplay: "Hello Hritick",
//         },
//         {
//           startSecond: 15,
//           captionToDisplay: "Bye World",
//         },
//       ]}
//       url="https://www.youtube.com/watch?v=N34dx3umMAs"
//     />
//   );
// }

interface TimeInputProps {
  inputChangeHandler: (val: number) => void;
}

function TimeInput({ inputChangeHandler }: TimeInputProps) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function minuteChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val >= 0) {
      setMinutes(val);
      inputChangeHandler(val * 60 + seconds);
    }
  }

  function secondChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val >= 0 && val <= 59) {
      setSeconds(val);
      inputChangeHandler(minutes * 60 + val);
    }
  }

  return (
    <div className="flex-row gap-4">
      <input
        type="number"
        value={minutes}
        onChange={minuteChangeHandler}
        min={0}
        className="p-1 border border-gray-400 rounded w-[200px]"
      />
      <input
        type="number"
        value={seconds}
        onChange={secondChangeHandler}
        min={0}
        max={59}
        className="p-1 border border-gray-400 rounded w-[200px]"
      />
    </div>
  );
}

function App() {
  const [input, setInput] = useState({
    url: "",
    timestamps: [5],
  });
  const [value, onChange] = useState("10:20");

  return (
    <article className="h-dvh flex justify-center items-center flex-col gap-8">
      <input
        className="p-4 border border-gray-400 rounded-2xl w-[70%]"
        onChange={(e) => {
          setInput((temp) => {
            return {
              ...temp,
              url: e.target.value,
            };
          });
        }}
        placeholder="Enter url"
      />

      <div className="p-4 border border-gray-400 rounded-2xl w-[70%]">
        <TimeInput inputChangeHandler={(val) => console.log(val)} />
      </div>
    </article>
  );
}

export default App;

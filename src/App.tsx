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

interface TimeInputProps {
  id: number;
  inputChangeHandler: (val: number, valS: string) => void;
  removeHandler: (id: number) => void;
}

function CaptionInput({
  inputChangeHandler,
  id,
  removeHandler,
}: TimeInputProps) {
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

function App() {
  const [captions, setCaptions] = useState([
    {
      id: 32434,
      timestamp: 0,
      caption: "",
    },
  ]);
  const [url, setUrl] = useState("");
  const [showVideoSection, setShowVideoSection] = useState(false);

  function removeHandler(id: number) {
    const temp = captions.filter((caption) => caption.id !== id);

    if (temp.length >= 1) setCaptions(temp);
  }

  function addMoreHandler() {
    const temp = [...captions];
    temp.push({
      id: Date.now(),
      timestamp: 0,
      caption: "",
    });

    setCaptions(temp);
  }

  function reset() {
    setShowVideoSection(false);
    setCaptions([
      {
        id: 32434,
        timestamp: 0,
        caption: "",
      },
    ]);
    setUrl("");
  }

  if (showVideoSection)
    return (
      <main>
        <button
          onClick={reset}
          className="bg-green-500 m-4 mb-0 text-white font-bold py-2 px-4 flex justify-center items-center rounded-xl"
        >
          Go Back
        </button>
        <VideoPlayerWithCaptions
          inputs={captions.map((caption) => {
            return {
              captionToDisplay: caption.caption,
              startSecond: caption.timestamp,
            };
          })}
          url={url}
        />
      </main>
    );

  return (
    <article className="h-dvh flex justify-center items-center flex-col gap-8">
      <input
        className="p-4 border border-gray-400 rounded-2xl w-[70%]"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter url"
      />

      <div className="w-[70%] text-left">
        <h1 className="text-2xl font-semibold">Add Captions</h1>
        <p className="text-gray-500">Format Mins Secs</p>
      </div>

      <div className="p-4 border border-gray-400 rounded-2xl w-[70%] h-[358px] overflow-y-auto">
        {captions.map((caption, index) => (
          <CaptionInput
            key={caption.id}
            id={caption.id}
            removeHandler={removeHandler}
            inputChangeHandler={(val, cap) => {
              const temp = [...captions];
              temp[index] = { ...temp[index] };
              temp[index].timestamp = val;
              temp[index].caption = cap;

              setCaptions(temp);
            }}
          />
        ))}
      </div>

      <div className="flex flex-row gap-4">
        <button
          onClick={addMoreHandler}
          className="bg-blue-500 text-white font-bold py-2 px-4 flex justify-center items-center rounded-xl"
        >
          Add More
        </button>

        <button
          disabled={!url || captions.length < 0}
          onClick={() => setShowVideoSection(true)}
          className={`${
            !url || captions.length < 0 ? "bg-gray-500" : "bg-green-500"
          } text-white font-bold py-2 px-4 flex justify-center items-center rounded-xl`}
        >
          Watch Video
        </button>
      </div>
    </article>
  );
}

export default App;

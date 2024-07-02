import "./App.css";
import VideoPlayerWithCaptions from "./components/VideoPlayerWithCaptions";
import CaptionInput from "./components/CaptionInput";

import { useState } from "react";

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

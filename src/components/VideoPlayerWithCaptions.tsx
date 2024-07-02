import { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import Draggable from "react-draggable";
import ColorPicker from "react-pick-color";

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
  const [captionOptions, setCaptionOptions] = useState({
    textSize: "3rem",
    captionColor: "#fff",
  });

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
        <Draggable bounds="body">
          <h1
            className={`box cursor-grab absolute top-[90%] left-1/2 font-bold -translate-x-1/2`}
            style={{
              fontSize: captionOptions.textSize,
              color: captionOptions.captionColor,
            }}
          >
            {captions}
          </h1>
        </Draggable>
      </main>

      <div className="my-8 flex flex-row justify-between items-center">
        <div>
          <label
            htmlFor="fontSize"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select caption font size
          </label>
          <select
            id="fontSize"
            value={captionOptions.textSize}
            onChange={(e) => {
              setCaptionOptions((temp) => {
                return {
                  ...temp,
                  textSize: e.target.value,
                };
              });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a caption size</option>
            <option value="1rem">Super small</option>
            <option value="2rem">Small</option>
            <option value="3rem">Medium</option>
            <option value="4rem">Large</option>
            <option value="5rem">Super large</option>
          </select>
        </div>

        <ColorPicker
          color={captionOptions.captionColor}
          onChange={(color) =>
            setCaptionOptions((temp) => {
              return {
                ...temp,
                captionColor: color.hex,
              };
            })
          }
        />
      </div>
    </article>
  );
}

export default VideoPlayerWithCaptions;

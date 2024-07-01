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

function App() {
  return <h1>Hello World</h1>;
}

export default App;

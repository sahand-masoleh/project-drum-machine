import React, { useRef, createElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function App() {
  const [last, setLast] = useState("Start Rocking");
  return (
    <div id="drum-machine">
      <div id="display">{last}</div>
      <Pad code={81} name="Q" id={["BassDrum", "HV"]} display={setLast}></Pad>
      <Pad code={65} name="A" id={["BassDrum", "MV"]} display={setLast}></Pad>
      <Pad code={90} name="Z" id={["BassDrum", "LV"]} display={setLast}></Pad>
      <Pad code={87} name="W" id={["Tom", "Hi"]} display={setLast}></Pad>
      <Pad code={83} name="S" id={["Tom", "Mid"]} display={setLast}></Pad>
      <Pad code={88} name="X" id={["Tom", "Low"]} display={setLast}></Pad>
      <Pad code={69} name="E" id={["SnareDrum", "HV"]} display={setLast}></Pad>
      <Pad code={68} name="D" id={["SnareDrum", "LV"]} display={setLast}></Pad>
      <Pad code={67} name="C" id={["SnareDrum", "Dry"]} display={setLast}></Pad>
      <Pad code={82} name="R" id={["HiHat", "Closed"]} display={setLast}></Pad>
      <Pad code={70} name="F" id={["HiHat", "Open"]} display={setLast}></Pad>
      <Pad code={86} name="V" id={["HiHat", "Semi"]} display={setLast}></Pad>
      <Pad code={84} name="T" id={["Cymbal", "Crash"]} display={setLast}></Pad>
      <Pad code={71} name="G" id={["Cymbal", "Cup"]} display={setLast}></Pad>
      <Pad code={66} name="B" id={["Cymbal", "Ride"]} display={setLast}></Pad>
    </div>
  );
}

const Pad = (props) => {
  const [hit, setHit] = useState(false);

  const audioRef = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  const audio = createElement("audio", {
    ref: audioRef,
    id: props.name,
    src: `./sounds/${props.id.join("")}.flac`,
  });

  function handleKeyDown(e) {
    if (e.keyCode === props.code) {
      play();
    }
  }
  function handleKeyUp() {
    setHit(false);
  }

  function play() {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setHit(true);
    props.display(`${props.id[0]} (${props.id[1]})`);
  }

  return (
    <div
      className={hit ? "drum-pad playing" : "drum-pad not-playing"}
      id={props.id}
      onMouseDown={play}
      q
      onMouseUp={handleKeyUp}
    >
      <div>{props.name}</div>
      <div className="instrument">{props.id[0]}</div>
      <div className="instrument">{props.id[1]}</div>

      {audio}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

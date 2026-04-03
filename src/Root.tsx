import React from "react";
import { Composition } from "remotion";
import { JsIntro } from "./JsIntro";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JsIntro"
        component={JsIntro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

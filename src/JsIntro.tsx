import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { SceneTitle } from "./components/SceneTitle";
import { SceneCode } from "./components/SceneCode";
import { SceneConcepts } from "./components/SceneConcepts";
import { SceneOutro } from "./components/SceneOutro";

// Total: 300 frames @ 30fps = 10 seconds
// Scene durations:
//   SceneTitle:    0–90     (3s)
//   SceneCode:     80–180   (overlaps 10f, 3.3s)
//   SceneConcepts: 170–255  (overlaps 10f, 2.8s)
//   SceneOutro:    245–300  (overlaps 10f, 1.8s)

export const JsIntro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f1a" }}>
      {/* Scene 1 – Title reveal */}
      <Sequence from={0} durationInFrames={90} premountFor={fps}>
        <SceneTitle />
      </Sequence>

      {/* Scene 2 – Code typewriter */}
      <Sequence from={80} durationInFrames={100} premountFor={fps}>
        <SceneCode />
      </Sequence>

      {/* Scene 3 – Key concepts */}
      <Sequence from={170} durationInFrames={85} premountFor={fps}>
        <SceneConcepts />
      </Sequence>

      {/* Scene 4 – Outro / CTA */}
      <Sequence from={245} durationInFrames={55} premountFor={fps}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

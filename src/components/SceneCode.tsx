import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CODE_LINES = [
  { text: 'const name = "JavaScript";', color: "#e06c75" },
  { text: "", color: "#abb2bf" },
  { text: "function greet(person) {", color: "#61afef" },
  { text: '  return `Bonjour, ${person}! 👋`;', color: "#98c379" },
  { text: "}", color: "#61afef" },
  { text: "", color: "#abb2bf" },
  { text: "console.log(greet(name));", color: "#c678dd" },
  { text: '// → "Bonjour, JavaScript! 👋"', color: "#5c6370" },
];

const CodeLine: React.FC<{ line: { text: string; color: string }; revealFrame: number }> = ({
  line,
  revealFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Characters revealed typewriter-style (guard against empty lines with zero-length range)
  const textLength = line.text.length;
  const charsToShow =
    textLength === 0
      ? 0
      : Math.floor(
          interpolate(
            frame,
            [revealFrame, revealFrame + textLength * 1.5],
            [0, textLength],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          )
        );

  const lineOpacity = interpolate(frame, [revealFrame - 3, revealFrame + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineY = Math.round(interpolate(
    spring({ frame: frame - revealFrame, fps, config: { damping: 200 } }),
    [0, 1],
    [12, 0]
  ));

  if (line.text === "") {
    return <div style={{ height: 20 }} />;
  }

  return (
    <div
      style={{
        opacity: lineOpacity,
        transform: `translateY(${lineY}px)`,
        fontSize: 32,
        fontFamily: '"Fira Code", "Courier New", monospace',
        color: line.color,
        lineHeight: 1.7,
        whiteSpace: "pre",
      }}
    >
      {line.text.slice(0, charsToShow)}
      {charsToShow < line.text.length && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "#F7DF1E",
            marginLeft: 2,
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </div>
  );
};

// Scene 2: Code typewriter reveal
export const SceneCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Stagger each line ~18 frames apart
  const lineStartFrames = CODE_LINES.map((_, i) => 15 + i * 18);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 60%, #0f3460 100%)",
        opacity: bgOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontSize: 24,
          color: "rgba(247,223,30,0.7)",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Syntaxe de base
      </div>

      {/* Code panel */}
      <div
        style={{
          transform: `scale(${panelScale})`,
          background: "#282c34",
          borderRadius: 20,
          padding: "48px 64px",
          width: 900,
          boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 60px rgba(247,223,30,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Window chrome dots */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((color, i) => (
            <div
              key={i}
              style={{ width: 16, height: 16, borderRadius: "50%", background: color }}
            />
          ))}
        </div>

        {/* Code lines */}
        {CODE_LINES.map((line, i) => (
          <CodeLine key={i} line={line} revealFrame={lineStartFrames[i]} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

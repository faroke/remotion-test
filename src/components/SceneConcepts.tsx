import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CONCEPTS = [
  {
    icon: "📦",
    title: "Variables",
    desc: "let, const, var",
    color: "#61afef",
    bg: "rgba(97,175,239,0.12)",
    border: "rgba(97,175,239,0.3)",
  },
  {
    icon: "⚡",
    title: "Fonctions",
    desc: "arrow, async/await",
    color: "#98c379",
    bg: "rgba(152,195,121,0.12)",
    border: "rgba(152,195,121,0.3)",
  },
  {
    icon: "🔄",
    title: "Boucles",
    desc: "for, map, filter",
    color: "#e5c07b",
    bg: "rgba(229,192,123,0.12)",
    border: "rgba(229,192,123,0.3)",
  },
  {
    icon: "🎯",
    title: "Objets",
    desc: "classes, prototypes",
    color: "#c678dd",
    bg: "rgba(198,120,221,0.12)",
    border: "rgba(198,120,221,0.3)",
  },
  {
    icon: "🌐",
    title: "DOM",
    desc: "querySelector, events",
    color: "#e06c75",
    bg: "rgba(224,108,117,0.12)",
    border: "rgba(224,108,117,0.3)",
  },
  {
    icon: "🚀",
    title: "ES Modules",
    desc: "import, export",
    color: "#F7DF1E",
    bg: "rgba(247,223,30,0.08)",
    border: "rgba(247,223,30,0.25)",
  },
];

const ConceptCard: React.FC<{
  concept: (typeof CONCEPTS)[0];
  delay: number;
}> = ({ concept, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        background: concept.bg,
        border: `1px solid ${concept.border}`,
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: 220,
      }}
    >
      <span style={{ fontSize: 48 }}>{concept.icon}</span>
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: concept.color,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {concept.title}
      </span>
      <span
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          fontFamily: '"Fira Code", monospace',
          textAlign: "center",
        }}
      >
        {concept.desc}
      </span>
    </div>
  );
};

// Scene 3: Key concepts grid
export const SceneConcepts: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f1a",
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
      }}
    >
      <div style={{ opacity: titleOpacity, textAlign: "center" }}>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Concepts{" "}
          <span style={{ color: "#F7DF1E" }}>fondamentaux</span>
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          maxWidth: 1400,
        }}
      >
        {CONCEPTS.map((concept, i) => (
          <ConceptCard key={concept.title} concept={concept} delay={15 + i * 12} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

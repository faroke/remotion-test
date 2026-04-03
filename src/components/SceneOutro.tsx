import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Scene 4: Outro / call to action
export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo pulse
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Glow pulse animation
  const glowIntensity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.7, 0.3]
  );

  const titleY = Math.round(interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  ));
  const titleOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = Math.round(interpolate(
    spring({ frame: frame - 50, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  ));

  const taglineOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Animated JS badge */}
      <div
        style={{
          width: 140,
          height: 140,
          background: "#F7DF1E",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale})`,
          boxShadow: `0 0 ${80 * glowIntensity}px rgba(247,223,30,${glowIntensity})`,
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#000",
            fontFamily: "monospace",
            letterSpacing: -3,
          }}
        >
          JS
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.1,
          }}
        >
          Prêt à coder ?
        </h1>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <div
          style={{
            background: "#F7DF1E",
            borderRadius: 50,
            padding: "20px 56px",
            display: "inline-block",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#0f0f1a",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: 1,
            }}
          >
            🚀 Commencer maintenant
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ opacity: taglineOpacity, textAlign: "center" }}>
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            letterSpacing: 2,
          }}
        >
          javascript.info • MDN Web Docs • freeCodeCamp
        </p>
      </div>
    </AbsoluteFill>
  );
};

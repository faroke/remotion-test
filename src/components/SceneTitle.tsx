import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Scene 1: "JavaScript" title reveal with animated background
export const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // JS logo scale spring
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Title slide up (rounded to avoid subpixel blur)
  const titleY = Math.round(interpolate(
    spring({ frame: frame - 20, fps, config: { damping: 200 } }),
    [0, 1],
    [60, 0]
  ));
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = Math.round(interpolate(
    spring({ frame: frame - 40, fps, config: { damping: 200 } }),
    [0, 1],
    [30, 0]
  ));

  // Floating particles
  const particle1X = interpolate(frame, [0, 90], [0, -15], {
    extrapolateRight: "clamp",
  });
  const particle2X = interpolate(frame, [0, 90], [0, 20], {
    extrapolateRight: "clamp",
  });
  const particle3Y = interpolate(frame, [0, 90], [0, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Floating decorative circles */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 200,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(247,223,30,0.06)",
          border: "2px solid rgba(247,223,30,0.15)",
          transform: `translate(${particle1X}px, 0)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 180,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(247,223,30,0.04)",
          border: "2px solid rgba(247,223,30,0.1)",
          transform: `translate(${particle2X}px, 0)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 300,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(100,200,255,0.08)",
          transform: `translateY(${particle3Y}px)`,
        }}
      />

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 32,
        }}
      >
        {/* JS Logo badge */}
        <div
          style={{
            width: 180,
            height: 180,
            background: "#F7DF1E",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${logoScale})`,
            boxShadow: "0 0 80px rgba(247,223,30,0.4)",
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#000",
              fontFamily: "monospace",
              letterSpacing: -4,
            }}
          >
            JS
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            JavaScript
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleOpacity,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: "#F7DF1E",
              margin: 0,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Le langage du web
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React, { useEffect } from "react";

export default function ModelViewerAR({
  model,
}: {
  model: string;
}) {

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <div className="w-full h-screen bg-white">
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 9999,
          background: "white",
          padding: "10px",
          color: "black",
        }}
      >
        MODEL: {model}
      </div>

      {React.createElement("model-viewer", {
        src: model,
        ar: true,
        "ar-modes": "scene-viewer webxr quick-look",
        "camera-controls": true,
        "auto-rotate": true,
        reveal: "auto",
        loading: "eager",
        exposure: "1",
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
        },
      })}
    </div>
  );
}
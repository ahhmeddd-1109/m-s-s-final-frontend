// src/components/HeroWaveform.tsx
import { useRef, useEffect } from "react";

interface Props {
  height?: number;
  className?: string;
}

export default function HeroWaveform({ height = 600, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const w = canvas.clientWidth;
      const h = height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    // --- Procedural Fallback Waveform ---
    let t = 0;
    function drawProcedural() {
      const w = canvas.clientWidth;
      const h = height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#8e2de2");
      grad.addColorStop(0.5, "#4a00e0");
      grad.addColorStop(1, "#00d2ff");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 4;

      ctx.beginPath();
      const points = 200;
      for (let i = 0; i < points; i++) {
        const x = (i / (points - 1)) * w;
        const y =
          h / 2 +
          Math.sin(i * 0.15 + t * 0.05) * (h / 4) * Math.sin(t * 0.01 + i * 0.05);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t++;
      rafRef.current = requestAnimationFrame(drawProcedural);
    }

    // --- Microphone Waveform ---
    async function initMicrophone() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const AudioContextCtor =
          window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextCtor();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        function drawMic() {
          const w = canvas.clientWidth;
          const h = height;
          ctx.clearRect(0, 0, w, h);

          analyser.getByteTimeDomainData(dataArray);

          ctx.beginPath();
          const sliceWidth = w / bufferLength;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * h) / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            x += sliceWidth;
          }
          ctx.strokeStyle = "#ff3cac";
          ctx.lineWidth = 2;
          ctx.stroke();

          rafRef.current = requestAnimationFrame(drawMic);
        }

        rafRef.current = requestAnimationFrame(drawMic);
      } catch (err) {
        // fallback if mic unavailable or denied
        drawProcedural();
      }
    }

    // try microphone, fallback if fails
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      initMicrophone();
    } else {
      drawProcedural();
    }

    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [height]);

  return (
    <div
      className={`absolute left-0 top-0 w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

import { useCallback, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { RotateCcw, RotateCw, X } from "lucide-react";
import { getCroppedImageFile } from "../../utils/cropImage";

const FRAME_OPTIONS = [
  { label: "Close", value: 220 },
  { label: "Classic", value: 270 },
  { label: "Wide", value: 320 },
];

const ActionButton = ({ children, variant = "ghost", ...props }) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
      variant === "primary"
        ? "bg-primary text-white hover:bg-primary/90"
        : "border border-zinc-300/70 bg-white/55 text-zinc-700 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300"
    }`}
    {...props}
  >
    {children}
  </button>
);

const ImageCropModal = ({
  isOpen,
  imageSrc,
  fileName,
  title,
  subtitle,
  cropShape = "rect",
  onClose,
  onApply,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [frameSize, setFrameSize] = useState(270);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const cropSize = useMemo(
    () => ({ width: frameSize, height: frameSize }),
    [frameSize],
  );

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setFrameSize(270);
    setCroppedAreaPixels(null);
    setError("");
  };

  const handleClose = () => {
    if (processing) return;
    reset();
    onClose();
  };

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setProcessing(true);
      setError("");
      const croppedFile = await getCroppedImageFile(
        imageSrc,
        croppedAreaPixels,
        rotation,
        fileName,
      );
      reset();
      onApply(croppedFile);
    } catch {
      setError("Could not prepare that image. Please try another photo.");
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-300/70 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-zinc-950">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-zinc-950 dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-500">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-300/70 text-zinc-500 hover:text-primary dark:border-white/10"
            aria-label="Close crop dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="relative h-[390px] overflow-hidden rounded-2xl border border-zinc-300/70 bg-black shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.08)] dark:border-white/10">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape={cropShape}
                showGrid={cropShape !== "round"}
                cropSize={cropSize}
                minZoom={0.8}
                maxZoom={4}
                zoomSpeed={0.18}
                objectFit="contain"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Zoom
                  </label>
                  <span className="text-xs text-zinc-500">
                    {zoom.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={4}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Crop size
                  </label>
                  <span className="text-xs text-zinc-500">{frameSize}px</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {FRAME_OPTIONS.map((option) => {
                    const active = frameSize === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFrameSize(option.value)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-zinc-300/70 text-zinc-600 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-zinc-400"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              <ActionButton onClick={() => setRotation((value) => value - 90)}>
                <RotateCcw className="h-4 w-4" />
                Left
              </ActionButton>
              <ActionButton onClick={() => setRotation((value) => value + 90)}>
                <RotateCw className="h-4 w-4" />
                Right
              </ActionButton>
              <ActionButton onClick={reset}>Reset</ActionButton>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <ActionButton onClick={handleClose} disabled={processing}>
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleApply}
              disabled={processing}
            >
              {processing ? "Preparing..." : "Use Cropped Photo"}
            </ActionButton>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;

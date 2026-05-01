import { Camera, Check, MonitorCog, RotateCcw, Sparkles, Type, UploadCloud } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { FONT_OPTIONS, PRIMARY_COLORS, STATUS_OPTIONS } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useAvailabilityStatus, useUpdateStatus } from "../../hooks";
import ImageCropModal from "../../components/ui/ImageCropModal";
import { uploadImageToImgBB } from "../../utils/imgbb";
import profileFallback from "../../assets/Home/Profile/profile-bw.png";

const STATUS_COLOR = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

const Section = ({ title, description, children, className = "" }) => (
  <section className={`self-start rounded-2xl border border-zinc-300/70 bg-white/60 p-5 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035] ${className}`}>
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
    </div>
    {children}
  </section>
);

const ToggleCard = ({ checked, icon: Icon, title, detail, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
      checked
        ? "border-primary/45 bg-primary/10 text-zinc-950 dark:text-white"
        : "border-zinc-300/70 bg-white/45 text-zinc-600 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-black/20 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
    }`}
  >
    <span className="grid h-10 w-10 place-items-center rounded-lg border border-current/20 bg-current/10">
      <Icon className="h-4 w-4" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-semibold">{title}</span>
      <span className="mt-1 block text-xs text-zinc-500">{detail}</span>
    </span>
    {checked && <Check className="h-4 w-4 text-primary" />}
  </button>
);

const Preferences = () => {
  const { preferences, updatePreferences, resetPreferences, Toast } = useAuth();
  const { status: currentStatus, isLoading: statusLoading, refetch } =
    useAvailabilityStatus();
  const updateStatus = useUpdateStatus();
  const [cropSource, setCropSource] = useState(null);
  const [cropFileName, setCropFileName] = useState("");
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const handleCustomColor = (event) => {
    updatePreferences({ primaryColor: event.target.value });
  };

  const handleProfilePick = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Toast("Choose an image file.", "error");
      return;
    }
    setCropFileName(file.name);
    setCropSource(URL.createObjectURL(file));
  };

  const handleProfileApply = async (file) => {
    setCropSource(null);
    setUploadingProfile(true);
    try {
      const url = await uploadImageToImgBB(file);
      updatePreferences({ profileImage: url });
      Toast("Profile image updated.", "success");
    } catch (error) {
      Toast(error.message || "Profile image upload failed.", "error");
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleStatusSelect = async (value) => {
    if (value === currentStatus || savingStatus) return;
    setSavingStatus(true);
    await updateStatus(value, refetch);
    setSavingStatus(false);
  };

  const handleReset = async () => {
    const result = await Swal.fire({
      title: "Reset preferences?",
      text: "This will restore accent, font, motion, glass, and cursor settings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reset",
      cancelButtonText: "Cancel",
      confirmButtonColor: preferences.primaryColor,
      background: "#09090b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      resetPreferences();
      Swal.fire({
        title: "Reset complete",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: "#09090b",
        color: "#fff",
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Website controls
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Preferences
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Tune the site accent, font, motion, glass panels, and cursor from
              one place.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300/70 bg-white/55 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Section
            title="Profile photo"
            description="Upload, crop, and publish the hero profile image."
          >
            <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border border-primary/25 bg-primary/10 shadow-[0_0_45px_rgb(var(--color-primary-rgb)/0.12)]">
                <img
                  src={preferences.profileImage || profileFallback}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                  <UploadCloud className="h-4 w-4" />
                  Upload and crop
                  <input type="file" accept="image/*" onChange={handleProfilePick} className="sr-only" />
                </label>
                {preferences.profileImage && (
                  <button
                    type="button"
                    onClick={() => updatePreferences({ profileImage: "" })}
                    className="ml-2 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300/70 bg-white/45 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-black/20 dark:text-zinc-400"
                  >
                    <Camera className="h-4 w-4" />
                    Use default
                  </button>
                )}
                {uploadingProfile && <p className="text-xs text-zinc-500">Uploading profile image...</p>}
              </div>
            </div>
          </Section>

          <Section
            title="Availability status"
            description="Controls the badge visible on the homepage banner."
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {STATUS_OPTIONS.map((option) => {
                const active = currentStatus === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={statusLoading || savingStatus}
                    onClick={() => handleStatusSelect(option.value)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      active
                        ? "border-primary/45 bg-primary/10 text-zinc-950 dark:text-white"
                        : "border-zinc-300/70 bg-white/45 text-zinc-600 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-black/20 dark:text-zinc-400"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${STATUS_COLOR[option.color]}`} />
                      <span className="text-sm font-semibold">{option.label}</span>
                    </span>
                    {active && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
            {savingStatus && (
              <p className="mt-3 text-xs text-zinc-500">Saving status...</p>
            )}
          </Section>

          <Section
            title="Primary colour"
            description="This accent drives Banner, About Me, dashboard highlights, and cursor glow."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIMARY_COLORS.map((color) => {
                const active =
                  preferences.primaryColor.toLowerCase() ===
                  color.value.toLowerCase();

                return (
                  <button
                    type="button"
                    key={color.value}
                    onClick={() => updatePreferences({ primaryColor: color.value })}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-primary/55 bg-primary/10"
                        : "border-zinc-300/70 bg-white/45 hover:border-primary/35 dark:border-white/10 dark:bg-black/20 dark:hover:border-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-9 w-9 rounded-full border border-white/20"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-zinc-950 dark:text-white">
                          {color.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {color.value}
                        </span>
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>

            <label className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-zinc-300/70 bg-white/45 p-4 dark:border-white/10 dark:bg-black/20">
              <span>
                <span className="block text-sm font-semibold text-zinc-950 dark:text-white">
                  Custom colour
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {preferences.primaryColor}
                </span>
              </span>
              <input
                type="color"
                value={preferences.primaryColor}
                onChange={handleCustomColor}
                className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                aria-label="Choose primary colour"
              />
            </label>
          </Section>

          <Section
            title="Appearance"
            description="Change global typography and visual density without editing code."
          >
            <div className="space-y-3">
              <div className="rounded-xl border border-zinc-300/70 bg-white/45 p-4 dark:border-white/10 dark:bg-black/20">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                      Interface font
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      Scroll and choose the global body font.
                    </p>
                  </div>
                  <Type className="h-4 w-4 text-primary" />
                </div>

                <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                  {FONT_OPTIONS.map((font) => {
                    const active = preferences.fontFamily === font.value;

                    return (
                      <button
                        type="button"
                        key={font.value}
                        onClick={() =>
                          updatePreferences({ fontFamily: font.value })
                        }
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                          active
                            ? "border-primary/45 bg-primary/10 text-zinc-950 dark:text-white"
                            : "border-zinc-300/70 bg-white/45 text-zinc-600 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.025] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        <span>
                          <span className="block text-sm font-semibold">
                            {font.name}
                          </span>
                          <span className="text-xs text-zinc-500">
                            The quick brown fox jumps over the lazy dog.
                          </span>
                        </span>
                        {active && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ToggleCard
                checked={preferences.glass}
                icon={MonitorCog}
                title="Glass panels"
                detail="Keep translucent dashboard and section surfaces."
                onClick={() => updatePreferences({ glass: !preferences.glass })}
              />
            </div>
          </Section>

          <Section
            title="Interaction"
            description="Control ambient effects for a calmer or richer website."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleCard
                checked={preferences.motion === "rich"}
                icon={Sparkles}
                title="Rich motion"
                detail="Enable ambient movement and hover lift."
                onClick={() => updatePreferences({ motion: "rich" })}
              />
              <ToggleCard
                checked={preferences.motion === "calm"}
                icon={MonitorCog}
                title="Calm motion"
                detail="Reduce animation intensity across the site."
                onClick={() => updatePreferences({ motion: "calm" })}
              />
              <ToggleCard
                checked={preferences.cursor}
                icon={Sparkles}
                title="Glow cursor"
                detail="Follow pointer with the selected accent."
                onClick={() => updatePreferences({ cursor: !preferences.cursor })}
              />
            </div>
          </Section>
      </div>
      <ImageCropModal
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        fileName={cropFileName}
        title="Adjust Profile Photo"
        subtitle="Drag, zoom, and rotate until the face sits cleanly inside the circle."
        cropShape="round"
        onClose={() => setCropSource(null)}
        onApply={handleProfileApply}
      />
    </div>
  );
};

export default Preferences;

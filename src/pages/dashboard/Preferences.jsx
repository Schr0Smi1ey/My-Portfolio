import { Check, MonitorCog, RotateCcw, Sparkles, Type } from "lucide-react";
import Swal from "sweetalert2";
import { FONT_OPTIONS, PRIMARY_COLORS } from "../../constants";
import { useAuth } from "../../context/AuthContext";

const Section = ({ title, description, children }) => (
  <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
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
        ? "border-primary/45 bg-primary/10 text-white"
        : "border-white/10 bg-black/20 text-zinc-400 hover:border-white/20 hover:text-white"
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
  const { preferences, updatePreferences, resetPreferences } = useAuth();

  const handleCustomColor = (event) => {
    updatePreferences({ primaryColor: event.target.value });
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
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Website controls
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">
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
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
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
                        : "border-white/10 bg-black/20 hover:border-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-9 w-9 rounded-full border border-white/20"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-white">
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

            <label className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <span>
                <span className="block text-sm font-semibold text-white">
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
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
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
                            ? "border-primary/45 bg-primary/10 text-white"
                            : "border-white/10 bg-white/[0.025] text-zinc-400 hover:border-white/20 hover:text-white"
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
      </div>
    </div>
  );
};

export default Preferences;

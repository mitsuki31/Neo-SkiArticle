const embedScriptStatus: Record<string, boolean> = {};

export async function loadScriptOnce(src: string): Promise<void> {
  if (embedScriptStatus[src]) return;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      embedScriptStatus[src] = true;
      resolve();
    };

    script.onerror = reject;
    document.body.appendChild(script);
  });
}

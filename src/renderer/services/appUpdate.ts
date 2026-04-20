export const UPDATE_POLL_INTERVAL_MS = 12 * 60 * 60 * 1000;
export const UPDATE_HEARTBEAT_INTERVAL_MS = 30 * 60 * 1000;

export interface AppUpdateDownloadProgress {
  received: number;
  total: number | undefined;
  percent: number | undefined;
  speed: number | undefined;
}

export interface AppUpdateInfo {
  latestVersion: string;
  date: string;
  changeLog: { zh: { title: string; content: string[] }; en: { title: string; content: string[] } };
  url: string;
}

// Update checker disabled — no remote update server configured
export const checkForAppUpdate = async (): Promise<AppUpdateInfo | null> => {
  return null;
};

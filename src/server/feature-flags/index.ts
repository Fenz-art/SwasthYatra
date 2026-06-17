export enum FeatureFlag {
  PROVIDER_ROUTING = "PROVIDER_ROUTING",
  LIVE_INTERPRETER = "LIVE_INTERPRETER",
  WHATSAPP_OUTREACH = "WHATSAPP_OUTREACH",
  AUTONOMOUS_AGENT = "AUTONOMOUS_AGENT",
  OUTCOME_PREDICTION = "OUTCOME_PREDICTION",
  VOICE_AGENT = "VOICE_AGENT",
  PROVIDER_SYNC = "PROVIDER_SYNC",
  ORGANIZATIONS = "ORGANIZATIONS",
}

export type FlagEnvMap = Record<FeatureFlag, string>

const ENV_MAP: FlagEnvMap = {
  [FeatureFlag.PROVIDER_ROUTING]: "ENABLE_PROVIDER_ROUTING",
  [FeatureFlag.LIVE_INTERPRETER]: "ENABLE_INTERPRETER",
  [FeatureFlag.WHATSAPP_OUTREACH]: "ENABLE_WHATSAPP_AGENT",
  [FeatureFlag.AUTONOMOUS_AGENT]: "ENABLE_AGENT",
  [FeatureFlag.OUTCOME_PREDICTION]: "ENABLE_OUTCOMES",
  [FeatureFlag.VOICE_AGENT]: "ENABLE_VOICE_AGENT",
  [FeatureFlag.PROVIDER_SYNC]: "ENABLE_PROVIDER_ROUTING",
  [FeatureFlag.ORGANIZATIONS]: "ENABLE_ORGANIZATIONS",
}

const PUBLIC_ENV_MAP: Partial<FlagEnvMap> = {
  [FeatureFlag.LIVE_INTERPRETER]: "NEXT_PUBLIC_ENABLE_INTERPRETER",
  [FeatureFlag.PROVIDER_ROUTING]: "NEXT_PUBLIC_ENABLE_PROVIDER_ROUTING",
  [FeatureFlag.ORGANIZATIONS]: "NEXT_PUBLIC_ENABLE_ORGANIZATIONS",
  [FeatureFlag.AUTONOMOUS_AGENT]: "NEXT_PUBLIC_ENABLE_AGENT",
}

export class FeatureFlagService {
  private overrides: Map<FeatureFlag, boolean> = new Map()

  setOverride(flag: FeatureFlag, value: boolean) {
    this.overrides.set(flag, value)
  }

  clearOverride(flag: FeatureFlag) {
    this.overrides.delete(flag)
  }

  clearAllOverrides() {
    this.overrides.clear()
  }

  isEnabled(flag: FeatureFlag): boolean {
    const override = this.overrides.get(flag)
    if (override !== undefined) return override

    const envKey = ENV_MAP[flag]
    if (envKey) {
      const envValue = process.env[envKey]
      if (envValue !== undefined) return envValue === "true"
    }

    const publicEnvKey = PUBLIC_ENV_MAP[flag]
    if (publicEnvKey) {
      const envValue = process.env[publicEnvKey]
      if (envValue !== undefined) return envValue === "true"
    }

    return false
  }

  isVisible(flag: FeatureFlag): boolean {
    return PUBLIC_ENV_MAP[flag] !== undefined ? this.isEnabled(flag) : false
  }

  getAllFlags(): Record<FeatureFlag, { enabled: boolean; visible: boolean }> {
    const result = {} as Record<FeatureFlag, { enabled: boolean; visible: boolean }>
    for (const flag of Object.values(FeatureFlag)) {
      result[flag] = {
        enabled: this.isEnabled(flag),
        visible: this.isVisible(flag),
      }
    }
    return result
  }
}

export const featureFlags = new FeatureFlagService()

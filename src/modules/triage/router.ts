import { Severity } from "./severity-engine";

export type Route = "SELF_CARE" | "PHARMACY" | "CLINIC" | "HOSPITAL" | "EMERGENCY";

export function routeBySeverity(severity: Severity): Route {
  switch (severity) {
    case "CRITICAL":
      return "EMERGENCY";
    case "HIGH":
      return "HOSPITAL";
    case "MEDIUM":
      return "CLINIC";
    case "LOW":
      return "PHARMACY";
    default:
      return "SELF_CARE";
  }
}

// Country specific overrides (e.g., in some countries, go to pharmacy first for fever)
export function applyCountryOverrides(route: Route, country: string, symptoms: string[]): Route {
  if (country === "Japan" && symptoms.some(s => s.toLowerCase().includes("fever")) && route === "CLINIC") {
    return "PHARMACY"; // In Japan, pharmacies often handle fever first
  }
  return route;
}

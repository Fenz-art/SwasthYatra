// Critical symptoms that immediately trigger EMERGENCY routing
export const RED_FLAG_SYMPTOMS = [
  "chest pain",
  "difficulty breathing",
  "shortness of breath",
  "unconscious",
  "unresponsive",
  "severe bleeding",
  "stroke symptoms",
  "suicidal thoughts",
  "seizure",
  "anaphylaxis",
  "severe head trauma"
];

export function hasRedFlags(symptoms: string[]): boolean {
  return symptoms.some(symptom => 
    RED_FLAG_SYMPTOMS.some(flag => 
      symptom.toLowerCase().includes(flag)
    )
  );
}

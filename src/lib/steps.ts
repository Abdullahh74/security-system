import type { StepId } from "../types";
import { CameraIcon, GridIcon, SensorIcon, ShieldIcon } from "../components/icons/Icons";

export interface StepConfig {
  id: StepId;
  index: number;
  title: string;
  icon: typeof CameraIcon;
  nextLabel: string | null;
}

export const STEPS: StepConfig[] = [
  { id: "cameras", index: 1, title: "Choose your cameras", icon: CameraIcon, nextLabel: "Next: Choose your plan" },
  { id: "plan", index: 2, title: "Choose your plan", icon: ShieldIcon, nextLabel: "Next: Choose your sensors" },
  { id: "sensors", index: 3, title: "Choose your sensors", icon: SensorIcon, nextLabel: "Next: Add extra protection" },
  { id: "protection", index: 4, title: "Add extra protection", icon: GridIcon, nextLabel: null },
];

export function nextStepId(stepId: StepId): StepId | null {
  const idx = STEPS.findIndex((s) => s.id === stepId);
  return STEPS[idx + 1]?.id ?? null;
}

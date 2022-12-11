import { AckeeInstance } from "ackee-tracker";

export {};

declare global {
  interface Window {
    ackeeTrackerInstance: AckeeInstance;
  }
}

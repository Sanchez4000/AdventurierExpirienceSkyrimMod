import { EventHandle } from "skyrimPlatform";

export interface EventSubscription {
  name: string;
  event: EventHandle;
}

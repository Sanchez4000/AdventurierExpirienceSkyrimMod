import { EventHandle, Game, printConsole, unsubscribe } from "skyrimPlatform";
import { EventSubscription } from "./interfaces/eventSubscription";
import Mod from "./mod";
import Feature from "./feature";

export default class GameContext {
  private static readonly MOD_NOT_FOUND_INDEX = 0xff;
  private _events: EventSubscription[] = [];
  private _features: Feature[] = [];
  private _modMap = new Map<string, Mod>();

  public Reset(): void {
    printConsole("Reset");
    while (this._features.length > 0) {
      this.DisableFeature(this._features[0]);
    }
    while (this._events.length > 0) {
      this.Unsubscribe(this._events[0]);
    }
    this._modMap.clear();
  }
  public SafeSubscribe(event: EventHandle, name: string): void {
    const existed = this._events.find(
      (subscription) => subscription.name === name
    );

    if (existed !== undefined) {
      printConsole(`Event with name ${name} already exist`);
      unsubscribe(event);
    }

    this._events.push({
      name: name,
      event: event,
    });
    printConsole(`Event handler ${name} registered for ${event.eventName}`);
  }
  public Unsubscribe(name: string): void;
  public Unsubscribe(event: EventSubscription): void;
  public Unsubscribe(value: string | EventSubscription): void {
    if (typeof value === "string") {
      const item = this._events.find(
        (subscription) => subscription.name === value
      );

      if (item === undefined) return;

      value = item;
    }

    unsubscribe(value.event);
    this._events = this._events.filter(
      (subscription) => subscription !== value
    );
    printConsole(`Event handler ${value.name} unsubscribed`);
  }
  public RegisterMod(name: string): void {
    const modIndex = Game.getModByName(name);
    if (modIndex === GameContext.MOD_NOT_FOUND_INDEX) {
      printConsole(`Mod: ${name} is missing`);
      return;
    }

    const mod = new Mod(modIndex, name);
    this._modMap.set(name, mod);

    printConsole(`Mod: ${name} registered`);
  }
  public GetMod(name: string): Mod | null {
    const mod = this._modMap.get(name);

    return mod || null;
  }
  public EnableFeature<T extends Feature>(instance: T): void {
    for (let i = 0; i < this._features.length; i++) {
      const feature = this._features[i];
      if (typeof feature === typeof instance) {
        printConsole(`Feature ${instance.Name} already enabled`);
        return;
      }
    }

    this._features.push(instance);
    instance.Enable();
    printConsole(`Feature ${instance.Name} enabled`);
  }
  public DisableFeature(feature: Feature): void {
    this._features = this._features.filter((f) => f !== feature);
    feature.Disable();
    printConsole(`Feature ${typeof feature} disabled`);
  }
}

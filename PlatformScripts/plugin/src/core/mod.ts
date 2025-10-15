import { printConsole } from "skyrimPlatform";
import Asset from "./asset";

export default class Mod {
  private readonly Assets: Asset[] = [];
  private readonly ModPrefix: string;
  private readonly ModName: string;

  public constructor(index: number, name: string) {
    const hexIndex = index.toString(16).padStart(2, "0");
    this.ModPrefix = `0x${hexIndex}`;
    this.ModName = name;
  }

  public get Name(): string {
    return this.ModName;
  }

  public RegisterAsset(hexId: string, name: string): void {
    const hexItemId = `${this.ModPrefix}${hexId}`;
    const regex = /^0x[0-9A-Fa-f]{8}$/;
    if (!regex.test(hexItemId)) {
      printConsole(`Error registering asset. Id cannot be ${hexItemId}`);
      return;
    }

    const newAsset = new Asset(hexItemId, name);
    const existed = this.Assets.find(
      (asset) => asset.NumericId === newAsset.NumericId
    );

    if (existed !== undefined) {
      printConsole(
        `Error registering asset. ${newAsset.HexId} already existed`
      );
      return;
    }

    this.Assets.push(newAsset);

    printConsole(`Asset ${hexItemId} registered (${name})`);
  }
  public GetAsset(name: string | null): Asset | null {
    if (name === null) return null;

    const asset = this.Assets.find((asset) => asset.Name === name);

    if (asset === undefined) {
      printConsole(`Asset ${name} not found`);
      return null;
    }

    return asset;
  }
}

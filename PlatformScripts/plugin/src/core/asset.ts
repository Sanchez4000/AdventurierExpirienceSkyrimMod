export default class Asset {
  private _hexId: string;
  private _numericId: number;
  private _name: string;

  public get HexId(): string {
    return this._hexId;
  }
  public get NumericId(): number {
    return this._numericId;
  }
  public get Name(): string {
    return this._name;
  }

  constructor(hexId: string, name: string) {
    this._hexId = hexId;
    this._numericId = parseInt(hexId, 16);
    this._name = name;
  }
}

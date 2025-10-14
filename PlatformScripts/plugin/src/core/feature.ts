export default abstract class Feature {
  public abstract readonly Name: string;

  public abstract Enable(): void;
  public abstract Disable(): void;
}

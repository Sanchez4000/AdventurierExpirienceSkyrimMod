import GameContext from "../core/gameContext";

export default class Global {
  private static readonly _context: GameContext = new GameContext();

  public static get Context(): GameContext {
    return this._context;
  }
}

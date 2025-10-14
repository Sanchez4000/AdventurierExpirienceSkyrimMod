export default class EnumUtils {
  public static getEnumNameByValue(
    enumObject: any,
    value: string
  ): string | null {
    for (const name in enumObject) {
      const key = name as keyof typeof enumObject;

      if (enumObject[key] === value) return name;
    }

    return null;
  }
}

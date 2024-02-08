class Utils {
  public static sleep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  public static formatAddress(data: string): string {
    return data.split("\n")[1];
  }

  public static formatHour(data: string): string {
    return data.split("\n")[0];
  }

  public static formatData(date: string): string {
    return date.split("/").join("-");
  }
}

export default Utils;

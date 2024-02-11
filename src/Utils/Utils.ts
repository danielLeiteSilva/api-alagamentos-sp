class Utils {
  public static sleep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
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

  public static formatAmericanDate(date: string) {
    const [day, month, year] = date.split('/');
    return `${month}/${day}/${year}`;
  }

  public static formatBrazilianDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  public static differenceInDays(start_date: number, end_date: number) {
    const differenceInMilliseconds = end_date - start_date;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

}

export default Utils;

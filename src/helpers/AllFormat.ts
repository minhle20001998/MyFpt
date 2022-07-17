export function DateFormat(input: string | number | Date): string {
  const date = new Date(input);
  return date.toISOString().slice(0, 10).split('-').reverse().join('/');
}

export function MoneyFormat(money: string | number, cut?: boolean): string {
  const moneyResult = money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  if (cut) {
    return moneyResult.split(' ')[0];
  }
  return moneyResult;
}
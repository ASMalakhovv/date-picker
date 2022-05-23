export const getDaysInMonth = (month: number, year: number) => {
    // если месяц сентябрь, апрель, июнь, ноябрь возврат 30 дней
    if (/8|3|5|10/.test(String(month))) return 30;

    // если месяц не февраль вернуть 31 день
    if (month != 1) return 31;

    //если год високосный, то в феврале 29 дней
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return 29;

    // Не високосный год. В феврале 28 дней.
    return 28;
}
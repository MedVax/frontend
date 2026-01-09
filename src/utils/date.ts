import { format, isToday, isValid, isYesterday } from "date-fns";

export function getCountdown(
  from: Date | string | number,
  to: Date | string | number
) {
  const oneSecondInMilli = 1000,
    oneMinuteInMilli = oneSecondInMilli * 60,
    oneHourInMilli = oneMinuteInMilli * 60,
    oneDayInMilli = oneHourInMilli * 24;

  const _from = new Date(from),
    _to = new Date(to),
    _fromTime = _from.getTime(),
    _toTime = _to.getTime(),
    distance = _toTime - _fromTime;

  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (distance > 0) {
    days = Math.floor(distance / oneDayInMilli);
    hours = Math.floor((distance % oneDayInMilli) / oneHourInMilli);
    minutes = Math.floor((distance % oneHourInMilli) / oneMinuteInMilli);
    seconds = Math.floor((distance % oneMinuteInMilli) / oneSecondInMilli);
  }

  return { days, hours, minutes, seconds };
}

export const formatToFriendlyDate = (
  date: Date,
  isTodayFriendly: boolean = false
) => {
  if (isValid(date)) {
    if (isToday(date)) {
      if (isTodayFriendly) {
        return "Today";
      }
      return format(date, "p");
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }

    return format(date, "PP");
  }
  return "";
};

function padZero(v: any) {
  return v < 10 ? `0${v}` : v;
}
export function toFriendlyTime(time: number) {
  const hour = padZero(parseInt(`${(time / (60 * 60)) % 24}`));
  const minute = padZero(parseInt(`${(time / 60) % 60}`));
  const seconds = padZero(parseInt(`${time % 60}`));
  return `${hour}:${minute}:${seconds}`;
}

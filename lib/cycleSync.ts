export type CycleSyncInput = {
  lastPeriodDate: Date | string;
  cycleLength: number;
  periodLength: number;
  today?: Date;
};

export type CycleSyncSchedule = {
  valid: true;
  cycleLength: number;
  periodLength: number;
  nextPeriod: Date;
  arrivalDate: Date;
  chargeDate: Date;
  shouldCreateSubscription: boolean;
  warning: string | null;
  message: string | null;
};

export type CycleSyncError = {
  valid: false;
  message: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function clampCycleLength(cycleLength: number) {
  return Math.min(45, Math.max(21, Math.trunc(Number(cycleLength) || 28)));
}

export function calculateCycleSyncSchedule({
  lastPeriodDate,
  cycleLength,
  periodLength,
  today = new Date(),
}: CycleSyncInput): CycleSyncSchedule | CycleSyncError {
  const safeToday = startOfDay(today);
  const parsedLastPeriodDate =
    lastPeriodDate instanceof Date ? lastPeriodDate : new Date(lastPeriodDate);

  if (Number.isNaN(parsedLastPeriodDate.getTime())) {
    return { valid: false, message: "Enter a valid last period date." };
  }

  const safeLastPeriodDate = startOfDay(parsedLastPeriodDate);

  if (safeLastPeriodDate > safeToday) {
    return { valid: false, message: "Last period date cannot be in the future." };
  }

  const safeCycleLength = clampCycleLength(cycleLength);
  const safePeriodLength = Math.max(1, Math.trunc(Number(periodLength) || 1));

  let nextPeriod = new Date(safeLastPeriodDate);
  while (nextPeriod <= safeToday) {
    nextPeriod = addDays(nextPeriod, safeCycleLength);
  }

  const daysUntilNextPeriod = Math.ceil(
    (nextPeriod.getTime() - safeToday.getTime()) / MS_PER_DAY,
  );

  if (daysUntilNextPeriod < 7) {
    return {
      valid: true,
      cycleLength: safeCycleLength,
      periodLength: safePeriodLength,
      nextPeriod,
      arrivalDate: addDays(safeToday, 6),
      chargeDate: safeToday,
      shouldCreateSubscription: false,
      warning: safeCycleLength > 35 ? "Cycle length is longer than usual." : null,
      message: "This period is too soon, so checkout will use a one-time order without subscription discount.",
    };
  }

  const transitFloor = addDays(safeToday, 6);
  const predictedArrivalDate = addDays(nextPeriod, -5);
  const arrivalDate =
    predictedArrivalDate < transitFloor ? transitFloor : predictedArrivalDate;

  return {
    valid: true,
    cycleLength: safeCycleLength,
    periodLength: safePeriodLength,
    nextPeriod,
    arrivalDate,
    chargeDate: addDays(nextPeriod, -10),
    shouldCreateSubscription: true,
    warning: safeCycleLength > 35 ? "Cycle length is longer than usual." : null,
    message: null,
  };
}

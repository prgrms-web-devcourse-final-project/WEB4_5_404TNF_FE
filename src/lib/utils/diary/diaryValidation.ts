// feeding list
export function validateFeedingList(feedingList: FeedEntry[]): string | null {
  let firstUnit: string | null = null;

  for (const entry of feedingList) {
    const { hour, minute, amount, unit } = entry;
    const hasEntry =
      hour.trim() !== '' || minute.trim() !== '' || amount.trim() !== '';

    // unit consistency
    if (hasEntry) {
      if (firstUnit === null) {
        firstUnit = unit;
      } else if (unit !== firstUnit) {
        return '식사량 단위를 통일해주세요';
      }
    }

    // time
    if (!hour.trim() && (minute.trim() || amount.trim())) {
      return '식사량 기록의 "시" 항목을 입력해주세요';
    }

    if (hour.trim()) {
      const hourNum = Number(hour);
      const minuteNum = Number(minute || '0');

      if (
        isNaN(hourNum) ||
        hourNum < 0 ||
        hourNum > 23 ||
        isNaN(minuteNum) ||
        minuteNum < 0 ||
        minuteNum > 59
      ) {
        return '시간은 0~23시 / 0~59분 이하의 숫자로 입력해주세요';
      }

      if (hour.trim() && amount.trim() === '') {
        return '식사량 기록의 급여량 항목을 입력해주세요';
      }
    }
  }

  return null;
}

// walking list
export function validateWalkingList(walkingList: WalkEntry[]): string | null {
  for (const entry of walkingList) {
    const { startHour, startMinute, endHour, endMinute } = entry;
    const hasEntry =
      startHour.trim() !== '' ||
      startMinute.trim() !== '' ||
      endHour.trim() !== '' ||
      endMinute.trim() !== '';

    if (hasEntry) {
      // hour X
      const withoutStartHour = !startHour.trim();
      const withoutEndHour = !endHour.trim();
      if (withoutStartHour || withoutEndHour) {
        return '산책 시작/종료 시간의 "시" 항목을 입력해주세요';
      }

      // hour X, minute O
      const invalidStart = !startHour.trim() && startMinute.trim();
      const invalidEnd = !endHour.trim() && endMinute.trim();
      if (invalidStart || invalidEnd) {
        return '산책 시작/종료 시간의 "시" 항목을 입력해주세요';
      }

      // hour O, minute X -> minute = '00'
      const startH = Number(startHour);
      const startM = Number(startMinute || '0');
      const endH = Number(endHour);
      const endM = Number(endMinute || '0');

      if (
        isNaN(startH) ||
        startH < 0 ||
        startH > 23 ||
        isNaN(startM) ||
        startM < 0 ||
        startM > 59 ||
        isNaN(endH) ||
        endH < 0 ||
        endH > 23 ||
        isNaN(endM) ||
        endM < 0 ||
        endM > 59
      ) {
        return '시간은 0~23시 / 0~59분 이하의 숫자로 입력해주세요';
      }

      // walking duration
      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      if (startTotal === endTotal) {
        return '산책 시간은 최소 1분 이상이어야 합니다';
      }

      let duration = endTotal - startTotal;
      // end time < start time
      if (duration < 0) {
        duration += 1440; // 1440 minutes / day
      }

      if (duration > 720) {
        return '산책 시간은 최대 12시간 이내여야 합니다';
      }
    }
  }

  return null;
}

// run validation
export function runDiaryValidation({
  feedingList,
  walkingList,
  weight,
  sleepTime,
  note,
}: {
  feedingList: FeedEntry[];
  walkingList: WalkEntry[];
  weight: string;
  sleepTime: string;
  note: string;
}): string | null {
  const feedingError = validateFeedingList(feedingList);
  if (feedingError) return feedingError;

  const walkingError = validateWalkingList(walkingList);
  if (walkingError) return walkingError;

  if (weight && (isNaN(Number(weight)) || Number(weight) > 200)) {
    return '몸무게는 200kg 이하로 입력해주세요';
  }

  if (sleepTime && (isNaN(Number(sleepTime)) || Number(sleepTime) > 24)) {
    return '수면 시간은 24시간 이하로 입력해주세요';
  }

  const hasAnyInput =
    note.trim() !== '' ||
    weight.trim() !== '' ||
    sleepTime.trim() !== '' ||
    feedingList.some((f) => f.hour || f.minute || f.amount) ||
    walkingList.some(
      (w) => w.startHour || w.startMinute || w.endHour || w.endMinute,
    );

  if (!hasAnyInput) {
    return '모든 항목이 비어 있습니다. 최소 한 가지 이상 기록해주세요';
  }

  return null;
}

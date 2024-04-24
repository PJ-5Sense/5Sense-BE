import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  /**
   * 요일 별 첫 주 날짜 가져오기 함수
   *
   * @param {number} year 2024
   * @param {number} month 2
   * @returns {number[]} [4, 5, 6, 7, 1, 2, 3] = [일, 월, 화, 수, 목, 금, 토]
   */
  getDatesOfFirstWeekByDay(year: number, month: number) {
    const result = new Array(7).fill(null); // 일주일 배열 생성
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 1일의 요일을 가져오기

    for (let i = 0; i < 7; i++) {
      result[(firstDayOfMonth + i) % 7] = i + 1; // 해당 요일에 날짜를 할당
    }

    return result;
  }

  /**
   * new Date() 형식의 데이터를 넣으면 요일을 추출함
   * @param date
   * @returns
   */
  extractDayName(date: Date) {
    const koreanDays = ['일', '월', '화', '수', '목', '금', '토'];

    return koreanDays[date.getDay()];
  }

  getStartDayDate(firstDayDateOfMonth: number, startDayDate: number) {
    while (firstDayDateOfMonth < startDayDate) {
      firstDayDateOfMonth += 7;
    }

    // 배열 0번째는 1일을 의미하여 첫 시작날에 -1을 계산해서 리턴하도록 함
    return firstDayDateOfMonth - 1;
  }

  /**
   * 두 날짜가 같은 '날'인지 확인합니다.
   * @param date1 ISO 문자열
   * @param date2 ISO 문자열
   * @returns boolean 같은 날이면 true, 다르면 false
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}

// @flow strict

import Immutable from "immutable";
import type { RecordFactory } from "immutable";

export type Dateable =
  | typeof undefined
  | QuantizableDateRecord
  | Date
  | string
  | number;

type RecordProps = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
};

const QuantizableDateRecordFactory: RecordFactory<RecordProps> =
  Immutable.Record({
    year: 0,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
  });

export default class QuantizableDateRecord extends QuantizableDateRecordFactory {
  static DateRegex: RegExp =
    /^(\d\d\d\d)(\d\d)(\d\d)((\d\d)(\d\d)(\d\d)){0,1}$/;

  static MsPerSecond: number = 1000;
  static MsPerMinute: number = this.MsPerSecond * 60;
  static MsPerHour: number = this.MsPerMinute * 60;
  static MsPerDay: number = this.MsPerHour * 24;
  static MsPerWeek: number = this.MsPerDay * 7;

  static detectLevel(
    dateMin: Dateable,
    dateMax: Dateable,
    buckets: number
  ): number {
    // Ensure we have QuantizableDate instances
    const qDateMin = new QuantizableDateRecord(dateMin);
    const qDateMax = new QuantizableDateRecord(dateMax);

    const millisPerBucket =
      (qDateMax.toMillis() - qDateMin.toMillis()) / buckets;

    if (millisPerBucket >= this.MsPerWeek) {
      return this.MsPerWeek;
    }
    if (millisPerBucket >= this.MsPerDay) {
      return this.MsPerDay;
    }
    if (millisPerBucket >= this.MsPerHour) {
      return this.MsPerHour;
    }
    if (millisPerBucket >= this.MsPerMinute) {
      return this.MsPerMinute;
    }
    return this.MsPerSecond;
  }

  static quantize(date: Dateable, level: number): QuantizableDateRecord {
    const qd = new QuantizableDateRecord(date);
    switch (level) {
      case this.MsPerWeek:
        // Special case
        const date = qd.toDate(3);
        while (date.getUTCDay() > 0) {
          date.setUTCDate(date.getUTCDate() - 1);
        }
        return new QuantizableDateRecord(date);
      case this.MsPerDay:
        return qd.toQuantizableDate(3);
      case this.MsPerHour:
        return qd.toQuantizableDate(4);
      case this.MsPerMinute:
        return qd.toQuantizableDate(5);
      case this.MsPerSecond:
        return qd.toQuantizableDate(6);
      default:
        throw new Error(`Unknown level ${level}`);
    }
  }

  static *genQuantizedDates(
    start: QuantizableDateRecord,
    end: QuantizableDateRecord,
    level: number
  ): Iterable<QuantizableDateRecord> {
    let qDateStart = this.quantize(start, level);
    const qDateEnd = this.quantize(end, level);
    while (qDateStart.lessThan(qDateEnd)) {
      yield qDateStart;
      qDateStart = qDateStart.addMillis(level);
    }
  }

  constructor(date: Dateable) {
    if ("string" === typeof date) {
      const parts = date.match(QuantizableDateRecord.DateRegex);
      if (parts == null) {
        throw new Error("Invalid date string");
      }
      const obj = {};
      obj.year = parseInt(parts[1], 10);
      obj.month = parseInt(parts[2], 10);
      obj.day = parseInt(parts[3], 10);
      if (parts[4]) {
        obj.hour = parseInt(parts[5], 10);
        obj.minute = parseInt(parts[6], 10);
        obj.second = parseInt(parts[7], 10);
      } else {
        obj.hour = obj.minute = obj.second = 0;
      }
      super(obj);
    } else if (date instanceof QuantizableDateRecord) {
      super(date);
    } else if ("number" === typeof date) {
      const dt = new Date(date);
      const obj = {};
      obj.year = dt.getUTCFullYear();
      obj.month = dt.getUTCMonth() + 1;
      obj.day = dt.getUTCDate();
      obj.hour = dt.getUTCHours();
      obj.minute = dt.getUTCMinutes();
      obj.second = dt.getUTCSeconds();
      super(obj);
    } else if (date instanceof Date) {
      const obj = {};
      obj.year = date.getUTCFullYear();
      obj.month = date.getUTCMonth() + 1;
      obj.day = date.getUTCDate();
      obj.hour = date.getUTCHours();
      obj.minute = date.getUTCMinutes();
      obj.second = date.getUTCSeconds();
      super(obj);
    } else {
      super();
    }
  }

  equals(qd: QuantizableDateRecord): boolean {
    const qdParts = qd.toISOParts();
    for (const [i, part] of this.toISOParts().entries()) {
      if (part !== qdParts[i]) return false;
    }
    return true;
  }

  lessThan(qd: QuantizableDateRecord): boolean {
    const qdParts = qd.toISOParts();
    for (const [i, part] of this.toISOParts().entries()) {
      if (part < qdParts[i]) return true;
      if (part > qdParts[i]) break;
    }
    return false;
  }

  greaterThan(qd: QuantizableDateRecord): boolean {
    const qdParts = qd.toISOParts();
    for (const [i, part] of this.toISOParts().entries()) {
      if (part > qdParts[i]) return true;
      if (part < qdParts[i]) break;
    }
    return false;
  }

  toISOParts(
    level: number = 6
  ): [number, number, number, number, number, number] {
    const parts = [0, 1, 1, 0, 0, 0];
    const partsOut = [
      this.get("year"),
      this.get("month"),
      this.get("day"),
      this.get("hour"),
      this.get("minute"),
      this.get("second"),
    ];
    for (let i = 0; i < level; ++i) {
      parts[i] = partsOut[i];
    }
    return parts;
  }

  toISOString(level: number = 6): string {
    const intParts = this.toISOParts(level);
    const parts = [
      intParts[0].toString().padStart(4, "0"),
      ...intParts.slice(1).map((v) => v.toString().padStart(2, "0")),
    ];
    return `${parts[0]}-${parts[1]}-${parts[2]}T${parts[3]}:${parts[4]}:${parts[5]}.000Z`;
  }

  toDate(level: number = 6): Date {
    return new Date(this.toISOString(level));
  }

  toMillis(level: number = 6): number {
    return +this.toDate(level);
  }

  toQuantizableDate(level: number = 6): QuantizableDateRecord {
    return new QuantizableDateRecord(this.toDate(level));
  }

  addMillis(millis: number): QuantizableDateRecord {
    const date = this.toDate();
    date.setTime(date.getTime() + millis);
    return new QuantizableDateRecord(date);
  }
}

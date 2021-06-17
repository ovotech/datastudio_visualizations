import { test, describe, expect } from "@jest/globals";
import QuantizableDateRecord from "../QuantizableDateRecord";

const date1Str = "20210517112233";
const date1ISOParts = [2021, 5, 17, 11, 22, 33];
const date1ISODate = new Date("2021-05-17T11:22:33.000Z");
const date1Millis = +date1ISODate;
const date2Str = "20210517";
const date2ISOParts = [2021, 5, 17, 0, 0, 0];
const date2ISODate = new Date("2021-05-17T00:00:00.000Z");
const date2Millis = +date2ISODate;
const date3Str = "20210518";
const date3ISOParts = [2021, 5, 18, 0, 0, 0];
const date3ISODate = new Date("2021-05-18T00:00:00.000Z");
const date3Millis = +date2ISODate;

function getParts(parts, level) {
  parts = parts.slice(0, level).concat([0, 0, 0, 0, 0, 0]).slice(0, 6);
  if (parts[1] == 0) parts[1] = 1; // Day cannot be 0
  if (parts[2] == 0) parts[2] = 1; // Month cannot be 0
  return parts;
}

function partsToString(parts) {
  return [
    parts[0].toString().padStart(4, "0"),
    "-",
    parts[1].toString().padStart(2, "0"),
    "-",
    parts[2].toString().padStart(2, "0"),
    "T",
    parts[3].toString().padStart(2, "0"),
    ":",
    parts[4].toString().padStart(2, "0"),
    ":",
    parts[5].toString().padStart(2, "0"),
    ".000Z",
  ].join("");
}

describe("detectLevel", () => {
  const startDate = date1Millis;
  const buckets = QuantizableDateRecord.MsPerDay / 1000;
  test("per week", () => {
    const endDate = startDate + QuantizableDateRecord.MsPerWeek * 1000;
    expect(QuantizableDateRecord.detectLevel(startDate, endDate, 1000)).toStrictEqual(
      QuantizableDateRecord.MsPerWeek
    );
  });
  test("per day", () => {
    const endDate = startDate + QuantizableDateRecord.MsPerDay * 1000;
    expect(QuantizableDateRecord.detectLevel(startDate, endDate, 1000)).toStrictEqual(
      QuantizableDateRecord.MsPerDay
    );
  });
  test("per hour", () => {
    const endDate = startDate + QuantizableDateRecord.MsPerHour * 1000;
    expect(QuantizableDateRecord.detectLevel(startDate, endDate, 1000)).toStrictEqual(
      QuantizableDateRecord.MsPerHour
    );
  });
  test("per minute", () => {
    const endDate = startDate + QuantizableDateRecord.MsPerMinute * 1000;
    expect(QuantizableDateRecord.detectLevel(startDate, endDate, 1000)).toStrictEqual(
      QuantizableDateRecord.MsPerMinute
    );
  });
  test("per second", () => {
    const endDate = startDate + QuantizableDateRecord.MsPerSecond * 1000;
    expect(QuantizableDateRecord.detectLevel(startDate, endDate, 1000)).toStrictEqual(
      QuantizableDateRecord.MsPerSecond
    );
  });
});

describe("quantize", () => {
  const date = date1Millis;
  test("per week", () => {
    expect(
      QuantizableDateRecord.quantize(date, QuantizableDateRecord.MsPerWeek).toDate()
    ).toEqual(new Date("2021-05-16T00:00:00.000Z"));
  });
  test("per day", () => {
    expect(
      QuantizableDateRecord.quantize(date, QuantizableDateRecord.MsPerDay).toDate()
    ).toEqual(new Date("2021-05-17T00:00:00.000Z"));
  });
  test("per hour", () => {
    expect(
      QuantizableDateRecord.quantize(date, QuantizableDateRecord.MsPerHour).toDate()
    ).toEqual(new Date("2021-05-17T11:00:00.000Z"));
  });
  test("per minute", () => {
    expect(
      QuantizableDateRecord.quantize(date, QuantizableDateRecord.MsPerMinute).toDate()
    ).toEqual(new Date("2021-05-17T11:22:00.000Z"));
  });
  test("per second", () => {
    expect(
      QuantizableDateRecord.quantize(date, QuantizableDateRecord.MsPerSecond).toDate()
    ).toEqual(new Date("2021-05-17T11:22:33.000Z"));
  });
});

describe("genQuantizedDates", () => {
  const startDate = date1Millis;
  const endDate = date1Millis + QuantizableDateRecord.MsPerWeek * 2;
  test("per week", () => {
    const gen = QuantizableDateRecord.genQuantizedDates(
      startDate,
      endDate,
      QuantizableDateRecord.MsPerWeek
    );
    const arr = Array.from(gen);
    expect(arr.length).toStrictEqual(2);
  });
  test("per day", () => {
    const gen = QuantizableDateRecord.genQuantizedDates(
      startDate,
      endDate,
      QuantizableDateRecord.MsPerDay
    );
    const arr = Array.from(gen);
    expect(arr.length).toStrictEqual(2 * 7);
  });
  test("per hour", () => {
    const gen = QuantizableDateRecord.genQuantizedDates(
      startDate,
      endDate,
      QuantizableDateRecord.MsPerHour
    );
    const arr = Array.from(gen);
    expect(arr.length).toStrictEqual(2 * 7 * 24);
  });
  test("per minute", () => {
    const gen = QuantizableDateRecord.genQuantizedDates(
      startDate,
      endDate,
      QuantizableDateRecord.MsPerMinute
    );
    const arr = Array.from(gen);
    expect(arr.length).toStrictEqual(2 * 7 * 24 * 60);
  });
  test("per second", () => {
    const gen = QuantizableDateRecord.genQuantizedDates(
      startDate,
      endDate,
      QuantizableDateRecord.MsPerSecond
    );
    const arr = Array.from(gen);
    expect(arr.length).toStrictEqual(2 * 7 * 24 * 60 * 60);
  });
});

describe("constructor", () => {
  describe("full datetime", () => {
    test("takes string", () => {
      const qd = new QuantizableDateRecord(date1Str);
      expect(qd.toISOParts()).toEqual(date1ISOParts);
    });
    test("takes QuantizableDateRecord", () => {
      const qd1 = new QuantizableDateRecord(date1Str);
      const qd2 = new QuantizableDateRecord(qd1);
      expect(qd1).toBe(qd2);
      expect(qd1.equals(qd2)).toBeTruthy();
    });
    test("takes number", () => {
      const qd1 = new QuantizableDateRecord(date1Millis);
      expect(qd1.year).toStrictEqual(date1ISOParts[0]);
      expect(qd1.month).toStrictEqual(date1ISOParts[1]);
      expect(qd1.day).toStrictEqual(date1ISOParts[2]);
      expect(qd1.hour).toStrictEqual(date1ISOParts[3]);
      expect(qd1.minute).toStrictEqual(date1ISOParts[4]);
      expect(qd1.second).toStrictEqual(date1ISOParts[5]);
    });
    test("takes Date", () => {
      const qd1 = new QuantizableDateRecord(date1ISODate);
      expect(qd1.year).toStrictEqual(date1ISOParts[0]);
      expect(qd1.month).toStrictEqual(date1ISOParts[1]);
      expect(qd1.day).toStrictEqual(date1ISOParts[2]);
      expect(qd1.hour).toStrictEqual(date1ISOParts[3]);
      expect(qd1.minute).toStrictEqual(date1ISOParts[4]);
      expect(qd1.second).toStrictEqual(date1ISOParts[5]);
    });
  });
  describe("date only", () => {
    test("takes string", () => {
      const qd = new QuantizableDateRecord(date2Str);
      expect(qd.toISOParts()).toEqual(date2ISOParts);
    });
    test("takes QuantizableDateRecord", () => {
      const qd1 = new QuantizableDateRecord(date2Str);
      const qd2 = new QuantizableDateRecord(qd1);
      expect(qd1).toBe(qd2);
      expect(qd1.equals(qd2)).toBeTruthy();
    });
    test("takes number", () => {
      const qd1 = new QuantizableDateRecord(date2Millis);
      expect(qd1.year).toStrictEqual(date2ISOParts[0]);
      expect(qd1.month).toStrictEqual(date2ISOParts[1]);
      expect(qd1.day).toStrictEqual(date2ISOParts[2]);
      expect(qd1.hour).toStrictEqual(date2ISOParts[3]);
      expect(qd1.minute).toStrictEqual(date2ISOParts[4]);
      expect(qd1.second).toStrictEqual(date2ISOParts[5]);
    });
    test("takes Date", () => {
      const qd1 = new QuantizableDateRecord(date2ISODate);
      expect(qd1.year).toStrictEqual(date2ISOParts[0]);
      expect(qd1.month).toStrictEqual(date2ISOParts[1]);
      expect(qd1.day).toStrictEqual(date2ISOParts[2]);
      expect(qd1.hour).toStrictEqual(date2ISOParts[3]);
      expect(qd1.minute).toStrictEqual(date2ISOParts[4]);
      expect(qd1.second).toStrictEqual(date2ISOParts[5]);
    });
  });
});

describe("equals", () => {
  test("returns true when this == arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).equals(new QuantizableDateRecord(date1Str))
    ).toBeTruthy();
  });
  test("returns false when this > arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).equals(new QuantizableDateRecord(date2Str))
    ).toBeFalsy();
  });
  test("returns false when this < arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).equals(new QuantizableDateRecord(date3Str))
    ).toBeFalsy();
  });
});

describe("lessThan", () => {
  test("returns false when this == arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).lessThan(new QuantizableDateRecord(date1Str))
    ).toBeFalsy();
  });
  test("returns false when this > arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).lessThan(new QuantizableDateRecord(date2Str))
    ).toBeFalsy();
  });
  test("returns true when this < arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).lessThan(new QuantizableDateRecord(date3Str))
    ).toBeTruthy();
  });
});

describe("greaterThan", () => {
  test("returns false when this == arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).greaterThan(new QuantizableDateRecord(date1Str))
    ).toBeFalsy();
  });
  test("returns true when this > arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).greaterThan(new QuantizableDateRecord(date2Str))
    ).toBeTruthy();
  });
  test("returns false when this < arg", () => {
    expect(
      new QuantizableDateRecord(date1Str).greaterThan(new QuantizableDateRecord(date3Str))
    ).toBeFalsy();
  });
});

describe("toISOParts", () => {
  const qd = new QuantizableDateRecord(date1Str);
  describe.each([[1], [2], [3], [4], [5], [6]])("level %i", (level) => {
    test("returns", () => {
      const expected = getParts(date1ISOParts, level);
      expect(qd.toISOParts(level)).toEqual(expected);
    });
  });
});

describe("toISOString", () => {
  describe.each([[1], [2], [3], [4], [5], [6]])("level %i", (level) => {
    test("calls toISOParts", () => {
      const qd = new QuantizableDateRecord(date1Str);
      qd.toISOParts = jest.fn(qd.toISOParts);
      const returned = qd.toISOString(level);
      expect(qd.toISOParts.mock.calls).toEqual([[level]]);
      expect(returned).toEqual(partsToString(getParts(date1ISOParts, level)));
    });
  });
});

describe("toDate", () => {
  describe.each([[1], [2], [3], [4], [5], [6]])("level %i", (level) => {
    test("calls toISOString", () => {
      const qd = new QuantizableDateRecord(date1Str);
      qd.toISOString = jest.fn(qd.toISOString);
      const returned = qd.toDate(level);
      expect(qd.toISOString.mock.calls).toEqual([[level]]);
      expect(returned.toISOString()).toEqual(
        partsToString(getParts(date1ISOParts, level))
      );
    });
  });
});

describe("toMillis", () => {
  describe.each([[1], [2], [3], [4], [5], [6]])("level %i", (level) => {
    test("calls toDate", () => {
      const qd = new QuantizableDateRecord(date1Str);
      qd.toDate = jest.fn(qd.toDate);
      const returned = qd.toMillis(level);
      expect(qd.toDate.mock.calls).toEqual([[level]]);
      expect(returned).toEqual(
        +new Date(partsToString(getParts(date1ISOParts, level)))
      );
    });
  });
});

describe("addMillis", () => {
  test("positive integer", () => {
    const qd1 = new QuantizableDateRecord(date1Str);
    const qd2 = qd1.addMillis(1000);
    expect(qd1.equals(new QuantizableDateRecord(date1Str))).toBeTruthy();
    expect(qd1.equals(qd2)).toBeFalsy();
    expect(qd1.lessThan(qd2)).toBeTruthy();
    expect(qd2.toISOString()).toStrictEqual("2021-05-17T11:22:34.000Z");
  });
  test("negative integer", () => {
    const qd1 = new QuantizableDateRecord(date1Str);
    const qd2 = qd1.addMillis(-1000);
    expect(qd1.equals(new QuantizableDateRecord(date1Str))).toBeTruthy();
    expect(qd1.equals(qd2)).toBeFalsy();
    expect(qd1.greaterThan(qd2)).toBeTruthy();
    expect(qd2.toISOString()).toStrictEqual("2021-05-17T11:22:32.000Z");
  });
});

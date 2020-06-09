import { displayCountdown } from "./countdown";

test("Verifies countdown is valid", () => {
  var date = new Date();
  date.setDate(date.getDate() + 30);
  expect(displayCountdown(date)).toBe(30);
});

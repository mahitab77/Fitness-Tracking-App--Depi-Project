import { clsx } from "clsx";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { ThemeContext } from "./ThemeContext";
import moment from "moment";
// import { fakeLogs } from "../../fakeData";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function getMonthlyLabels() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // Get current year
  const month = currentDate.getMonth(); // Get current month (0-indexed)

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate an array with days from 1 to daysInMonth
  const monthlyLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return monthlyLabels;
}

// // Helper function to generate random numbers for the dataset
// function generateFakeData(length) {
//   return Array.from({ length }, () => Math.floor(Math.random() * 20)); // random numbers between 0 and 20
// }

// // Weekly fake data
// export function generateWeeklyFakeData() {
//   return generateFakeData(7);
// }

// // Monthly fake data
// export function generateMonthlyFakeData() {
//   return generateFakeData(getMonthlyLabels().length);
// }

// // Yearly fake data (assuming 12 months)
// export function generateYearlyFakeData() {
//   return generateFakeData(12); // for 12 months of a year
// }

export const weeklyLabels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const monthlyLabels = getMonthlyLabels();
export const yearlyLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateDateRange = (period, range = 0, day = null) => {
  const today = day ? moment(day) : moment();
  let startDate, endDate;

  // Adjust the moment object based on the range
  const adjustedDate = today.subtract(range, "weeks"); // Default to weeks, adjust below for months/years

  switch (period) {
    case "daily":
      startDate = adjustedDate.format("YYYY-MM-DD");
      endDate = adjustedDate.add(1, "day").format("YYYY-MM-DD");
      break;

    case "weekly":
      // Set the start to the previous Saturday and end to the next Friday
      // Set the start date to the previous Saturday
      if (adjustedDate.day() === 6) {
        // If it's Saturday, don't subtract a week
        startDate = adjustedDate.format("YYYY-MM-DD");
      } else {
        // Otherwise, set to the previous Saturday
        startDate = adjustedDate
          .day(6)
          .subtract(1, "weeks")
          .format("YYYY-MM-DD");
      }
      endDate = adjustedDate.day(5).add(1, "weeks").format("YYYY-MM-DD"); // Next Friday
      break;

    case "monthly":
      startDate = adjustedDate.startOf("month").format("YYYY-MM-DD");
      endDate = adjustedDate.endOf("month").format("YYYY-MM-DD");
      break;

    case "yearly":
      startDate = adjustedDate.startOf("year").format("YYYY-MM-DD");
      endDate = adjustedDate.endOf("year").format("YYYY-MM-DD");
      break;

    default:
      startDate = today.format("YYYY-MM-DD");
      endDate = today.format("YYYY-MM-DD");
      break;
  }

  return { startDate, endDate };
};

// Helper function to normalize a date (set the time to 00:00:00)
function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setUTCHours(0, 0, 0, 0);
  return normalized;
}

// Helper function to filter logs within a given date range (ignoring time)
function filterLogsByRange(logs, start, end) {
  const normalizedStart = normalizeDate(start);
  const normalizedEnd = normalizeDate(end);

  return logs.filter((log) => {
    const logDate = normalizeDate(log.logDate);
    return logDate >= normalizedStart && logDate <= normalizedEnd;
  });
}

// Helper function to compute average if logType is "weight"
function calculateAverage(values, count) {
  return count > 0 ? values / count : 0;
}

// Function to aggregate logs by day
function aggregateDaily(logs, start, end) {
  const filteredLogs = filterLogsByRange(logs, start, end);
  let totalValueLogged = [0];
  let logCount = 0;

  filteredLogs.forEach((log) => {
    if (log.valueLogged) {
      totalValueLogged[0] += log.valueLogged;
      logCount += 1;
    } else if (log.workoutId) {
      totalValueLogged[0] += 1;
    }
  });

  // If logType is "weight", return the average, otherwise return the sum
  if (logs.length > 0 && logs[0].logType === "weight") {
    return [calculateAverage(totalValueLogged[0], logCount)];
  }
  // console.log(totalValueLogged);

  return totalValueLogged;
}

// Function to aggregate logs by week
function aggregateWeekly(logs, start, end) {
  const weeklyData = new Array(7).fill(0);
  const filteredLogs = filterLogsByRange(logs, start, end);
  const normalizedStart = normalizeDate(start);

  filteredLogs.forEach((log) => {
    const logDate = normalizeDate(log.logDate);
    const dayIndex = Math.floor(
      (logDate - normalizedStart) / (1000 * 60 * 60 * 24),
    );

    if (dayIndex >= 0 && dayIndex < 7) {
      if (log.valueLogged) {
        weeklyData[dayIndex] += log.valueLogged;
      } else if (log.workoutId) {
        weeklyData[dayIndex] += 1;
      }
    }
  });
  // console.log(weeklyData);

  return weeklyData;
}

// Function to aggregate logs by month
function aggregateMonthly(logs, start, end) {
  const daysInMonth = new Date(
    start.getFullYear(),
    start.getMonth() + 1,
    0,
  ).getDate();
  const monthlyData = new Array(daysInMonth).fill(0);
  const filteredLogs = filterLogsByRange(logs, start, end);

  filteredLogs.forEach((log) => {
    const logDate = normalizeDate(log.logDate);
    const dayIndex = logDate.getDate() - 1;

    if (dayIndex >= 0 && dayIndex < daysInMonth) {
      if (log.valueLogged) {
        monthlyData[dayIndex] += log.valueLogged;
      } else if (log.workoutId) {
        monthlyData[dayIndex] += 1;
      }
    }
  });

  return monthlyData;
}

// Function to aggregate logs by year
function aggregateYearly(logs, start, end) {
  const yearlyData = new Array(12).fill(0);
  const countPerMonth = new Array(12).fill(0);
  const filteredLogs = filterLogsByRange(logs, start, end);

  filteredLogs.forEach((log) => {
    const logDate = normalizeDate(log.logDate);
    const monthIndex = logDate.getMonth();

    if (log.valueLogged) {
      yearlyData[monthIndex] += log.valueLogged;
    } else if (log.workoutId) {
      yearlyData[monthIndex] += 1;
    }

    countPerMonth[monthIndex] += 1;
  });

  // If logType is "weight", calculate average
  if (logs.length > 0 && logs[0].logType === "weight") {
    return yearlyData.map((value, index) =>
      calculateAverage(value, countPerMonth[index]),
    );
  }

  return yearlyData;
}

// Main function that calls the appropriate aggregation based on the period
export function aggregateLogsByPeriod(period, range, logs) {
  const { startDate, endDate } = range;
  const start = new Date(startDate);
  const end = new Date(endDate);

  switch (period) {
    case "daily":
      return aggregateDaily(logs, start, end);
    case "weekly":
      return aggregateWeekly(logs, start, end);
    case "monthly":
      return aggregateMonthly(logs, start, end);
    case "yearly":
      return aggregateYearly(logs, start, end);
    default:
      throw new Error(
        "Invalid period provided. Please choose 'weekly', 'monthly', or 'yearly'.",
      );
  }
}

export const compareGoalsWithLogs = (
  goals = [],
  logs = [],
  workoutLogs = [],
) => {
  // Log arrays received
  console.log("Goals array received:", goals);
  console.log("Logs array received:", logs);
  console.log("Workout Logs array received:", workoutLogs);

  return goals.map((goal) => {
    let achieved = false; // Track if the goal is achieved
    let currentProgress = 0; // Track current progress towards the goal
    const goalType = goal.goalType || ""; // Safely access goal type

    console.log(`Processing goal:`, goal);

    // Processing logs based on goalType
    switch (goalType) {
      case "steps": {
        const filteredLogs = logs.filter((log) => log.logType === "steps");
        currentProgress = filteredLogs.reduce((total, log) => {
          console.log(`Steps log valueLogged: ${log.valueLogged}`); // Log each step value
          return total + (log.valueLogged || 0);
        }, 0);
        achieved = currentProgress >= (goal.quantity || 0);
        break;
      }

      case "burn": {
        const filteredLogs = logs.filter((log) => log.logType === "burn");
        currentProgress = filteredLogs.reduce(
          (total, log) => total + (log.valueLogged || 0),
          0,
        );
        achieved = currentProgress >= (goal.quantity || 0);
        break;
      }

      case "sleep": {
        const filteredLogs = logs.filter((log) => log.logType === "sleep");
        currentProgress = filteredLogs.reduce(
          (total, log) => total + (log.valueLogged || 0),
          0,
        );
        achieved = currentProgress >= (goal.quantity || 0);
        break;
      }

      case "intake": {
        const filteredLogs = logs.filter((log) => log.logType === "intake");
        currentProgress = filteredLogs.reduce(
          (total, log) => total + (log.valueLogged || 0),
          0,
        );
        achieved = currentProgress <= (goal.quantity || 0); // For intake, the goal is to stay below the limit
        break;
      }

      case "water": {
        const filteredLogs = logs.filter((log) => log.logType === "water");
        currentProgress = filteredLogs.reduce(
          (total, log) => total + (log.valueLogged || 0),
          0,
        );
        achieved = currentProgress >= (goal.quantity || 0);
        break;
      }

      case "weight": {
        const filteredLogs = logs.filter((log) => log.logType === "weight");
        const latestLog = filteredLogs[filteredLogs.length - 1]?.valueLogged;
        if (goal.targetValue) {
          currentProgress = latestLog || goal.currentValue;
          achieved = latestLog <= goal.targetValue;
        } else if (goal.quantity) {
          const initialWeight = filteredLogs[0]?.valueLogged || latestLog;
          currentProgress = Math.abs(initialWeight - latestLog);
          achieved = currentProgress >= goal.quantity;
        }
        break;
      }

      case "workout": {
        currentProgress = workoutLogs.length; // Count the number of workout logs
        achieved = currentProgress >= (goal.quantity || goal.targetValue || 0);
        break;
      }

      default:
        console.error(`Unrecognized goal type: ${goalType}`);
    }

    // Log progress for each goal
    console.log(`Current progress for ${goalType}:`, currentProgress);
    console.log(`${goalType} goal achieved:`, achieved);

    return { goal, achieved, currentProgress };
  });
};

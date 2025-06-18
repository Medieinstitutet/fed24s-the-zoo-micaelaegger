export interface AnimalFeedingStatus {
  isFeedButtonDisabled: boolean;
  showThreeHourWarning: boolean;
  showFiveHourWarning: boolean;
  statusText: string;
  statusColor: string;
}

export const getAnimalFeedingStatus = (
  lastFed: string,
  currentTime: Date = new Date()
): AnimalFeedingStatus => {
  const lastFedTime = new Date(lastFed).getTime();
  const currentTimeMs = currentTime.getTime();
  const hoursSinceLastFed = (currentTimeMs - lastFedTime) / (1000 * 60 * 60);

  const isFeedButtonDisabled = hoursSinceLastFed < 4;
  const showThreeHourWarning = hoursSinceLastFed >= 3;
  const showFiveHourWarning = hoursSinceLastFed >= 5;

  let statusText: string;
  let statusColor: string;

  if (showFiveHourWarning) {
    statusText = "Feed immediately!";
    statusColor = "red";
  } else if (showThreeHourWarning) {
    statusText = "Needs food soon";
    statusColor = "orange";
  } else {
    statusText = "Fed recently";
    statusColor = "green";
  }

  return {
    isFeedButtonDisabled,
    showThreeHourWarning,
    showFiveHourWarning,
    statusText,
    statusColor,
  };
};

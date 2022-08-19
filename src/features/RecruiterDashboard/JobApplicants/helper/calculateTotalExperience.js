export function calculateTotalExperience(data = []) {
  if (!Array.isArray(data)) return { years: null, months: null };
  let totalMonth = 0;

  const experience = { years: 0, months: 0 };

  const dateToMonths = function (date = new Date()) {
    return date.getFullYear() * 12 + date.getMonth();
  };

  data.forEach((experience) => {
    const experienceStartDate = new Date(experience.startDate);
    const experienceEndDate = experience.endDate ? new Date(experience.endDate) : new Date();
    const experienceStartDateInMonths = dateToMonths(experienceStartDate);
    const experienceEndDateInMonths = dateToMonths(experienceEndDate);
    const experienceDurationInMonth = experienceEndDateInMonths - experienceStartDateInMonths;
    totalMonth += experienceDurationInMonth;
  });

  experience.years = Math.floor(totalMonth / 12);
  experience.months = totalMonth % 12;

  return experience;
}

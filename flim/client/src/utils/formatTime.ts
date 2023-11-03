export const formatDMY = (date: string): string => {
  const now = new Date();
  const timeComment = new Date(date);
  const time = (Number(now) - Number(timeComment)) / 1000;

  if (time < 60) {
    return `${Math.round(time)} giây trước`;
  } else if (time < 3600) {
    return `${Math.round(time / 60)} phút trước`;
  } else if (time < 86400) {
    return `${Math.round(time / 3600)} giờ trước`;
  } else {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return timeComment.toLocaleDateString("vi-VN", options);
  }
};

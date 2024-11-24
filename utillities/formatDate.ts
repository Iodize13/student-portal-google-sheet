export const formatDate = (isoDate: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(isoDate).toLocaleDateString('en-GB', options);
};

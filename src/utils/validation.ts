export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  // Check if the number is between 8 and 15 digits
  return cleanNumber.length >= 8 && cleanNumber.length <= 15;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, '');
};
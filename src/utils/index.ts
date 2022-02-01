export const generateNamePrefix = (user: any) => {
  const namePrefix = user.first_name.charAt(0) + user.last_name.charAt(0);
  return namePrefix;
};

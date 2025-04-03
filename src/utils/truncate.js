export const truncate = (str, max) =>
  str?.length > max ? `${str.substring(0, max)}...` : str

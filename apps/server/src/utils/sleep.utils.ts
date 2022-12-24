export const sleep = async (durationInMs: number): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, durationInMs));
};

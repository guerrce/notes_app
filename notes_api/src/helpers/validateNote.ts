export const validateNote = (noteBody: string) => {
  return 20 < noteBody.length && noteBody.length < 300;
};

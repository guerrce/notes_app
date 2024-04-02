export const validateNote = (noteBody?: string) => {
  const noteBodyLength = noteBody?.length || 0;
  return 20 < noteBodyLength && noteBodyLength < 300;
};

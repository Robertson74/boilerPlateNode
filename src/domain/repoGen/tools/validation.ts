// validate there are not spaces
export const noSpaces = (input: string): string | boolean => {
  if (input.match(/\s/)) {
    return "ERROR: No spaces allowed here.";
  } else {
    return true;
  }
}

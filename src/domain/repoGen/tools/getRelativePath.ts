// get relative path from first file to second
export let getRelativePath: Function = (firstFile: string, secondFile: string) => {
  let firstFilePath = firstFile.split("/").slice(0, -1);
  let secondFilePath = secondFile.split("/").slice(0, -1);
  let relativePath = "";
  let index: number = 0;
  let split: number = 0;
  console.log(firstFilePath);
  console.log(secondFilePath);
  // find where the paths differ
  while (index < firstFilePath.length) {
    if ((firstFilePath[index] != secondFilePath[index]) && split == 0) {
      split = index;
    }
    index++
  }
  if (split == 0) {
    relativePath = "./";
    if (firstFilePath.length < secondFilePath.length) {
      index = firstFilePath.length;
      console.log(index);
      console.log(firstFilePath.length);
      while (index < secondFilePath.length) {
        relativePath+= secondFilePath[index] + "/";
        index++;
      }
    }
  } else {
    index = split;
    // for each DIR that is different in the first path, add a ../
    while (index != firstFilePath.length) {
      relativePath+= "../";
      index++;
    }
    index = split;
    // then copy the rest of the path from the split to the file
    while (index != secondFilePath.length) {
      relativePath+= secondFilePath[index] + "/";
      index++;
    }
  }
  return relativePath
}

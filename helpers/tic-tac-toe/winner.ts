export const winner = (arr: any) => {
  for (let i = 0; i <= 2; i++) {
    if (arr[i][0] === "X" && arr[i][1] === "X" && arr[i][2] === "X") {
      return "X";
    } else if (arr[i][0] === "O" && arr[i][1] === "O" && arr[i][2] === "O") {
      return "O";
    } else if (arr[0][i] === "X" && arr[1][i] === "X" && arr[2][i] === "X") {
      return "X";
    } else if (arr[0][i] === "O" && arr[1][i] === "O" && arr[2][i] === "O") {
      return "O";
    }
  }
  if (arr[0][0] === "O" && arr[1][1] === "O" && arr[2][2] === "O") {
    return "O";
  } else if (arr[0][0] === "X" && arr[1][1] === "X" && arr[2][2] === "X") {
    return "X";
  } else if (arr[0][2] === "O" && arr[1][1] === "O" && arr[2][0] === "O") {
    return "O";
  } else if (arr[0][2] === "X" && arr[1][1] === "X" && arr[2][0] === "X") {
    return "X";
  }
  return " ";
};

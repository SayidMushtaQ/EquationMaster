const Form = document.getElementById("input-form");
const equation_ans = document.getElementById("equation-ans");

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  try {
    const problem = formProps.equation;
    const equation = problem.replace(/\s+/g, "");
    const [left, right] = equation.split("=");

    //Handle complex - Equation
    const charToFind = "x";
    const regex = new RegExp(charToFind, "g");
    const foundIndexes = [];
    let match;
    while ((match = regex.exec(left)) !== null) {
      foundIndexes.push(match.index);
    }
    if(foundIndexes.length !== 1){
      alert("Sorry, I can't process this type of equation :(")
      return;
    }

    const coefRegex = /([+-]?\d*\.?\d*)x/;
    const constRegex = /([+-]?\d+\.?\d*)/g;

    const coefMatch = left.match(coefRegex);
    const coef = coefMatch ? parseFloat(coefMatch[1] || "1") : 0;

    let leftConstant = 0;
    const leftConstMatches = left.replace(coefRegex, "").match(constRegex);
    if (leftConstMatches) {
      leftConstant = leftConstMatches.reduce(
        (sum, num) => sum + parseFloat(num),
        0
      );
    }
    let rightConstant = 0;
    const rightConstMatches = right.match(constRegex);
    if (rightConstMatches) {
      rightConstant = rightConstMatches.reduce(
        (sum, num) => sum + parseFloat(num),
        0
      );
    }

    const result = (rightConstant - leftConstant) / coef;
    equation_ans.innerText = (Math.round(result * 100) / 100).toFixed(2);
  } catch (err) {
    alert("Please enter a valid linear equation.");
  }
});


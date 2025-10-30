// Supported operators: map, filter, mergeMap, concatMap, merge, concat, zip, reduce
const readline = require("readline");
const { of, from, interval, merge, concat, zip } = require("rxjs");
const { map, filter, mergeMap, concatMap, delay, take, reduce } = require("rxjs/operators");

// Reading operator name from command-line argument
const operator = process.argv[2];

if (!operator) {
  console.log("Please provide an operator name.");
  console.log("Usage: node reactiveoperators.js <map|filter|mergeMap|concatMap|merge|concat|zip|reduce>");
  process.exit(1);
}

// Setting up input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to convert string input (like "1,2,3") into an array of numbers
function parseNumbers(input) {
  return input.split(",").map(num => Number(num.trim()));
}

console.log("Running example for:", operator);
console.log("---------------------------------\n");

// 1. map() – transforms each value
function runMap() {
  console.log("Example: Multiply all numbers by a specific number.\n");

  rl.question("Enter numbers separated by commas (e.g. 1,2,3,4,5): ", (nums) => {
    const numbers = parseNumbers(nums);

    rl.question("Enter the multiply factor: ", (factor) => {
      const f = Number(factor);

      of(...numbers)
        .pipe(map(x => x * f))
        .subscribe({
          next: (val) => console.log("map ->", val),
          complete: () => {
            console.log("All numbers multiplied successfully.");
            rl.close();
          }
        });
    });
  });
}

// 2. filter() – filters values based on condition
function runFilter() {
  console.log("Example: Keep only numbers greater than a certain value.\n");

  rl.question("Enter numbers separated by commas (e.g. 1,2,3,4,5): ", (nums) => {
    const numbers = parseNumbers(nums);

    rl.question("Enter the minimum number to keep: ", (min) => {
      const limit = Number(min);

      of(...numbers)
        .pipe(filter(x => x > limit))
        .subscribe({
          next: (val) => console.log("filter ->", val),
          complete: () => {
            console.log("Filtering completed.");
            rl.close();
          }
        });
    });
  });
}

// 3. mergeMap() – flattens inner observables concurrently
function runMergeMap() {
  console.log("Example: For each letter, add '1' and '2' asynchronously.\n");

  rl.question("Enter letters separated by commas (e.g. A,B): ", (input) => {
    const letters = input.split(",").map(x => x.trim());

    of(...letters)
      .pipe(
        mergeMap(x => of(x + "1", x + "2").pipe(delay(x === "A" ? 300 : 100)))
      )
      .subscribe({
        next: (val) => console.log("mergeMap ->", val),
        complete: () => {
          console.log("mergeMap operation completed.");
          rl.close();
        }
      });
  });
}

// 4. concatMap() – runs inner streams sequentially
function runConcatMap() {
  console.log("Example: For each letter, add '1' and '2' in order.\n");

  rl.question("Enter letters separated by commas (e.g. A,B): ", (input) => {
    const letters = input.split(",").map(x => x.trim());

    of(...letters)
      .pipe(
        concatMap(x => of(x + "1", x + "2").pipe(delay(200)))
      )
      .subscribe({
        next: (val) => console.log("concatMap ->", val),
        complete: () => {
          console.log("concatMap finished successfully.");
          rl.close();
        }
      });
  });
}

// 5. merge() – merges multiple observables concurrently
function runMerge() {
  console.log("Example: Merge two number streams with different speeds.\n");

  const stream1 = interval(300).pipe(take(3), map(i => "A" + i));
  const stream2 = interval(200).pipe(take(3), map(i => "B" + i));

  merge(stream1, stream2).subscribe({
    next: (val) => console.log("merge ->", val),
    complete: () => {
      console.log("merge operation completed.");
      rl.close();
    }
  });
}

// 6. concat() – runs observables one after another
function runConcat() {
  console.log("Example: Emit numbers from the first list, then from the second list.\n");
  rl.question("Enter first set of numbers (e.g. 1,2,3): ", (first) => {
    rl.question("Enter second set of numbers (e.g. 4,5): ", (second) => {
      const s1 = from(parseNumbers(first));
      const s2 = from(parseNumbers(second));

      concat(s1, s2).subscribe({
        next: (val) => console.log("concat ->", val),
        complete: () => {
          console.log("concat operation completed.");
          rl.close();
        }
      });
    });
  });
}

// 7. zip() – pairs values from multiple streams by index
function runZip() {
  console.log("Example: Combine letters with numbers by order.\n");

  rl.question("Enter letters (e.g. A,B,C): ", (lettersInput) => {
    rl.question("Enter numbers (e.g. 1,2,3): ", (numsInput) => {
      const letters = of(...lettersInput.split(",").map(x => x.trim()));
      const numbers = of(...parseNumbers(numsInput));

      zip(letters, numbers).subscribe({
        next: (val) => console.log("zip ->", val),
        complete: () => {
          console.log("zip operation completed.");
          rl.close();
        }
      });
    });
  });
}

// 8. reduce() – combines values into one
function runReduce() {
  console.log("Example: Add all the numbers together.\n");

  rl.question("Enter numbers separated by commas (e.g. 1,2,3,4,5): ", (nums) => {
    const numbers = parseNumbers(nums);

    of(...numbers)
      .pipe(reduce((acc, value) => acc + value, 0))
      .subscribe({
        next: (val) => console.log("reduce ->", val),
        complete: () => {
          console.log("reduce operation completed.");
          rl.close();
        }
      });
  });
}

// Run based on operator name
switch (operator.toLowerCase()) {
  case "map": runMap(); break;
  case "filter": runFilter(); break;
  case "mergemap":
  case "flatmap": runMergeMap(); break;
  case "concatmap": runConcatMap(); break;
  case "merge": runMerge(); break;
  case "concat": runConcat(); break;
  case "zip": runZip(); break;
  case "reduce": runReduce(); break;
  default:
    console.log("Unknown operator! Try one of: map, filter, mergeMap, concatMap, merge, concat, zip, reduce.")
};

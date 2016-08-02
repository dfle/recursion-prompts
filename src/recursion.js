/* jshint esversion: 6 */

// Solve all of the following prompts using recursion.

// 1. Calculate the factorial of a number.  The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example:  5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5);  // 120
var factorial = function(n) {
  // If n is negative, it doesn't have a factorial.
  if (n < 0) {
    return null;
  }

  // If n is zero, its factorial is one.
  // Each call returns to its caller and the recursion terminates.
  if (n === 0) {
    return 1;
  }

  // If the number is neither illegal nor zero, call factorial() again,
  // this time passing in a smaller number.
  return n * factorial(n - 1);
};

// 2. Compute the sum of an array of integers.
// Example:  sum([1, 2, 3, 4, 5, 6]);  // 21
var sum = function(array) {
  var copy = array.slice();
  var num = copy.pop();

  // Recursion terminates when the array is empty.
  // If the input array is empty, return 0.
  if (copy.length === 0) {
    return num || 0;
  }

  // Call sum() while there are items in the copied array.
  return num + sum(copy);
};

// 3. Sum all numbers in an array containing nested arrays.
// Example: arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  var copy = array.slice();
  var num = copy.shift();

  // Recursion terminates and returns zero when the array is empty.
  // If the input array is empty, return zero.
  // If the shifted value is a number, return it.
  if (copy.length === 0 && !Array.isArray(num)) {
    return num || 0;
  }

  // If the shifted value is an array, sum up its contents then return it.
  if (Array.isArray(num)) {
    var sum = 0;
    for (var i = 0; i < num.length; i++){
      // Call arraySum() on nested arrays.
      if (Array.isArray(num[i])) {
        sum += arraySum(num[i]);
      } else {
        sum += num[i];
      }
    }
    return sum + arraySum(copy);
  }

  // Call arraySum() while there are items in the copied array.
  return num + arraySum(copy);
};

// 4. Check if a number is even.
var isEven = function(n) {
  // Get the absolute value of n.
  n = n < 0 ? -n : n;

  // Recursion terminates when n is zero or one.
  // n is even if tail-n is zero; odd if one.
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  }

  // Call isEven(), subtracting 2 from n, until n equals zero or one.
  return isEven(n - 2);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {
  // Recursion terminates when n is zero.
  if (n === 0) { return 0; }

  // Call sumBelow(), passing in a smaller number for positive integers.
  if (n > 0) {
    return (n-1) + sumBelow(n-1);
  } else {
    // Cal sumBelow(), passing in a greater value for negative integers.
    return (n+1) + sumBelow(n+1);
  }
};

// 6. Get the integers in range (x, y).
// Example:  range(2, 9);  // [3, 4, 5, 6, 7, 8]
var range = function(x, y) {
  var results = [];

  // Return an empty array when if no integers are in range.
  // Both values are equivalent, or are only separated by one.
  if (x === y) {
    return [];
  }

  // If x is less than y, increment each successive value,
  // otherwise decrement towards the end range.
  if (x < y) {
    // Recursion terminates when x is one less than y for positive integers.
    if (x === y-1) {
      return results;
    }
    // Insert a value into results
    results.push(x+1);
    // Call range() and concat each new value to results.
    return results.concat(range(x+1, y));
  } else {
    if (x === y+1) {
      return results;
    }
    results.push(x-1);
    return results.concat(range(x-1, y));
  }
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64.  Here, 8 is the base and 2 is the exponent.
// Example:  exponent(4,3);  // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp > 0 && exp % 2 === 0) {
    return exponent(base, exp/2) * exponent(base, exp/2);
  } else if (exp > 0 && exp %2 !== 0) {
    return base * exponent(base, exp-1);
  } else {
    return 1/(base * exponent(base, -exp-1));
  }
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  if (n < 1) {
    return false;
    // one is 2^0.
  } else if (n === 1 || n === 2) {
    return true;
  }

  return powerOfTwo(n/2);
};

// 9. Write a function that accepts a string a reverses it.
var reverse = function(string) {
  // Recursion terminates when only one letter remains.
  if (string.length <= 0) {
    return string;
  }
  // Call reverse() passing in the second letter on and concatenate the first.
  return reverse(string.substr(1)) + string[0];
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  // Ignore spaces and capital letters.
  var formattedString = '';
  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) !== ' ') {
        formattedString += string.charAt(i).toLowerCase();
    }
  }

  // If one or no letters remain, the string is a palindrome.
  // Accounts for strings with odd and even lengths.
  if (formattedString.length <= 1) { return true; }

  // Compare the first and last letters in a string. Slice them off
  // and pass in the remaining letters to palindrome().
  return formattedString[0] === formattedString[formattedString.length-1] && palindrome(formattedString.slice(1,-1));
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
  if (y === 0) { return NaN; }
  if (x === 0) { return 0; }

  if (x < 0 && y < 0) {
    if (-x < -y) {
      return x;
    }
    x -= y;
  } else if (x < 0) {
    if (-x < y) {
      return x;
    }
    x += y;
  } else if (x > 0) {
    if (x < y) {
      return x;
    }
    x -=y;
  }

  return modulo(x, y);
};

// 12. Write a function that multiplies two numbers without using the * operator  or
// JavaScript's Math object.
var multiply = function(x, y) {
  if (x === 0 || y === 0) {
    return 0;
  } else if (y === 1 || y === -1) {
    return x;
  }

  if (x > 0 && y > 0) {
    return x + multiply(x, y-1);
  } else if (x > 0 && y < 0) {
    return -x + multiply(-x, y+1);
  } else if (x < 0 && y > 0) {
    return -x - multiply(-x, y+1);
  } else if (x < 0 && y < 0) {
    return x + multiply(-x, -y+1);
  }
};

// 13. Write a function that divides two numbers without using the / operator  or
// JavaScript's Math object.
var divide = function(x, y) {
  if (y === 0) { return NaN; }
  if (x === 0) { return 0; }
  if (y === 1) { return x; }
};

// 14. Find the greatest common divisor (gcd) of two positive numbers.  The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// Example:  gcd(4,36);  // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
  // Dijkstra's algorithm
  if (x < 0 || y < 0) { return null; }

  if (x === y) {
    return x;
  } else if (x > y) {
    return gcd(x-y, y);
  } else {
    return gcd(x, y-x);
  }
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('', '') // true
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
  if (str1.length === 0 && str2.length === 0) {
    return true;
  }

  return str1[0] === str2[0] && compareStr(str1.slice(1), str2.slice(1));
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str){
  var result = [];

  if (str.length === 0) {
    return result;
  }
  result.push(str.charAt(0));

  return result.concat(createArray(str.slice(1)));
};

// 17. Reverse the order of an array
var reverseArr = function (array) {
  var result = [];

  if (array.length === 0) {
    return result;
  }

  result.push(array[0])

  return reverseArr(array.slice(1)).concat(result);
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  var result = [];

  if (length === 0) {
    return result;
  }
  result.push(value);

  return result.concat(buildList(value, length-1));
};

// 19. Count the occurence of a value inside a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
  var count = 0;

  if (array.length === 0) {
    return 0;
  }

  if (array[0] === value) {
    count+= 1;
  }

  return count + countOccurrence(array.slice(1), value);
};

// 20. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  if (array.length === 0) {
    return array;
  }

  return [callback(array[0])].concat(rMap(array.slice(1), callback));
};

// 21. Write a function that counts the number of times a key occurs in an object.
// var testobj = {'e': {'x':'y'}, 't':{'r': {'e':'r'}, 'p': {'y':'r'}},'y':'e'};
// countKeysInObj(testobj, 'r') // 1
// countKeysInObj(testobj, 'e') // 2
var countKeysInObj = function(obj, key) {
  var count = 0;

  for (var prop in obj) {
    if (prop === key) { count++; }
    if (typeof obj[prop] === 'object') {
      count += countKeysInObj(obj[prop], key);
    }
  }

  return count;
};

// 22. Write a function that counts the number of times a value occurs in an object.
// var testobj = {'e': {'x':'y'}, 't':{'r': {'e':'r'}, 'p': {'y':'r'}},'y':'e'};
// countValuesInObj(testobj, 'r') // 2
// countValuesInObj(testobj, 'e') // 1
var countValuesInObj = function(obj, value) {
  var count = 0;

  for (var key in obj) {
    if (obj[key] === value) {
      count++;
    }
    if (typeof obj[key] === 'object') {
      count += countValuesInObj(obj[key], value);
    }
  }

  return count;
};

// 23. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, key, newKey) {
  for (var prop in obj) {
    if (prop === key){
      obj[newKey] = obj[prop];
      delete obj[prop];
    }

    if (typeof obj[prop] === 'object') {
      replaceKeysInObj(obj[prop], key, newKey);
    }
  }

  return obj;
};

// 24. Get the first n Fibonacci numbers.  In the Fibonacci Sequence, each subsequent
// number is the sum of the previous two.
// Example:  0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5);  // [0, 1, 1, 2, 3, 5]
// Note:  The 0 is not counted.
var fibonacci = function(n) {

  if (n === 0 || n < 0) {
    return null;
  } else if (n === 1) {
    return [0,1];
  } else {
    var result = fibonacci(n-1);
    result.push(result[result.length - 1] + result[result.length - 2]);
    return result;
  }
};

// 25. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
  if (n < 0) { return null; }

  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return nthFibo(n-1) + nthFibo(n-2);
  }
};

// 26. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  var result = [];
  if (array.length === 0) {
    return result;
  }
  return [array[0].toUpperCase()].concat(capitalizeWords(array.slice(1)));
};

// 27. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car', 'poop', 'banana']); // ['Car', 'Poop', 'Banana']
var capitalizeFirst = function(array) {
  var result = [];
  if (array.length === 0) {
    return result;
  }
  return [array[0].charAt(0).toUpperCase() + array[0].slice(1)].concat(capitalizeFirst(array.slice(1)));
};

// 28. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
  var sum = 0;

  for (var prop in obj) {
    if (obj[prop] % 2 === 0) {
      sum += obj[prop];
    }
    if (typeof obj[prop] === 'object') {
      sum += nestedEvenSum(obj[prop]);
    }
  }

  return sum;
};

// 29. Flatten an array containing nested arrays.
// Example: flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(arrays, item) {
  var result = [];

  for (var i = 0; i < arrays.length; i++) {
    if (Array.isArray(arrays[i])) {
      result = result.concat(flatten(arrays[i]));
    } else {
      result.push(arrays[i]);
    }
  }

  return result;
};

// 30. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {'p':1, 'o':2, 't':2, 'a':1}
var letterTally = function(str, obj) {
  obj = obj || {};

  if (str.length === 0) {
    return obj;
  }

  if (str.charAt(0) in obj) {
    obj[str.charAt(0)]++;
  } else {
    obj[str.charAt(0)] = 1;
  }

  return letterTally(str.slice(1), obj);
};

// 31. Eliminate consecutive duplicates in a list.  If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// Example: compress([1, 2, 2, 3, 4, 4, 5, 5, 5]) // [1, 2, 3, 4, 5]
// Example: compress([1, 2, 2, 3, 4, 4, 2, 5, 5, 5, 4, 4]) // [1, 2, 3, 4, 2, 5, 4]
var compress = function(list, result) {
  result = result || [];

  if (list.length === 0) {
    return result
  }

  if (list[0] !== result[result.length-1]) {
    result.push(list[0]);
  }

  return compress(list.slice(1), result);
};

// 32. Augument every element in a list with a new value where each element is an array
// itself.
// Example: augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug, result) {
  result = result || [];

  if (array.length === 0) {
    return result;
  }
  
  array[0].push(aug);
  result.push(array[0]);

  return augmentElements(array.slice(1), aug, result);
};

// 33. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
};

// 34. Alternate the numbers in an array between positive and negative regardless of
// their original sign.  The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
};

// 35. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 36. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
};

// 37. Write a function for binary search.
// Sample array:  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// console.log(binarySearch(5)) will return '5'
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search

var binarySearch = function(array, target, min, max) {
};

// 38. Write a merge sort function.
// Sample array:  [34,7,23,32,5,62]
// Sample output: [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
};

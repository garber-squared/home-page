---
layout: post
title:  "Javascript Exercises"
date:   "Sun Jan 22 02:58:19 PM EST 2023"
tags: [javascript]
---

The following is a collection of functions from [Learn Javascript](http://learnjavascript.online)

## String Functions

### Capitalize a string

```javascript
/**
 * @param {string} word
 */
function capitalize(word) {
    const lowercaseWord = word.toLocaleLowerCase();
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.substring(1,word.length).toLowerCase();
    const capitalizedWord = firstLetter + restOfWord;
    return capitalizedWord;
}

// Sample usage - do not modify
console.log(capitalize("sam")); // "Sam"
console.log(capitalize("ALEX")); // "Alex"
console.log(capitalize("chARLie")); // "Charlie"
```

## Numeric Functions

### Accounting for an empty string or number from an input field.

This accounts for either an empty string or a null entry.

```javascript
/**
 * @param {string} age
 */
export function getNextAge(age) {
    if (age.length === 0 || age === null) {
        return 0;
    } else {
        const int = Number.parseInt(age, 10);
        return int + 1;
    }
}
```

### Declare a function within a function (like a lambda in Ruby)

```javascript
/**
 * @param {number[]} numbers
 */
function sumOddNumbers(numbers) {
    function isOddNumber(n) {
        const number = Number.parseInt(n, 10);
        return ( (number % 2 !== 0));
    }

    let total = 0;

    numbers.forEach(function(number) {
        if (isOddNumber(number) === true) {
            total += number;
        }
    })

    return total;
}

// Sample usage - do not modify
console.log(sumOddNumbers([15, 5, 10])); // 20
console.log(sumOddNumbers([2, 3, 4, 5, 6])); // 8
console.log(sumOddNumbers([-2, -3, 4, 5, 6])); // 2
```

### Use a dictionary and a ternary to extract a substring and return a string

```javascript
const dictionary = {
    "°C": "Celsius",
    "°F": "Fahrenheit"
}

const getUnit = text => {
    const tempScan = /°[CF]+/.exec(text);
    const tempString = tempScan === null ? 'N/A' : dictionary[tempScan[0]];
    return tempString;
}

// Sample usage - do not modify
console.log(getUnit("It is 15°C today")); // Celsius
console.log(getUnit("It was 90°F yesterday")); // Fahrenheit
console.log(getUnit("Why is it 20°C")); // Celsius
console.log(getUnit("Are you sure that it'll be 55°F?")); // Fahrenheit
console.log(getUnit("It is expected to be cold.")); // N/A
```

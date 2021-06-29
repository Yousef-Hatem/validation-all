validation-all
==============

A library of data validation tools.

The **validation-all** library makes data validation in JavaScript very easy.

## Why use validation-all?

* Ease of handling and use.
* You can validate data without writing a single line of JavaScript.
* Using Bootstrap to display the error message.
* ES6 support.
* Control the display of messages through the **message-view** file

## Installation

### Using npm

`npm install validation-all`

### Calling the library in project

```js
const validationAll = require('validation-all').default;
```

### Basic Usage

```js
validationAll(input).email(); //=> true or false
```

**input** {Element} the input you want to validate and you can also replace it with data directly for example `validationAll('test@gmail.com').email()`

**email** verification type

## Options
```js
validationAll(input, {
    required: true,
    view: true,
    errorMessage: 'error',
    correctMessage: 'correct'
}).email(); //=> true or false
```
* **required** - Determine whether **input** is required or not
* **view** - Influence of **input** when true or false
* **errorMessage** - The message appears when the result is false
* **correctMessage** - The message appears when the result is true

# Verification types
Explanation of all verification orders

## email
Verify the email is correct

### Syntax
```js
validationAll(input).email(); //=> true or false
```

## password
To check how hard the password is there are 3 levels of difficulty

### Syntax
```js
validationAll(input).password(); //=> true or false
```
#### Options
```js
validationAll(input).password({
    level: 'complex',
    resetPassword: reset
}); //=> true or false
```
* **complex** - Required password difficulty level
  * There are 3 levels `(simple, complex, difficult)`
* **reset** {Element} - Input field Return password

## file
Verify that the file exists and check the format of the file

### Syntax
```js
validationAll(input).file(); //=> true or false
```
#### Options
```js
validationAll(input).file(['png','jpg']); //=> true or false
```
* **[formulas]** {Array} Array in the required formats

## phone
Verify phone numbers

### Syntax
```js
validationAll(input).phone('+20', 10); //=> true or false
```
* **['+20']** Phone number key or you can type the numbers you want the phone number to start with
    * You can also add more than one number to the beginning of the phone number `Example: ['010', '011', '012']`
* **10** {number} The number of digits you want after the phone number key

## url
Check URL

### Syntax
```js
validationAll(input).url(); //=> true or false
```

## number
To check the number

### Syntax
```js
validationAll(input).number(); //=> true or false
```
#### Options
```js
validationAll(input).number(min, max);
```
* **min** {number} Specify min length
* **max** {number} Specify max length

## integer
Check that the integer

### Syntax
```js
validationAll(input).integer(); //=> true or false
```
#### Options
```js
validationAll(input).integer(min, max);
```
* **min** {number} Specify min length
* **max** {number} Specify max length

## checkbox
To make sure that he pressed the checkbox

### Syntax
```js
validationAll(input).checkbox(); //=> true or false
```

## radio
To make sure he pressed the radio

### Syntax
```js
validationAll(input).radio(); //=> true or false
```

## required
Make the required input

### Syntax
```js
validationAll(input).required(); //=> true or false
```

## rules
Used to specify the type of verification, the maximum length and the minimum length

### Syntax
```js
validationAll(input).rules({
    type: 'url',
    min: 10,
    max: 55
}); //=> true or false
```
* **type** Select the type of verification
    * You can specify **string** or **number** or **integer** or **email** or **url**
* **min** {number} Specify min length
* **max** {number} Specify max length
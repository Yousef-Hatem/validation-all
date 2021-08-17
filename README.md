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

`npm i validation-all`

### Calling the library in project
#### ES5
```js
const validation = require('validation-all').default;
```
#### ES6
```js
import validation from 'validation-all';
```
#### HTML
```html
<script src="script/validation.min.js"></script>
```

# Basic Usage
You can do the validation with JavaScript or HTML

## JavaScript
```js
validation(input).email(); //=> true or false
```

**input** {Element} the input you want to validate and you can also replace it with data directly for example `validation('test@gmail.com').email()`

**email** verification type

### Options
```js
validation(input, {
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

## HTML
Notice: To use HTML only to validate the input you must be a [Bootstrap](https://getbootstrap.com) library caller
```html
<form class="vaal-form">
    <input type="text" class="form-control vaal-email">
</form>
```

**vaal-form** {class} This class defines that you are using validation-all in this form

**vaal-email** {class} Specify the type of verification in this input

### Options
```html
<input type="text" class="form-control vaal-email" vaal-msg-error="Email is not valid" vaal-msg-correct="is email" required>
```
* **vaal-msg-error** - This message will be displayed when the value is wrong
* **vaal-msg-correct** - This message will be displayed when the value is true
* **required** - To make **input** required

# Verification types
Explanation of all verification orders

## email
Verify the email is correct


### JavaScript Syntax
```js
validation(input).email(); //=> true or false
```
### HTML Syntax
```html
<input type="text" class="form-control vaal-email">
```

## password
To check how hard the password is there are 3 levels of difficulty

### JavaScript Syntax
```js
validation(input).password(); //=> true or false
```
#### Options
```js
validation(input).password({
    level: 'complex',
    resetPassword: reset
}); //=> true or false
```
* **complex** - Required password difficulty level
  * There are 3 levels `(simple, complex, difficult)`
* **reset** {Element} - Input field Return password

### HTML Syntax
```html
<input type="password" class="form-control vaal-password">
```
#### Options
```html
<input type="password" class="form-control vaal-password" vaal-level="complex">
<input type="password" class="form-control vaal-reset-password">
```
* **vaal-level** - Required password difficulty level
  * There are 3 levels `(simple, complex, difficult)`
* **vaal-reset-password** {class} - Input field Return password

## file
Verify that the file exists and check the format of the file

### JavaScript Syntax
```js
validation(input).file(); //=> true or false
```
#### Options
```js
validation(input).file(['png','jpg']); //=> true or false
```
* **[formulas]** {Array} Array in the required formats

### HTML Syntax
```html
<input type="file" class="form-control vaal-file">
```
#### Options
```html
<input type="file" class="form-control vaal-file" vaal-formats="png,jpg">
```
* **[vaal-formats]** Required formats

## phone
Verify phone numbers

### JavaScript Syntax
```js
validation(input).phone('+20', 10); //=> true or false
```
* **['+20']** Phone number key or you can type the numbers you want the phone number to start with
    * You can also add more than one number to the beginning of the phone number `Example: ['010', '011', '012']`
* **10** {number} The number of digits you want after the phone number key

### HTML Syntax
```js
<input type="text" class="form-control vaal-phone" vaal-start="+20" vaal-length="10">
```
* **vaal-start** The phone number key is added or you can type the numbers you want the phone number to start with
    * You can also add more than one number to the beginning of the phone number `Example: vaal-start="010,011,012"`
* **vaal-length** Specify the number of digits you want after the phone number key

## url
Check URL

### JavaScript Syntax
```js
validation(input).url(); //=> true or false
```

### HTML Syntax
```js
<input type="text" class="form-control vaal-url">
```

## number
To check the number

### JavaScript Syntax
```js
validation(input).number(); //=> true or false
```
#### Options
```js
validation(input).number(min, max);
```
* **min** {number} Specify min length
* **max** {number} Specify max length

### HTML Syntax
```html
<input type="text" class="form-control vaal-number">
```
#### Options
```html
<input type="text" class="form-control vaal-number" vaal-min="4" vaal-max="10">
```
* **vaal-min** {number} Specify min length
* **vaal-max** {number} Specify max length

## integer
Check that the integer

### JavaScript Syntax
```js
validation(input).integer(); //=> true or false
```
#### Options
```js
validation(input).integer(min, max);
```
* **min** {number} Specify min length
* **max** {number} Specify max length

### HTML Syntax
```html
<input type="text" class="form-control vaal-integer">
```
#### Options
```html
<input type="text" class="form-control vaal-integer" vaal-min="4" vaal-max="10">
```
* **vaal-min** {number} Specify min length
* **vaal-max** {number} Specify max length

## checkbox
To make sure that he pressed the checkbox

### JavaScript Syntax
```js
validation(input).checkbox(); //=> true or false
```
### HTML Syntax
```html
<input type="checkbox" class="form-check-input vaal-checkbox">
```

## radio
To make sure he pressed the radio

### JavaScript Syntax
```js
validation(input).radio(); //=> true or false
```
### HTML Syntax
```html
<input type="radio" class="form-check-input vaal-radio">
```

## required
Make the required input

### JavaScript Syntax
```js
validation(input).required(); //=> true or false
```
### HTML Syntax
```html
<input type="text" class="form-control" required>
```

## rules
Used to specify the type of verification, the maximum length and the minimum length

### JavaScript Syntax
```js
validation(input).rules({
    type: 'url',
    min: 10,
    max: 55
}); //=> true or false
```
* **type** Select the type of verification
    * You can specify **string** or **number** or **integer** or **email** or **url**
* **min** {number} Specify min length
* **max** {number} Specify max length
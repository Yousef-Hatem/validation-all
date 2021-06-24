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

```html
<script type="text/javascript" src="validation-all.js"></script>
```

### Basic Usage

```js
validationAll(input).email(); //=> true or false
```

**input** {Element} the input you want to validate

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
class _validationAll {
    constructor(input, wanted, view, errorMessage, correctMessage) {
        this.input = input;
        this.errorMessage = errorMessage;
        this.correctMessage = correctMessage;
        this.messageView = _validationAll.messageView || { required: {} };
        if (!this.input.value && input.value !== '') {
            this.input = { value: input };
            this.view = false;
        } else {
            if (wanted !== true && wanted !== false) {
                this.wanted = input.required;
            } else {
                this.wanted = wanted;
            }
            if (view !== true && view !== false) {
                this.view = input.classList.value.split(' ').indexOf('form-control') >= 0 ? true : false;
            } else {
                this.view = view;
            }
        }
    }

    error = (message, input = this.input) => {
        if (this.view === true) {
            let divMessage = input.nextElementSibling;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            try {
                if (typeof message == 'string') {
                    message = this.messageView[message].error;
                } else {
                    message = this.messageView[message[0]][message[1]].error;
                }
            } catch {
                message = '';
            }
            if (divMessage !== null) {
                if (divMessage.className == 'invalid-feedback' || divMessage.className == 'valid-feedback') {
                    divMessage.remove();
                }
            }
            if (input.value.length == 0) {
                if (this.wanted === true && input.type !== 'checkbox' && input.type !== 'radio') {
                    input.insertAdjacentHTML("afterend", `<div class="invalid-feedback">${this.messageView.required.error || ''}</div>`);
                    input.focus();
                } else {
                    input.classList.remove('is-invalid');
                }
            } else {
                if (input.type !== 'checkbox' && input.type !== 'radio') {
                    input.insertAdjacentHTML("afterend", `<div class="invalid-feedback">${this.errorMessage || message}</div>`);
                    input.focus();
                }
            }
        }

        if (input.value.length == 0 && this.wanted != true) {
            return null;
        }
        return false;
    }

    correct = (message = '', input = this.input) => {
        if (this.view === true) {
            let divMessage = input.nextElementSibling;
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            try {
                if (typeof message == 'string') {
                    message = this.messageView[message].correct;
                } else {
                    message = this.messageView[message[0]][message[1]].correct;
                }
            } catch {
                message = '';
            }
            if (divMessage !== null) {
                if (divMessage.className == 'invalid-feedback' || divMessage.className == 'valid-feedback') {
                    divMessage.remove();
                }
            }

            if (input.type !== 'checkbox' && input.type !== 'radio') {
                input.insertAdjacentHTML("afterend", `<div class="valid-feedback">${this.correctMessage || message}</div>`);
            }
        }

        return true;
    }

    checkbox = () => {
        if (this.input.type == 'checkbox') {
            if (!this.input.checked) {
                return this.error('checkbox');
            } else {
                return this.correct();
            }
        } else {
            console.error(Error('Input type not equal to checkbox'));
        }
    }

    radio = () => {
        if (this.input.type == 'radio') {
            if (!this.input.checked) {
                return this.error('radio');
            } else {
                return this.correct();
            }
        } else {
            console.error(Error('Input type not equal to radio'));
        }
    }

    email = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.input.value).toLowerCase())) {
            return this.error('email');
        } else {
            return this.correct('email');
        }
    }

    password = (options = {}) => {
        let passwordLevel = options.level || 'simple';
        let inputResetPassword = options.resetPassword || null;
        let resetPassword = () => {
            if (inputResetPassword != null) {
                if (this.input.value != inputResetPassword.value) {
                    return this.error('resetPassword', inputResetPassword);
                } else {
                    return this.correct('resetPassword', inputResetPassword);
                }
            }
        }
        switch (passwordLevel) {
            case 'simple':
                let simpleMatch = /^[^]{8,}$/im;
                if (!this.input.value.match(simpleMatch)) {
                    return this.error(['password', 'simple']);
                } else {
                    if (inputResetPassword) {
                        this.correct(['password', 'simple']);
                        return resetPassword();
                    } else {
                        return this.correct(['password', 'simple']);
                    }
                }
                break;
            case 'complex':
                let complexMatch = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/g;
                if (!this.input.value.match(complexMatch)) {
                    return this.error(['password', 'complex']);
                } else {
                    if (inputResetPassword) {
                        this.correct(['password', 'complex']);
                        return resetPassword();
                    } else {
                        return this.correct(['password', 'complex']);
                    }
                }
                break;
            case 'difficult':
                let difficultMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
                if (!this.input.value.match(difficultMatch)) {
                    return this.error(['password', 'difficult']);
                } else {
                    if (inputResetPassword) {
                        this.correct(['password', 'difficult']);
                        return resetPassword();
                    } else {
                        return this.correct(['password', 'difficult']);
                    }
                }
                break;

            default:
                console.error(Error('There is no such level, from the levels in (simple, complex, difficult)'));
                break;
        }
    }

    required = () => {
        if (this.input.value.length === 0) {
            return this.error('required');
        } else {
            return this.correct('required');
        }
    }

    number = (min, max) => {
        let value = this.input.value;
        let numberMatch = /^(([0-9]{1,})|(([0-9]+\.)+[0-9]{1,}))$/;
        if (!value.match(numberMatch) || value.length < min || value.length > max) {
            return this.error('number');
        } else {
            return this.correct('number');
        }
    }

    integer = (min, max) => {
        let value = this.input.value;
        if (value.match(/[^0-9]/) || value.length < min || value.length > max) {
            return this.error('integer');
        } else {
            return this.correct('integer');
        }
    }

    file = (requiredFormats = []) => {
        let format = this.input.value.split('.').pop();
        if (requiredFormats.length > 0) {
            if (requiredFormats.indexOf(format) < 0) {
                return this.error('file');
            } else {
                return this.correct('file');
            }
        } else if (this.input.value.length <= 0) {
            return this.error('');
        } else {
            return this.correct();
        }
    }

    url = () => {
        let pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
        if (!pattern.test(this.input.value)) {
            return this.error('url');
        } else {
            return this.correct('url');
        }
    }

    phone = (start, length) => {
        let startValue = '';
        let index;
        if (!Array.isArray(start)) {
            let startValue = start;
            start = [];
            start.push(startValue);
        }
        start.forEach(S => {
            startValue = '';
            for (let i = 0; i < S.length; i++) { startValue += this.input.value[i] }
            index = start.indexOf(startValue);
        });
        if (start[index] != startValue || length != this.input.value.length - start[index].length) {
            return this.error('phone');
        } else {
            return this.correct('phone');
        }
    }

    rules = (rules = {}) => {
        let value = this.input.value,
            type = rules.type,
            min = rules.min,
            max = rules.max;

        if (value.length === 0) {
            return this.error();
        }

        if (type === 'string' && typeof value !== 'string' || type === String && typeof value !== 'string') {
            return this.error('');
        }

        if (type === 'number' && !this.number() || type === Number && !this.number()) {
            return this.error('');
        }

        if (type === 'integer' && !this.integer() || type === 'INT' && !this.integer()) {
            return this.error('');
        }

        if (type === 'email' && !this.email()) {
            return this.error('');
        }

        if (type === 'url' && !this.url()) {
            return this.error('');
        }

        if (value.length > max) {
            return this.error('');
        }

        if (value.length < min) {
            return this.error('');
        }

        if (value.length !== 0) {
            return this.correct('');
        }
    }
}
let validationAll = (input, options = {}) => new _validationAll(input, options.required, options.view, options.errorMessage, options.correctMessage);

try {
    let vaalForm = document.getElementsByClassName('vaal-form') || {};
    for (let form of vaalForm) {
        let inputs = form.querySelectorAll('input');
        let buttons = form.querySelectorAll('input[type=submit], button');
        inputs = [...inputs];
        inputs.reverse();
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                let errors = 0;
                let resetPassword = null;
                inputs.forEach(input => {
                    if (input.classList.value.split(' ').indexOf('vaal-reset-password') >= 0) {
                        resetPassword = input;
                    }
                });
                inputs.forEach(input => {
                    let allClass = input.classList;
                    let options = { required: input.required, errorMessage: input.getAttribute('vaal-msg-error'), correctMessage: input.getAttribute('vaal-msg-correct') }
                    if (input.required) {
                        if (!validationAll(input).required()) {
                            errors++;
                        }
                    }
                    allClass.forEach(_class => {
                        _class = _class.split('vaal-');
                        if (_class[1]) {
                            let max = input.getAttribute('vaal-max');
                            let min = input.getAttribute('vaal-min');
                            switch (_class[1]) {
                                case 'email':
                                    let email = validationAll(input, options).email();
                                    !email ? email == null ? '' : errors++ : '';
                                    break;
                                case 'password':
                                    let level = input.getAttribute('vaal-level');
                                    let password = validationAll(input, options).password({ level: level, resetPassword: resetPassword });
                                    !password ? password == null ? '' : errors++ : '';
                                    break;
                                case 'file':
                                    let formats = input.getAttribute('vaal-formats').split(',');
                                    let file = validationAll(input, options).file(formats);
                                    !file ? file == null ? '' : errors++ : '';
                                    break;
                                case 'url':
                                    let url = validationAll(input, options).url();
                                    !url ? url == null ? '' : errors++ : '';
                                    break;
                                case 'number':
                                    let number = validationAll(input, options).number(min, max);
                                    !number ? number == null ? '' : errors++ : '';
                                    break;
                                case 'integer':
                                    let integer = validationAll(input, options).integer(min, max);
                                    !integer ? integer == null ? '' : errors++ : '';
                                    break;
                                case 'checkbox':
                                    let checkbox = alidationAll(input, options).checkbox();
                                    !checkbox ? checkbox == null ? '' : errors++ : '';
                                    break;
                                case 'radio':
                                    let radio = validationAll(input, options).radio();
                                    !radio ? radio == null ? '' : errors++ : '';
                                    break;
                                case 'phone':
                                    let start = input.getAttribute('vaal-start') || '';
                                    let length = input.getAttribute('vaal-length') || '';
                                    let phone = validationAll(input, options).phone(start.split(','), length);
                                    !phone ? phone == null ? '' : errors++ : '';
                                    break;

                                default:
                                    break;
                            }
                        }
                    });
                });
                if (errors) {
                    e.preventDefault();
                }
            });
        });
    }
} catch {

}
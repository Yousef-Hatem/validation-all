class _validationAll {
    constructor(input, wanted = true, view = true, errorMessage, correctMessage) {
        this.input = input;
        this.wanted = wanted;
        this.view = view;
        this.errorMessage = errorMessage;
        this.correctMessage = correctMessage;
        this.messageView = _validationAll.messageView || { required: {} }

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
                    return null;
                }
            } else {
                if (input.type !== 'checkbox' && input.type !== 'radio') {
                    input.insertAdjacentHTML("afterend", `<div class="invalid-feedback">${this.errorMessage || message}</div>`);
                    input.focus();
                }
            }
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

    checkbox = (show) => {
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

    radio = (show) => {
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

    password = (passwordLevel = 'simple', inputResetPassword = null) => {
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
                    resetPassword();
                    return this.correct(['password', 'simple']);
                }
                break;
            case 'complex':
                let complexMatch = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/g;
                if (!this.input.value.match(complexMatch)) {
                    return this.error(['password', 'complex']);
                } else {
                    resetPassword();
                    return this.correct(['password', 'complex']);
                }
                break;
            case 'difficult':
                let difficultMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
                if (!this.input.value.match(difficultMatch)) {
                    return this.error(['password', 'difficult']);
                } else {
                    resetPassword();
                    return this.correct(['password', 'difficult']);
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

    number = (min, mix) => {
        let value = this.input.value;
        let numberMatch = /^(([0-9]{1,})|(([0-9]+\.)+[0-9]{1,}))$/;
        if (!value.match(numberMatch) || value.length < min || value.length > mix) {
            return this.error('number');
        } else {
            return this.correct('number');
        }
    }

    integer = (min, mix) => {
        let value = this.input.value;
        if (!value.match(/[0-9]/) || value.length < min || value.length > mix) {
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
        var pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
        if (!pattern.test(this.input.value)) {
            return this.error('url');
        } else {
            return this.correct('url');
        }
    }

    rules = (rules = {}) => {
        let value = this.input.value,
            type = rules.type,
            min = rules.min,
            mix = rules.mix;

        if (value.length === 0) {
            return this.error();
        }

        if (type === 'string' && typeof value !== 'string') {
            return this.error('');
        }

        if (type === 'number' && !value.match(/^(([0-9]{1,})|(([0-9]+\.)+[0-9]{1,}))$/)) {
            return this.error('');
        }
        if (type === 'integer' && value.match(/[^0-9]/) || type === 'INT' && value.match(/[^0-9]/)) {
            return this.error('');
        }

        if (value.length > mix) {
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
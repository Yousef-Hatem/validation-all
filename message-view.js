var messageView = {

    checkbox: { error: '', correct: '' },

    radio: { error: '', correct: '' },

    email: { error: 'sorry, this email is incorrect', correct: '' },

    required: { error: 'this field is required', correct: '' },

    number: { error: 'the figure is incorrect', correct: '' },

    integer: { error: 'the figure is incorrect', correct: '' },

    file: { error: 'this file format is incorrect', correct: '' },

    url: { error: 'sorry, but this link is incorrect', correct: '' },

    phone: { error: 'sorry, but this phone number is incorrect', correct: '' },

    resetPassword: { error: 'sorry, but the password does not match', correct: '' },

    password: {
        simple: { error: 'sorry, but the password must be at least 8', correct: '' },

        complex: { error: 'sorry, but the password must be at least 8 and contain letters and numbers', correct: '' },

        difficult: { error: 'sorry, but the password must be at least 8 and contain uppercase and lowercase letters, numbers and symbols', correct: '' }
    }
}

export default messageView;
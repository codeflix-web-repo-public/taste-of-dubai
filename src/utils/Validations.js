export function validateRequired(e, name = false, value = false) {
    const { validate } = this.state

    // Is event passed in?
    if (e !== false) {
        name = e.target.name;
        value = e.target.value;
    }

    if (value !== '') {
        validate[name] = 'has-success'
    } else {
        validate[name] = 'has-danger'
    }

    this.setState({ validate })
}

export function validateEmail(e) {
    const { validate } = this.state;

    // Must be valid email
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
        validate.email = 'has-success'
    } else {
        validate.email = 'has-danger'
    }

    this.setState({ validate })
}

export function validateFile(e, name = false) {
    const { validate } = this.state
    const file = e.target && e.target.files[0]
    if (file) {
        const fileSize = file.size / 1024 / 1024; // in MiB
    
        if (fileSize > 10) {
            validate[name] = 'has-danger'
        } else {
            validate[name] = 'has-success'
        }
    } else {
        validate[name] = 'has-danger'
    }

    this.setState({ validate })
}
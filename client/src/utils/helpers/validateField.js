const validate = (key, touched, errors) => {
    if (touched[key]) {

        if (errors[key] || errors[key] === "") {
            return 'error'
        } else {
            return 'success'
        }

    } else {
        return ""
    }
}

export default validate;
const DateFormat = (props) => {
    let newDate = new Date(props.date)
    let dateFormat
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    dateFormat = `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`

    return dateFormat
}

export default DateFormat
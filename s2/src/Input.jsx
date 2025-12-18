const Input = ({title, value, setFunc}) => {
    return <div>{title} <input value={value} onChange={(e) => setFunc(e.target.value)}></input></div>
}

export default Input
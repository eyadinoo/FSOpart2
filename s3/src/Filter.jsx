const Filter = ({filter,setFilter}) => {
    return <form>find countries
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
    </form>
}

export default Filter
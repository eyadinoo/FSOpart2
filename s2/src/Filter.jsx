import Input from "./Input.jsx"

const Filter = ({newFilter, setNewFilter}) => {
    return(
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={(e)=>e.preventDefault()}>
                <Input title='filter shown with' value={newFilter} setFunc={setNewFilter}/>
            </form>
        </div>
    )
}

export default Filter
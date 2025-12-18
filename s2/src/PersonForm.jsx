import Input from "./Input.jsx"

const PersonForm = ({newName, setNewName, newNum, setNewNum, addName}) => {
    return(
        <div>
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <Input title='name' value={newName} setFunc={setNewName}/>
                <Input title='number' value={newNum} setFunc={setNewNum}/>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
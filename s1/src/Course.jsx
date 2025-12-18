const Course = ({ course }) => {
    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Content = ({parts}) => {
    return(
        <ul>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </ul>
    )
}

const Header = ({name}) => <h1>{name}</h1>

const Part = ({name,exercises}) => <li>{name} {exercises}</li>

const Total = ({parts}) => <p><strong>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</strong></p>

export default Course
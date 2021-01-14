import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string
}

// interface Course {
//     name: string;
//     exerciseCount: number
// }

// interface ContentProps {
//   courses: Course[]
// }

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBase2 extends CoursePartBase{
  description: string;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase2 {
  name: "React with typescript";
  exerciseAuthor: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>
}

interface ContentProps {
  courses: CoursePart[];
}

interface PartProps {
  details: CoursePart
}

const assertNever = (value : never) : never => {
  throw new Error(`Unhandles discriminated union member: ${JSON.stringify(value)}`);
}
const Part: React.FC<PartProps> = (props) => {
  let attributes = null
  switch (props.details.name) {
    case "Fundamentals":
      attributes = `${props.details.name} ${props.details.exerciseCount} ${props.details.description}`
      break;
    case "Deeper type usage":
      attributes = `${props.details.name} ${props.details.exerciseCount} ${props.details.description} ${props.details.exerciseSubmissionLink}`;
      break;
    case "Using props to pass data": 
      attributes = `${props.details.name} ${props.details.exerciseCount} ${props.details.groupProjectCount}`
      break;
    case "React with typescript":
      attributes = `${props.details.name} ${props.details.exerciseCount} ${props.details.description} ${props.details.exerciseAuthor}`
      break;
    default:
      return assertNever(props.details)
  }
  return (
    <div>
      <p>{attributes}</p>
    </div>
  )
  
}
const Content: React.FC<ContentProps> = (props) => {
  return(
    <div>
      {props.courses.map(c => <Part key = {c.name} details = {c}/>)}
    </div>
  )
}

const Total: React.FC<ContentProps> = (props) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }, 
    {
      name: "React with typescript",
      exerciseCount: 15,
      description: "Something",
      exerciseAuthor: "Mlukulai"
    }
  ];

  return (
    <div>
      <Header name = { courseName } />
      <Content courses = { courseParts } />
      <Total courses = { courseParts } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
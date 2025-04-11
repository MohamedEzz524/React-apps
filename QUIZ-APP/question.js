import Options from './options'

export default function Question(props) {
  return (
    <div>
      <h3 style={{color:"#FFB22C"}}>Question {props.question.id}</h3>
                <h5>{props.question.question}</h5>
                <form onSubmit={props.onSubmit}>
                    <Options
                        options={props.question.options}
                        selectedOption={props.selectedOption}
                        onOptionChange={props.onOptionChange}
                    />
                    <button type="submit">SUBMIT</button>
                </form>
    </div>
  )
}
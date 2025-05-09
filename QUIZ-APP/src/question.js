import Options from "./options";

export default function Question(props) {
  return (
    <div className="c">
      <div>
        <h3 style={{ color: "var(--accent)" }}>Question {props.question.id}</h3>
      </div>
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
  );
}

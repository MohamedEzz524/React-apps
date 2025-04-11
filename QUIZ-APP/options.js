export default function Options(props) {
  return (
    <div>
      {props.options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={props.selectedOption === option}
                            onChange={props.onOptionChange}
                        />
                        <label>{option}</label>
                    </div>
                ))}
    </div>
  )
}

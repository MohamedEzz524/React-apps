export default function Box(props) {
  return (
    <>
      <div   className='box' style={{backgroundColor:props.color}} onClick={(e)=>props.changeColor(e,props.color)}></div>
    </>
  )
}

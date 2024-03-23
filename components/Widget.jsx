import Image from 'next/image'

const Widget = (props) => {
  return (
    <div id="wrap" style={props.style}>
      <Image id="level-pic"
        width={32}
        height={32}
        src={props.src}
      />
      <p style={props.textColor} id="elo">{props.elo}</p>
    </div>
  )
}

export default Widget
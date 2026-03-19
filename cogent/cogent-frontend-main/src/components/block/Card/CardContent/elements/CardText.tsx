type CardTextProps = {
  text: string
}

const CardText = ({ text }: CardTextProps): JSX.Element => {
  return (
    <div
      className="pointer-events-none"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  )
}

export default CardText

const CardText = ({ text }: { text: string }) => {
  return (
    <p
      className="mb-1 h-full overflow-hidden text-clip px-2 text-[0.7em] leading-relaxed sm:px-3"
      dangerouslySetInnerHTML={{ __html: text }}
    ></p>
  )
}

export default CardText

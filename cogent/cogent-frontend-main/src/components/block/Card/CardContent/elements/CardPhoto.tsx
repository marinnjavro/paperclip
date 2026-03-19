const CardPhoto = ({ photoUrl }: { photoUrl?: string }) => (
  <div className="fade-md flex justify-center bg-[#565879]">
    <img
      src={photoUrl}
      width="100%"
      height="100%"
      alt="Card Image"
      draggable={false}
      className="mb-5 h-[210px] w-full object-cover xxs:h-[248.25px]"
    />
  </div>
)

export default CardPhoto

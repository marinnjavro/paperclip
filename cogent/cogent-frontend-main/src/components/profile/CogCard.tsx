interface CogCardProps {
  cog: any
}

const CogCard: React.FC<CogCardProps> = ({ cog }) => {
  return (
    <div className="min-w-full flex-1 grow rounded-2xl sm:min-w-[350px] xl:max-w-[400px]">
      <div>
        <h4 className="text-day-label-secondary-inverse pb-0.5 font-bold opacity-60 line-clamp-1">
          {cog.name}
        </h4>
      </div>
      <div className="mt-5">
        <img
          className="h-full w-full bg-[#565879] object-contain"
          src={cog.photoUrl}
          alt="Cog image"
        />
      </div>
    </div>
  )
}

export default CogCard

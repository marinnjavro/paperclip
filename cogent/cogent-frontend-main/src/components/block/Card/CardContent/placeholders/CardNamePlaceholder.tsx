const CardNamePlaceholder = () => (
  <div className="mx-4 mb-4 text-lg font-semibold text-white">
    <input
      className="w-full border-none bg-transparent p-0 text-lg font-semibold leading-tight text-day-text-label-primary placeholder:font-medium placeholder:italic placeholder:opacity-40 focus:outline-none focus:ring-0 dark:text-white "
      style={{ background: 'transparent' }}
      type="text"
      placeholder="Enter Card Name"
      aria-label="Card Name Input"
    />
  </div>
)

export default CardNamePlaceholder

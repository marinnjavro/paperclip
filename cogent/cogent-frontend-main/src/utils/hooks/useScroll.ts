export default function useScrollTo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  return {
    scrollToTop
  }
}

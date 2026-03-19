export const isTouchScreen = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0

export const sortByPosition = (array: any[]) =>
  array.slice().sort((a, b) => a.position - b.position)

export const trimString = (string: string, length: number): string => {
  if (string.length > length) {
    return `${string.substring(0, length)}...`
  }
  return string
}

export const areArraysSame = (
  array1: string[] | number[],
  array2: string[] | number[]
) => {
  if (array1.sort().join(',') === array2.sort().join(',')) {
    return true
  } else return false
}

export const allEqual = (arr: any[]) => arr.every((value) => value === arr[0])

export const isUrlValid = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

export const addToArray = (array: any[], value: any): any[] => {
  if (array.indexOf(value) === -1) {
    array.push(value)
  }
  return array
}

export const removeFromArray = (array: any[], value: any): any[] => {
  const index = array.indexOf(value)
  if (array.indexOf(value) !== -1) {
    array.splice(index, 1)
  }
  return array
}

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const stripHTML = (input: string) => input.replace(/<[^>]*>?/gm, '')

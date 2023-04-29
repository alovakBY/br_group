export const getDate = (time: number): string => {
   if (!time) {
      return ''
   }

   return `${new Date(time * 1000).toLocaleDateString('en-GB')} ${new Date(
      time * 1000,
   ).toLocaleTimeString('it-IT')}`
}

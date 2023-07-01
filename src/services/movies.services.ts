import dayjs from "dayjs"
export function convertDate(year: string){
   return dayjs(`${year}-01-01`).format()
}
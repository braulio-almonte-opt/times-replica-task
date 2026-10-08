export default function CalculateTimeDifference(articleDate: string){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");

    const date2 = new Date(`${year}-${month}-${day}`);
    const date1 = new Date(articleDate)

    const millDiff = Math.abs(date2.getTime() - date1.getTime());
    const daysDiff = Math.floor(millDiff / (1000*60*60*24));
    return daysDiff;
}
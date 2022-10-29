
export function convertHourStringToMinutes(hourString: string){
  const [hours, minutes] = hourString.split(':').map(Number);

  const minutesAndHours = (hours * 60 + minutes);
  return minutesAndHours;
}


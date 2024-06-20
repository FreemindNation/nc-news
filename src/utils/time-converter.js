export const timeConverter = (timeString)=> {
    const date = new Date(timeString);

    if (isNaN(date)) {
    throw new Error('Invalid ISO string');
  }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');     
    const day = String(date.getDate()).padStart(2, '0');
   
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const visualTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return visualTime;
  }
  

  
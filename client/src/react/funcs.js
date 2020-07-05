export function getCurrentYYYYMMDD()
{
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = ('0' + date.getDate()).slice(-2)

	return parseInt(year + '' + month + '' + day);
}

export function secsToHHMMSS(secs, convertMilisecsToSecs = false) 
{
	if(convertMilisecsToSecs){
		secs *= 1000
	}
  let sec_num = parseInt(secs, 10); // don't forget the second param
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
 
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

   return hours + ":" + minutes + ":" + seconds;
}

function HHMMSSToSecs(HHMMSS) 
{
	const arr = HHMMSS.split(":");
	return parseInt(arr[0] * 3600) + parseInt(arr[1] * 60) + parseInt(arr[2]);
}

export function getTaskEntryTime(start, end)
{
	let taskEntryTime 
	taskEntryTime = end - start === 0 ? 1000 : end - start

	return taskEntryTime / 1000
}

export function tsToTime(ts)
{
	let hours, minutes, meridiem

	hours = new Date(ts).getHours()
	hours = hours > 12 ? hours - 12 : hours
	
	minutes = new Date(ts).getMinutes()
	minutes = ('0' + minutes).slice(-2)
	
	meridiem = new Date(ts).getHours() > 11 ? 'PM' : 'AM' 	

	let result = `${hours}:${minutes} ${meridiem}`
	//console.log('result',result)
	return result
}

function saveToFile(path, input){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "./lib/wtf.php", true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

	xhr.onreadystatechange = () => {
		if(xhr.readyState == 4 && xhr.status == 200) {
		    alert("File Saved");
		}
	}
	let obj = JSON.stringify(input);
	xhr.send(obj);
}

export function TimeToTimeStamp(timeTxt){
	const regExp = /(\d{1,2}):(\d{2})([aApP][mM])/;
	const arr = timeTxt.trim().match(regExp);
	let hours;
	if(arr[3].toUpperCase().includes("P")){
		hours = arr[1] === "12" ? 12 * 3600 : (parseInt(arr[1]) + 12) * 3600;
	}else{
		hours = arr[1] === "12" ? 0 : parseInt(arr[1]) * 3600;
	}
	let mins = arr[2] * 60;

	return hours + mins;
}

export function dateNumToStr(dateNum)
{
	this.props.date === parseInt(today) ? "Today" : this.props.date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3');
	//console.log(`in func ${dateNum}`)
}





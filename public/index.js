console.log('javascript loaded')

raceForm = document.querySelector('form')
estimatedTimeTable = document.getElementsByClassName('raceTimeTable')

raceBtn = document.getElementById('raceBtn')
paceBtn = document.getElementById('paceBtn')

paceDiv = document.getElementById('pacetimeTables')
raceDiv = document.getElementById('timeTables')

raceBtn.onclick = () => {
    if (paceDiv.style.display !== "none") {
      paceDiv.style.display = "none";
      raceDiv.style.display = "block";
    } else {
      raceDiv.style.display = "block";
    }
  };

  paceBtn.onclick = () => {
    if (raceDiv.style.display !== "none") {
      raceDiv.style.display = "none";
      paceDiv.style.display = "block";
    } else {
      paceDiv.style.display = "block";
    }
  };


raceForm.addEventListener('submit',(event)=>{
    let raceDistance = event.target.elements['distance'].value
    raceDistance = +raceDistance
    let raceUnit = event.target.elements['unit'].value
    let raceDifficulty = event.target.elements['course_difficulty'].value
    let raceHours = event.target.elements['hours'].value || 0
    let raceMinutes = event.target.elements['minutes'].value || 0
    let raceSeconds = event.target.elements['seconds'].value || 0
    let raceTime = (parseInt(raceHours) * 3600) + (parseInt(raceMinutes) * 60) + parseInt(raceSeconds)
    raceTime /= 60
    event.preventDefault()

    console.log({'distance':raceDistance,'unit': raceUnit,'difficulty':raceDifficulty,'hours':raceHours,'minutes':raceMinutes,'seconds':raceSeconds})

    if(raceUnit == 'Kilometers'){
        raceDistance *= .621371
    }

    populateTable(estimateTimes(raceDistance, raceTime, raceDifficulty))

})
currentUser = axios.get('/currentUser').then(res => {currentUser = res.data|| false}) 
console.log(currentUser.username)
if(currentUser.username != undefined){
    alert(`the current user is ${currentUser.username}`)
}

const estimateTimes = (raceDistance, time, raceDifficulty) => {
    let distances = [.99, 1.98, 3.11, 6.21,13.1,26.2,31.1]
    let predictedTimes = []
    let difficulty = raceDifficulty
    
    for(i = 0; i < distances.length; i++){
      let multiplier = 1.06
      let difficultyMultiplier = 1
      if(difficulty == 'hard'){difficultyMultiplier -= .05}
      if(difficulty == 'easy'){difficultyMultiplier += .05}
       let predictedTime = (time * (distances[i]/raceDistance)**multiplier) * difficultyMultiplier
       predictedTimes.push(predictedTime)
       
    }


    const distanceStrings = ["1600 M","3200 M","5 K","10 K","Half Marathon","Marathon","50 K"]
    const tableObj = []

    for(i in distanceStrings){
        tableObj.push({distance : distanceStrings[i], 
        estimateTime: floatToTime(predictedTimes[i]),
        paceMi: floatToTime(predictedTimes[i]/distances[i]),
        paceKm: floatToTime(predictedTimes[i]/(distances[i]*1.61))})
    }
        return tableObj
}

const populateTable = (tableObj) => {
    const table = document.getElementById('raceTableBody')
    const paceTable = document.getElementById('paceTableBody')

    for(let i = paceTable.rows.length -1; i > -1; i--){
        paceTable.deleteRow(i);
    }
    const workoutTypes = ['Easy','Long Run', 'Tempo', 'Threshold', 'Vo2Max', 'Neuromuscular']

    let easyPace = tableObj[6].paceMi.split(':')
    easyPace[0] = (+easyPace[0] + 2).toString()
    easyPace = easyPace.join(':')

    let longPace = tableObj[3].paceMi.split(':')
    longPace[0] = (+longPace[0] + 1).toString()
    longPace = longPace.join(':')

    let neuroPace = tableObj[2].paceMi.split(':')
    neuroPace[0] = (+neuroPace[0] -1).toString()
    neuroPace = neuroPace.join(':')

    const workoutPaces = [easyPace,longPace,tableObj[5].paceMi,tableObj[3].paceMi,tableObj[0].paceMi, neuroPace]
    
    workoutTypes.forEach((element,index) => {
        let row = paceTable.insertRow()
        let workoutType = row.insertCell(0)
        workoutType.innerHTML = element
        let paceMi = row.insertCell(1)
        paceMi.innerHTML = workoutPaces[index]
        let paceKm = row.insertCell(2)
        paceKm.innerHTML = mitoKmPace(workoutPaces[index])
    })

    for(let i = table.rows.length -1; i > -1; i--){
        table.deleteRow(i);
    }
console.log(tableObj)
    tableObj.forEach(element => {
        let row = table.insertRow()
        let distance = row.insertCell(0)
        distance.innerHTML = element.distance
        let estimatedTime = row.insertCell(1)
        estimatedTime.innerHTML = element.estimateTime
        let paceMi = row.insertCell(2)
        paceMi.innerHTML = element.paceMi
        let paceKm = row.insertCell(3)
        paceKm.innerHTML = element.paceKm
    })


}

const floatToTime = (float) => {
    if(float > 0){
        let minutes = Math.floor(float)
        let secondsDec = float - minutes
        let sec = 1 / 60
        secondsDec = sec * Math.round(secondsDec / sec)
        let seconds = Math.floor(secondsDec * 60) + ''
        if(seconds.length < 2){
            seconds = '0' + seconds
        }
      time = minutes + ':' + seconds
      if(minutes > 60){
        hours = Math.floor(minutes/60)
        minutes = minutes % 60
        time = hours + ':' + minutes + ':' + seconds
      
      }
    }
      return time
}

const mitoKmPace = paceStr => {
    paceStr = paceStr.split(':')
    totalSeconds = +paceStr[0] * 60 + +paceStr[1]
    kmSeconds = totalSeconds *= .621371
    let minutes = Math.floor(kmSeconds/60)
    let seconds = Math.round(kmSeconds % 60)
    if(seconds.toString().length == 1){
      seconds = seconds + "0"
    }
    return minutes + ":" + seconds
  }
  
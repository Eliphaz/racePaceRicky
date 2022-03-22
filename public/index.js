console.log('javascript loaded')

raceForm = document.querySelector('form')
estimatedTimeTable = document.getElementsByClassName('raceTimeTable')

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

    if(raceUnit == 'Kilometers'){
        raceDistance /= .621371
    }

    populateTable(estimateTimes(raceDistance, raceTime, raceDifficulty))

})


const estimateTimes = (raceDistance, time, raceDifficulty) => {
    let distances = [.99, 1.98, 3.11, 6.21,13.1,26.2,31.1,50,62.14]
    let predictedTimes = []
    let difficulty = raceDifficulty
    
    for(i in distances){
      let multiplier = 1.06
      if(difficulty == 'hard'){multiplier -= .05}
      if(difficulty == 'easy'){multiplier += .05}
       let predictedTime = time * (distances[i]/raceDistance)*multiplier
      if(distances[i] == raceDistance){
        predictedTime = time
      }
      if(distances[i]<raceDistance){
        multiplier -= .12
        predictedTime = time * (distances[i]/raceDistance)*multiplier
      }
       predictedTimes.push(predictedTime)
       
    }


  
    const tableObj = [
        {distance : "1600 M", 
        estimateTime: predictedTimes[0],
        paceMi: predictedTimes[0]/distances[0],
        paceKm: predictedTimes[0]/(distances[0]*1.61)},

        {distance : "3200 M", 
        estimateTime: predictedTimes[1],
        paceMi: predictedTimes[1]/distances[1],
        paceKm: predictedTimes[1]/(distances[1]*1.61)},

        {distance : "5 K", 
        estimateTime: predictedTimes[2],
        paceMi: predictedTimes[2]/distances[2],
        paceKm: predictedTimes[2]/(distances[2]*1.61)},

        {distance : "10 K", 
        estimateTime: predictedTimes[3],
        paceMi: predictedTimes[3]/distances[3],
        paceKm: predictedTimes[3]/(distances[3]*1.61)},

        {distance : "Half Marathon", 
        estimateTime: predictedTimes[4],
        paceMi: predictedTimes[4]/distances[4],
        paceKm: predictedTimes[4]/(distances[4]*1.61)},

        {distance : "Marathon", 
        estimateTime: predictedTimes[5],
        paceMi: predictedTimes[5]/distances[5],
        paceKm: predictedTimes[5]/(distances[5]*1.61)},

        {distance : "50 K", 
        estimateTime: predictedTimes[6],
        paceMi: predictedTimes[6]/distances[6],
        paceKm: predictedTimes[6]/(distances[6]*1.61)},

        {distance : "50 M", 
        estimateTime: predictedTimes[7],
        paceMi: predictedTimes[7]/distances[7],
        paceKm: predictedTimes[7]/(distances[7]*1.61)}
]
return tableObj
}

const populateTable = (tableObj) => {
    const table = document.getElementById('raceTableBody')

    for(let i = table.rows.length -1; i > -1; i--)
    {
        table.deleteRow(i);
    }

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
    });
}


console.log('javascript loaded')

raceForm = document.querySelector('form')
raceForm.addEventListener('submit',(event)=>{
    let raceDistance = event.target.elements['distance'].value
    let raceUnit = event.target.elements['unit'].value
    let raceDifficulty = event.target.elements['course_difficulty'].value
    let raceHours = event.target.elements['hours'].value
    let raceMinutes = event.target.elements['minutes'].value
    let raceSeconds = event.target.elements['seconds'].value
    event.preventDefault()

})

const estimateTimes = (distance, time) =>{
    let distances = [.99, 1.98, 3.11, 6.21,13.1,26.2,31.1,50,62.14]
}
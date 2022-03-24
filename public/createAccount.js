console.log('hello from createAccountjs')

username = document.getElementById('username')
password = document.getElementById('password')
confirmPassword = document.getElementById('confirmPassword')
loginBtn = document.getElementById('loginBtn')
loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    let newUserObj = {
        username: username.value,
        password: password.value
    }
    let confirmPasswordValue = confirmPassword.value

    if(newUserObj.password == confirmPasswordValue){
    axios.put('/createAccountAuth', newUserObj).then(
        res => alert('account sucsessfully registered')
    )}else{
        alert('passwords do not match')
        password.value = ''
        confirmPassword.value = ''
    }
    
})
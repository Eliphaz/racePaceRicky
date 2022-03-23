console.log('hello from loginjs')

username = document.getElementById('username')
password = document.getElementById('password')
loginBtn = document.getElementById('loginBtn')
loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    let userObj = {
        username: username.value,
        password: password.value
    }
    axios.post('/loginAuth', userObj).then(
        res => alert(res.data)
    )
    
})

// import EventEmitter from 'events'

// const emitter = new EventEmitter();

// emitter.on("userRegister", (username) => {
//     console.log("User registered", username)
// })

// emitter.emit("userRegister", "Aryan");


import EventEmitter from 'events'

const emitter = new EventEmitter();
const emitter2 = new EventEmitter();

emitter2.on("Notification", () => {
    console.log("Notification has been sent!!")
})
emitter.on("userRegister", (username) => {
    console.log("User registered", username)
})

function login(){
    console.log("login done")
    emitter2.emit("Notification")
}

login();

emitter.emit("userRegister", "Aryan");
emitter.emit("userRegister", "Sharma");


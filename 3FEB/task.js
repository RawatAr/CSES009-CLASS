import EventEmitter from 'events'

const emitter = new EventEmitter();
const emitter2 = new EventEmitter();
const emitter3 = new EventEmitter();


emitter.on("User", (userName)=>{
    console.log("Welcome User", userName)
})
emitter.on("Order", ()=>{
    console.log("Order Confirmed")
})

emitter2.on("Delivery", ()=>{
    console.log("Arriving Order")
})
emitter3.on("Arrived", ()=>{
    console.log("Delivered")
})

function Swiggy(){
    console.log("User Login")
    emitter.emit("User", "Aryan")
    emitter.emit("Order")
    emitter2.emit("Delivery")
    emitter3.emit("Arrived")
}
Swiggy();

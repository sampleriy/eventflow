async function fetchEvents(){

const res = await fetch("/api/events");
const data = await res.json();

const container = document.getElementById("events");

container.innerHTML="";

data.forEach(e=>{

container.innerHTML += `
<div class="card">

<h3>${e.title}</h3>
<p>📅 ${e.date}</p>
<p>${e.desc}</p>

<button class="book" onclick="bookEvent('${e.title}')">Book Ticket</button>

<button class="delete" onclick="deleteEvent('${e._id}')">Delete</button>

</div>
`;

});

}

async function createEvent(){

const title=document.getElementById("title").value;
const date=document.getElementById("date").value;
const desc=document.getElementById("desc").value;

await fetch("/api/events",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({title,date,desc,image:"🎉"})

});

fetchEvents();

}

async function deleteEvent(id){

await fetch("/api/events/"+id,{
method:"DELETE"
});

fetchEvents();

}

async function bookEvent(title){

const name=prompt("Enter your name");

await fetch("/api/bookings",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({eventName:title,name})

});

alert("Booked!");

}

async function adminLogin(){

const username=prompt("Username");
const password=prompt("Password");

const res = await fetch("/api/login",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})

});

const data = await res.json();

if(data.success){

document.getElementById("adminPanel").style.display="block";

}else{

alert("Wrong login");

}

}

fetchEvents();
async function createEvent(){

const title = document.getElementById("title").value;
const date = document.getElementById("date").value;
const desc = document.getElementById("desc").value;

await fetch("/api/events",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,date,desc})
});

fetchEvents();

}
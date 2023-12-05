var id =document.getElementById("id");
var Name=document.getElementById("Name");
var finalmark=document.getElementById("finalmark");
var hours =document.getElementById("hours");
var available=document.getElementById("available");
// console.log(id);
// console.log(Name);
// console.log(finalmark);
// console.log(hours);
// console.log(available);




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore ,addDoc ,collection,onSnapshot,deleteDoc,doc,updateDoc,query,where,getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDOl6MOe-IRRqH0LVq2ZTp_2dl3OF3jj2o",
  authDomain: "crud-cource.firebaseapp.com",
  projectId: "crud-cource",
  storageBucket: "crud-cource.appspot.com",
  messagingSenderId: "568087559141",
  appId: "1:568087559141:web:83cfc4ceec673b87400d0c"
};

const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app);

window.save1=save1
async function save1(){

    var id =document.getElementById("id").value;
    var Name=document.getElementById("Name").value;
    var finalmark= parseInt(document.getElementById("finalmark").value);
    var hours = parseInt(document.getElementById("hours").value);
    var available=document.getElementById("available").value;



var cource={
    Name:Name,
    finalmark:finalmark,
    hours:hours,
    available:available
}


try{
if(id==""){

 await addDoc(collection(firestore,'cource'),cource );



}else{


  await updateDoc(doc(firestore,'cource',id),cource)


}
}catch(err){
console.log(err);
}

clear()

}

onSnapshot(collection(firestore ,'cource'),(snap)=>{
    var cources=[];
    
    snap.docs.forEach(doc=> {
       cources.push({id:doc.id,...doc.data()})
    });
    function show1(cources){
        var tbody=document.getElementById("tbody")
        tbody.innerHTML="";
       for(var c of cources){

          tbody.innerHTML+=`<tr>
                            <td>${c.Name}</td>
                            <td>${c.finalmark}</td>
                            <td>${c.hours }</td>
                            <td>${c.available}</td>
                            <td><button onclick="delete1('${c.id}')" class="btn btn-danger">delete</button></td>
                            <td><button onclick="update('${c.id}','${c.Name}','${c.finalmark}',${c.hours},'${c.available}')" class="btn btn-success">update</button></td>
                            </tr>
          `

       }
       }

       show1(cources);

       
})















function clear(){
  document.getElementById("id").value ="";
   document.getElementById("Name").value="";
   document.getElementById("finalmark").value="";
   document.getElementById("hours").value="";
   document.getElementById("available").value="";
}



window.delete1=delete1

async function delete1(cid){
    try{
  await deleteDoc(doc(firestore,'cource',cid))
    }catch(err){
      console.log(err);
    }
  
}
 
window.update=update
function update(id,name,finalmark,hours,available){
  

  document.getElementById("id").value =id;
  document.getElementById("Name").value=name;
  document.getElementById("finalmark").value=finalmark;
  document.getElementById("hours").value=hours;
  document.getElementById("available").value=available;


}

window.queryProduct=queryProduct

async function queryProduct(){

// query(collection(firestore,'cource'),where('Name','==',"geology"));
// query(collection(firestore,'cource'),where('finalmark','!=',1)) ///output 100 100 100
// query(collection(firestore,'cource'),where('available','==',false)) //output one
 var q= query(collection(firestore,'cource'),where('Name','not-in',["geology","biology"])) 
 
var res= await getDocs(q)
console.log(res);


var tbody=document.getElementById("tbody")
tbody.innerHTML="";
res.forEach((doc) => {
  var c = doc.data();
  tbody.innerHTML += `
      <tr>
          <td>${c.Name}</td>
          <td>${c.finalmark}</td>
          <td>${c.hours}</td>
          <td>${c.available}</td>
          <td><button onclick="delete1('${doc.id}')" class="btn btn-danger">delete</button></td>
          <td><button onclick="update('${doc.id}','${c.Name}','${c.finalmark}',${c.hours},'${c.available}')" class="btn btn-success">update</button></td>
      </tr>
  `;
});










// res.forEach((doc)=>{
//   console.log({id:doc.id,...doc.data()}
// )})
// show1(cources);

}

   
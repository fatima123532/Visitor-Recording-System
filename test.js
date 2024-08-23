let form = document.getElementById("myform");
let Visitors = [];
let editindex=null;
let male = 0;
let female = 0;
let adult = 0;
let younger = 0;
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById("student_name").value;
    let age = document.getElementById("student_age").value;
    let gender = document.getElementById("student_gender").value;
    let mobile_number = document.getElementById("mobile_number").value;
   
    if (editindex == null) {
        let data = [name, age, gender, mobile_number];
        Visitors.push([...data]);
        decision(gender, age);
    } else {
        let oldgender = Visitors[editindex][2];
        let oldage = Visitors[editindex][1];
        Visitors[editindex] = [name, age, gender, mobile_number];
        editindex = null;
        Onedit(oldgender, oldage, gender, age); 
    }
        
    
   
    form.reset();
    logVisitorToTable();
    count();

});

const logVisitorToTable = () => {
    let tbody = document.getElementById("Visitor_data");
    tbody.innerHTML = ' '; 
    for (let i=0;i<Visitors.length;i++) {

        let visitor=Visitors[i];
        let Editbutton = `<a href="#" class="btn btn-success btn-sm" onclick="edit(${i})"> EDIT DATA</a>`;
       
        let Deletebutton = `<a href="#" class="btn btn-secondary btn-sm" onclick="remove(${i})">DELETE DATA</a>`;
        tbody.innerHTML += `
            <tr>
                <td>${visitor[0]}</td>
                <td>${visitor[1]}</td>
                <td>${visitor[2]}</td>
                <td>${visitor[3]}</td>
                <td> ${Editbutton} ${Deletebutton}  </td> 
            </tr>`;
    }
}
function remove (index){
    let deletedata = Visitors[index];
    let removedGender = deletedata [2];
    let removedAge = deletedata [1];
    Visitors.splice(index, 1);
    Onremove(removedGender, removedAge); 
    logVisitorToTable();
    count();
}
function edit(i){
let visitor=Visitors[i].slice();
 document.getElementById("student_name").value =visitor[0];
document.getElementById("student_age").value=visitor[1];
 document.getElementById("student_gender").value=visitor[2];
 document.getElementById("mobile_number").value=visitor[3];
editindex=i;
}
function count  ()  {
    document.getElementById("male").innerText = male;
    document.getElementById("female").innerText = female;
    document.getElementById("adult").innerText = adult;
    document.getElementById("younger").innerText = younger;
}
function decision(gender, age){
    if (gender === "male") {
        male++;
       
    }  if (gender === "female") {
        female++;
    }
    if (age >= 18) {
        adult++;
    } else {
        younger++;
    }
}
function Onremove  (gender, age)  {
    if (gender === "male") {
        male--;
    } else if (gender === "female") {
        female--;
    }
    if (age >= 18) {
        adult--;
    } else {
        younger--;
    }
}
function Onedit(oldgender, oldage, newgender, newage){
    if (oldgender === "male") {
        male--;
    } else if (oldgender === "female") {
        female--;
    }
    if (oldage >= 18) {
        adult--;
    } else if (newage <= 18) {
        younger--;
    }

    /* else{
         decision(newgender,newage);
     }*/
    if (newgender === "male") {
        male++;
    } else if (newgender === "female") {
        female++;
    }
    if (newage >= 18) {
        adult++;
    } else {
        younger++;
    }
}
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchAllToys()
});
/////////>>>>>>>>Form funvtion add toys>>>>>>>>>>>>>>>>


const form =document.querySelector('.add-toy-form')
form.addEventListener('submit',(e)=>{
 //e.preventDefault()
 FetchaddToy(e)
})
//function>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<


function FetchaddToy(e){
const toyName=e.target.name.value;
const toyImage=e.target.image.value;

//alert(toyName)
//alert(toyImage)
const AvatorObj={
  name:toyName,
  image:toyImage,
  likes:'0'
}

fetch(' http://localhost:3000/toys',{
  method:'POST',
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
  body:JSON.stringify(AvatorObj)

})
.then(res =>res.json())
.then(data =>{ //console.log(data)
})
//fetchAllToys()
}

function fetchAllToys(){
  fetch(' http://localhost:3000/toys')
  .then(res=>res.json())
  .then(data =>{

  gettoys(data)
  //console.log(data)
  })
}
//////////////////////////////////................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function gettoys(toys){
  divparent=document.getElementById('toy-collection')
toys.forEach(toy=>{
  const divcard=document.createElement('div')
  const nameofToy=document.createElement('h4')
  nameofToy.textContent=toy.name;
  const imagetoy=document.createElement('img')//.innerHTML=`<img src="${toy.image}"alt="iamge">`;
  imagetoy.src=toy.image;
  imagetoy.classList.add('toy-avatar')
  const likes=document.createElement('p')
  likes.textContent=toy.likes;
  const buttonLike=document.createElement('button')
  buttonLike.textContent = 'like'
buttonLike.addEventListener('click',()=>{Addvotes(toy,toy.id,likes)
  //alert('clicked')
 
  })
  divcard.append(nameofToy,imagetoy,likes,buttonLike)
 divcard.classList.add('card')
 
  divparent.appendChild(divcard)
})
}




/////////////////////////////////////////////////////////////////>>>>>>>>>>>>>

function Addvotes(toy, id, likesElement) {
  const dataToUpdate = {
    likes: parseInt(toy.likes) + 1
  };
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToUpdate),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.likes);
      likesElement.textContent = data.likes;
  
    });
}



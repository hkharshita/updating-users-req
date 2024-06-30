const url="https://crudcrud.com/api/2e11c3515a514fc685658661692591d2/appointmentData";
window.addEventListener("DOMContentLoaded",()=>{
    axios.get(url)
    .then((response)=>{
       for(let i=0;i<response.data.length;i++)
           {
               displayUserOnScreen(response.data[i]);
           }
    })
    .catch((err)=>{
     console.log(err);
    });
    
})
function postFun(userDetails)
{
axios.post(url,userDetails)
   .then((response)=>{
      console.log(response.data);
      displayUserOnScreen(response.data);})
   .catch((err)=>{
      console.log(err);
   });
  }
function handleFormSubmit(event)
{
    event.preventDefault();
    const form=event.target;
  

    const userDetails={
        username:form.username.value,
        email:form.email.value,
        phone:form.phone.value
    };
     
        postFun(userDetails);
        document.querySelector("#username").value="";
        document.querySelector("#email").value="";
        document.querySelector("#phone").value="";
         


}

function displayUserOnScreen(userDetails)
{
    const List=document.querySelector('ul');
    const userList=document.createElement('li');
    const txt=document.createTextNode(`${userDetails.username}--${userDetails.email}--${userDetails.phone}`);
    userList.appendChild(txt);

    const dltBtn=document.createElement('button');
    dltBtn.appendChild(document.createTextNode('DELETE'));
    function dlt()
{
    axios.delete(`${url}/${userDetails._id}`)
    .then((response)=>{
        List.removeChild(dltBtn.parentElement);
        console.log("successfully deleted!");
    })
    .catch((err)=>{
        console.log(err);
    })
}
    dltBtn.addEventListener("click",()=>
    {
       dlt();
    })
   


    userList.appendChild(dltBtn);

    const edtBtn=document.createElement('button');
    edtBtn.appendChild(document.createTextNode('EDIT'));
    userList.appendChild(edtBtn);
    edtBtn.addEventListener("click",()=>{
       document.querySelector("#username").value=userDetails.username;
       document.querySelector("#email").value=userDetails.email;
       document.querySelector("#phone").value=userDetails.phone;
       dlt();
       
    })


    List.appendChild(userList);
}

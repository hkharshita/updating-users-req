const url="https://crudcrud.com/api/12e9d6d1bf594422ab7a8035b1748617/appointmentData";
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

function handleFormSubmit(event)
{
    event.preventDefault();
    const form=event.target;
  

    const userDetails={
        username:form.username.value,
        email:form.email.value,
        phone:form.phone.value
    };
      
    axios.post(url,userDetails)
         .then((response)=>{
            console.log(response.data);
            displayUserOnScreen(response.data);})
         .catch((err)=>{
            console.log(err);
         });
         


}
function displayUserOnScreen(userDetails)
{
    const List=document.querySelector('ul');
    const userList=document.createElement('li');
    const txt=document.createTextNode(`${userDetails.username}--${userDetails.email}--${userDetails.phone}`);
    userList.appendChild(txt);

    const dltBtn=document.createElement('button');
    dltBtn.appendChild(document.createTextNode('DELETE'));
    dltBtn.addEventListener("click",()=>
    {
        axios.delete(`${url}/${userDetails._id}`)
        .then((response)=>{
            List.removeChild(dltBtn.parentElement);
            console.log("successfully deleted!");
        })
        .catch((err)=>{
            console.log(err);
        })
    })



    userList.appendChild(dltBtn);

    const edtBtn=document.createElement('button');
    edtBtn.appendChild(document.createTextNode('EDIT'));
    userList.appendChild(edtBtn);


    List.appendChild(userList);
}
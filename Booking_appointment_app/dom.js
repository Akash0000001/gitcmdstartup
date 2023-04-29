function register(event)
{
    event.preventDefault();
    const name=document.querySelector("#name");
    const email=document.querySelector("#email");
    const phone=document.querySelector("#phone");
    const date =document.querySelector("#date");
    const time=document.querySelector("#time");
    const msg=document.querySelector("#msg");
    const users=document.querySelector("#users");
    if(name.value=="" || email.value=="" || phone.value=="" || date.value=="" || time.value=="")
    {   
        msg.classList.add("error")
        msg.textContent="please enter all the fields!"
        console.log(msg.childNodes)
        setTimeout(() => {
            msg.firstChild.remove()
            msg.classList.remove("error")
        },3000);
    }
    else
        {
            const user ={Name:name.value,Email:email.value,Phone:phone.value,Date:date.value,Time:time.value}
            const user_string=JSON.stringify(user)
            localStorage.setItem(name.value,user_string)
            name.value="";
            email.value="";
            phone.value="";
            date.value="";
            time.value="";
        }
}
const form=document.querySelector("#form")
form.addEventListener("submit",register)
const submit=document.querySelector(".btn")
submit.addEventListener("click",(e)=>{
    document.querySelector(".btn").style.background="#4055CC";
})
submit.addEventListener("mouseout",(e)=>{
    document.querySelector("#form").style.background="white";
})
submit.addEventListener("mouseover",(e)=>{
    document.querySelector("#form").style.background="#DDDDDD";
})
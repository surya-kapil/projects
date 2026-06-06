

const createBtn = document.getElementById('eventBtn');
const div = document.getElementById('event-div');

const warningEle = document.createElement('p');
warningEle.style.color = 'red';
warningEle.style.fontSize = '20px';
warningEle.textContent = "Please fill all the details before hitting this button"

const dialog = document.getElementsByTagName('dialog')[0];
const dialogDismiss = document.getElementById('dismiss')

createBtn.addEventListener('click', (event) => {

    event.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const eventStartTime = document.getElementById("start-time").value;
    const eventEndTime  = document.getElementById("end-time").value;
    const eventDate = document.getElementById("event-date").value;
    const eventLocation = document.getElementById("location").value;

    const nameSpan = document.getElementById('name-span');
    const dateSpan = document.getElementById('date-span');
    const starSpan = document.getElementById('start-span');
    const endSpan = document.getElementById('end-span');
    const locationSpan = document.getElementById('location-span');
    
    if(!eventName || !eventStartTime || !eventEndTime || !eventDate || !eventLocation){
        
        div.append(warningEle);
        return;
    }

    warningEle.remove();

    
    nameSpan.textContent = eventName;
    dateSpan.textContent = eventDate;
    starSpan.textContent = eventStartTime;
    endSpan.textContent = eventEndTime;
    locationSpan.textContent = eventLocation;

    dialog.show();
})

dialogDismiss.addEventListener('click', (event) => {
    dialog.close();

})
let parms = {
    cotton: 0,
    cottonClick: 1
}
  
function addResource(resource, amount) {
    parms[resource] += amount;
    displayChange(resource, parms[resource]);
}

function displayChange(id, parm) {
    document.getElementById(id).innerText = parm;
}

const moralPrompts = [
    {
        prompt: "You come across native land, people live here. Tear it down to be a cotton field the yield could be massive.",
        resource: "cotton",
        cost: "This will force the natives out.",
        rewardRange: [2, 100]
    }
]

function showPopup() {
    const popup = document.querySelector('.popup');
    const randomPrompt = moralPrompts[Math.floor(Math.random() * moralPrompts.length)];

    document.getElementById('popupMessage').innerText = `${randomPrompt.prompt} \n\nCost: ${randomPrompt.cost}`;

    popup.style.display = 'block';

    document.getElementById('yesBtn').onclick = function () {
        const randomAmount = Math.floor(Math.random() * (randomPrompt.rewardRange[1] - randomPrompt.rewardRange[0] + 1)) + randomPrompt.rewardRange[0];
        addResource(randomPrompt.resource, randomAmount);

        popup.style.display = 'none';
        scheduleNextPopup();
    };

    document.getElementById('noBtn').onclick = function () {
        popup.style.display = 'none';
        scheduleNextPopup();
    };
}

let nextEventTime;
function scheduleNextPopup() {
    const randomInterval = Math.floor(Math.random() * (300000 - 60000 + 1)) + 60000; 
    nextEventTime = randomInterval;

    updateTimer();

    setTimeout(showPopup, randomInterval);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const intervalId = setInterval(function() {
        if (nextEventTime <= 0) {
            clearInterval(intervalId);
        } else {
            const minutes = Math.floor(nextEventTime / 60000);
            const seconds = Math.floor((nextEventTime % 60000) / 1000);
            timerElement.innerText = `${padTime(minutes)}:${padTime(seconds)}`;
            nextEventTime -= 1000;
        }
    }, 1000);
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}

scheduleNextPopup();
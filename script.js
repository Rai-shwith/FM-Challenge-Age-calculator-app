const today = new Date()

let inputs = document.querySelectorAll('input');
let inputDay = inputs[0];
let inputMonth = inputs[1];
let inputYear = inputs[2];

let calculateBtn = document.querySelector('.seperator span');

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleInput()
    }
});

calculateBtn.addEventListener('click', () => {
    handleInput()
})

function handleInput() {
    let day = inputDay.value;
    let month = inputMonth.value;
    let year = inputYear.value;
    let userGivenDate = new Date(year, month - 1, day)
    let isValidDate = userGivenDate.getDate() == day &&
        userGivenDate.getMonth() == month - 1 && 
        userGivenDate.getFullYear() == year;     //Checks is the date is valid Ex: April 31 is invalid

        let emptyDayFieldError = document.querySelector('.inputfiledDay .emptyError')
    let validDayFieldError = document.querySelector('.inputfiledDay .validityError')
    let emptyMonthFieldError = document.querySelector('.inputfiledMonth .emptyError')
    let validMonthFieldError = document.querySelector('.inputfiledMonth .validityError')
    let emptyYearFieldError = document.querySelector('.inputfiledYear .emptyError')
    let validYearFieldError = document.querySelector('.inputfiledYear .validityError')

    emptyDayFieldError.classList.add('hidden');
    validDayFieldError.classList.add('hidden');
    emptyMonthFieldError.classList.add('hidden');
    validMonthFieldError.classList.add('hidden');
    emptyYearFieldError.classList.add('hidden');
    validYearFieldError.classList.add('hidden');

    let isAllRight = true

    if (day == '') {
        emptyDayFieldError.classList.remove('hidden');
        isAllRight = false
    } else if (day > 31 || day < 1 || !isValidDate) {
        validDayFieldError.classList.remove('hidden');
        isAllRight = false
    }
    if (month == '') {
        emptyMonthFieldError.classList.remove('hidden');
        isAllRight = false
    } else if (month > 12 || month < 1) {
        validMonthFieldError.classList.remove('hidden');
        isAllRight = false
    }
    if (year == '') {
        emptyYearFieldError.classList.remove('hidden');
        isAllRight = false
    } else if (userGivenDate > today) {
        validYearFieldError.classList.remove('hidden');
        isAllRight = false
    }





    if (isAllRight) {
        console.log("ALL IS WELL !");
        let age = calculateAge(userGivenDate);
        display(age)

    }
}

function calculateAge(givenDate) {
    let userGivenDate = givenDate;
    let yearGap = today.getFullYear() - userGivenDate.getFullYear();
    let monthGap = today.getMonth() - userGivenDate.getMonth();
    let dayGap = today.getDate() - userGivenDate.getDate();

    if (dayGap < 0) {
        monthGap--;
        let lastMonth = new Date(userGivenDate.getFullYear(), userGivenDate.getMonth(), 0);
        dayGap = lastMonth.getDate() + dayGap;
    }
    if (monthGap < 0) {
        yearGap--;
        monthGap += 12;
    }
    return { dayGap, monthGap, yearGap };
}

function display(age) {
    let outputDay = document.querySelector('.outputDay');
    let outputMonth = document.querySelector('.outputMonth');
    let outputYear = document.querySelector('.outputYear');

    outputDay.innerHTML = '- -';
    outputMonth.innerHTML = '- -';
    outputYear.innerHTML = '- -';
    startAnimation(outputYear, age.yearGap);
    startAnimation(outputMonth, age.monthGap);
    startAnimation(outputDay, age.dayGap);
}

function startAnimation(numberBox, endValue) {
    let currentValue = 0;
    let speed = 0.5; // Interval speed in milliseconds
    let intervalId = null;

    const increment = (endValue - currentValue) / 50; // Initial increment value
    const maxSpeed = 50; // Minimum interval speed (faster)

    function animate() {
        if (currentValue >= endValue) {
            clearInterval(intervalId);
            numberBox.innerHTML = endValue; // Ensure it stops exactly at the end value
        } else {
            currentValue += increment;
            numberBox.innerHTML = Math.floor(currentValue);

            // Gradually increase speed for a smoother effect
            if (speed > maxSpeed) {
                speed -= 1; // Increase speed
                clearInterval(intervalId);
                intervalId = setInterval(animate, speed);
            }
        }
    }

    intervalId = setInterval(animate, speed);
}
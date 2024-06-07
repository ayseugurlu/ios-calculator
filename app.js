document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById("display");
    let displayPrevious = document.getElementById("display-previous")
    const numbers = document.querySelectorAll(".num");
    const operations = document.querySelectorAll(".operation");
    const butonAC = document.querySelector(".col-ac");
    const butonPlusMinus = document.querySelector(".col-plus-minus");
    const butonPercent = document.querySelector(".col-percent");
    const butonEqual = document.querySelector(".col-equal");
    const butonDot =document.querySelector(".col-dot");

    //& Variables
    let currentInput = "";
    let previousInput = "";
    let currentOperation = null;
    const maxInputLength = 10;

    //& Operation
    function toplama(a, b) {
        let result = +a + +b;
        return result;
    }

    function cikarma(a, b) {
        let result = +a - +b;
        return result;
    }

    function carpma(a, b) {
        let result = +a * +b;
        return result;
    }

    function bolme(a, b) {
        if (b == 0) {
            return "Error";
        } else {
            let result = +a / +b;
            return result;
        }
    }

    function plusMinus(a) {
        return -a;
    }

    function yuzde(a) {
        let result = +a / 100;
        return result;
    }

    function performOperation(operation, a, b) {
        let result;
        switch (operation) {
            case '+':
                result = toplama(a, b);
                break;
            case '-':
                result = cikarma(a, b);
                break;
            case 'x':
                result = carpma(a, b);
                break;
            case '÷':
                if (b == 0) {
                    display.value = 'Error';
                    currentInput = '';
                    previousInput = '';
                    currentOperation = null;
                    return 'Error';
                } else {
                    result = bolme(a, b);
                }
                break;
            default:
                return b;
        }
        return result;
    }

    function updateDisplay(){
        display.value=currentInput

        if(currentInput.length>10){
            display.style.fontSize="3rem"

        }else{
            display.style.fontSize="4rem"
        }
    }

    //& Events
    numbers.forEach((button) => {
        button.addEventListener("click", () => {
            if(currentInput.length< maxInputLength){
            currentInput += button.textContent;
            updateDisplay()
            }
        });
    });


//!-----------------------------------------------------------------------------


    operations.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentInput === "") return;

            if (previousInput !== "") {
                const result = performOperation(currentOperation, previousInput, currentInput);
                if (result === 'Error') {
                    display.value = 'Error';
                    currentInput = '';
                    previousInput = '';
                    currentOperation = null;
                } else {
                    previousInput = result.toString();
                    display.value = previousInput ;
                    currentInput = '';
                }
            } else {
                previousInput = currentInput;
                currentInput = '';
            }

            currentOperation = button.textContent;
            displayPrevious.textContent = `${previousInput} ${currentOperation}`;
            display.value += currentOperation
             
        });
    });

    //!-----------------------------------------------------------------------------

    butonEqual.addEventListener("click", () => {
        if (currentInput === "" || previousInput === "") return;

        const result = performOperation(currentOperation, previousInput, currentInput);
        if (result === 'Error') {
            display.value = 'Error';
            currentInput = '';
            previousInput = '';
            currentOperation = null;
        } else {
            display.value = result;
            currentInput = result.toString();
            previousInput = '';
            currentOperation = null;
            displayPrevious.textContent=""
        }
    });


    //!----------------------------------------------------------------------------

    butonAC.addEventListener('click', () => {
        currentInput = '';
        previousInput = '';
        currentOperation = null;
        display.value = '';
         displayPrevious.textContent ='';
    });


    //!-------------------------------------------------------------------------

    butonPlusMinus.addEventListener('click', () => {
        if (currentInput === '') return;
        currentInput = plusMinus(currentInput).toString();
        display.value = currentInput;
    });


    //!---------------------------------------------------------------------------



    butonPercent.addEventListener('click', () => {
        if (currentInput === '') return;
        else{
        currentInput = yuzde(currentInput);
        display.value = currentInput;
        }
    });



//!-------------------------------------------------------------------------

butonDot.addEventListener('click', ()=>{
    console.log("clicked")
    if( !currentInput.includes('.') && currentInput !== '') {

        currentInput += "."
        display.value=currentInput

    }else if(!currentInput.includes('.') && currentInput === ''){
        currentInput="0"
        currentInput += "."
        display.value=currentInput
    }
        
   
})






});
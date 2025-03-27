const submitBtn = document.querySelector('#submitBtn');
const accountNameInput = document.querySelector('#accountName');
const debtAmountInput = document.querySelector('#debtAmount');
const errorMessage = document.querySelector('#form_error');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const accountNameTrimmed = accountNameInput.value.trim();
    const debtAmountValue = debtAmountInput.value;
    // TODO 1: Check if inputs are valid. If invalid, display error message in form_error paragraph element.
    
    if(!accountNameInput || !debtAmountInput){
        errorMessage.textContent = "Input is missing value(s)!";
    }
    else if(Number(debtAmountValue) <= 0){
        errorMessage.textContent = "Debt amount must be a positive number!";
    }
    // TODO 2.1: If inputs are valid, send form data to `/add-debt` to create / update an account in the database
    else{
        errorMessage.textContent = "";
        try{
            const response  = await fetch('/add-debt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountName: accountName,
                    debtAmount: debtAmountValue
                })
            });

            const data = await response.json();

            // TODO 2.2: If successful, display either `Created New Account` or `Updated Existing Account` in an alert message then refresh the page.
            if(response.status == "200"){
                alert(data.message);
                window.location.reload();
            }
            else if(response.status == "500"){
                alert(data.message);
                errorMessage.textContent = "server error occured";
            }
        }
        catch(err){
            alert("error");
        }
    }
    
    
});

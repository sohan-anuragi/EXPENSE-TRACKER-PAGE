// GLOBALLY ACCESS VARIABLES

let totalAmmount = document.querySelector(".total-ammount");
let incomeValue  = document.querySelector(".income-value");
let expenseValue = document.querySelector(".expense-value");
let historyContainer = document.querySelector(".history-container");

let inputName = document.querySelector(".name");
let inputAmmount = document.querySelector(".ammount");

let addBtn = document.querySelector(".add-btn");
let tAmmount = 0;
let positiveAmmout = 0;
let nagativeAmmount = 0;


addBtn.addEventListener("click", () => {
    let ammount = (inputAmmount.value === "")? 0 : parseInt(inputAmmount.value);
   

    if( inputName.value === "" || inputName === ""  ){
        alert("please input the ammount and name of Transaction");
    }

    else{

        if(inputAmmount.value >= 0 ){
        positiveAmmout = positiveAmmout + ammount
        incomeValue.innerText =  "$ " + positiveAmmout + ".00";
        localStorage.setItem("totalIncome", positiveAmmout);
        tAmmount = tAmmount + ammount;
        addHistory(ammount);
    }


    else{
        nagativeAmmount = nagativeAmmount + ammount;
    // let finalNagativeAmmount = localStorage.setItem("locNagativeAmmount" , )
        expenseValue.innerText = "$ " + nagativeAmmount + ".00";
        localStorage.setItem("totalExpense",nagativeAmmount);
        tAmmount = tAmmount + ammount;
        addHistory(ammount);
        
    }
        totalAmmount.innerText = "";
        totalAmmount.innerText = "$ " + tAmmount + ".00";
        localStorage.setItem("totalAmmount",tAmmount);
        inputAmmount.value = "";

}
        
        
})

function addHistory(ammount){
    let list = document.createElement("li");
    list.innerText = inputName.value;
    addBorderColor(ammount,list);
    historyContainer.appendChild(list);

    let crossBtn = document.createElement("span");
        crossBtn.className = "cross-btn";
        crossBtn.innerText = "x";
        list.appendChild(crossBtn);

    let listAmmount = document.createElement("span");
        listAmmount.innerText = ammount;
        listAmmount.className = "span-value";
        list.appendChild(listAmmount); 
        
        inputName.value = "";  
        addData();      
}

function addBorderColor(ammount,list){
    if (ammount >= 0){
        list.style.borderRight = "5px solid green";
    }

    else{
        list.style.borderRight = "5px solid red";
    }
}

// DELETE BTN FUNCTIONALITY

 historyContainer.addEventListener("mouseover", (e) => {
    let li = e.target.closest("li");
    if(li){
        let crossBtn = li.querySelector(".cross-btn");
        if(crossBtn) crossBtn.style.display = "block";
    }
});

historyContainer.addEventListener("mouseout", (e) => {
    let li = e.target.closest("li");
    if(li){
        let crossBtn = li.querySelector(".cross-btn");
        if(crossBtn) crossBtn.style.display = "none";
    }
});



    historyContainer.addEventListener("click", (e) => {
        if(e.target.className === "cross-btn"){
            e.target.parentElement.remove();
        }
        addData();
    })


// data storing function

function addData(){
    localStorage.setItem("historyData", historyContainer.innerHTML);
}

// functionality for REFRESH BTN

let refreshBtn = document.querySelector(".refresh-btn");

refreshBtn.addEventListener("click" ,() => {
    if(positiveAmmout !== 0 || nagativeAmmount !== 0){
    if(confirm("⚠️ Warning! All data will be lost. Refresh now?")){

    positiveAmmout = 0;
    incomeValue.innerText =  "$ " + positiveAmmout + ".00";
    localStorage.setItem("totalIncome", positiveAmmout);

    nagativeAmmount = 0;
    expenseValue.innerText =  "$ " + nagativeAmmount + ".00";
    localStorage.setItem("totalExpense",nagativeAmmount);

    tAmmount = 0;
    totalAmmount.innerText = "$ " + tAmmount + ".00";
    localStorage.setItem("totalAmmount",tAmmount);

    historyContainer.innerHTML = "";
    addData();
    }
}
    
})



// showing data after refresh

function showData(){
    let finalTotalINcome = parseInt(localStorage.getItem("totalIncome"));
    let finalTotalExpense = parseInt(localStorage.getItem("totalExpense"));
    let finalTotalAmmount = parseInt(localStorage.getItem("totalAmmount"));
    let finalHistory      = localStorage.getItem("historyData") || "";

    incomeValue.innerText =  "$ " + finalTotalINcome + ".00";
    expenseValue.innerText = "$ " + finalTotalExpense + ".00";
    totalAmmount.innerText = "$ " + finalTotalAmmount + ".00";
    historyContainer.innerHTML = finalHistory;

    positiveAmmout = finalTotalINcome;
    nagativeAmmount = finalTotalExpense;
    tAmmount = finalTotalAmmount;
}

showData();





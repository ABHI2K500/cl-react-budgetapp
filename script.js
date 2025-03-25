let transactions = [];

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    
    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }
    
    transactions.push({ description, amount });
    updateUI();
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function updateUI() {
    const transactionList = document.getElementById("transactionList");
    const totalBalance = document.getElementById("totalBalance");
    
    transactionList.innerHTML = "";
    let balance = 0;
    
    transactions.forEach((transaction, index) => {
        balance += transaction.amount;
        
        const li = document.createElement("li");
        li.className = "transaction-item";
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span class="${transaction.amount < 0 ? 'text-red' : 'text-green'}">
                $${transaction.amount.toFixed(2)}
            </span>
            <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
        `;
        transactionList.appendChild(li);
    });
    
    totalBalance.textContent = balance.toFixed(2);
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

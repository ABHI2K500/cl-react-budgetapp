import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./style.css";

export default function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!description || !amount) return;
    const newTransaction = { id: Date.now(), description, amount: parseFloat(amount) };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };

  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">Budget Tracker</h1>
      <Card className="p-4 my-4">
        <CardContent>
          <h2 className="text-lg font-semibold">Total Balance: ${totalBalance.toFixed(2)}</h2>
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button className="mt-2 w-full" onClick={addTransaction}>Add Transaction</Button>
      </div>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between border-b py-2">
            <span>{transaction.description}</span>
            <span className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
              ${transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

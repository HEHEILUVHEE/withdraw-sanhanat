import React, { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleWithdraw = (amount) => {
    const withdrawValue = typeof amount === "number" ? amount : parseInt(withdrawAmount);

    if (withdrawValue > balance) {
      alert("ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้");
      return;
    }


    if (withdrawValue > 0 && withdrawValue <= balance) {
      const newBalance = balance - withdrawValue;
      setBalance(newBalance);
      setHistory([
        { amount: withdrawValue, remainingBalance: newBalance },
        ...history,
      ]);
      setWithdrawAmount("");
    } else {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
    }
  };

  return (
    <div className="App">
      <div className="withdrawal-section">
        <h2>ระบบถอนเงิน</h2>
        <p>ยอดเงินคงเหลือ: {balance} บาท</p>
        <div className="withdraw-buttons">
          {[100, 500, 1000, 5000].map((amount) => (
            <button key={amount} onClick={() => handleWithdraw(amount)}>
              ถอน {amount} บาท
            </button>
          ))}
        </div>
        
        <input
          type="number"
          placeholder="จำนวนเงินที่ต้องการถอน"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={() => handleWithdraw()}>ถอนเงิน</button>
      </div>

      <div className="history-section">
        <h2>ประวัติการถอนเงิน</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="word">
              ถอน: {entry.amount}บาท  คงเหลือ: {entry.remainingBalance} บาท
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

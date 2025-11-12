let accounts = [];

function createAccount() {
  const name = document.getElementById("accountName").value.trim();
  const balance = parseFloat(document.getElementById("initialBalance").value);
  if (!name || isNaN(balance) || balance < 0) return showMessage("❌ Invalid input.");

  const id = Date.now();
  accounts.push({ id, name, balance });
  showMessage(`✅ Account created successfully!\nAccount ID: ${id}`);
  clearInputs(["accountName", "initialBalance"]);
}

function deposit() {
  const id = parseInt(document.getElementById("accountId").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const acc = accounts.find(a => a.id === id);
  if (!acc) return showMessage("⚠️ Account not found.");
  if (amount <= 0) return showMessage("⚠️ Invalid amount.");

  acc.balance += amount;
  showMessage(`💰 Deposited ₹${amount} to ${acc.name}`);
  clearInputs(["accountId", "amount"]);
}

function withdraw() {
  const id = parseInt(document.getElementById("accountId").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const acc = accounts.find(a => a.id === id);
  if (!acc) return showMessage("⚠️ Account not found.");
  if (amount <= 0 || acc.balance < amount) return showMessage("⚠️ Invalid or insufficient balance.");

  acc.balance -= amount;
  showMessage(`💸 Withdrew ₹${amount} from ${acc.name}`);
  clearInputs(["accountId", "amount"]);
}

function transfer() {
  const fromId = parseInt(document.getElementById("fromId").value);
  const toId = parseInt(document.getElementById("toId").value);
  const amount = parseFloat(document.getElementById("transferAmount").value);

  const fromAcc = accounts.find(a => a.id === fromId);
  const toAcc = accounts.find(a => a.id === toId);

  if (!fromAcc || !toAcc) return showMessage("⚠️ Account not found.");
  if (amount <= 0 || fromAcc.balance < amount) return showMessage("⚠️ Invalid or insufficient balance.");

  fromAcc.balance -= amount;
  toAcc.balance += amount;

  showMessage(`🔁 Transferred ₹${amount} from ${fromAcc.name} → ${toAcc.name}`);
  clearInputs(["fromId", "toId", "transferAmount"]);
}

function showAccounts() {
  const output = document.getElementById("output");
  if (accounts.length === 0) return showMessage("📭 No accounts found.");
  output.textContent = accounts.map(a => `ID: ${a.id}\nName: ${a.name}\nBalance: ₹${a.balance}\n`).join("\n------------------\n");
}

function showMessage(msg) {
  const output = document.getElementById("output");
  output.textContent = msg;
}

function clearInputs(ids) {
  ids.forEach(id => (document.getElementById(id).value = ""));
}

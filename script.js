let plans = JSON.parse(localStorage.getItem("plans")) || [];

function savePlans() {
  localStorage.setItem("plans", JSON.stringify(plans));
}

function updateProgress() {
  const completed = plans.filter(p => p.completed).length;
  document.getElementById("progress").innerText =
    `Progress: ${completed} / ${plans.length} Completed`;
}

function renderPlans() {
  const planDiv = document.getElementById("plan");
  planDiv.innerHTML = "";

  if (plans.length === 0) {
    planDiv.innerHTML = `<p class="empty">No subjects added yet 📚</p>`;
    updateProgress();
    return;
  }

  plans.forEach((plan, index) => {
    const div = document.createElement("div");
    div.className = "plan-item" + (plan.completed ? " completed" : "");

    div.innerHTML = `
      <div>
        <strong>${plan.subject}</strong><br>
        📅 ${plan.date}
      </div>
      <div class="actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✅</button>
        <button class="delete-btn" onclick="deletePlan(${index})">❌</button>
      </div>
    `;
    planDiv.appendChild(div);
  });

  updateProgress();
}

function addPlan() {
  const subject = document.getElementById("subject").value;
  const date = document.getElementById("date").value;

  if (!subject || !date) {
    alert("Please fill all fields");
    return;
  }

  plans.push({ subject, date, completed: false });
  savePlans();
  renderPlans();

  document.getElementById("subject").value = "";
  document.getElementById("date").value = "";
}

function deletePlan(index) {
  plans.splice(index, 1);
  savePlans();
  renderPlans();
}

function toggleComplete(index) {
  plans[index].completed = !plans[index].completed;
  savePlans();
  renderPlans();
}

renderPlans();

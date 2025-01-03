const companiesToIgnore = ["Refonte Learning"];



document.addEventListener("DOMContentLoaded", () => {
  updateListOfCompaniesToIgnore();
  const companyName = document.querySelector("#companyName");
  const addCompanyBtn = document.querySelector("#addCompanyBtn");
  addCompanyBtn.addEventListener("click", () => {
    const company = companyName.value;
    companiesToIgnore.push(company);
    updateListOfCompaniesToIgnore();
    companyName.value = "";
  });

  document.querySelector("#myButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "findTiles" });
    });
  });
});

const updateListOfCompaniesToIgnore = () => {
  const companiesToHideUL = document.getElementById("companyListToHide");
  companiesToHideUL.innerHTML = "";
  for (let i = 0; i < companiesToIgnore.length; i++) {
    const company = companiesToIgnore[i];
    const li = document.createElement("p");
    li.textContent = company;
    companiesToHideUL.appendChild(li);
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "companiesToIgnoreList", data: companiesToIgnore });
  });
}

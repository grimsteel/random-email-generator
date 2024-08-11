const inputId = document.getElementById("email-id");
const inputLabel = document.getElementById("email-label");
const btnRandomId = document.getElementById("btn-random-id");
const btnOptions = document.getElementById("btn-options");
const btnCopyEmail = document.getElementById("btn-copy");
const formSection = document.getElementById("form-section");
const warningSection = document.getElementById("warning-section");
const emailAddress = document.getElementById("email-address");

let email = "";

btnOptions.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

btnRandomId.addEventListener("click", () => {
  // generate a random email id
  const randomBytes = new Uint8Array(6);
  crypto.getRandomValues(randomBytes);
  const randomId = btoa([...randomBytes].map(n => String.fromCharCode(n)).join(""));
  inputId.value = randomId;

  updateEmail();
});

btnCopyEmail.addEventListener("click", async () => {
  await navigator.clipboard.writeText(email);
});

function updateEmail() {
  const emailId = btoa(recipientId.toString() + inputId.value).replaceAll("=", "");
  const mainEmail = `${emailId}@${domain}`;
  email = inputLabel.value ? `${inputLabel.value}.${mainEmail}` : mainEmail;
    
  emailAddress.innerText = email;
}

// make sure they've set up the domain/recipient ID
const { domain, recipientId } = await chrome.storage.local.get(["domain", "recipientId"]);
if (domain && recipientId !== undefined) {
  formSection.addEventListener("input", () => updateEmail());
  inputId.focus();
} else {
  formSection.hidden = true;
  warningSection.hidden = false;
}

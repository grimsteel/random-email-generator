const { domain, recipientId } = await chrome.storage.local.get(["domain", "recipientId"]);

const form = document.querySelector("form");
const inputDomain = document.getElementById("domain");
const inputRecipientId = document.getElementById("recipient-id");

inputDomain.value = domain ?? "";
if (recipientId !== undefined) inputRecipientId.value = recipientId;

form.addEventListener("submit", async e => {
  e.preventDefault();

  await chrome.storage.local.set({ domain: inputDomain.value, recipientId: inputRecipientId.valueAsNumber });
});

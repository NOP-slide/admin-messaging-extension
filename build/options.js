// Upon loading Options page, check if there's a badge colour present in storage
// If so, select the relevant radio button
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['badgeColour'], (result) => {
    if (result.badgeColour) {
      const colourInputs = document.querySelectorAll(
        'input[name="badgeColour"]'
      );
      colourInputs.forEach((input) => {
        if (input.value === result.badgeColour) {
          input.checked = true;
        }
      });
    } else { // Default to blue being selected
      const colourInput = document.querySelector('input[value="#0000A0"]');
      colourInput.checked = true;
    }
  });
});

// Save badge colour to storage on button click
document.getElementById('save').addEventListener('click', () => {
  const selectedColour = document.querySelector(
    'input[name="badgeColour"]:checked'
  );

  if (selectedColour) {
    chrome.storage.sync.set({ badgeColour: selectedColour.value });
  }
});

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

function populateForm() {
  let savedFeedbackData = {};

  try {
    savedFeedbackData = JSON.parse(localStorage.getItem(localStorageKey));
  } catch (err) {
    console.log(err);
    return;
  }
  if (!savedFeedbackData) {
    return;
  }

  for (const key in savedFeedbackData) {
    form.elements[key].value = savedFeedbackData[key];
  }
}
populateForm();

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  formData = '';
  form.reset();
});

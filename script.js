function updateTime() {
  const timeElement = document.getElementById("currentTime");
  const currentMilliseconds = "Current Time: " + Date.now();
  timeElement.textContent = currentMilliseconds;
}

updateTime();
setInterval(updateTime, 1000);

// contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const successMessage = document.getElementById("successMessage");

  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("error");
    errorElement.textContent = message;
    inputElement.setAttribute("aria-invalid", "true");
  }

  function clearError(inputElement, errorElement) {
    inputElement.classList.remove("error");
    errorElement.textContent = "";
    inputElement.setAttribute("aria-invalid", "false");
  }

  function validateFullName() {
    const value = fullNameInput.value.trim();
    const errorElement = document.getElementById("name-error");

    if (value === "") {
      showError(fullNameInput, errorElement, "Full name is required");
      return false;
    } else if (value.length < 2) {
      showError(
        fullNameInput,
        errorElement,
        "Name must be at least 2 characters"
      );
      return false;
    } else {
      clearError(fullNameInput, errorElement);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const errorElement = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      showError(emailInput, errorElement, "Email address is required");
      return false;
    } else if (!emailPattern.test(value)) {
      showError(emailInput, errorElement, "Please enter a valid email address");
      return false;
    } else {
      clearError(emailInput, errorElement);
      return true;
    }
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    const errorElement = document.getElementById("subject-error");

    if (value === "") {
      showError(subjectInput, errorElement, "Subject is required");
      return false;
    } else if (value.length < 3) {
      showError(
        subjectInput,
        errorElement,
        "Subject must be at least 3 characters"
      );
      return false;
    } else {
      clearError(subjectInput, errorElement);
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    const errorElement = document.getElementById("message-error");

    if (value === "") {
      showError(messageInput, errorElement, "Message is required");
      return false;
    } else if (value.length < 10) {
      showError(
        messageInput,
        errorElement,
        "Message must be at least 10 characters"
      );
      return false;
    } else {
      clearError(messageInput, errorElement);
      return true;
    }
  }

  fullNameInput.addEventListener("blur", validateFullName);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  messageInput.addEventListener("blur", validateMessage);

  fullNameInput.addEventListener("input", function () {
    if (fullNameInput.classList.contains("error")) {
      validateFullName();
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("error")) {
      validateEmail();
    }
  });

  subjectInput.addEventListener("input", function () {
    if (subjectInput.classList.contains("error")) {
      validateSubject();
    }
  });

  messageInput.addEventListener("input", function () {
    if (messageInput.classList.contains("error")) {
      validateMessage();
    }
  });
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    successMessage.style.display = "none";

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      successMessage.style.display = "flex";

      successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      setTimeout(function () {
        contactForm.reset();
        clearError(fullNameInput, document.getElementById("name-error"));
        clearError(emailInput, document.getElementById("email-error"));
        clearError(subjectInput, document.getElementById("subject-error"));
        clearError(messageInput, document.getElementById("message-error"));
        successMessage.style.display = "none";
      }, 3000);
    } else {
      if (!isNameValid) {
        fullNameInput.focus();
      } else if (!isEmailValid) {
        emailInput.focus();
      } else if (!isSubjectValid) {
        subjectInput.focus();
      } else if (!isMessageValid) {
        messageInput.focus();
      }
    }
  });
}

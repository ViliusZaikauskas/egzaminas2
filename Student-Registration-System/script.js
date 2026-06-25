document.addEventListener("DOMContentLoaded", () => {
  // Register form and button selectors
  const studentForm = document.getElementById("student-form");
  const submitButton = studentForm.querySelector('button[type="submit"]');
  const cancelButton = document.getElementById("cancel-button");

  // Read students data from localStorage
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let editIndex = -1;

  // Check for existing student data in localStorage
  const editStudentData = JSON.parse(localStorage.getItem("editStudent"));

  // If existing student data is present, it means user is in edit mode so populate the form fields with existing data and update the editIndex.
  if (editStudentData) {
    populateForm(editStudentData);
    editIndex = editStudentData.index;
  }

  // function to save student data list to localStorage
  function saveStudentsToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
  }

  // function to create new student record
  function addStudent(student) {
    if (editIndex >= 0) {
      students[editIndex] = student;
      editIndex = -1;
    } else {
      students.push(student);
    }
    saveStudentsToLocalStorage();
    studentForm.reset();
    submitButton.textContent = "Register";
    cancelButton.style.display = "none";
    localStorage.removeItem("editStudent");
    window.location.href = `students.html`;
  }

  function populateForm(student) {
    document.getElementById("student-name").value = student.name;
    document.getElementById("student-id").value = student.id;

    const emailInput = document.getElementById("email-id");
    if (emailInput) emailInput.value = student.email || "";

    const contactInput = document.getElementById("contact-no");
    if (contactInput) contactInput.value = student.contact || "";

    submitButton.textContent = "Update";
    cancelButton.style.display = "inline-block";
  }

  function cancelEdit() {
    studentForm.reset();
    submitButton.textContent = "Register";
    cancelButton.style.display = "none";
    editIndex = -1;
    localStorage.removeItem("editStudent");
    window.location.href = `students.html`;
  }

  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const studentName = document.getElementById("student-name").value.trim();
    const studentId = document.getElementById("student-id").value.trim();
    const emailId = document.getElementById("email-id")?.value.trim() || "";
    const contactNo = document.getElementById("contact-no")?.value.trim() || "";

    if (studentName && studentId && emailId && contactNo) {
      const student = {
        name: studentName,
        id: studentId,
        email: emailId,
        contact: contactNo,
      };

      addStudent(student);
    } else {
      alert("All fields are required.");
    }
  });

  cancelButton.addEventListener("click", cancelEdit);
});

document.addEventListener("DOMContentLoaded", () => {
  const recordsContainer = document.getElementById("records-container");
  const filterInput = document.getElementById("student-filter");

  let students = JSON.parse(localStorage.getItem("students")) || [];

  function saveStudentsToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
  }

  const getStudentSearchText = (student) => {
    const fullName = `${student.name || ""} ${student.surname || ""}`.trim();
    const course = student.course || "";
    const id = student.id || "";

    return `${fullName} ${id} ${course}`.toLowerCase();
  };

  const renderStudents = () => {
    const searchTerm = filterInput.value.trim().toLowerCase();
    recordsContainer.innerHTML = "";

    const filteredStudents = students.filter((student) => {
      if (!searchTerm) return true;
      return getStudentSearchText(student).includes(searchTerm);
    });

    filteredStudents.forEach((student, index) => {
      const studentRow = document.createElement("tr");
      studentRow.innerHTML = `
        <td>${student.name || ""} ${student.surname || ""}</td>
        <td>${student.id || ""}</td>
        <td>${student.subject || student["mokomas-dalykas"] || ""}</td>
        <td>${student.course || student.kursas || ""}</td>
        <td>${student.email || ""}</td>
        <td>${student.contact || ""}</td>
        <td>
          <button type="button" onclick="editStudent(${index})">Edit</button>
          <button type="button" onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      recordsContainer.appendChild(studentRow);
    });
  };

  window.editStudent = (index) => {
    const student = students[index];
    localStorage.setItem("editStudent", JSON.stringify({ ...student, index }));
    window.location.href = "index.html";
  };

  window.deleteStudent = (index) => {
    students.splice(index, 1);
    saveStudentsToLocalStorage();
    renderStudents();
  };

  filterInput.addEventListener("input", renderStudents);
  renderStudents();
});

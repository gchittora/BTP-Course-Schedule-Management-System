// script.js

document.addEventListener("DOMContentLoaded", function() {
  const courses = [];
  const courseForm = document.getElementById("courseForm");
  const addEntryButton = document.getElementById("addEntryButton");
  const addProfessorButton = document.getElementById("addProfessorButton");
  const courseTableBody = document.querySelector("#courseTable tbody");
  const generateButton = document.getElementById("generateButton");
  const sendButton = document.getElementById("sendButton");
  const saveButton = document.getElementById("saveButton");

  addEntryButton.addEventListener("click", function() {
      courseForm.style.display = "block";
  });

  addProfessorButton.addEventListener("click", function() {
      const professorsContainer = document.createElement("div");
      professorsContainer.classList.add("professors-container");

      const professorInput = document.createElement("input");
      professorInput.type = "text";
      professorInput.placeholder = "Professor";
      professorsContainer.appendChild(professorInput);

      courseForm.insertBefore(professorsContainer, addProfessorButton);
  });

  courseForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const newCourse = {
          name: document.getElementById("courseNameInput").value,
          id: document.getElementById("courseIdInput").value,
          department: document.getElementById("departmentSelect").value,
          students: document.getElementById("studentsInput").value,
          year: document.getElementById("yearSelect").value,
          professors: Array.from(document.querySelectorAll(".professors-container input")).map(input => input.value)
      };

      if (!newCourse.name || !newCourse.id || !newCourse.department || !newCourse.students || !newCourse.year) {
          alert("Please fill in all fields");
          return;
      }

      courses.push(newCourse);
      renderCourses();
      resetForm();
  });

  function renderCourses() {
      courseTableBody.innerHTML = "";

      ["1st", "2nd", "3rd", "4th"].forEach(year => {
          const yearGroup = courses.filter(course => course.year === year);
          if (yearGroup.length > 0) {
              const yearRow = document.createElement("tr");
              const yearCell = document.createElement("td");
              yearCell.colSpan = 7;
              yearCell.textContent = `Year ${year}`;
              yearRow.appendChild(yearCell);
              courseTableBody.appendChild(yearRow);

              yearGroup.forEach((course, index) => {
                  const row = document.createElement("tr");
                  row.innerHTML = `
                      <td>${course.name}</td>
                      <td>${course.id}</td>
                      <td>${course.department}</td>
                      <td>${course.students}</td>
                      <td>${course.year}</td>
                      <td>${course.professors.join(", ")}</td>
                      <td><button class="delete-button" data-index="${index}">Delete</button></td>
                  `;
                  courseTableBody.appendChild(row);
              });
          }
      });

      document.querySelectorAll(".delete-button").forEach(button => {
          button.addEventListener("click", () => {
              const index = button.getAttribute("data-index");
              deleteCourse(index);
          });
      });
  }

  function deleteCourse(index) {
      courses.splice(index, 1);
      renderCourses();
  }

  function resetForm() {
      courseForm.reset();
      courseForm.style.display = "none";
      document.querySelectorAll(".professors-container").forEach(container => container.remove());
  }

  saveButton.addEventListener("click", () => {
      fetch("/save", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(courses)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok.");
          }
          return response.json();
      })
      .then(data => {
          console.log("Data saved successfully:", data);
          alert("Hurray! Data saved successfully.");
      })
      .catch(error => {
          console.error("Error saving data:", error);
          alert("Error occurred while saving data. Please try again.");
      });
  });

  generateButton.addEventListener("click", () => {
      // Handle generate button click
  });

  sendButton.addEventListener("click", () => {
      // Handle send button click
  });
});

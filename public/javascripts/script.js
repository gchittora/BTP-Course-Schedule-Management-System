document.addEventListener("DOMContentLoaded", function() {
    const courses = [];
    const courseForm = document.getElementById("courseForm");
    const addEntryButton = document.getElementById("addEntryButton");
    const addProfessorButton = document.getElementById("addProfessorButton");
    const courseTableBody = document.querySelector("#courseTable tbody");
    const generateButton = document.getElementById("generateButton");
    const sendButton = document.getElementById("sendButton");
    const saveButtons = document.querySelectorAll(".save-button"); // Select all save buttons
    const resetButton = document.getElementById("resetButton"); // Add a reset button if needed

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

        const departmentSelect = document.getElementById("departmentSelect");
        const selectedDepartmentId = departmentSelect.options[departmentSelect.selectedIndex].value;

        const newCourse = {
            name: document.getElementById("courseNameInput").value,
            id: document.getElementById("courseIdInput").value,
            department: selectedDepartmentId,
            students: document.getElementById("studentsInput").value,
            year: document.getElementById("yearSelect").value,
            professors: Array.from(document.querySelectorAll(".professors-container input")).map(input => input.value),
            numberOfStudents: document.getElementById("studentsInput").value,
            semester: "Spring"
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
    
        courses.forEach((course, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.id}</td>
                <td>${course.department}</td>
                <td>${course.students}</td>
                <td>${course.year}</td>
                <td>${course.professors.join(", ")}</td>
                <td><button class="save-button" data-index="${index}">Save</button></td>
                <td><button class="delete-button" data-index="${index}">Delete</button></td>
            `;
            courseTableBody.appendChild(row);
        });
    
        // Add event listener for save buttons
        document.querySelectorAll(".save-button").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                saveCourse(index);
            });
        });
    }
    

    function saveCourse(index) {
        const course = courses[index];
        console.log("Saving course:", course); // Debugging statement
        fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
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
    }
    

    

    
    function resetForm() {
        courseForm.reset();
        courseForm.style.display = "none";
        document.querySelectorAll(".professors-container").forEach(container => container.remove());
    }

    // Optionally, add event listener for reset button if needed
    // resetButton.addEventListener("click", resetForm);

    // Initial rendering of courses
    renderCourses();
});

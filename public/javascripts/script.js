document.addEventListener("DOMContentLoaded", function() {
    const courses = [];
    const courseForm = document.getElementById("courseForm");
    const courseTableBody = document.querySelector("#courseTable tbody");
    const saveButton = document.getElementById("saveButton"); // Get the save button

    // Load saved data when the page loads
    const savedData = localStorage.getItem("savedCourses");
    if (savedData) {
        courses.push(...JSON.parse(savedData));
        renderCourses();
    }

    // Function to save form data to local storage
    function saveData() {
        localStorage.setItem("savedCourses", JSON.stringify(courses));
    }

    function renderCourses() {
        courseTableBody.innerHTML = "";

        courses.forEach((course, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.id}</td>
                <td>${course.department}</td>
                <td>${course.cseStudents}</td>
                <td>${course.cceStudents}</td>
                <td>${course.eceStudents}</td>
                <td>${course.cseDDStudents}</td>
                <td>${course.eceDDStudents}</td>
                <td>${course.mmeStudents}</td>
                <td>${course.credits}</td>
                <td>${course.semester}</td>
                <td>${course.courseType}</td>
                <td>${course.sharingType}</td>
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

        // Add event listener for delete buttons
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                confirmDelete(index);
            });
        });
    }

    function saveCourse(index) {
        const course = courses[index];
        console.log("Saving course:", course); // Debugging statement

        // Save data to local storage
        saveData();

        // Send data to server
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

    function deleteCourse(index) {
        // Remove the course at the specified index from the courses array
        const deletedCourse = courses.splice(index, 1)[0];
        // Re-render the courses table
        renderCourses();
        // Save the updated data to local storage
        saveData();

        // Send request to server to delete the course
        fetch("/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deletedCourse)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Course deleted successfully:", data);
        })
        .catch(error => {
            console.error("Error deleting course:", error);
        });
    }

    // Function to confirm delete action
    function confirmDelete(index) {
        if (confirm("Are you sure you want to delete this course?")) {
            deleteCourse(index);
        }
    }

    // Add event listener for Save button
    saveButton.addEventListener("click", () => {
        // When Save button is clicked, save data to local storage
        saveData();
    });

    sendButton.addEventListener("click", function() {
        const hodDepartment = document.getElementById("hodDepartment").value;
        if (!hodDepartment) {
            alert("Please select a HOD department");
            return;
        }
        const filteredCourses = courses.filter(course => course.department === hodDepartment);
        sendDataToHOD(filteredCourses, hodDepartment);
    });

    // Function to send data to the respective HOD
    function sendDataToHOD(data, department) {
        // Send data to the server
        fetch("/sendToHOD", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data, department: department })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data sent to HOD successfully:", data);
            alert("Data sent to HOD successfully.");
        })
        .catch(error => {
            console.error("Error sending data to HOD:", error);
            alert("Error occurred while sending data to HOD. Please try again.");
        });
    }

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
            cseStudents: document.getElementById("cseStudentsInput").value,
            cceStudents: document.getElementById("cceStudentsInput").value,
            eceStudents: document.getElementById("eceStudentsInput").value,
            cseDDStudents: document.getElementById("cseDDStudentsInput").value,
            eceDDStudents: document.getElementById("eceDDStudentsInput").value,
            mmeStudents: document.getElementById("mmeStudentsInput").value,
            credits: document.getElementById("creditsInput").value,
            semester: document.getElementById("semesterSelect").value,
            courseType: document.getElementById("courseTypeSelect").value,
            sharingType: document.getElementById("sharingTypeSelect").value,
            year: document.getElementById("yearSelect").value,
            professors: Array.from(document.querySelectorAll(".professors-container input")).map(input => input.value),
        };

        if (!newCourse.name || !newCourse.id || !newCourse.department || !newCourse.cseStudents || !newCourse.cceStudents || !newCourse.eceStudents || !newCourse.cseDDStudents || !newCourse.eceDDStudents || !newCourse.mmeStudents || !newCourse.credits || !newCourse.semester || !newCourse.courseType || !newCourse.sharingType || !newCourse.year) {
            alert("Please fill in all fields");
            return;
        }

        courses.push(newCourse);
        renderCourses();
        resetForm();
    });

    function resetForm() {
        courseForm.reset();
        courseForm.style.display = "none";
        document.querySelectorAll(".professors-container").forEach(container => container.remove());
    }

    generateButton.addEventListener("click", function() {
        // Generate button logic goes here
    });

    // Optional: Add event listener for logout button
    // document.querySelector("form[action='/logout']").addEventListener("submit", function() {
    //     // Logout logic goes here
    // });

    // Optional: Add event listener for delete buttons
    // document.querySelectorAll(".delete-button").forEach(button => {
    //     button.addEventListener("click", function() {
    //         const index = button.getAttribute("data-index");
    //         confirmDelete(index);
    //     });
    // });

});

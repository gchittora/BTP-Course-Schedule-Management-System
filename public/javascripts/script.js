document.addEventListener("DOMContentLoaded", function () {
    const courses = [];
    const courseForm = document.getElementById("courseForm");
    const courseTableBody = document.querySelector("#courseTable tbody");
    const saveButton = document.getElementById("saveButton"); // Get the save button
    const addEntryButton = document.getElementById("addEntryButton");

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

    function fetchAndRenderSavedCourses() {
        fetch("/fetchSavedCourses")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then(data => {
                // Extract courses from response data
                const allData = data.allData;
                const savedCourses = data.savedCourses;
                courses.length = 0;
                courses.push(...savedCourses);
                courses.push(...allData);
                saveData(); // Save fetched courses locally
                renderCourses(); // Render courses after fetching
            })
            .catch(error => {
                console.error("Error fetching and saving courses:", error);
            });
    }

    // Call fetchAndRenderSavedCourses to render saved courses
    fetchAndRenderSavedCourses();


    function renderCourses() {
        courseTableBody.innerHTML = "";

        courses.forEach((course, index) => {
            console.log(course);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.courseCode}</td>
                <td>${course.department.name}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.CSE : 'N/A'}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.CCE : 'N/A'}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.ECE : 'N/A'}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.CSE_DD : 'N/A'}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.ECE_DD : 'N/A'}</td>
                <td>${course.numberOfStudents ? course.numberOfStudents.MME : 'N/A'}</td>
                <td>${course.credits}</td>
                <td>${course.semester}</td>
                <td>${course.courseType}</td>
                <td>${course.sharingType}</td>
                <td>${course.year}</td>
                <td>${course.professors.map(professor => professor.name).join(", ")}</td>
                <td><button class="save-button" data-index="${index}">Save</button></td>
                <td><button class="delete-button" data-index="${index}">Delete</button></td>
            `;
            courseTableBody.appendChild(row);
        });
    }

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
});

function saveCourse(index) {
    const course = courses[index];
    console.log("Save button clicked for saving :", course); // Debugging statement

    if (confirm("Are you sure you want to save?")) {
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
    else {
        // If the user cancels, do nothing
        console.log("Save operation stopped.");
    }

}

// Update the deleteCourse function to send the request to the correct endpoint
function deleteCourse(index) {
    const course = courses[index];
    const courseName = course.name; // Assuming the course name is unique and present in the 'name' field

    // Send request to server to delete the course
    fetch("/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ courseName: courseName }) // Send the course name for deletion
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Course deleted successfully:", data);
            // Remove the deleted course from the local array and re-render the courses table
            courses.splice(index, 1);
            renderCourses();
        })
        .catch(error => {
            console.error("Error deleting course:", error);
            alert("Error occurred while deleting course. Please try again.");
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




// Function to send data to the respective HOD
// Send Button Click Event Listener
document.getElementById("sendButton").addEventListener("click", function () {
    const courseEntries = Array.from(document.querySelectorAll("#courseTable tbody tr")).map(row => {
        return {
            name: row.cells[0].innerText,
            id: row.cells[1].innerText,
            department: row.cells[2].innerText,
            cseStudents: row.cells[3].innerText,
            cceStudents: row.cells[4].innerText,
            eceStudents: row.cells[5].innerText,
            cseDDStudents: row.cells[6].innerText,
            eceDDStudents: row.cells[7].innerText,
            mmeStudents: row.cells[8].innerText,
            semester: row.cells[9].innerText,
            courseType: row.cells[10].innerText,
            year: row.cells[11].innerText
        };
    });
    sendDataToHOD(courseEntries);
});

function sendDataToHOD(data) {
    // Send data to the server
    fetch("/sendToHOD", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data sent to all the respective HODs successfully:", data);
            alert("Data sent to all the respective HODs successfully.");
        })
        .catch(error => {
            console.error("Error sending data to HOD:", error);
            alert("Error occurred while sending data to HOD. Please try again.");
        });
}


addEntryButton.addEventListener("click", function () {
    courseForm.style.display = "block";
});

addProfessorButton.addEventListener("click", function () {
    const professorsContainer = document.createElement("div");
    professorsContainer.classList.add("professors-container");

    const professorInput = document.createElement("input");
    professorInput.type = "text";
    professorInput.placeholder = "Professor";
    professorsContainer.appendChild(professorInput);

    courseForm.insertBefore(professorsContainer, addProfessorButton);
});

courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather data from the form
    const newCourse = {
        name: document.getElementById("courseNameInput").value,
        courseCode: document.getElementById("courseCodeInput").value,
        department: document.getElementById("departmentSelect").value,
        numberOfStudents: {
            CSE: document.getElementById("cseStudentsInput").value,
            CCE: document.getElementById("cceStudentsInput").value,
            ECE: document.getElementById("eceStudentsInput").value,
            CSE_DD: document.getElementById("cseDDStudentsInput").value,
            ECE_DD: document.getElementById("eceDDStudentsInput").value,
            MME: document.getElementById("mmeStudentsInput").value
        },
        credits: document.getElementById("creditsInput").value,
        semester: document.getElementById("semesterSelect").value,
        courseType: document.getElementById("courseTypeSelect").value,
        sharingType: document.getElementById("sharingTypeSelect").value,
        year: document.getElementById("yearSelect").value,
        professors: Array.from(document.querySelectorAll(".professors-container input")).map(input => input.value),
    };

    //conditional statement
    if (!newCourse.name || !newCourse.courseCode || !newCourse.department || !newCourse.semester || !newCourse.courseType || !newCourse.year) {
        alert("Please fill in all required fields");
        return;
    }


    // Add the new course to the courses array and render the courses
    courses.push(newCourse);
    renderCourses();
    resetForm();
});


function resetForm() {
    courseForm.reset();
    courseForm.style.display = "none";
    document.querySelectorAll(".professors-container").forEach(container => container.remove());
}

generateButton.addEventListener("click", function () {
    // Generate button logic goes here
});

// Optional: Add event listener for logout button
// document.querySelector("form[action='/logout']").addEventListener("submit", function() {
//     // Logout logic goes here
// });


//  document.querySelectorAll(".delete-button").forEach(button => {
//     button.addEventListener("click", function() {
//         const index = button.getAttribute("data-index");
//          confirmDelete(index);
//     });
//  });


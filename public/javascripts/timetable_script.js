document.addEventListener("DOMContentLoaded", function() {
    // Function to handle editing
    function editButtonHandler(event) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td:not(:last-child)'); // Select all cells except the action cell

        cells.forEach((cell, index) => {
            if(index !== 2) { // Assuming index 2 is professors to avoid complex innerHTML due to line breaks
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell.innerText;
                cell.innerHTML = '';
                cell.appendChild(input);
            }
        });

        // Change Edit button to Save button
        event.target.textContent = 'Save';
        event.target.classList.add('save-button');
        event.target.removeEventListener('click', editButtonHandler);
        event.target.addEventListener('click', saveChanges);
    }

    document.getElementById('generatePdfBtn').addEventListener('click', function() {
        alert('Button clicked, initiating PDF generation...');
    
        // Get the HTML content of the element with class 'content'
        const contentElement = document.querySelector('.content');
        const contentHTML = contentElement.innerHTML;
    
        // Define options for PDF generation
        const opt = {
            margin: [0.5, 0.01, 0.5, 0.01],
            filename: 'timetable.pdf',
            image: { 
                type: 'jpeg', 
                quality: 0.98, 
                options: { 
                    saturation: 2,
                    exposure: 0.5
                }  
            },
            html2canvas: { 
                scale: 0.5,
                useCORS: true 
            },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };
    
        // Generate PDF using html2pdf from the extracted HTML string
        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF generated and download initiated');
            alert('PDF generated and download initiated');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('An error occurred while generating the PDF');
        });
    });
    
    
    

    // Function to handle saving
    function saveChanges(event) {
        const row = event.target.closest('tr');
        const inputs = row.querySelectorAll('input');
        const updatedEntry = {
            course: inputs[0].value,  // Example, adjust according to actual structure
            section: inputs[1].value,
            lectureHall:inputs[3].value,
            startTime:inputs[4].value,
            endTime:inputs[5].value,


            // Add all necessary properties
        };
    
        fetch('/update-timetable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEntry)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            // Update UI here
        })
        .catch(error => console.error('Error:', error));
    }
    

    // Bind initial edit buttons to the editButtonHandler
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', editButtonHandler);
    });
});
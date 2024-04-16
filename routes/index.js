const express = require('express');
const router = express.Router();
const Course = require('./course');
const Department = require('./department');
const Professor = require('./professor');
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const TimeTable = require('./timetable');
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const firstYearSection = ['A1', 'A2', 'B1', 'B2'];
const secondyearSection = ['A1_MME', 'A1_CSE', 'A2_CSE', 'B1_CCE', 'B2_ECE'];
const secondyearSectionTimeMapping = {
  "A1_MME": {
    "MON": [
      { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 10, minutes: 0 } },
      { startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 9, minutes: 30 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 30 } }
    ]
  },
  "A1_CSE": {
    "MON": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 0 } },
      { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 10, minutes: 0 } },
      { startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 0 } },
      { startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 30 } }
    ]
  },
  "A2_CSE": {
    "MON": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 0 } },
      { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 10, minutes: 0 } },
      { startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 0 } },
      { startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 30 } }
    ]
  },
  "B1_CCE": {
    "MON": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 0 } },
      { startTime: { hours: 14, minutes: 0 }, endTime: { hours: 15, minutes: 0 } },
      { startTime: { hours: 15, minutes: 0 }, endTime: { hours: 16, minutes: 0 } },
      { startTime: { hours: 16, minutes: 0 }, endTime: { hours: 17, minutes: 0 } },
      { startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 30 } }
    ]
  },
  "B2_ECE": {
    "MON": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 0 } },
      { startTime: { hours: 15, minutes: 0 }, endTime: { hours: 16, minutes: 0 } },
      { startTime: { hours: 16, minutes: 0 }, endTime: { hours: 17, minutes: 0 } },
      { startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 30 } }
    ]
  }
};

const firstYearSectionTimeMapping = {
  "A1": {
    "MON": [
      { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 10, minutes: 0 } },
      { startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 0 } },
      { startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 30 } },
      { startTime: { hours: 9, minutes: 30 }, endTime: { hours: 11, minutes: 0 } }
    ]
  },
  "A2": {
    "MON": [
      { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 10, minutes: 0 } },
      { startTime: { hours: 10, minutes: 0 }, endTime: { hours: 11, minutes: 0 } },
      { startTime: { hours: 11, minutes: 0 }, endTime: { hours: 12, minutes: 0 } },
      { startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 8, minutes: 0 }, endTime: { hours: 9, minutes: 30 } },
      { startTime: { hours: 9, minutes: 30 }, endTime: { hours: 11, minutes: 0 } }
    ]
  },
  "B1": {
    "MON": [
      { startTime: { hours: 14, minutes: 0 }, endTime: { hours: 15, minutes: 0 } },
      { startTime: { hours: 15, minutes: 0 }, endTime: { hours: 16, minutes: 0 } },
      { startTime: { hours: 16, minutes: 0 }, endTime: { hours: 17, minutes: 0 } },
      { startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 30 } },
      { startTime: { hours: 14, minutes: 30 }, endTime: { hours: 16, minutes: 0 } }

    ]
  },
  "B2": {
    "MON": [
      { startTime: { hours: 14, minutes: 0 }, endTime: { hours: 15, minutes: 0 } },
      { startTime: { hours: 15, minutes: 0 }, endTime: { hours: 16, minutes: 0 } },
      { startTime: { hours: 16, minutes: 0 }, endTime: { hours: 17, minutes: 0 } },
      { startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } }
    ],
    "TUE": [
      { startTime: { hours: 13, minutes: 0 }, endTime: { hours: 14, minutes: 30 } },
      { startTime: { hours: 14, minutes: 30 }, endTime: { hours: 16, minutes: 0 } }

    ]
  }
};

const lectureHallProximityMapping = {
  AcademicHallLarge: ["LT1", "LT2", "LT9", "LT10"],
  AcademicHallSmall: ["LT3", "LT4", "LT5", "LT6", "LT7", "LT8"],
  Incubation: ["LT16", "LT17", "LT18", "LT19"],
  MmeBuilding: ["LT11", "LT12", "LT13"],
  MysteryHalls: ["LT14", "LT15"]
};

// Render the index page
router.get('/', function (req, res) {
  res.render('index');
});

// Render the registration page
router.get('/register', function (req, res) {
  res.render('register');
});

// Render the registrar page (requires authentication)
router.get('/registrar', isLoggedIn, function (req, res, next) {
  res.render('registrar');
});

router.get('/fetchSavedCourses', async (req, res) => {
  try {
    const savedCourses = await Course.find()
      .populate('department', 'name') // Populate department name
      .populate('courseType', 'typeName') // Populate course type name
      .populate('sharingType', 'typeName') // Populate sharing type name
      .populate('professors', 'name'); // Populate professors' names
    res.json(savedCourses);
  } catch (error) {
    console.error("Error fetching saved courses:", error);
    res.status(500).json({ error: "Error occurred while fetching saved courses" });
  }
});

// Render department-specific pages for HOD (requires authentication)


// Register a new user
router.post('/register', function (req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact
  });
  userModel.register(data, req.body.password, function (err, user) {
    if (err) {
      console.error('Error registering user:', err);
      return next(err);
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});


// Save a new course
router.post('/save', async (req, res) => {
  try {
    const { name, year, semester, id, department, courseType, credits, professors, sharingType } = req.body;
    const { cseStudents, cceStudents, eceStudents, cseDDStudents, eceDDStudents, mmeStudents } = req.body;

    const parsedNumberOfStudents = {
      CSE: parseInt(cseStudents),
      CCE: parseInt(cceStudents),
      ECE: parseInt(eceStudents),
      CSE_DD: parseInt(cseDDStudents),
      ECE_DD: parseInt(eceDDStudents),
      MME: parseInt(mmeStudents)
    };
    // Find or create the department
    let departmentDoc = await Department.findOne({ name: department });
    if (!departmentDoc) {
      departmentDoc = await Department.create({ name: department });
    }

    // Create the new course
    const newCourse = new Course({
      name,
      year,
      semester,
      courseCode: id,
      numberOfStudents: parsedNumberOfStudents,
      department: departmentDoc._id,
      credits,
      professors: [],
      courseType,
      sharingType
    });

    // Save the new course
    await newCourse.save();

    // Update the department's courses array
    departmentDoc.courses.push(newCourse._id);
    await departmentDoc.save();

    // Save the professors associated with the course
    const foundProfessors = [];
    for (const professorName of professors) {
      let professor = await Professor.findOne({ name: professorName });
      if (!professor) {
        professor = await Professor.create({ name: professorName });
      }
      professor.courses.push(newCourse._id);
      await professor.save();
      foundProfessors.push(professor);
    }

    // Update the course with the professors
    newCourse.professors = foundProfessors.map(professor => professor._id);
    await newCourse.save();

    res.status(200).json({ message: "Course saved successfully" });
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ error: "Error occurred while saving course" });
  }
});

//index.js
router.post('/saveTimetableEntries', async (req, res) => {
  try {
    const { entries } = req.body;

    // Assuming TimeTable is your Mongoose model
    await TimeTable.insertMany(entries);

    res.status(201).json({ message: 'Timetable entries saved successfully' });
  } catch (error) {
    console.error('Error saving timetable entries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to delete a course
router.post('/delete', async (req, res) => {
  try {
    const courseName = req.body.courseName; // Retrieve the course name from the request body

    // Perform the deletion by finding the course by its name and deleting it
    const deletedCourse = await Course.findOneAndDelete({ name: courseName });

    if (!deletedCourse) {
      // If no course was found with the provided name, send an error response
      return res.status(404).json({ error: "Course not found" });
    }

    // Remove the deleted course from the related department's courses array
    await Department.updateOne({ _id: deletedCourse.department }, { $pull: { courses: deletedCourse._id } });

    // Remove the deleted course from the related professors' courses array
    await Professor.updateMany({ _id: { $in: deletedCourse.professors } }, { $pull: { courses: deletedCourse._id } });

    // If the course was successfully deleted, send a success response
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    // If an error occurs during deletion, send a 500 Internal Server Error response
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Error occurred while deleting course" });
  }
});

// Update the route handler for sending data to HOD
router.post('/sendToHOD', async (req, res) => {
  try {
    const data = req.body.data;
    const department = req.body.department;

    // Validate data here if necessary

    // Process the data and send a response
    res.status(200).json({ message: "Data sent to HOD successfully", data: data, department: department });
  } catch (error) {
    console.error("Error sending data to HOD:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

router.post('/update', async (req, res) => {
    const updatedCourse = req.body;

    try {
        // Map professor names to their corresponding IDs
        const professorIds = await Promise.all(
            updatedCourse.professors.map(async professorName => {
                const professor = await Professor.findOne({ name: professorName });
                return professor ? professor._id : null;
            })
        );

        // Update the course in the database with the professor IDs
        updatedCourse.professors = professorIds.filter(id => id !== null);
        const query = { id: updatedCourse.id };
        const options = { new: true }; // Return the updated document
        const updatedDocument = await Course.findOneAndUpdate(query, updatedCourse, options);

        if (updatedDocument) {
            res.json({ message: 'Course updated successfully', course: updatedDocument });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Define a route to fetch professor IDs by their names
router.post('/getProfessorIds', async (req, res) => {
  const professorNames = req.body;
  try {
      const professorIds = await Professor.find({ name: { $in: professorNames } }, '_id');
      res.json(professorIds);
  } catch (error) {
      console.error('Error fetching professor IDs:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to render HOD pages
router.get('/hod/:department', isLoggedIn, isHOD, async function (req, res, next) {
  const department = req.params.department;
  try {
    // Find the department document by name
    const departmentDoc = await Department.findOne({ name: department });

    if (!departmentDoc) {
      // Handle case where department is not found
      throw new Error('Department not found');
    }

    // Find courses by department ID
    const courses = await Course.find({ department: departmentDoc._id });

    // Filter courses to show only those that have not been filled by the HOD
    const unfilledCourses = courses.filter(course => !course.credits);

    res.render('hod', { department: department, courses: unfilledCourses });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.render('emptydata');
  }
});


// POST route to update the course data
router.post('/save-course', async (req, res) => {
  const { courseName, credits, sharingType, professors } = req.body;

  try {
    // Check if the course exists
    let course = await Course.findOne({ name: courseName });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Determine the department associated with the course
    const department = course.department; // Assuming the department is stored in the course document

    // Check if professors exist, create new if not
    const professorIds = [];
    for (const professorName of professors) {
      let professor = await Professor.findOne({ name: professorName });
      if (!professor) {
        // Professor does not exist, create a new one
        professor = await Professor.create({ name: professorName, department: department });
      } else {
        // If professor exists, ensure the department is updated
        professor.department = department;
        await professor.save();
      }
      professorIds.push(professor._id);
      // Push the course id into the professor's courses array
      professor.courses.push(course._id);
      await professor.save(); // Save the updated professor
    }

    // Update the course with credits, sharingType, and professors
    course.credits = credits;
    course.sharingType = sharingType;
    course.professors = professorIds;

    // Save the updated course
    await course.save();

    res.status(200).json({ message: 'Course saved successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});



function determineDepartment(email) {
  if (email === "HODCSE@gmail.com") {
    return "CSE";
  }
  else if (email === "HODCCE@gmail.com") {
    return "CCE";
  }
  else if (email === "HODECE@gmail.com") {
    return "ECE";
  }
  else if (email === "HODMME@gmail.com") {
    return "MME";
  }
  else if (email === "HODHSS@gmail.com") {
    return "HSS";
  }
  else if (email === "HODMTH@gmail.com") {
    return "MTH";
  }
  else {
    return "PHY"
  }
}


// Route to update course details by HOD
router.post('/hod/update', isLoggedIn, function (req, res) {
  const { courseId, credits, sharingType, professors } = req.body;
  Course.findByIdAndUpdate(courseId, { credits: credits, methodOfDelivery: sharingType, professors: professors }, { new: true })
    .then(updatedCourse => {
      res.json({ message: "Course details updated successfully", course: updatedCourse });
    })
    .catch(error => {
      console.error("Error updating course details:", error);
      res.status(500).json({ error: "Error occurred while updating course details" });
    });
});


// Render the login page
router.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    // If already authenticated, redirect to the appropriate page based on user type
    const userEmail = req.user.email; // Assuming email is stored in user object after authentication
    if (userEmail === 'registrar@gmail.com') {
      res.redirect('/registrar');
    } else if (userEmail === 'HODCSE@gmail.com') {
      res.redirect('/hod/CSE');
    } else if (userEmail === 'HODCCE@gmail.com') {
      res.redirect('/hod/CCE');
    } else if (userEmail === 'HODECE@gmail.com') {
      res.redirect('/hod/ECE');
    } else if (userEmail === 'HODMME@gmail.com') {
      res.redirect('/hod/MME');
    } else if (userEmail === 'HODHSS@gmail.com') {
      // Redirect to login page if user's email domain is not recognized
      res.redirect('/hod/HSS');
    }
    else if (userEmail === 'HODMTH@gmail.com') {
      res.redirect('/hod/MTH');
    }
    else if (userEmail === 'HODPHY@gmail.com') {
      res.redirect('/hod/PHY')
    }
    else {
      res.redirect('/');
    }
  } else {
    // If not authenticated, render the login page
    res.render('index');
  }
});

// Authenticate user login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/login', // Redirect to login route to handle redirection based on email
  failureRedirect: '/',
}));

// Logout user
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
function isRegistrar(req, res, next) {
  if (req.isAuthenticated() && req.user.email === 'registrar@gmail.com') {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated as registrar
}
// Middleware to check if user is a HOD and accessing their own department page
function isHOD(req, res, next) {
  const email = req.user.email;
  const hodDepartments = {
    'HODCSE@gmail.com': 'CSE',
    'HODCCE@gmail.com': 'CCE',
    'HODECE@gmail.com': 'ECE',
    'HODMME@gmail.com': 'MME',
    'HODHSS@gmail.com': 'HSS',
    'HODMTH@gmail.com': 'MTH',
    'HODPHY@gmail.com': 'PHY'

  };

  const requestedDepartment = req.params.department;

  if (req.isAuthenticated() && hodDepartments[email] === requestedDepartment) {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated as HOD or accessing another department
}

// Initialize professorMapping object
const professorMapping = {};

async function allocateCoursesToSections_I(courses, sections) {
  try {
    for (let course of courses) {
      for (let section of sections) {
        await allocateTimeSlotForSection_I(course._id, section);
      }
    }
  } catch (error) {
    throw error;
  }
}

async function allocateTimeSlotForSection_I(courseId, section) {
  try {
    console.log(`Allocating time slots for course ${courseId} in section ${section}`);

    const sectionTimeMapping = firstYearSectionTimeMapping[section];
    const days = Object.keys(sectionTimeMapping);
    const existingEntries = await TimeTable.find({ section });

    let allocated = false;

    // Determine lecture hall based on section
    let lectureHall;
    if (section === 'A1' || section === 'B1') {
      lectureHall = 'LT1';
    } else if (section === 'A2' || section === 'B2') {
      lectureHall = 'LT2';
    }

    // Fetch the course document and populate the professors
    const course = await Course.findById(courseId).populate('professors');
    const professors = course.professors.map(professor => professor.name);

    // Convert professor names to ObjectId values
    const professorIds = await Promise.all(professors.map(async professorName => {
      const professor = await Professor.findOne({ name: professorName });
      return professor._id;
    }));

    // Loop through each day
    for (const day of days) {
      console.log(`Checking time slots for ${day} in section ${section}`);

      const timeSlots = sectionTimeMapping[day];

      // Check if there are existing entries for the section on the current day
      const existingEntriesOnDay = existingEntries.filter(entry => entry.day === day);

      // Loop through the time slots
      for (const timeSlot of timeSlots) {
        // Check if the time slot is already allocated to a different course
        const isTimeSlotAllocated = await TimeTable.exists({
          day,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          course: { $ne: courseId } // Exclude current course
        });

        // If time slot is not allocated to a different course, allocate it
        if (!isTimeSlotAllocated) {
          console.log(`Allocating time slot for ${courseId} in section ${section} on ${day} from ${timeSlot.startTime.hours}:${timeSlot.startTime.minutes} to ${timeSlot.endTime.hours}:${timeSlot.endTime.minutes}`);

          const newTimeTableEntry = new TimeTable({
            day,
            section,
            course: courseId,
            professors: professorIds, // Assign professors to the time table entry
            lectureHall,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime// Add the sharingType field
          });
          await newTimeTableEntry.save();
          allocated = true;

          // Update professorMapping for each professor associated with the course
          for (const professorName of professors) {
            if (!professorMapping[professorName]) {
              professorMapping[professorName] = {};
            }
            if (!professorMapping[professorName][day]) {
              professorMapping[professorName][day] = [];
            }
            professorMapping[professorName][day].push({ startTime: timeSlot.startTime, endTime: timeSlot.endTime, sharingType: course.sharingType });
          }

          break; // Break the loop after successful allocation
        }
      }

      // If time slot is allocated, break the loop
      if (allocated) {
        break;
      }
    }

    if (!allocated) {
      console.log(`No available time slots for ${section}`);
    }

    console.dir(professorMapping, { depth: null });

  } catch (error) {
    console.error(`Error while allocating time slots: ${error}`);
    throw error;
  }
}

async function allocateCoursesToSections_II(courses) {
  try {
    let defaultCourse = null;

    // Find the course that meets the condition
    for (let course of courses) {
      if (course.year === "2nd") {
        const { CSE, CSE_DD, CCE, ECE, ECE_DD, MME } = course.numberOfStudents;

        if (CSE !== 0 && CSE_DD !== 0 && CCE !== 0 && ECE !== 0 && ECE_DD !== 0 && MME !== 0) {
          defaultCourse = course;
          break;
        }
      }
    }

    // Allocate specific time slots for the default course if found
    if (defaultCourse) {
      await allocateTimeSlotForDefaultSections(defaultCourse);
    }

    // Allocate time slots based on the conditions for other 2nd year courses
    for (let course of courses) {
      if (course.year === "2nd" && course !== defaultCourse) {
        const { CSE, CSE_DD, CCE, ECE, ECE_DD, MME } = course.numberOfStudents;

        let allotments = [];
        if (CSE !== 0 && CSE_DD !== 0 && CCE !== 0) {
          allotments = ["A1_CSE", "A2_CSE", "B1_CCE"];
        } else if (CSE !== 0 && CSE_DD !== 0 && CCE === 0) {
          allotments = ["A1_CSE", "A2_CSE"];
        } else if (ECE !== 0 && ECE_DD !== 0 && CCE !== 0) {
          allotments = ["B1_CCE", "B2_ECE"];
        } else if (ECE !== 0 && ECE_DD !== 0 && CCE === 0) {
          allotments = ["B2_ECE"];
        } else if (MME !== 0) {
          allotments = ["A1_MME"];
        } else {
          allotments = ["A1_CSE", "A2_CSE", "B1_CCE", "B2_ECE"]; // Default allotments
        }

        // Allocate time slots based on the determined allotments
        await allocateTimeSlotForSection_II(course, allotments);
      }
    }
  } catch (error) {
    throw error;
  }
}

async function checkProfmapping(professorNames, it, timeSlot) {
  try {
    let flag = false;
    for (let prof of professorNames) {
      // Check if professor and iteration exist in professorMapping
      if (professorMapping.hasOwnProperty(prof) && professorMapping[prof].hasOwnProperty(it)) {
        const entries = professorMapping[prof][it];

        const notFreeAndBackToBack = entries.some(entry => (
          // Check for conditions inside the professorMapping
          (entry.startTime.hours === timeSlot.startTime.hours && entry.startTime.minutes === timeSlot.startTime.minutes) ||
          (entry.startTime.hours === timeSlot.endTime.hours && entry.startTime.minutes === timeSlot.endTime.minutes) ||
          (entry.endTime.hours === timeSlot.startTime.hours && entry.endTime.minutes === timeSlot.startTime.minutes)
        ));

        flag = flag || notFreeAndBackToBack;
      } else {
        // Handle the case where professor or iteration is not found in professorMapping
        console.log(`Professor '${prof}' or iteration '${it}' not found in professorMapping.`);
      }
    }
    return flag;
  } catch (error) {
    console.error(`Error in checkProfmapping: ${error}`);
    throw error;
  }
}

async function allocateTimeSlotForDefaultSections(course) {
  try {
    // Specify the sections and their corresponding time slots
    const sectionsAndTimeSlots = [
      { section: "A1_CSE", day: "MON", startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } },
      { section: "A2_CSE", day: "MON", startTime: { hours: 12, minutes: 0 }, endTime: { hours: 13, minutes: 0 } },
      { section: "B1_CCE", day: "MON", startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } },
      { section: "B2_ECE", day: "MON", startTime: { hours: 17, minutes: 0 }, endTime: { hours: 18, minutes: 0 } }
    ];

    for (const item of sectionsAndTimeSlots) {
      const { section, day, startTime, endTime } = item;
      console.log(`Allocating time slot for ${course._id} in section ${section} on ${day}`);

      // Fetch the professors for the course
      const professors = course.professors.map(professor => professor._id);
      const sharingType = course.sharingType;
      let lectureHall;
      if (section === 'A1_CSE' || section === 'B2_ECE') {
        lectureHall = 'LT16';
      } else if (section === 'A2_CSE' || section === 'B1_CCE') {
        lectureHall = 'LT17';
      } else if (section === 'A1_MME') {
        lectureHall = 'LT13';
      } else {
        // Default lecture hall if section is not recognized
        lectureHall = 'AcademicHallLarge';
      }
      // Create and save new time table entry
      const newTimeTableEntry = new TimeTable({
        day,
        section,
        course: course._id,
        professors,
        lectureHall,
        startTime,
        endTime,
        sharingType
      });
      await newTimeTableEntry.save();

      // Update professorMapping with the allocated time slot
      for (const professorName of professors) {
        if (!professorMapping[professorName]) {
          professorMapping[professorName] = {};
        }
        if (!professorMapping[professorName][day]) {
          professorMapping[professorName][day] = [];
        }
        professorMapping[professorName][day].push({ startTime: item.startTime, endTime: item.endTime, sharingType: course.sharingType });
      }
    }
  } catch (error) {
    console.error(`Error while allocating time slots for default sections: ${error}`);
    throw error;
  }
}


async function allocateTimeSlotForSection_II(course, allotments) {
  try {
    console.log(`Allocating time slots for course ${course._id}`);

    // Loop through each section in allotments
    for (let section of allotments) {
      console.log(`Allocating time slots for course ${course._id} in section ${section}`);

      const sectionTimeMapping = secondyearSectionTimeMapping[section];
      const days = Object.keys(sectionTimeMapping);//mon and tues

      // Loop over monday and then tuesday
      let chosenDay;
      let alloc=false;
      for (let it of days){
        chosenDay=it;
        const existingtimtable=await TimeTable.find({ section: section,course: course});
        if(existingtimtable.length>0){
          break;
        }
        console.log(`Checking time slots for ${chosenDay} in section ${section}`);

        const timeSlots = sectionTimeMapping[chosenDay];
        const existingEntries = await TimeTable.find({ section: section, day: chosenDay });
        // Loop through each time slot
        for (const timeSlot of timeSlots) {
          // Check if the time slot is already allocated for the section on the chosen day
          const isTimeSlotOccupied = existingEntries.some(entry => (
            entry.startTime.hours === timeSlot.startTime.hours &&
            entry.startTime.minutes === timeSlot.startTime.minutes &&
            entry.endTime.hours === timeSlot.endTime.hours &&
            entry.endTime.minutes === timeSlot.endTime.minutes
          ));

          // If the time slot is occupied, skip allocating it
          if (isTimeSlotOccupied) {
            console.log(`Time slot already allocated for section ${section} on ${chosenDay} from ${timeSlot.startTime.hours}:${timeSlot.startTime.minutes} to ${timeSlot.endTime.hours}:${timeSlot.endTime.minutes}`);
            continue;
          }


          // If the time slot is occupied, skip allocating it
          

          // Determine lecture hall based on section
          let lectureHall;
          if (section === 'A1_CSE' || section === 'B2_ECE') {
            lectureHall = 'LT16';
          } else if (section === 'A2_CSE' || section === 'B1_CCE') {
            lectureHall = 'LT17';
          } else if (section === 'A1_MME') {
            lectureHall = 'LT13';
          } else {
            // Default lecture hall if section is not recognized
            lectureHall = 'AcademicHallLarge';
          }

          // Fetch the professors for the course
          const professors = course.professors.map(professor => professor._id);
          const equaldivide=professors.length/allotments.length;
          const professorNames = await getProfessorNames(professors);
          const sharing=course.sharingType;
          let areProfsFree;
          let cleared_profs=[];
          if(sharing==='Horizontal'){
            areProfsFree=await checkProfmapping(professorNames,it,timeSlot);
            if(!areProfsFree){
              for(let prof of professorNames){
                cleared_profs.push(prof);
              }
            }
            else{
              continue;
            }
          }
          else{
            for(let prof of professorNames){
              const arr=[prof];
              areProfsFree=await checkProfmapping(arr,it,timeSlot);
              if(!areProfsFree){
                cleared_profs.push(prof);
              }
              if(cleared_profs.length>equaldivide){
                break;
              }
            }
            if(cleared_profs.length===0){
              continue;
            }
          }
          const sharingType = course.sharingType;

          console.log(`Allocating time slot for ${course._id} in section ${section} on ${chosenDay} from ${timeSlot.startTime.hours}:${timeSlot.startTime.minutes} to ${timeSlot.endTime.hours}:${timeSlot.endTime.minutes}`);

                  

          const proflog = await convertProfessorNamesToIds(cleared_profs);
          const newTimeTableEntry = new TimeTable({
            day: chosenDay,
            section,
            course: course._id,
            professors:proflog,
            lectureHall,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            
          });
          await newTimeTableEntry.save();
          alloc=true;
          for (let professorName of cleared_profs) {
            if (!professorMapping[professorName]) {
              professorMapping[professorName] = {};
            }
            if (!professorMapping[professorName][chosenDay]) {
              professorMapping[professorName][chosenDay] = [];
            }
            professorMapping[professorName][chosenDay].push({ startTime: timeSlot.startTime, endTime: timeSlot.endTime, sharingType: course.sharingType });
          }
        
          // Break the loop after allocating one time slot
          if(alloc){
            break;
          }
          continue;
        }
        if(alloc){
          break;
        }
        continue;
      }
      
    }
  } catch (error) {
    console.error(`Error while allocating time slots: ${error}`);
    throw error;
  }
}

async function convertProfessorNamesToIds(professorNames) {
  const professorIds = [];

  for (let professorName of professorNames) {
    try {
      const professor = await Professor.findOne({ name: professorName });
      if (professor) {
        professorIds.push(professor._id);
      }
    } catch (error) {
      console.error(`Error fetching professor ID for ${professorName}: ${error}`);
      // Handle error
    }
  }

  return professorIds;
}

async function getProfessorNames(professors) {
  // Assuming you have a function to query the database and retrieve professor names based on _id
  const professorNames = await Promise.all(professors.map(async (professorId) => {
    const professor = await Professor.findById(professorId);
    return professor.name;
  }));
  return professorNames;
}

// Function to fetch professor name from database given professor _id
async function getProfessorName(professorId) {
  // Assuming you have a function to query the database and retrieve professor name based on _id
  const professor = await Professor.findById(professorId);
  return professor.name;
}

router.post('/generate-timetable', async (req, res) => {
  try {
    const courses = await Course.find();
    await allocateCoursesToSections_I(courses, firstYearSection);
    await allocateCoursesToSections_II(courses);

    res.status(200).json({ message: 'Timetable generation completed' });
  } catch (error) {
    console.error('Error generating timetable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/timetable', async (req, res) => {
  try {
    // Fetch timetable entries from the database
    const timetableEntries = await TimeTable.find().populate('course').populate('professors');

    // Render the timetable page
    res.render('timetable', { timetableEntries });
  } catch (error) {
    console.error('Error generating timetable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;

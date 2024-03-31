const express = require('express');
const router = express.Router();
const Course = require('./course');
const Department = require('./department');
const Professor = require('./professor');
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Render the index page
router.get('/', function(req, res) {
    res.render('index');
});

// Render the registration page
router.get('/register', function(req, res) {
    res.render('register');
});

// Render the registrar page (requires authentication)
router.get('/registrar', isLoggedIn, function(req, res, next) {
    res.render('registrar');
});

router.get('/fetchSavedCourses', async (req, res) => {
  try {
      const savedCourses = await Course.find();
      console.log(savedCourses);
      res.json(savedCourses);
  } catch (error) {
      console.error("Error fetching saved courses:", error);
      res.status(500).json({ error: "Error occurred while fetching saved courses" });
  }
});
// Render department-specific pages for HOD (requires authentication)


// Register a new user
router.post('/register', function(req, res, next) {
    const data = new userModel({
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact
    });
    userModel.register(data, req.body.password, function(err, user) {
        if (err) {
            console.error('Error registering user:', err);
            return next(err);
        }
        passport.authenticate('local')(req, res, function() {
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
          courseCode:id,
          numberOfStudents:parsedNumberOfStudents,
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

  // Route to delete a course
// Route to delete a course
// Route to delete a course
// Route to delete a course
// Route to delete a course
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


  
 
// Route to send data to HOD
// Route to send data to HOD
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



// Route to send data to HOD
// Add a route to render HOD pages
// Route to render HOD pages
router.get('/hod/:department', isLoggedIn, function(req, res, next) {
  const department = req.params.department;
  // Find the department document by name
  Department.findOne({ name: department })
      .then(departmentDoc => {
          // Check if department exists
          if (!departmentDoc) {
              // Handle case where department is not found
              throw new Error('Department not found');
          }
          // Find courses by department ID
          return Course.find({ department: departmentDoc._id });
      })
      .then(courses => {
          res.render('hod', { department: department, courses: courses });
      })
      .catch(err => {
          console.error('Error fetching data:', err);
          res.status(500).send('Error fetching data');
      });
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

    // Check if professors exist, create new if not
    const professorIds = [];
    for (const professorName of professors) {
      let professor = await Professor.findOne({ name: professorName });
      if (!professor) {
        // Professor does not exist, create a new one
        professor = await Professor.create({ name: professorName });
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
  if(email==="HODCSE@gmail.com"){
    return "CSE";
  }
  else if(email==="HODCCE@gmail.com"){
    return "CCE";
  }
  else if(email==="HODECE@gmail.com"){
    return "ECE";
  }
  else{
    return "MME";
  }
}


// Route to update course details by HOD
router.post('/hod/update', isLoggedIn, function(req, res) {
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
// Render the login page
router.get('/login', function(req, res) {
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
      } else {
          // Redirect to login page if user's email domain is not recognized
          res.redirect('/');
      }
  } else {
      // If not authenticated, render the login page
      res.render('login');
  }
});

// Authenticate user login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/login', // Redirect to login route to handle redirection based on email
  failureRedirect: '/',
}));

// Logout user
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
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

module.exports = router;

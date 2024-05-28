const express = require("express");
const router = express.Router();
const Course = require("./course");
const Department = require("./department");
const Professor = require("./professor");
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const TimeTable = require("./timetable");
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const firstYearSection = ["A1", "A2", "B1", "B2"];
const secondyearSection = ["A1_MME", "A1_CSE", "A2_CSE", "B1_CCE", "B2_ECE"];
const thirdYearSection = ["A_CSE", "B_CSE", "C_CCE", "D_ECE", "E_MME"];

const MSCPHY = {
  A1_PHY: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  B1_PHY: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  }
}

const MSCMTH = {
  A1_MTH: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  B1_MTH: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  }
}

const thirdyearSectionTimeMapping = {
  C_CCE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  D_ECE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  A_CSE: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
  B_CSE: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
  E_MME: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
};

const fourthyearSectionTimeMapping = {
  B4_CCE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  A4_CSE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  C4_ECE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  D4_MME: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
};

const secondyearSectionTimeMapping = {
  A1_MME: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  A1_CSE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  A2_CSE: {
    MON: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 0 },
      },
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      },
    ],
  },
  B1_CCE: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
  B2_ECE: {
    MON: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 0 },
      },
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
};

const firstYearSectionTimeMapping = {
  A1: {
    MON: [
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      }
    ],
  },
  A2: {
    MON: [
      {
        startTime: { hours: 9, minutes: 0 },
        endTime: { hours: 10, minutes: 0 },
      },
      {
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 0 },
      },
      {
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      }
    ],
    TUE: [
      {
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 9, minutes: 30 },
      },
      {
        startTime: { hours: 9, minutes: 30 },
        endTime: { hours: 11, minutes: 0 },
      },
      {
        startTime: { hours: 11, minutes: 0 },
        endTime: { hours: 12, minutes: 30 },
      }
    ],
  },
  B1: {
    MON: [
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
  B2: {
    MON: [
      {
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 15, minutes: 0 },
      },
      {
        startTime: { hours: 15, minutes: 0 },
        endTime: { hours: 16, minutes: 0 },
      },
      {
        startTime: { hours: 16, minutes: 0 },
        endTime: { hours: 17, minutes: 0 },
      },
      {
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ],
    TUE: [
      {
        startTime: { hours: 13, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
      },
      {
        startTime: { hours: 14, minutes: 30 },
        endTime: { hours: 16, minutes: 0 },
      },
    ],
  },
};

let sectionBusyMapping = {};


const AcademicHallLarge = ["LT1", "LT2", "LT9", "LT10"];
const AcademicHallSmall = ["LT3", "LT4", "LT5", "LT6", "LT7", "LT8"];
const Incubation = ["LT16", "LT17", "LT18", "LT19"];
const MmeBuilding = ["LT11", "LT12", "LT13"];
const MysteryHalls = ["LT14", "LT15"];


// Render the index page
router.get("/", function (req, res) {
  res.render("index");
});

// Render the registration page
router.get("/register", function (req, res) {
  res.render("register");
});

// Render the registrar page (requires authentication)
router.get("/registrar", isLoggedIn, function (req, res, next) {
  res.render("registrar");
});

router.get("/fetchSavedCourses", async (req, res) => {
  try {
    const savedCourses = await Course.find()
      .populate("department", "name") // Populate department name
      .populate("courseType", "typeName") // Populate course type name
      .populate("sharingType", "typeName") // Populate sharing type name
      .populate("professors", "name"); // Populate professors' names
    res.json(savedCourses);
  } catch (error) {
    console.error("Error fetching saved courses:", error);
    res
      .status(500)
      .json({ error: "Error occurred while fetching saved courses" });
  }
});

// Register a new user
router.post("/register", function (req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  });
  userModel.register(data, req.body.password, function (err, user) {
    if (err) {
      console.error("Error registering user:", err);
      return next(err);
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

// Save a new course
router.post("/save", async (req, res) => {
  try {
    const {
      name,
      year,
      semester,
      id,
      department,
      program,
      courseType,
      groupInput,
      credits,
      professors,
      sharingType,
    } = req.body;
    const {
      cseStudents,
      cceStudents,
      eceStudents,
      cseDDStudents,
      eceDDStudents,
      mmeStudents,
      mscPHYStudents,
      mscMTHStudents
    } = req.body;

    const parsedNumberOfStudents = {
      CSE: parseInt(cseStudents),
      CCE: parseInt(cceStudents),
      ECE: parseInt(eceStudents),
      CSE_DD: parseInt(cseDDStudents),
      ECE_DD: parseInt(eceDDStudents),
      MME: parseInt(mmeStudents),
      MScPHY: parseInt(mscPHYStudents),
      MScMTH: parseInt(mscMTHStudents)
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
      program,
      credits,
      professors: [],
      courseType,
      group: groupInput, // Assign groupInput to the group field
      sharingType,
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
    newCourse.professors = foundProfessors.map((professor) => professor._id);
    await newCourse.save();

    res.status(200).json({ message: "Course saved successfully" });
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ error: "Error occurred while saving course" });
  }
});

//index.js
router.post("/saveTimetableEntries", async (req, res) => {
  try {
    const { entries } = req.body;

    // Assuming TimeTable is your Mongoose model
    await TimeTable.insertMany(entries);

    res.status(201).json({ message: "Timetable entries saved successfully" });
  } catch (error) {
    console.error("Error saving timetable entries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update-timetable", async (req, res) => {
  const updatedEntry = req.body;

  try {
    const entry = await TimeTable.findOneAndUpdate({
      course: updatedEntry.course,
      section: updatedEntry.section,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update the timetable",
      error: error.message,
    });
  }
});

// Route to delete a course
router.post("/delete", async (req, res) => {
  try {
    const courseName = req.body.courseName; // Retrieve the course name from the request body

    // Perform the deletion by finding the course by its name and deleting it
    const deletedCourse = await Course.findOneAndDelete({ name: courseName });

    if (!deletedCourse) {
      // If no course was found with the provided name, send an error response
      return res.status(404).json({ error: "Course not found" });
    }

    // Remove the deleted course from the related department's courses array
    await Department.updateOne(
      { _id: deletedCourse.department },
      { $pull: { courses: deletedCourse._id } }
    );

    // Remove the deleted course from the related professors' courses array
    await Professor.updateMany(
      { _id: { $in: deletedCourse.professors } },
      { $pull: { courses: deletedCourse._id } }
    );

    // If the course was successfully deleted, send a success response
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    // If an error occurs during deletion, send a 500 Internal Server Error response
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Error occurred while deleting course" });
  }
});

// Update the route handler for sending data to HOD
router.post("/sendToHOD", async (req, res) => {
  try {
    const data = req.body.data;
    const department = req.body.department;

    // Validate data here if necessary

    // Process the data and send a response
    res.status(200).json({
      message: "Data sent to HOD successfully",
      data: data,
      department: department,
    });
  } catch (error) {
    console.error("Error sending data to HOD:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.post("/update-course", async (req, res) => {
  try {
    console.log("Received update request:", req.body);
    const {
      puranacourse,
      name,
      id,
      department,
      program,
      cseStudents,
      cceStudents,
      eceStudents,
      cseDDStudents,
      eceDDStudents,
      mmeStudents,
      mscMTHStudents,
      mscPHYStudents,
      credits,
      semester,
      courseType,
      groupInput,
      sharingType,
      year,
      professors,
    } = req.body;

    // Find the department ObjectId using the department name
    const departmentDoc = await Department.findOne({ name: department });
    if (!departmentDoc) {
      return res.status(400).json({ error: "Department not found" });
    }

    const professorIds = await Promise.all(
      professors.map(async (professorName) => {
        let professor = await Professor.findOne({ name: professorName });
        if (!professor) {
          // If the professor doesn't exist, create a new one
          professor = await Professor.create({ name: professorName });
        }
        return professor._id;
      })
    );

    // Update the course in the database
    const updatedCourse = await Course.findOneAndUpdate(
      { name: puranacourse }, // Assuming you're updating based on the course name
      {
        name: name,
        courseCode: id,
        department: departmentDoc,
        program: program, // Use the ObjectId of the department
        cseStudents: cseStudents,
        cceStudents: cceStudents,
        eceStudents: eceStudents,
        cseDDStudents: cseDDStudents,
        eceDDStudents: eceDDStudents,
        mmeStudents: mmeStudents,
        mscMTHStudents: mscMTHStudents,
        mscPHYStudents: mscPHYStudents,
        credits: credits,
        semester: semester,
        courseType: courseType,
        group: groupInput, // Assuming the field in the schema is named 'group'
        sharingType: sharingType,
        year: year,
        professors: professorIds,
      },
      { new: true } // To return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Failed to update course" });
  }
});

// Define a route to fetch professor IDs by their names
router.post("/getProfessorIds", async (req, res) => {
  const professorNames = req.body;
  try {
    const professorIds = await Professor.find(
      { name: { $in: professorNames } },
      "_id"
    );
    res.json(professorIds);
  } catch (error) {
    console.error("Error fetching professor IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to render HOD pages
router.get(
  "/hod/:department",
  isLoggedIn,
  isHOD,
  async function (req, res, next) {
    const department = req.params.department;
    try {
      // Find the department document by name
      const departmentDoc = await Department.findOne({ name: department });

      if (!departmentDoc) {
        // Handle case where department is not found
        throw new Error("Department not found");
      }

      // Find courses by department ID
      const courses = await Course.find({ department: departmentDoc._id });

      // Filter courses to show only those that have not been filled by the HOD
      const unfilledCourses = courses.filter((course) => !course.sharingType);

      res.render("hod", { department: department, courses: unfilledCourses });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.render("emptydata");
    }
  }
);

// POST route to update the course data
router.post("/save-course", async (req, res) => {
  const { courseName, sharingType, professors } = req.body;

  try {
    // Check if the course exists
    let course = await Course.findOne({ name: courseName });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Determine the department associated with the course
    const department = course.department; // Assuming the department is stored in the course document

    // Check if professors exist, create new if not
    const professorIds = [];
    for (const professorName of professors) {
      let professor = await Professor.findOne({ name: professorName });
      if (!professor) {
        // Professor does not exist, create a new one
        professor = await Professor.create({
          name: professorName,
          department: department,
        });
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

    course.sharingType = sharingType;
    course.professors = professorIds;

    // Save the updated course
    await course.save();

    res.status(200).json({ message: "Course saved successfully" });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Failed to update course" });
  }
});

function determineDepartment(email) {
  if (email === "HODCSE@gmail.com") {
    return "CSE";
  } else if (email === "HODCCE@gmail.com") {
    return "CCE";
  } else if (email === "HODECE@gmail.com") {
    return "ECE";
  } else if (email === "HODMME@gmail.com") {
    return "MME";
  } else if (email === "HODHSS@gmail.com") {
    return "HSS";
  } else if (email === "HODMTH@gmail.com") {
    return "MTH";
  } else {
    return "PHY";
  }
}

// Route to update course details by HOD
router.post("/hod/update", isLoggedIn, function (req, res) {
  const { courseId, credits, sharingType, professors } = req.body;
  Course.findByIdAndUpdate(
    courseId,
    { credits: credits, methodOfDelivery: sharingType, professors: professors },
    { new: true }
  )
    .then((updatedCourse) => {
      res.json({
        message: "Course details updated successfully",
        course: updatedCourse,
      });
    })
    .catch((error) => {
      console.error("Error updating course details:", error);
      res
        .status(500)
        .json({ error: "Error occurred while updating course details" });
    });
});

async function getDepartmentName(courseId) {
  try {
    // Find the course by its ID and populate the department field
    const course = await Course.findById(courseId).populate("department");
    
    // Check if the course and department exist
    if (!course || !course.department) {
      return "Department not found";
    }

    // Return the department name
    return course.department.name;
  } catch (error) {
    console.error("Error fetching department name:", error);
    throw error;
  }
}

// Render the login page
router.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    // If already authenticated, redirect to the appropriate page based on user type
    const userEmail = req.user.email; // Assuming email is stored in user object after authentication
    if (userEmail === "registrar@gmail.com") {
      res.redirect("/registrar");
    } else if (userEmail === "HODCSE@gmail.com") {
      res.redirect("/hod/CSE");
    } else if (userEmail === "HODCCE@gmail.com") {
      res.redirect("/hod/CCE");
    } else if (userEmail === "HODECE@gmail.com") {
      res.redirect("/hod/ECE");
    } else if (userEmail === "HODMME@gmail.com") {
      res.redirect("/hod/MME");
    } else if (userEmail === "HODHSS@gmail.com") {
      // Redirect to login page if user's email domain is not recognized
      res.redirect("/hod/HSS");
    } else if (userEmail === "HODMTH@gmail.com") {
      res.redirect("/hod/MTH");
    } else if (userEmail === "HODPHY@gmail.com") {
      res.redirect("/hod/PHY");
    } else {
      res.redirect("/");
    }
  } else {
    // If not authenticated, render the login page
    res.render("index");
  }
});

// Authenticate user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login", // Redirect to login route to handle redirection based on email
    failureRedirect: "/",
  })
);

// Logout user
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function isRegistrar(req, res, next) {
  if (req.isAuthenticated() && req.user.email === "registrar@gmail.com") {
    return next();
  }
  res.redirect("/login"); // Redirect to login if not authenticated as registrar
}
// Middleware to check if user is a HOD and accessing their own department page
function isHOD(req, res, next) {
  const email = req.user.email;
  const hodDepartments = {
    "HODCSE@gmail.com": "CSE",
    "HODCCE@gmail.com": "CCE",
    "HODECE@gmail.com": "ECE",
    "HODMME@gmail.com": "MME",
    "HODHSS@gmail.com": "HSS",
    "HODMTH@gmail.com": "MTH",
    "HODPHY@gmail.com": "PHY",
  };

  const requestedDepartment = req.params.department;

  if (req.isAuthenticated() && hodDepartments[email] === requestedDepartment) {
    return next();
  }
  res.redirect("/login"); // Redirect to login if not authenticated as HOD or accessing another department
}

// Initialize professorMapping object
let professorMapping = {};

async function allocateCoursesToSections_I(courses, sections) {
  try {
    for (let course of courses) {
      if (course.year === "1st") {
        for (let section of sections) {
          await allocateTimeSlotForSection_I(course._id, section);
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

async function allocateTimeSlotForSection_I(courseId, section) {
  try {
    console.log(
      `Allocating time slots for course ${courseId} in section ${section}
   `);

    const sectionTimeMapping = firstYearSectionTimeMapping[section];
    const days = Object.keys(sectionTimeMapping);
    const existingEntries = await TimeTable.find({ section });

    let allocated = false;

    // Determine lecture hall based on section
    let lectureHall;
    if (section === "A1" || section === "B1") {
      lectureHall = "LT1";
    } else if (section === "A2" || section === "B2") {
      lectureHall = "LT2";
    }

    // Fetch the course document and populate the professors
    const course = await Course.findById(courseId).populate("professors");
    const professors = course.professors.map((professor) => professor.name);

    // Convert professor names to ObjectId values
    const professorIds = await Promise.all(
      professors.map(async (professorName) => {
        const professor = await Professor.findOne({ name: professorName });
        return professor._id;
      })
    );

    // Loop through each day
    for (const day of days) {
      console.log(`Checking time slots for ${day} in section ${section}`);

      const timeSlots = sectionTimeMapping[day];

      // Check if there are existing entries for the section on the current day
      const existingEntriesOnDay = existingEntries.filter(
        (entry) => entry.day === day
      );

      // Loop through the time slots
      for (const timeSlot of timeSlots) {
        // Check if the time slot is already allocated to a different course
        const isTimeSlotAllocated = await TimeTable.exists({
          day,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          course: { $ne: courseId }, // Exclude current course
        });

        // If time slot is not allocated to a different course, allocate it
        if (!isTimeSlotAllocated) {
          console.log(
            `Allocating time slot for ${courseId} in section ${section} on ${day} from ${timeSlot.startTime.hours}:${timeSlot.startTime.minutes} to ${timeSlot.endTime.hours}:${timeSlot.endTime.minutes}
          `);

          const newTimeTableEntry = new TimeTable({
            day,
            section,
            course: courseId,
            professors: professorIds, // Assign professors to the time table entry
            lectureHall,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime, // Add the sharingType field
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
            professorMapping[professorName][day].push({
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              sharingType: course.sharingType,
            });
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

async function checkProfmapping(professorNames, it, timeSlot) {
  try {
    let flag = false;
    for (let prof of professorNames) {
      // Check if professor and iteration exist in professorMapping
      if (
        professorMapping.hasOwnProperty(prof) &&
        professorMapping[prof].hasOwnProperty(it)
      ) {
        const entries = professorMapping[prof][it];

        const notFreeAndBackToBack = entries.some(
          (entry) =>
            // Check for conditions inside the professorMapping
            (entry.startTime.hours === timeSlot.startTime.hours &&
              entry.startTime.minutes === timeSlot.startTime.minutes) ||
            (entry.startTime.hours === timeSlot.endTime.hours &&
              entry.startTime.minutes === timeSlot.endTime.minutes) ||
            (entry.endTime.hours === timeSlot.startTime.hours &&
              entry.endTime.minutes === timeSlot.startTime.minutes)
        );

        flag = flag || notFreeAndBackToBack;
      } else {
        // Handle the case where professor or iteration is not found in professorMapping
        console.log(
          `Professor '${prof}' or iteration '${it}' not found in professorMapping.
        `);
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
      {
        section: "A1_CSE",
        day: "MON",
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
      {
        section: "A2_CSE",
        day: "MON",
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 },
      },
      {
        section: "B1_CCE",
        day: "MON",
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
      {
        section: "B2_ECE",
        day: "MON",
        startTime: { hours: 17, minutes: 0 },
        endTime: { hours: 18, minutes: 0 },
      },
    ];

    for (const item of sectionsAndTimeSlots) {
      const { section, day, startTime, endTime } = item;
      console.log(
        `Allocating time slot for ${course._id} in section ${section} on ${day}
      `);

      // Fetch the professors for the course
      const professors = course.professors.map((professor) => professor._id);
      const sharingType = course.sharingType;
      let lectureHall;
      if (section === "A1_CSE" || section === "B2_ECE") {
        lectureHall = "LT16";
      } else if (section === "A2_CSE" || section === "B1_CCE") {
        lectureHall = "LT17";
      } else if (section === "A1_MME") {
        lectureHall = "LT13";
      } else {
        // Default lecture hall if section is not recognized
        lectureHall = "AcademicHallLarge";
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
        sharingType,
      });
      await newTimeTableEntry.save();

      if (!sectionBusyMapping[section]) {
        sectionBusyMapping[section] = {};
      }
      if (!sectionBusyMapping[section][day]) {
        sectionBusyMapping[section][day] = [];
      }
      sectionBusyMapping[section][day].push(
        {
          startTime: startTime,
          endTime: endTime,
          group: course.group
        }
      )
      // Update professorMapping with the allocated time slot
      for (const professorName of professors) {
        if (!professorMapping[professorName]) {
          professorMapping[professorName] = {};
        }
        if (!professorMapping[professorName][day]) {
          professorMapping[professorName][day] = [];
        }
        professorMapping[professorName][day].push({
          startTime: item.startTime,
          endTime: item.endTime,
          sharingType: course.sharingType,
        });
      }
    }
  } catch (error) {
    console.error(
      `Error while allocating time slots for default sections: ${error}
    `);
    throw error;
  }
}

async function allocateTimSlots_II(iterator, i, marker) {
  // section ka matlab yaha hai ki konsi branches ke bacche padh rhe hain
  let section = iterator[i].section;
  const course = iterator[i].course;
  const year = course.year;
  let allotments;

  if (course.courseType === "Program Elective") {
    allotments = [`PE_${course.name}_${year}year_${course.program}`];
  }
  else if (course.courseType === "Other Elective") {
    allotments = [`OE_${course.name}_${year} year`];
  } else {
    allotments = await getAllotments(course);
  }

  let sectionTimeMapping;
  if (course.program === "M.Sc.") {
    const dept_name=await getDepartmentName(course._id);
    if (year === "1st" && dept_name === "PHY") {
      sectionTimeMapping = MSCPHY["A1_PHY"];
    }
    else if (year === "1st" && dept_name === "MTH") {
      sectionTimeMapping = MSCMTH["B1_MTH"];
    }
    else if (year === "2nd" && dept_name === "PHY") {
      sectionTimeMapping = MSCPHY["B1_PHY"];
    }
    else if (year === "2nd" && dept_name === "MTH") {
      sectionTimeMapping = MSCMTH["A1_MTH"];
    }
    else {
      throw new Error("Invalid year specified, ok bhai");
    }
  }
  else {
    if (year === "2nd") {
      sectionTimeMapping = secondyearSectionTimeMapping[section[0]];
    } else if (year === "3rd") {
      sectionTimeMapping = thirdyearSectionTimeMapping[section[0]];
    }
    else if (year === "4th") {
      sectionTimeMapping = fourthyearSectionTimeMapping[section[0]];
    } else {
      throw new Error("Invalid year specified");
    }
  }

  
  const days = ["MON", "TUE"];

  for (const it of days) {
    let existingTimetable;
    if (course.courseType === "Program Elective") {
      existingTimetable = await TimeTable.find({
        section: allotments[0],
        course: course
      })
    }
    else {
      existingTimetable = await TimeTable.find({
        section: section[0],
        course: course
      });
    }


    if (existingTimetable.length > 0) {
      if (i + 1 < iterator.length && marker.value === false) {
        await allocateTimSlots_II(iterator, i + 1, marker);
      } else {
        return;
      } // If timetable exists for this section and course, move to the next section
    }

    console.log(sectionTimeMapping,course.name,course.program);
    const timeSlots = sectionTimeMapping[it];

    for (const slot of timeSlots) {
      const isTimeslotOccupied = isTimeSlotOccupied(section, it, slot, course);

      // If the time slot is occupied, skip to the next time slot
      if (isTimeslotOccupied) {
        continue;
      }

      let a = await allocateTimeSlot(course, section, it, slot, allotments);

      if (a) {
        if (i + 1 === iterator.length) {
          marker.value = true;
        }
        if (i + 1 < iterator.length) {
          await allocateTimSlots_II(iterator, i + 1, marker);
        }
        if (marker.value) {
          return;
        } else {
          await removeTimeSlot(course, section, it, slot, allotments);
          continue;
        }
      } else {
        continue;
      }
    }
  }
  return;
}


function isTimeSlotOccupied(section, day, timeSlot, course) {
  try {
    let isOccupied = false;

    for (const it of section) {
      if (!sectionBusyMapping[it] || !sectionBusyMapping[it][day]) {
        continue; // Skip if section or day is not defined
      }
      const existingEntries = sectionBusyMapping[it][day];
      existingEntries.some((entry) => {
        if (
          isOverlap(entry, timeSlot) &&
          (
            (course.courseType === "Program Elective" && entry.group !== course.group) ||
            (course.courseType !== "Program Elective")
          )
        ) {
          isOccupied = true;
          return true; // Exit the some loop early if an overlap is found
        }
        return false;
      });
      if (isOccupied) {
        break; // Exit the section loop early if an overlap is found
      }
    }
    return isOccupied;
  } catch (error) {
    console.error(`Error while checking if time slot is occupied: ${error}`);
    throw error;
  }
}

function isOverlap(slot1, slot2) {
  return (
    (slot1.startTime.hours < slot2.endTime.hours ||
      (slot1.startTime.hours === slot2.endTime.hours && slot1.startTime.minutes < slot2.endTime.minutes)) &&
    (slot1.endTime.hours > slot2.startTime.hours ||
      (slot1.endTime.hours === slot2.startTime.hours && slot1.endTime.minutes > slot2.startTime.minutes))
  );
}


async function allocateTimeSlot(course, section, day, timeSlot, allotments) {
  try {
    // Determine lecture hall based on section
    let allote;
    let lectureHall;
    if (course.program === "M.Sc") {
      for (const lt of MmeBuilding) {
        const existinglts = await TimeTable.find({ day: day, startTime: timeSlot.startTime, endTime: timeSlot.endTime, lectureHall: lt });
        if (existinglts.length > 0) {
          continue;
        }
        lectureHall = lt;
        break;
      }
    }
    else {
      if (course.courseType === "Program Elective" || course.courseType === "Other Elective") {
        for (const lt of AcademicHallSmall) {
          const existinglts = await TimeTable.find({ day: day, startTime: timeSlot.startTime, endTime: timeSlot.endTime, lectureHall: lt });
          if (existinglts.length > 0) {
            continue;
          }
          lectureHall = lt;
          break;
        }
      }
      else {
        allote = section[0];
        if (allote === "A_CSE") {
          lectureHall = "LT18";
        }
        else if (allote === "B2_ECE") {
          lectureHall = "LT10";
        }
        else if (allote === "B_CSE" || allote === "C_CCE") {
          lectureHall = "LT19";
        } else if (allote === "E_MME") {
          lectureHall = "LT12";
        }
        else if (allote === "A1_CSE" || allote === "B2_ECE") {
          lectureHall = "LT16";
        }
        else if (allote === "A2_CSE" || allote === "B1_CCE") {
          lectureHall = "LT17";
        }
        else if (allote === "A1_MME") {
          lectureHall = "LT13";
        }
        else {
          // Default lecture hall if section is not recognized
          lectureHall = "AcademicHallLarge";
        }
      }
    }



    // Fetch the professors for the course
    console.log(course._id);
    const professors = course.professors.map((professor) => professor._id);
    const equalDivide = professors.length / allotments.length;
    const professorNames = await getProfessorNames(professors);
    const sharing = course.sharingType;
    let clearedProfs = [];

    if (sharing === "Horizontal") {
      const areProfsFree = await checkProfmapping(
        professorNames,
        day,
        timeSlot
      );
      if (!areProfsFree) {
        clearedProfs = professorNames.slice();
      } else {
        return false;
      }
    } else {
      for (let prof of professorNames) {
        const arr = [prof];
        const areProfsFree = await checkProfmapping(arr, day, timeSlot);
        if (!areProfsFree) {
          clearedProfs.push(prof);
        }
        if (clearedProfs.length > equalDivide) {
          break;
        }
      }
      if (clearedProfs.length === 0) {
        return false;
      }
    }
    console.log(
      `Allocating time slot for ${course._id} in section ${section} on ${day} from ${timeSlot.startTime.hours}:${timeSlot.startTime.minutes} to ${timeSlot.endTime.hours}:${timeSlot.endTime.minutes}
    `);

    // Save the new timetable entry
    const profIds = await convertProfessorNamesToIds(clearedProfs);
    let allot;

    if (course.courseType != "Program Elective") {
      allot = section[0];
    }
    else {
      allot = allotments[0];
    }
    const newTimeTableEntry = new TimeTable({
      day: day,
      section: allot,
      course: course._id,
      professors: profIds,
      lectureHall: lectureHall,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
    });
    await newTimeTableEntry.save();


    for (const it of section) {
      if (!sectionBusyMapping[it]) {
        sectionBusyMapping[it] = {};
      }
      if (!sectionBusyMapping[it][day]) {
        sectionBusyMapping[it][day] = [];
      }
      sectionBusyMapping[it][day].push(
        {
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          group: course.group
        }
      )
    }
    console.dir(sectionBusyMapping);
    // Update professor mapping
    for (let professorName of clearedProfs) {
      if (!professorMapping[professorName]) {
        professorMapping[professorName] = {};
      }
      if (!professorMapping[professorName][day]) {
        professorMapping[professorName][day] = [];
      }
      professorMapping[professorName][day].push({
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        sharingType: course.sharingType,
      });
    }
    return true;
  } catch (error) {
    console.error(`Error while allocating time slot: ${error}`);
    throw error;
  }
}

async function removeTimeSlot(course, section, day, timeSlot, allotments) {
  try {
    // Remove the allocated time slot entry from the timetable
    if (course.courseType != "Program Elective") {
      await TimeTable.deleteOne({
        section: section[0],
        course: course._id,
        day: day,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      });
    }
    else {
      await TimeTable.deleteOne({
        section: allotments[0],
        course: course._id,
        day: day,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      });
    }


    for (const it of section) {
      if (
        sectionBusyMapping[it] &&
        sectionBusyMapping[it][day]
      ) {
        const index = sectionBusyMapping[it][day].findIndex(
          (entry) =>
            entry.startTime === timeSlot.startTime &&
            entry.endTime === timeSlot.endTime
        );
        if (index !== -1) {
          sectionBusyMapping[it][day].splice(index, 1);
        }
      }
    };

    // Restore professor mapping to its previous state after backtracking
    const professors = course.professors.map((professor) => professor._id);
    const professorNames = await getProfessorNames(professors);

    for (const professorName of professorNames) {
      if (
        professorMapping[professorName] &&
        professorMapping[professorName][day]
      ) {
        const index = professorMapping[professorName][day].findIndex(
          (entry) =>
            entry.startTime === timeSlot.startTime &&
            entry.endTime === timeSlot.endTime
        );
        if (index !== -1) {
          professorMapping[professorName][day].splice(index, 1);
        }
      }
    }
  } catch (error) {
    console.error(`Error while removing time slot: ${error}`);
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
      console.error(
        `Error fetching professor ID for ${professorName}: ${error}
      `);
      // Handle error
    }
  }

  return professorIds;
}

async function getProfessorNames(professors) {
  // Assuming you have a function to query the database and retrieve professor names based on _id
  const professorNames = await Promise.all(
    professors.map(async (professorId) => {
      const professor = await Professor.findById(professorId);
      return professor.name;
    })
  );
  return professorNames;
}

// Function to fetch professor name from database given professor _id
async function getProfessorName(professorId) {
  // Assuming you have a function to query the database and retrieve professor name based on _id
  const professor = await Professor.findById(professorId);
  return professor.name;
}

async function getAllotments(course) {
  const { CSE, CSE_DD, CCE, ECE, ECE_DD, MME, MScMTH, MScPHY } = course.numberOfStudents;
  console.log(MScMTH, MScPHY);
  let allotments = [];
  if (course.program === "M.Sc.") {
    if (course.year === "1st") {
      if (MScMTH != 0) {
        return allotments = ["B1_MTH"];
      }
      else if (MScPHY != 0) {
        return allotments = ["A1_PHY"];
      }
    }
    else {
      if (MScMTH != 0) {
        return allotments = ["A1_MTH"];
      }
      else if (MScPHY != 0) {
        return allotments = ["B1_PHY"];
      }
    }
  }
  else {
    if (course.year === "2nd") {
      if (CSE !== 0 && CSE_DD !== 0 && CCE !== 0) {
        return (allotments = ["A1_CSE", "A2_CSE", "B1_CCE"]);
      } else if (CSE !== 0 && CSE_DD !== 0 && CCE === 0) {
        return (allotments = ["A1_CSE", "A2_CSE"]);
      } else if (ECE !== 0 && ECE_DD !== 0 && CCE !== 0) {
        return (allotments = ["B1_CCE", "B2_ECE"]);
      } else if (ECE !== 0 && ECE_DD !== 0 && CCE === 0) {
        return (allotments = ["B2_ECE"]);
      } else if (MME !== 0) {
        return (allotments = ["A1_MME"]);
      } else {
        return (allotments = ["A1_CSE", "A2_CSE", "B1_CCE", "B2_ECE"]); // Default allotments
      }
    }
    if (course.year === "3rd") {
      if (CSE !== 0 && CSE_DD !== 0 && CCE !== 0) {
        return (allotments = ["A_CSE", "B_CSE", "C_CCE"]);
      }
      else if (CSE !== 0 && CSE_DD !== 0 && CCE === 0) {
        return (allotments = ["A_CSE", "B_CSE"]);
      }
      else if (ECE !== 0 && ECE_DD !== 0 && CCE !== 0) {
        return (allotments = ["C_CCE", "D_ECE"]);
      }
      else if (ECE !== 0 && ECE_DD !== 0 && CCE === 0) {
        return (allotments = ["D_ECE"]);
      }
      else if (MME !== 0) {
        return (allotments = ["E_MME"]);
      }
    }
    if (course.year === "4th") {
      if (CSE !== 0 && CSE_DD !== 0 && CCE !== 0) {
        return (allotments = ["A4_CSE", "B4_CCE"]);
      }
      else if (CSE !== 0 && CSE_DD !== 0 && CCE === 0) {
        return (allotments = ["A4_CSE"]);
      }
      else if (ECE !== 0 && ECE_DD !== 0 && CCE !== 0) {
        return (allotments = ["B4_CCE", "C4_ECE"]);
      }
      else if (ECE !== 0 && ECE_DD !== 0 && CCE === 0) {
        return (allotments = ["C4_ECE"]);
      }
      else if (MME !== 0) {
        return (allotments = ["D4_MME"]);
      }
    }
  }
}

function yearWiseSection(year, branch) {
  if (year === '2nd' && branch === "CSE") {
    return ["A1_CSE", "A2_CSE"];
  }
  if (year === "2nd" && branch === "CCE") {
    return ["B1_CCE"];
  }
  if (year === "2nd" && branch === "ECE") {
    return ["B2_ECE"];
  }
  if (year === "2nd" && branch === "MME") {
    return ["A1_MME"];
  }
  if (year === "3rd" && branch === "CSE") {
    return ["A_CSE", "B_CSE"];
  }
  if (year === "3rd" && branch === "CCE") {
    return ["C_CCE"];
  }
  if (year === "3rd" && branch === "ECE") {
    return ["D_ECE"];
  }
  if (year === "3rd" && branch === "MME") {
    return ["E_MME"];
  }
  if (year === '4th' && branch === "CSE") {
    return ["A4_CSE"];
  }
  if (year === '4th' && branch === "CCE") {
    return ["B4_CCE"];
  }
  if (year === '4th' && branch === "ECE") {
    return ["C4_CSE"];
  }
  if (year === '4th' && branch === "MME") {
    return ["D4_MME"];
  }
  // if (year === '1st' && branch === "MSCPHY") {
  //   return ["A1_PHY"];
  // }
  // if (year === '1st' && branch === "MSCMTH") {
  //   return ["B1_MTH"];
  // }
  // if (year === '2nd' && branch === "MSCPHY") {
  //   return ["B1_PHY"];
  // }
  // if (year === '2nd' && branch === "MSCMTH") {
  //   return ["A1_MTH"];
  // }
  // else{
  //   return [""];
  // }
}

async function getSectionsForElectives(course) {
  let sections = [];
  const CSE = course.numberOfStudents.CSE;
  const CSE_DD = course.numberOfStudents.CSE_DD;
  const CCE = course.numberOfStudents.CCE;
  const ECE = course.numberOfStudents.ECE;
  const MME = course.numberOfStudents.MME;
  const ECE_DD = course.numberOfStudents.ECE_DD;
  // const MSCPHY = course.numberOfStudents.MSCPHY;
  // const MSCMTH = course.numberOfStudents.MSCMTH;
  const year = course.year;
  if (CSE != 0) {
    const CSE_SEC = yearWiseSection(year, "CSE");
    for (const it of CSE_SEC) {
      sections.push(it);
    }
  }
  if (ECE != 0) {
    const ECE_SEC = yearWiseSection(year, "ECE");
    for (const it of ECE_SEC) {
      sections.push(it);
    }
  }
  if (CCE != 0) {
    const CCE_SEC = yearWiseSection(year, "CCE");
    for (const it of CCE_SEC) {
      sections.push(it);
    }
  }
  if (MME != 0) {
    const MME_SEC = yearWiseSection(year, "MME");
    for (const it of MME_SEC) {
      sections.push(it);
    }
  }
  // if (MSCMTH != 0) {
  //   const MSCMTH_SEC = yearWiseSection(year, "MSCMTH");
  //   for (const it of MSCMTH_SEC) {
  //     sections.push(it);
  //   }
  // }
  // if (MSCPHY != 0) {
  //   const MSCPHY_SEC = yearWiseSection(year, "MSCPHY");
  //   for (const it of MSCPHY_SEC) {
  //     sections.push(it);
  //   }
  // }
  return sections;
}

router.post("/generate-timetable", async (req, res) => {
  try {
    professorMapping = {};
    sectionBusyMapping = {};
    const courses_1stYear = await Course.find({ year: "1st", program: "B.Tech." });
    await allocateCoursesToSections_I(courses_1stYear, firstYearSection);

    const M_III = await Course.findOne({ name: "M-III" });
    if (M_III) {
      await allocateTimeSlotForDefaultSections(M_III);
    } else {
      console.log("M-III course not found.");
    }

    // Fetch 2nd year courses excluding M-III
    const courses_2ndYear_andAhead = await Course.find({
      year: { $ne: "1st" },
      name: { $ne: "M-III" },
      program: "B.Tech.",
    });

    const courses_msc = await Course.find({
      program: "M.Sc."
    });

    // Push the MSC courses into the courses_2ndYear_andAhead array
    courses_2ndYear_andAhead.push(...courses_msc);

    const iterator = [];
    // Loop through each course
    // dp approach
    for (const course of courses_2ndYear_andAhead) {
      if (course.courseType !== "Program Elective") {
        const allotments = await getAllotments(course);
        for (const section of allotments) {
          iterator.push({
            course: course,
            section: [section]
          });
        }
      }
      else {
        let sections = [];
        sections = await getSectionsForElectives(course);
        iterator.push({
          course: course,
          section: sections
        });
      }
    }
    const marker = { value: false };

    await allocateTimSlots_II(iterator, 0, marker);

    res.status(200).json({ message: "Timetable generation completed" });
  }
  catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/timetable", async (req, res) => {
  try {
    // Fetch timetable entries from the database
    const timetableEntries = await TimeTable.find()
      .populate("course")
      .populate("professors");

    // Render the timetable page
    res.render("timetable", { timetableEntries });
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;

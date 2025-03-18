# BTP-Course-Schedule-Management-System
Intelligent Timetable Management System using DFS Backtracking Efficient scheduling of
academic timetables is a critical challenge for educational institutions, as it involves balancing
multiple constraints while ensuring smooth operations. This paper introduces a Timetable
Management System that utilizes the Depth-First Search (DFS) Backtracking algorithm to
generate optimized and conflict-free timetables. Designed for undergraduate and postgraduate
programs across all four years, branches, and streams (excluding Ph.D. programs), this system
addresses key logistical and operational challenges faced by institutions.
The core of the system lies in its DFS Backtracking algorithm, which explores all possible
scheduling configurations while adhering to predefined constraints. These constraints include
avoiding back-to-back classes for both students and teachers, ensuring that faculty have sufficient
breaks between sessions. Furthermore, the system ensures that lecture halls are assigned
in close proximity to facilitate easy and quick commuting for students, reducing fatigue and
maximizing attendance and productivity. By addressing these constraints algorithmically, the
system minimizes manual interventions and scheduling conflicts.
An important feature of this system is its ability to handle communication effectively through
automated mailing capabilities. The system generates email notifications to inform stakeholders—
students, faculty, and administrators—about timetable updates, schedule adjustments,
and other critical information. Additionally, it facilitates the processing of data requests,
enabling users to seamlessly submit and receive important information regarding timetable
changes or conflicts. This integration of communication tools significantly reduces delays and
enhances collaboration across all levels of the institution.
Another significant aspect is the system’s scalability. It can generate timetables for all courses
and programs offered by an institution, except Ph.D. programs, while maintaining flexibility
for future expansions. The system is capable of accommodating unique program requirements,
ensuring an equitable distribution of resources and balancing teaching loads among faculty
members. By implementing these features, the system ensures that operational efficiency is
maximized, benefiting both academic staff and students.
One of the most prominent advantages of this timetable management system is its ability to
prevent conflicts proactively. The DFS Backtracking algorithm guarantees that no overlapping
v
vi
sessions occur for teachers or students, ensuring that classes are scheduled logically and without
clashes. Moreover, the algorithm considers practical constraints such as minimizing transit
time between classes, optimizing room allocations, and preventing overloading of certain time
slots.
In addition to its scheduling capabilities, the system also prioritizes effective communication,
making it a collaborative platform for faculty and students. Automated email notifications
ensure timely dissemination of schedule updates, while its ability to handle data requests provides
a streamlined process for handling queries and adjustments.
This paper demonstrates how algorithmic scheduling, enhanced with communication tools,
can transform the way institutions manage academic timetables. The proposed system not
only automates scheduling but also ensures that it is efficient, conflict-free, and user-centric.
Future enhancements may include the integration of artificial intelligence for predictive conflict
detection, personalized portals for students and faculty, and data

Developers:

Garvit Chittora, Roll Number: 21UCS079, Email: 21ucs079@lnmiit.ac.in

Joshua Joy, Roll Number: 21UCS100, Email: 21ucs100@lnmiit.ac.in

Under the Guidance of

Dr. Saurabh Kumar
The application has been successfully deployed on an AWS EC2 instance and is accessible at:

🔗 http://65.1.201.1/
Deployment Stack:

    EC2 Instance: Hosts the application
    Nginx: Configured as a reverse proxy
    PM2: Manages the Node.js process for improved reliability

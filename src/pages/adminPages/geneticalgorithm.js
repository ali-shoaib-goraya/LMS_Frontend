// Enhanced Genetic Algorithm constants
const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 100;
const MUTATION_RATE = 0.1;
const CROSSOVER_RATE = 0.8;
const ELITISM_COUNT = 5;
const TOURNAMENT_SIZE = 3;

// Main function to generate timetable using genetic algorithm
export function generateWithGeneticAlgorithm({
  departments,
  teachers,
  courses,
  rooms,
  timeslots,
  Semesters
}) {
  console.log(`Starting timetable generation for ${departments.length} departments with ${courses.length} courses`);

  // Ensure we have timeslots for all days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeslotsByDay = {};

  days.forEach(day => {
    timeslotsByDay[day] = timeslots.filter(slot => slot.day === day);
  });

  // Check if we have timeslots for all days, if not, log a warning
  days.forEach(day => {
    if (!timeslotsByDay[day] || timeslotsByDay[day].length === 0) {
      console.warn(`Warning: No timeslots found for ${day}. Please ensure timeslots are defined for all weekdays.`);
    }
  });

  // Initialize data structures for each department and semester
  const coursesByDepartment = {};
  const coursesBySemester = {};

  departments.forEach(dept => {
    coursesByDepartment[dept.id] = courses.filter(course => course.departmentId === dept.id);
    console.log(`Department ${dept.name} has ${coursesByDepartment[dept.id].length} courses`);
  });

  Semesters.forEach(sem => {
    coursesBySemester[sem.id] = courses.filter(course => course.SemestersId === sem.id);
    console.log(`Semester ${sem.name} has ${coursesBySemester[sem.id].length} courses`);
  });

  // Map semesters to years
  const semesterToYear = {};

  Semesters.forEach(sem => {
    // Extract semester number using regex to be more robust
    const semRegex = /Semester\s+(\d+)/i;
    const match = sem.name.match(semRegex);
    let semesterNumber = 1;

    if (match && match[1]) {
      semesterNumber = parseInt(match[1]);
    }

    let year;
    if (semesterNumber <= 2) year = 1;
    else if (semesterNumber <= 4) year = 2;
    else if (semesterNumber <= 6) year = 3;
    else year = 4;

    semesterToYear[sem.id] = year;
    console.log(`Mapped semester ${sem.name} (ID: ${sem.id}) to year ${year}`);
  });

  // Calculate how many sessions each course needs per week (2 sessions per course)
  const sessionsPerCourse = {};
  courses.forEach(course => {
    sessionsPerCourse[course.id] = 2; // Each course has 2 sessions per week
  });

  // Create initial population
  let population = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const randomSchedule = createRandomSchedule(departments, courses, rooms, timeslots, sessionsPerCourse);
    population.push(randomSchedule);

    if (i === 0) {
      console.log(`Initial random schedule has ${randomSchedule.length} entries`);
    }
  }

  // Evolve population
  let bestSchedule = null;
  let bestFitness = -1;

  for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
    // Evaluate fitness
    const fitnessScores = population.map(schedule =>
      calculateFitness(schedule, departments, courses, rooms, timeslots, teachers, days));

    // Find the best schedule in this generation
    const generationBestIndex = fitnessScores.indexOf(Math.max(...fitnessScores));
    const generationBestFitness = fitnessScores[generationBestIndex];

    if (generationBestFitness > bestFitness) {
      bestFitness = generationBestFitness;
      bestSchedule = [...population[generationBestIndex]];
      
      // Log progress periodically
      if (generation % 10 === 0 || generation === MAX_GENERATIONS - 1) {
        console.log(`Generation ${generation}: Best fitness = ${bestFitness}`);
      }
      
      // If we found a perfect solution, stop
      if (bestFitness === 100) {
        console.log(`Perfect solution found at generation ${generation}`);
        break;
      }
    }

    // Selection and breeding
    const newPopulation = [];

    // Elitism: Keep the best schedules
    const elites = [...population]
      .map((schedule, index) => ({ schedule, fitness: fitnessScores[index] }))
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, ELITISM_COUNT)
      .map(item => item.schedule);

    newPopulation.push(...elites);

    // Fill the rest with offspring
    while (newPopulation.length < POPULATION_SIZE) {
      const parent1 = tournamentSelection(population, fitnessScores);
      const parent2 = tournamentSelection(population, fitnessScores);
      
      let offspring;
      
      if (Math.random() < CROSSOVER_RATE) {
        offspring = crossover(parent1, parent2);
      } else {
        offspring = [...parent1]; // Clone parent1 if no crossover
      }
      
      // Mutation
      if (Math.random() < MUTATION_RATE) {
        mutate(offspring, rooms, timeslots, days);
      }
      
      newPopulation.push(offspring);
    }

    population = newPopulation;
  }

  // Verify that we have generated schedules for all departments and semesters
  verifyScheduleCompleteness(bestSchedule, departments, Semesters, courses);

  // Fix any remaining conflicts in the best schedule
  const fixedSchedule = fixConflicts(bestSchedule, timeslots, courses, rooms, days);

  // Convert the fixed schedule to the format expected by the UI
  const formattedSchedule = convertScheduleToUIFormat(fixedSchedule, courses, rooms, timeslots, departments, Semesters, semesterToYear);

  console.log(`Final timetable has ${formattedSchedule.length} entries`);

  // Output counts by department to verify distribution
  const countsByDept = {};
  departments.forEach(dept => {
    countsByDept[dept.name] = formattedSchedule.filter(item => item.departmentId === dept.id).length;
  });
  console.log('Entries by department:', countsByDept);

  return formattedSchedule;
}

// Function to fix any remaining conflicts in the schedule
function fixConflicts(schedule, timeslots, courses, rooms, days) {
  console.log("Fixing any remaining conflicts in the schedule...");
  
  const fixedSchedule = [...schedule]; // Clone the schedule
  const conflictGroups = identifyTimeslotConflicts(fixedSchedule, timeslots);
  
  // Return early if there are no conflicts
  if (Object.keys(conflictGroups).length === 0) {
    console.log("No conflicts to fix");
    return fixedSchedule;
  }
  
  console.log(`Found ${Object.keys(conflictGroups).length} timeslots with conflicts`);
  
  // For each conflict group, resolve conflicts by reassigning timeslots
  Object.keys(conflictGroups).forEach(timeslotId => {
    const conflictingItems = conflictGroups[timeslotId];
    
    // Skip if there's only one item (no conflict)
    if (conflictingItems.length <= 1) return;
    
    // Keep the first item as is, move others to different timeslots
    for (let i = 1; i < conflictingItems.length; i++) {
      const itemIndex = fixedSchedule.indexOf(conflictingItems[i]);
      if (itemIndex === -1) continue; // Skip if item not found (should never happen)
      
      // Find an alternative non-conflicting timeslot
      const alternativeTimeslot = findAlternativeTimeslot(
        fixedSchedule, conflictingItems[i], timeslots, days
      );
      
      if (alternativeTimeslot) {
        // Update the timeslot
        fixedSchedule[itemIndex] = {
          ...fixedSchedule[itemIndex],
          timeslotId: alternativeTimeslot.id
        };
        
        console.log(`Moved course ${conflictingItems[i].courseId} session ${conflictingItems[i].sessionNumber} to ${alternativeTimeslot.day} ${alternativeTimeslot.start}`);
      } else {
        console.warn(`Could not find alternative timeslot for course ${conflictingItems[i].courseId}, session ${conflictingItems[i].sessionNumber}`);
      }
    }
  });
  
  // Check if we have any remaining conflicts
  const remainingConflicts = identifyTimeslotConflicts(fixedSchedule, timeslots);
  if (Object.keys(remainingConflicts).length > 0) {
    console.warn(`${Object.keys(remainingConflicts).length} conflicts remain after fixing`);
  } else {
    console.log("All conflicts successfully resolved");
  }
  
  return fixedSchedule;
}

// Find all timeslot conflicts (multiple sessions in the same timeslot with conflicts)
function identifyTimeslotConflicts(schedule, timeslots) {
  const conflictGroups = {};
  
  // Group schedule items by timeslot
  schedule.forEach(item => {
    if (!conflictGroups[item.timeslotId]) {
      conflictGroups[item.timeslotId] = [];
    }
    conflictGroups[item.timeslotId].push(item);
  });
  
  // Filter out timeslots with no conflicts
  const conflictsOnly = {};
  
  Object.keys(conflictGroups).forEach(timeslotId => {
    const items = conflictGroups[timeslotId];
    
    // Check if there are conflicts in this timeslot
    let hasConflict = false;
    
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        if (
          // Room conflict: Same room
          items[i].roomId === items[j].roomId ||
          // Teacher conflict: Same teacher
          items[i].teacherId === items[j].teacherId ||
          // Student conflict: Same department & semester
          (items[i].departmentId === items[j].departmentId && 
           items[i].semestersId === items[j].semestersId)
        ) {
          hasConflict = true;
          break;
        }
      }
      if (hasConflict) break;
    }
    
    if (hasConflict) {
      conflictsOnly[timeslotId] = items;
    }
  });
  
  return conflictsOnly;
}

// Find an alternative timeslot that doesn't create new conflicts
function findAlternativeTimeslot(schedule, item, timeslots, days) {
  const currentTimeslot = timeslots.find(t => t.id === item.timeslotId);
  if (!currentTimeslot) return null;
  
  // Find other session of the same course to avoid same-day scheduling if possible
  const otherSessions = schedule.filter(
    s => s.courseId === item.courseId && s.sessionNumber !== item.sessionNumber
  );
  
  const otherSessionDays = new Set();
  otherSessions.forEach(session => {
    const sessionTimeslot = timeslots.find(t => t.id === session.timeslotId);
    if (sessionTimeslot) {
      otherSessionDays.add(sessionTimeslot.day);
    }
  });
  
  // Get days that don't already have a session for this course
  const preferredDays = days.filter(day => !otherSessionDays.has(day));
  
  // If we can't find a day without a session, use any day
  const candidateDays = preferredDays.length > 0 ? preferredDays : days;
  
  // Find all valid timeslots (excluding break times)
  const candidateTimeslots = timeslots.filter(slot => 
    candidateDays.includes(slot.day) && 
    !(slot.start === "13:30" && slot.end === "14:00")
  );
  
  // Shuffle timeslots for randomization
  const shuffledTimeslots = [...candidateTimeslots].sort(() => 0.5 - Math.random());
  
  // Try each timeslot until we find one that doesn't create conflicts
  for (const timeslot of shuffledTimeslots) {
    if (timeslot.id === item.timeslotId) continue; // Skip the current timeslot
    
    // Check if using this timeslot would create a new conflict
    const wouldConflict = schedule.some(scheduleItem => {
      // Skip comparing with itself
      if (scheduleItem === item) return false;
      
      // Skip items with different timeslots
      if (scheduleItem.timeslotId !== timeslot.id) return false;
      
      // Check for room conflict
      if (scheduleItem.roomId === item.roomId) return true;
      
      // Check for teacher conflict
      if (scheduleItem.teacherId === item.teacherId) return true;
      
      // Check for student group conflict (same department & semester)
      if (scheduleItem.departmentId === item.departmentId && 
          scheduleItem.semestersId === item.semestersId) return true;
      
      return false;
    });
    
    if (!wouldConflict) {
      return timeslot;
    }
  }
  
  return null; // No suitable alternative found
}

// Function to verify that all departments and semesters are represented in the schedule
function verifyScheduleCompleteness(schedule, departments, semesters, courses) {
  // Check for each department
  departments.forEach(dept => {
    const deptCourses = courses.filter(c => c.departmentId === dept.id);
    const deptScheduleItems = schedule.filter(item => item.departmentId === dept.id);

    if (deptScheduleItems.length === 0) {
      console.warn(`Warning: No schedule items for department ${dept.name} (ID: ${dept.id})`);
    } else {
      console.log(`Department ${dept.name}: ${deptScheduleItems.length} schedule items for ${deptCourses.length} courses`);
    }

    // Check for each semester within department
    const deptSemesters = semesters.filter(s => s.departmentId === dept.id);
    deptSemesters.forEach(sem => {
      const semesterItems = schedule.filter(item => item.semestersId === sem.id);
      const semesterCourses = courses.filter(c => c.SemestersId === sem.id);
      
      if (semesterItems.length === 0) {
        console.warn(`Warning: No schedule items for semester ${sem.name} (ID: ${sem.id})`);
      } else {
        console.log(`  Semester ${sem.name}: ${semesterItems.length} schedule items for ${semesterCourses.length} courses`);
      }
    });
  });

  // Check if each course has exactly 2 sessions
  const courseSessionCounts = {};
  schedule.forEach(item => {
    if (!courseSessionCounts[item.courseId]) {
      courseSessionCounts[item.courseId] = 0;
    }
    courseSessionCounts[item.courseId]++;
  });

  let coursesWithIncorrectSessions = 0;
  courses.forEach(course => {
    const sessionCount = courseSessionCounts[course.id] || 0;
    if (sessionCount !== 2) {
      coursesWithIncorrectSessions++;
      console.warn(`Warning: Course ${course.name} (ID: ${course.id}) has ${sessionCount} sessions (should be 2)`);
    }
  });

  if (coursesWithIncorrectSessions > 0) {
    console.warn(`${coursesWithIncorrectSessions} courses do not have exactly 2 sessions`);
  } else {
    console.log('All courses have exactly 2 sessions. Good!');
  }
}

// Create a random timetable schedule with multiple sessions per course
function createRandomSchedule(departments, courses, rooms, timeslots, sessionsPerCourse) {
  const schedule = [];

  // Group timeslots by day
  const timeslotsByDay = {};
  timeslots.forEach(slot => {
    if (!timeslotsByDay[slot.day]) {
      timeslotsByDay[slot.day] = [];
    }
    timeslotsByDay[slot.day].push(slot);
  });

  // Get all available days
  const availableDays = Object.keys(timeslotsByDay);

  // For each course and each session needed for that course
  courses.forEach(course => {
    const sessionsNeeded = sessionsPerCourse[course.id];

    // Distribute sessions across different days when possible
    const selectedDays = [];

    for (let i = 0; i < sessionsNeeded; i++) {
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      
      // Try to select a different day for each session
      let selectedDay;
      if (selectedDays.length < availableDays.length) {
        // Find days that haven't been used yet for this course
        const unusedDays = availableDays.filter(day => !selectedDays.includes(day));
        selectedDay = unusedDays[Math.floor(Math.random() * unusedDays.length)];
      } else {
        // If all days have been used, just pick a random day
        selectedDay = availableDays[Math.floor(Math.random() * availableDays.length)];
      }
      selectedDays.push(selectedDay);
      
      // Get timeslots for the selected day, filtering out break times
      const dayTimeslots = timeslotsByDay[selectedDay].filter(slot => !(slot.start === "13:30" && slot.end === "14:00"));
      
      if (dayTimeslots.length === 0) {
        console.warn(`No valid timeslots found for day ${selectedDay}`);
        continue;
      }
      
      const randomTimeslot = dayTimeslots[Math.floor(Math.random() * dayTimeslots.length)];
      
      schedule.push({
        courseId: course.id,
        roomId: randomRoom.id,
        timeslotId: randomTimeslot.id,
        departmentId: course.departmentId,
        semestersId: course.SemestersId,
        teacherId: course.teacherId,
        sessionNumber: i + 1, // Track which session this is (1 or 2)
        day: selectedDay // Explicitly store the day to ensure we're tracking it
      });
    }
  });

  return schedule;
}

// Calculate fitness score for a schedule with enhanced constraints
function calculateFitness(schedule, departments, courses, rooms, timeslots, teachers, days) {
  let conflicts = 0;

  // Check for balanced distribution across days of the week
  const courseSessionsByDay = {};
  days.forEach(day => {
    courseSessionsByDay[day] = 0;
  });

  // Count sessions per day
  schedule.forEach(item => {
    const timeslot = timeslots.find(t => t.id === item.timeslotId);
    if (timeslot && timeslot.day) {
      courseSessionsByDay[timeslot.day]++;
    }
  });

  // Calculate standard deviation of sessions per day to check for balance
  const sessionsPerDay = Object.values(courseSessionsByDay);
  const avgSessionsPerDay = sessionsPerDay.reduce((sum, count) => sum + count, 0) / sessionsPerDay.length;
  const variance = sessionsPerDay.reduce((sum, count) => sum + Math.pow(count - avgSessionsPerDay, 2), 0) / sessionsPerDay.length;
  const stdDev = Math.sqrt(variance);

  // Add penalty for unbalanced distribution (higher standard deviation = more unbalanced)
  conflicts += stdDev * 2;

  // Track teacher's daily load
  const teacherDailyLoad = {};
  days.forEach(day => {
    teacherDailyLoad[day] = {};
    teachers.forEach(teacher => {
      teacherDailyLoad[day][teacher.id] = 0;
    });
  });

  // Check each scheduling against others for conflicts
  for (let i = 0; i < schedule.length; i++) {
    const current = schedule[i];
    const currentTimeslot = timeslots.find(t => t.id === current.timeslotId) || {};

    // Increment teacher's daily load
    if (currentTimeslot.day && current.teacherId) {
      if (!teacherDailyLoad[currentTimeslot.day][current.teacherId]) {
        teacherDailyLoad[currentTimeslot.day][current.teacherId] = 0;
      }
      teacherDailyLoad[currentTimeslot.day][current.teacherId]++;
    }

    // Check if this scheduling conflicts with any other scheduling
    for (let j = i + 1; j < schedule.length; j++) {
      const other = schedule[j];
      
      // Same timeslot conflicts
      if (current.timeslotId === other.timeslotId) {
        // Room conflict: Same room at same time
        if (current.roomId === other.roomId) {
          conflicts += 5; // Increased penalty for this serious conflict
        }
        
        // Teacher conflict: Same teacher at same time
        if (current.teacherId === other.teacherId) {
          conflicts += 5; // Increased penalty for this serious conflict
        }
        
        // Student conflict: Same department & semester at same time
        if (current.departmentId === other.departmentId && 
            current.semestersId === other.semestersId) {
          conflicts += 5; // Increased penalty for this serious conflict
        }
      }
    }

    // Check if course is scheduled during break time
    if (currentTimeslot.start === "13:30" && currentTimeslot.end === "14:00") {
      conflicts += 2;
    }

    // Check if the same course has sessions on the same day
    const thisCourse = courses.find(c => c.id === current.courseId);
    for (let j = 0; j < schedule.length; j++) {
      if (i !== j && schedule[j].courseId === current.courseId) {
        const thisTimeslot = timeslots.find(t => t.id === current.timeslotId);
        const otherTimeslot = timeslots.find(t => t.id === schedule[j].timeslotId);
        
        if (thisTimeslot && otherTimeslot && thisTimeslot.day === otherTimeslot.day) {
          conflicts += 2; // Strongly prefer to spread course sessions across different days
        }
      }
    }
  }

  // Add penalty if a teacher has more than 3 classes in a day (teacher overloading)
  Object.keys(teacherDailyLoad).forEach(day => {
    Object.keys(teacherDailyLoad[day]).forEach(teacherId => {
      const load = teacherDailyLoad[day][teacherId];
      if (load > 3) {
        conflicts += (load - 3); // Add penalty for each class over the limit of 3
      }
    });
  });

  // Calculate fitness (inversely proportional to conflicts)
  // Maximum fitness is 100
  return Math.max(0, 100 - conflicts * 2);
}

// Tournament selection
function tournamentSelection(population, fitnessScores) {
  // Select 3 random individuals and choose the best
  const tournamentIndices = [];

  for (let i = 0; i < TOURNAMENT_SIZE; i++) {
    tournamentIndices.push(Math.floor(Math.random() * population.length));
  }

  let bestIndex = tournamentIndices[0];

  for (let i = 1; i < TOURNAMENT_SIZE; i++) {
    if (fitnessScores[tournamentIndices[i]] > fitnessScores[bestIndex]) {
      bestIndex = tournamentIndices[i];
    }
  }

  return [...population[bestIndex]]; // Return a clone
}

// Crossover two parents to create offspring
function crossover(parent1, parent2) {
  // Single point crossover
  const crossoverPoint = Math.floor(Math.random() * parent1.length);

  return [
    ...parent1.slice(0, crossoverPoint),
    ...parent2.slice(crossoverPoint)
  ];
}

// Mutate a schedule
function mutate(schedule, rooms, timeslots, days) {
  // Randomly select an item to mutate
  const indexToMutate = Math.floor(Math.random() * schedule.length);

  // Decide what to mutate: room, timeslot, or day (33/33/33 chance)
  const mutationType = Math.random();

  if (mutationType < 0.33) {
    // Mutate room
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    schedule[indexToMutate].roomId = randomRoom.id;
  } else if (mutationType < 0.66) {
    // Mutate timeslot but keep the same day
    const currentTimeslot = timeslots.find(t => t.id === schedule[indexToMutate].timeslotId);
    const currentDay = currentTimeslot ? currentTimeslot.day : days[0];

    const dayTimeslots = timeslots
      .filter(slot => slot.day === currentDay && !(slot.start === "13:30" && slot.end === "14:00"));

    if (dayTimeslots.length > 0) {
      const randomTimeslot = dayTimeslots[Math.floor(Math.random() * dayTimeslots.length)];
      schedule[indexToMutate].timeslotId = randomTimeslot.id;
    }
  } else {
    // Mutate to a different day
    const currentTimeslot = timeslots.find(t => t.id === schedule[indexToMutate].timeslotId);
    const currentDay = currentTimeslot ? currentTimeslot.day : days[0];

    // Get available days excluding current day
    const availableDays = days.filter(day => day !== currentDay);

    if (availableDays.length > 0) {
      const newDay = availableDays[Math.floor(Math.random() * availableDays.length)];
      
      // Find timeslots for the new day (excluding break slots)
      const newDayTimeslots = timeslots
        .filter(slot => slot.day === newDay && !(slot.start === "13:30" && slot.end === "14:00"));
      
      if (newDayTimeslots.length > 0) {
        const randomTimeslot = newDayTimeslots[Math.floor(Math.random() * newDayTimeslots.length)];
        schedule[indexToMutate].timeslotId = randomTimeslot.id;
      }
    }
  }
}

// Convert internal schedule to UI display format
function convertScheduleToUIFormat(schedule, courses, rooms, timeslots, departments, Semesters, semesterToYear) {
  const result = schedule.map(item => {
    const course = courses.find(c => c.id === item.courseId) || {};
    const room = rooms.find(r => r.id === item.roomId) || {};
    const timeslot = timeslots.find(t => t.id === item.timeslotId) || {};
    const department = departments.find(d => d.id === item.departmentId) || {};
    const semester = Semesters.find(s => s.id === item.semestersId) || {};
    const year = semesterToYear[item.semestersId] || 1;

    return {
      id: `${item.courseId}-${item.sessionNumber}-${timeslot.day}-${timeslot.start}`,
      day: timeslot.day,
      startTime: timeslot.start,
      endTime: timeslot.end,
      courseName: course.name || "Unknown Course",
      courseId: course.id,
      roomName: room.name || "Unknown Room",
      roomId: room.id,
      departmentId: item.departmentId,
      departmentName: department.shortName || department.name || "Unknown Dept",
      semesterId: item.semestersId,
      semesterName: semester.name || "Unknown Semester",
      year: year,
      teacherId: item.teacherId,
      sessionNumber: item.sessionNumber,
      // Add these fields to enable better filtering
      semesterNumber: getSemesterNumber(semester.name),
      shortDeptName: department.shortName || department.name || "Unknown"
    };
  });

  return result;
}

// Helper function to extract semester number from semester name
function getSemesterNumber(semesterName) {
  if (!semesterName) return 1;

  const match = semesterName.match(/Semester\s+(\d+)/i);
  return match && match[1] ? parseInt(match[1]) : 1;
}

// Add a function to help display the timetable properly
export function formatTimetableForDisplay(timetableData) {
  // Group by day
  const byDay = {};
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Initialize each day with an empty array
  days.forEach(day => {
    byDay[day] = [];
  });

  // Populate days with timetable data
  timetableData.forEach(item => {
    if (byDay[item.day]) {
      byDay[item.day].push(item);
    }
  });

  // Group by department and semester for better organization
  const byDepartment = {};
  timetableData.forEach(item => {
    const deptKey = `${item.departmentName}`;
    const semKey = `${item.departmentName}-Semester${item.semesterNumber}`;

    if (!byDepartment[deptKey]) {
      byDepartment[deptKey] = {
        name: item.departmentName,
        semesters: {}
      };
    }

    if (!byDepartment[deptKey].semesters[semKey]) {
      byDepartment[deptKey].semesters[semKey] = {
        name: item.semesterName,
        classes: []
      };
    }

    byDepartment[deptKey].semesters[semKey].classes.push(item);
  });

  // Check if we have classes for all days
  days.forEach(day => {
    if (byDay[day].length === 0) {
      console.warn(`Warning: No classes scheduled for ${day}.`);
    }
  });

  return {
    byDay,
    byDepartment,
    days  // Include days array for consistent ordering
  };
}
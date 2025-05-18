const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 100;
const MUTATION_RATE = 0.1;
const CROSSOVER_RATE = 0.8;
const ELITISM_COUNT = 5;

// Main function to generate timetable using genetic algorithm
export function generateWithGeneticAlgorithm({
  departments,
  teachers,
  courses,
  rooms,
  timeslots,
  Semesters
}) {
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

  // Initialize data structures
  const coursesByDepartment = {};
  departments.forEach(dept => {
    coursesByDepartment[dept.id] = courses.filter(course => course.departmentId === dept.id);
  });

  // Map semesters to years
  const semesterToYear = {};
  departments.forEach(dept => {
    // For each department, map semesters 1-2 to year 1, 3-4 to year 2, 5-6 to year 3, 7-8 to year 4
    Semesters.filter(sem => sem.departmentId === dept.id).forEach(sem => {
      const semesterNumber = parseInt(sem.name.split("Semester ")[1]);
      let year;
      if (semesterNumber <= 2) year = 1;
      else if (semesterNumber <= 4) year = 2;
      else if (semesterNumber <= 6) year = 3;
      else year = 4;
      semesterToYear[sem.id] = year;
    });
  });

  // Calculate how many sessions each course needs per week (2 sessions per course)
  const sessionsPerCourse = {};
  courses.forEach(course => {
    sessionsPerCourse[course.id] = 2; // Each course has 2 sessions per week
  });

  // Create initial population
  let population = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    population.push(createRandomSchedule(departments, courses, rooms, timeslots, sessionsPerCourse));
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
    
    if (fitnessScores[generationBestIndex] > bestFitness) {
      bestFitness = fitnessScores[generationBestIndex];
      bestSchedule = [...population[generationBestIndex]];
      
      // If we found a perfect solution, stop
      if (bestFitness === 100) {
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

  // Convert the best schedule to the format expected by the UI
  // Ensure we're including all days of the week, not just Monday
  return convertScheduleToUIFormat(bestSchedule, courses, rooms, timeslots, departments, Semesters, semesterToYear);
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
      const dayTimeslots = timeslotsByDay[selectedDay].filter(slot => slot.id % 6 !== 4);
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

// Calculate fitness score for a schedule
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
  
  // Check each scheduling against others for conflicts
  for (let i = 0; i < schedule.length; i++) {
    const current = schedule[i];
    
    // Check if this scheduling conflicts with any other scheduling
    for (let j = i + 1; j < schedule.length; j++) {
      const other = schedule[j];
      
      // Same timeslot conflicts
      if (current.timeslotId === other.timeslotId) {
        // Room conflict: Same room at same time
        if (current.roomId === other.roomId) {
          conflicts++;
        }
        
        // Teacher conflict: Same teacher at same time
        if (current.teacherId === other.teacherId) {
          conflicts++;
        }
        
        // Student conflict: Same department & semester at same time
        if (current.departmentId === other.departmentId && 
            current.semestersId === other.semestersId) {
          conflicts++;
        }
      }
    }
    
    // Check if course is scheduled during break time (slot id 4, 10, 16, 22, 28)
    const timeslot = timeslots.find(t => t.id === current.timeslotId);
    if (timeslot && timeslot.id % 6 === 4) {
      conflicts++;
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
  
  // Calculate fitness (inversely proportional to conflicts)
  // Maximum fitness is 100
  return Math.max(0, 100 - conflicts * 2);
}

// Tournament selection
function tournamentSelection(population, fitnessScores) {
  // Select 3 random individuals and choose the best
  const tournamentSize = 3;
  const tournamentIndices = [];
  
  for (let i = 0; i < tournamentSize; i++) {
    tournamentIndices.push(Math.floor(Math.random() * population.length));
  }
  
  let bestIndex = tournamentIndices[0];
  
  for (let i = 1; i < tournamentSize; i++) {
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
    // Mutate timeslot (excluding break slot), but keep the same day
    const currentTimeslot = timeslots.find(t => t.id === schedule[indexToMutate].timeslotId);
    const currentDay = currentTimeslot ? currentTimeslot.day : days[0];
    
    const dayTimeslots = timeslots
      .filter(slot => slot.day === currentDay && slot.id % 6 !== 4);
    
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
        .filter(slot => slot.day === newDay && slot.id % 6 !== 4);
      
      if (newDayTimeslots.length > 0) {
        const randomTimeslot = newDayTimeslots[Math.floor(Math.random() * newDayTimeslots.length)];
        schedule[indexToMutate].timeslotId = randomTimeslot.id;
      }
    }
  }
}

// Convert internal schedule to UI display format
function convertScheduleToUIFormat(schedule, courses, rooms, timeslots, departments, Semesters, semesterToYear) {
  // Make sure we're including classes for all days of the week
  return schedule.map(item => {
    const course = courses.find(c => c.id === item.courseId) || {};
    const room = rooms.find(r => r.id === item.roomId) || {};
    const timeslot = timeslots.find(t => t.id === item.timeslotId) || {};
    const department = departments.find(d => d.id === item.departmentId) || {};
    const semester = Semesters.find(s => s.id === item.semestersId) || {};
    const year = semesterToYear[item.semestersId] || 1;
    
    return {
      day: timeslot.day, // Important: Include the day field to ensure we're covering all days
      startTime: timeslot.start,
      courseName: course.name || "Unknown Course",
      roomName: room.name || "Unknown Room",
      departmentId: item.departmentId,
      departmentName: department.shortName || department.name || "Unknown Dept",
      semesterId: item.semestersId,
      semesterName: semester.name || "Unknown Semester",
      year: year,
      sessionNumber: item.sessionNumber
    };
  });
}

// Add a function to help display the timetable properly (without a legend)
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
  
  // Check if we have classes for all days, if not, log a warning
  days.forEach(day => {
    if (byDay[day].length === 0) {
      console.warn(`Warning: No classes scheduled for ${day}.`);
    }
  });
  
  return { 
    byDay,
    // No legend or additional metadata included here
  };
}
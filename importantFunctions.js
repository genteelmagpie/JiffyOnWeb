const fs = require('fs');

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }
  

  
function calculateTimeDifferenceInSeconds(startingTime, endTime) {
    const startTimeObject = new Date(startingTime);
    const endTimeObject = new Date(endTime);
  
    // Check if endTime is greater than startTime
    if (endTimeObject > startTimeObject) {
      const timeDifference = (endTimeObject - startTimeObject) / 1000; // Convert to seconds
      return timeDifference;
    } else {
      return false;
    }
}


function findCategory(subjectName, filePath) {
    // Read JSON data from the specified file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const subjects = jsonData.subjects;
    const projects = jsonData.projects;

    for (const project in projects) {
        if (projects[project].includes(subjectName)) {
        return {
            subject: Object.keys(subjects).find(key => subjects[key].includes(subjectName)),
            project: project,
        };
        }
    }

    // If the subjectName is not found in any project, return "Not found" or handle as needed
    return {
        subject: "Not found",
        project: "Not found",
    };
}


module.exports = {
  formatDateTime,
  calculateTimeDifferenceInSeconds,
  findCategory,
};

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

    // Convert the subjectName to lowercase for case-insensitive comparison
    subjectName = subjectName.toLowerCase();

    // Initialize response
    let response = {
        subjectCatg: "Not found",
        project: "Not found",
    };

    // Check if the subjectName exists in subjects
    for (const subjectCategory in subjects) {
        const subjectNames = subjects[subjectCategory].split(', ').map(name => name.toLowerCase());

        if (subjectNames.includes(subjectName)) {
            response.subjectCatg = subjectCategory;
            break;
        }
    }

    // Check if the subjectName exists in projects
    for (const project in projects) {
        const projectNames = projects[project].split(', ').map(name => name.toLowerCase());

        if (projectNames.includes(subjectName)) {
            response.project = project;
            break;
        }
    }

    return response;
}



module.exports = {
  formatDateTime,
  calculateTimeDifferenceInSeconds,
  findCategory,
};


function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

// const inputString = "hello world";
// const titleCaseString = toTitleCase(inputString);
// console.log(titleCaseString); // "Hello World"


// const ob = {
//     subjectName: 'matheMatics indica BritNNIa',
//     startingTime: '2011-11-11T11:11',
//     endTime: '2012-12-12T12:12'
//   }

// filePath = "D:\\GM\\Coding\\PythonProjects\\Jiffy\\assets\\subjects\\sub.json"
// // let a = findCategory(ob.subjectName, filePath)
// console.log(toTitleCase(ob.subjectName))
// console.log(a);

// console.log(typeof(calculateTimeDifferenceInSeconds(ob.startingTime, ob.endTime)));

let a = 1;
console.log(typeof(a));
if (!a){
    console.log(" It is undefined.")
}else{
    console.log(" THis is something else.")
}
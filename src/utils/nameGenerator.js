// Character name data
import prefixData from '../data/characterNames/prefix.json';
import titlePrefixData from '../data/characterNames/titlePrefix.json';
import titleData from '../data/characterNames/title.json';
import suffixData from '../data/characterNames/suffix.json';
import elementData from '../data/characterNames/element.json';
import givenNameData from '../data/characterNames/givenName.json';
import gendersData from '../data/characterNames/genders.json';

// Position name data
import positionData from '../data/positionNames/position.json';
import seniorityData from '../data/positionNames/seniority.json';

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getFilteredElement(array, gender) {
  let tempArray = JSON.parse(JSON.stringify(array));

  if (gender.text === "male") {
    tempArray = tempArray.filter((element) => element.gender !== "female");
  } else {
    tempArray = tempArray.filter((element) => element.gender !== "male");
  }

  return getRandomElement(tempArray);
}

// Character name generation
function buildFullCharacterName(prefix, title, element, givenName) {
  const fullNamesArray = [
    `${prefix.text} ${givenName.text}, ${title.text} of ${element.text}`,
    `${title.text} of ${element.text}, ${givenName.text}`,
    `${title.text} of ${element.text}`,
    `${givenName.text}, the ${element.text} ${title.text}`,
  ];

  return getRandomElement(fullNamesArray);
}

export function generateCharacterName() {
  const gender = getRandomElement(gendersData);
  const prefix = getFilteredElement(prefixData, gender);

  let title = getFilteredElement(titleData, gender);
  const titlePrefix = getFilteredElement(titlePrefixData, gender);
  title.text = `${titlePrefix.text}${title.text}`;

  const titleSuffix = getFilteredElement(suffixData, gender);
  title.text = `${title.text}${titleSuffix.text}`;

  const element = getFilteredElement(elementData, gender);
  const givenName = getFilteredElement(givenNameData, gender);

  return buildFullCharacterName(prefix, title, element, givenName).trim();
}

// Position name generation
function buildFullPosition(position, seniority, number) {
  let string = `${position.text}`;

  if (seniority.text) {
    string = `${seniority.text} ${position.text}`;
  }

  if (number.text) {
    string += ` ${number.text}`;
  }

  return string;
}

function getPositionNumber() {
  return { text: Math.floor(Math.random() * 100) };
}

export function generatePositionName() {
  const position = getRandomElement(positionData);
  const seniority = getRandomElement(seniorityData);
  const number = getPositionNumber();

  return buildFullPosition(position, seniority, number).trim();
}

// Generate a random person name for the position
export function generatePersonName() {
  const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
    "William", "Barbara", "David", "Elizabeth", "Richard", "Susan", "Joseph", "Jessica",
    "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Nancy", "Daniel", "Lisa",
    "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
    "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
    "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young"
  ];

  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);

  return `${firstName} ${lastName}`;
}

// Generate a credits entry - randomly picks between character or position
export function generateCreditsEntry() {
  // Randomly choose between character (50%) or position (50%)
  const isCharacter = Math.random() < 0.5;

  if (isCharacter) {
    return {
      actorName: generatePersonName(),
      characterName: generateCharacterName(),
      type: 'character'
    };
  } else {
    return {
      name: generatePersonName(),
      role: generatePositionName(),
      type: 'position'
    };
  }
}

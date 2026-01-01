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
    string += ` #${number.text}`;
  }

  return string;
}

function getPositionNumber() {
  // Only 5% chance of having a number
  if (Math.random() < 0.05) {
    return { text: Math.floor(Math.random() * 100) };
  }
  return { text: '' };
}

export function generatePositionName() {
  const position = getRandomElement(positionData);
  const seniority = getRandomElement(seniorityData);
  const number = getPositionNumber();

  return buildFullPosition(position, seniority, number).trim();
}

// Generate a random person name for the position
export function generatePersonName() {
  const maleFirstNames = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Christopher",
    "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Andrew", "Joshua", "Kevin",
    "Brian", "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary",
    "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel",
    "Raymond", "Gregory", "Frank", "Alexander", "Patrick", "Jack", "Dennis", "Jerry", "Tyler", "Aaron",
    "Jose", "Adam", "Nathan", "Henry", "Douglas", "Zachary", "Peter", "Kyle", "Noah", "Ethan",
    "Jeremy", "Walter", "Christian", "Keith", "Roger", "Terry", "Austin", "Sean", "Gerald", "Carl",
    "Harold", "Dylan", "Arthur", "Lawrence", "Jordan", "Jesse", "Bryan", "Billy", "Bruce", "Gabriel",
    "Logan", "Albert", "Willie", "Alan", "Juan", "Wayne", "Elijah", "Randy", "Roy", "Vincent",
    "Ralph", "Eugene", "Russell", "Bobby", "Mason", "Philip", "Louis", "Liam", "Oliver", "Lucas",
    "Aiden", "Elijah", "Grayson", "Jackson", "Sebastian", "Mateo", "Carter", "Wyatt", "Luke", "Jayden",
    "Levi", "Isaac", "Owen", "Henry", "Lincoln", "Leo", "Hunter", "Julian", "Hudson", "Asher",
    "Connor", "Eli", "Ezra", "Aaron", "Landon", "Adrian", "Jonathan", "Nolan", "Jeremiah", "Easton",
    "Elias", "Colton", "Cameron", "Carson", "Robert", "Angel", "Maverick", "Nicholas", "Dominic", "Jaxon",
    "Greyson", "Adam", "Ian", "Austin", "Santiago", "Jordan", "Cooper", "Brayden", "Roman", "Evan"
  ];

  const femaleFirstNames = [
    "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen",
    "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle",
    "Carol", "Amanda", "Dorothy", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia",
    "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen",
    "Samantha", "Katherine", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather",
    "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren", "Christina",
    "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah", "Jacqueline", "Martha", "Gloria",
    "Teresa", "Ann", "Sara", "Madison", "Frances", "Kathryn", "Janice", "Jean", "Abigail", "Sophia",
    "Judy", "Brittany", "Alice", "Rose", "Denise", "Beverly", "Danielle", "Theresa", "Sophia", "Marie",
    "Diana", "Brittany", "Natalie", "Isabella", "Charlotte", "Amelia", "Ava", "Sophia", "Mia", "Harper",
    "Evelyn", "Abigail", "Emily", "Ella", "Scarlett", "Grace", "Chloe", "Victoria", "Riley", "Aria",
    "Lily", "Aubrey", "Zoey", "Penelope", "Lillian", "Addison", "Layla", "Natalie", "Camila", "Hannah",
    "Brooklyn", "Zoe", "Nora", "Leah", "Savannah", "Audrey", "Claire", "Eleanor", "Skylar", "Ellie",
    "Samantha", "Stella", "Paisley", "Violet", "Mila", "Allison", "Alexa", "Anna", "Hazel", "Aaliyah",
    "Ariana", "Lucy", "Caroline", "Sarah", "Genesis", "Kennedy", "Sadie", "Gabriella", "Madelyn", "Adeline"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez",
    "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes",
    "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham",
    "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson",
    "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens",
    "Harrison", "Fernandez", "McDonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen",
    "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter",
    "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Mason", "Dixon", "Munoz", "Hunt", "Hicks",
    "Holmes", "Palmer", "Wagner", "Black", "Robertson", "Boyd", "Rose", "Stone", "Salazar", "Fox",
    "Warren", "Mills", "Meyer", "Rice", "Schmidt", "Garza", "Daniels", "Ferguson", "Nichols", "Stephens",
    "Soto", "Weaver", "Ryan", "Gardner", "Payne", "Grant", "Dunn", "Kelley", "Spencer", "Hawkins",
    "Arnold", "Pierce", "Vazquez", "Hansen", "Peters", "Santos", "Hart", "Bradley", "Knight", "Elliott",
    "Cunningham", "Duncan", "Armstrong", "Hudson", "Carroll", "Lane", "Riley", "Andrews", "Alvarado", "Ray",
    "Delgado", "Berry", "Perkins", "Hoffman", "Johnston", "Matthews", "Pena", "Richards", "Contreras", "Willis"
  ];

  // Randomly pick gender
  const useFemale = Math.random() < 0.5;
  const firstName = getRandomElement(useFemale ? femaleFirstNames : maleFirstNames);
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

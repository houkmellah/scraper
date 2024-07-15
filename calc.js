const listNumericOfElements = {
  fire: [1, 3, 9],
  earth: [4, 2, 8],
  air: [5, 6, 11],
  water: [2, 7, 22],
};

const calcPathOfLife = (birthDate) => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = sommeDesChiffresEtConditions(birthDate.getFullYear());
  const sumLastElements = day + month + year[1];
  const table = sommeDesChiffresEtConditions(sumLastElements);
  return table;
};

function sommeDesChiffresEtConditions(initiale) {
  let liste = [initiale];
  let somme = initiale;

  while (true) {
    let sommeStr = somme.toString();
    somme = 0;
    if (sommeStr.length === 1) {
      return liste;
    }
    for (let i = 0; i < sommeStr.length; i++) {
      somme += parseInt(sommeStr[i], 10);
    }
    liste.push(somme);
    if (somme < 10 || somme === 11 || somme === 22) {
      break;
    }
  }
  return liste;
}

const getElementColor = (elementName) => {
  const colors = {
    fire: "#ff5722",
    earth: "#795548",
    air: "#03a9f4",
    water: "#009688",
  };
  return colors[elementName] || "#grey";
};

const calcNumericValueGivenNameAndName = (
  name,
  givenName,
  listNumericValue
) => {
  const calcNumericValueOfName = calNumericValueOfString(
    name,
    listNumericValue
  );
  const calcNumericValueOfGivenName = calNumericValueOfString(
    givenName,
    listNumericValue
  );
  const table = [
    calcNumericValueOfName[0] + calcNumericValueOfGivenName[0],
    (calcNumericValueOfName.length > 1 ? calcNumericValueOfName[1] : 0) +
      (calcNumericValueOfGivenName.length > 1
        ? calcNumericValueOfGivenName[1]
        : 0),
  ];

  const valueTest = sommeDesChiffresEtConditions(table[1]);
  if (valueTest.length > 1 && valueTest[0] !== 11 && valueTest[0] !== 22) {
    table.push(valueTest[1]);
  }
  return table;
};

const calcElements = (table) => {
  const elementsCount = {
    fire: [],
    earth: [],
    air: [],
    water: [],
  };

  table.forEach((number) => {
    for (const element in listNumericOfElements) {
      if (listNumericOfElements[element].includes(Number(number))) {
        elementsCount[element].push(number);
      }
    }
  });

  return elementsCount;
};

const calNumericValueOfString = (string, listNumericValue) => {
  string = string.toLowerCase();
  let somme = 0;
  for (let lettre of string) {
    if (listNumericValue.hasOwnProperty(lettre)) {
      somme += listNumericValue[lettre];
    }
  }
  const list = sommeDesChiffresEtConditions(somme);
  return list;
};

const temperamentEtNatureOriginal = {
  mental: {
    cardinal: ["a"],
    mutable: ["h", "j", "n", "p"],
    fixe: ["g", "l"],
  },
  physique: {
    cardinal: ["e"],
    mutable: ["w"],
    fixe: ["d", "m"],
  },
  emotif: {
    cardinal: ["o", "r", "i", "z"],
    mutable: ["b", "s", "t", "x"],
  },
  intuitif: {
    cardinal: ["k"],
    mutable: ["f", "q", "u", "y"],
    fixe: ["c", "v"],
  },
};

function calculerTemperamentEtNature(input) {
  let resultat = {
    mental: { cardinal: 0, mutable: 0, fixe: 0 },
    physique: { cardinal: 0, mutable: 0, fixe: 0 },
    emotif: { cardinal: 0, mutable: 0, fixe: 0 },
    intuitif: { cardinal: 0, mutable: 0, fixe: 0 },
  };

  Object.keys(temperamentEtNatureOriginal).forEach((categorie) => {
    Object.keys(temperamentEtNatureOriginal[categorie]).forEach((type) => {
      temperamentEtNatureOriginal[categorie][type].forEach((lettre) => {
        const count = (input.match(new RegExp(lettre, "g")) || []).length;
        resultat[categorie][type] += count;
      });
    });
  });

  Object.keys(resultat).forEach((categorie) => {
    Object.keys(resultat[categorie]).forEach((type) => {
      if (resultat[categorie][type] === 0 && type === "fixe") {
        delete resultat[categorie][type];
      }
    });
  });

  return resultat;
}

function transformerEnTemperament(transformer) {
  let transformedTemperament = [];
  for (const [nom, valeurs] of Object.entries(transformer)) {
    let total = 0;
    Object.values(valeurs).forEach((val) => (total += val));
    transformedTemperament.push({ name: nom, count: total });
  }
  return transformedTemperament;
}

function findElementByNumber(number) {
  for (const [element, numbers] of Object.entries(listNumericOfElements)) {
    if (numbers.includes(number) || numbers.includes(Number(number))) {
      return element;
    }
  }
  return "Element not found";
}

function comparerElements(str1, str2) {
  if (str1 === str2) {
    return "similaires";
  }
  const semblables = new Set([
    "water&earth",
    "earth&water",
    "fire&air",
    "air&fire",
  ]);
  if (semblables.has(str1 + "&" + str2)) {
    return "semblables";
  }
  return "opposés";
}

const numericValueOfLetters = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8,
};

const numericValueOfVoyellesLettres = {
  a: 1,
  e: 5,
  i: 9,
  o: 6,
  u: 3,
  y: 7,
};

const numericValueOfConsonnesLettres = {
  b: 2,
  c: 3,
  d: 4,
  f: 6,
  g: 7,
  h: 8,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  v: 4,
  w: 5,
  x: 6,
  z: 8,
};

function selectLastElement(arr) {
  return arr[arr.length - 1];
}

const calc = (givenName, birthDate, name) => {
  const fullName = name + givenName;
  const getDayOfBirth = birthDate.getDate();
  const calcGetDayOfBirth = sommeDesChiffresEtConditions(getDayOfBirth);
  const calcNumericValueOfName = calNumericValueOfString(
    name,
    numericValueOfLetters
  );
  const calcNumericValueOfGivenName = calNumericValueOfString(
    givenName,
    numericValueOfLetters
  );
  const calcIdealNumber = calcNumericValueGivenNameAndName(
    name,
    givenName,
    numericValueOfVoyellesLettres
  );
  const calclRealisatioOfName = calcNumericValueGivenNameAndName(
    name,
    givenName,
    numericValueOfConsonnesLettres
  );
  const sumValueOfExpression =
    calcNumericValueOfName[0] + calcNumericValueOfGivenName[0];
  const calcValueOfExpression =
    sommeDesChiffresEtConditions(sumValueOfExpression);
  const calcValuePathOfLife = calcPathOfLife(birthDate);
  const allNumberTable = [
    selectLastElement(calcValuePathOfLife),
    selectLastElement(calcValueOfExpression),
    selectLastElement(calcIdealNumber),
    selectLastElement(calclRealisatioOfName),
    selectLastElement(calcGetDayOfBirth),
    selectLastElement(calcNumericValueOfName),
    selectLastElement(calcNumericValueOfGivenName),
  ];

  const calcElement = calcElements(allNumberTable);
  const calcTemperamentEtNature = calculerTemperamentEtNature(fullName);
  const temperamentTransformed = transformerEnTemperament(
    calcTemperamentEtNature
  );

  const values = {
    givenName: givenName,
    dayOfBirth: calcGetDayOfBirth,
    numericValueOfName: calcNumericValueOfName,
    numericValueOfGivenName: calcNumericValueOfGivenName,
    sumValueOfExpression: calcValueOfExpression,
    idealValue: calcIdealNumber,
    realisationValue: calclRealisatioOfName,
    pathOfLife: calcValuePathOfLife,
    allNumberTable: allNumberTable,
    calcTemperamentEtNature: temperamentTransformed,
    elements: calcElement,
  };

  const transformedData = Object.keys(values.elements).map((element) => ({
    name: element,
    count: values.elements[element].length,
  }));

  return { ...values, transformedElements: transformedData };
};

module.exports = { calc };

/*creating animal general class for different animals rather than creating individual animal class as the classes have same features */
export default class Animal {
  static animalMap = new Map();

  constructor(key, value) {
    Object.assign(this, value);
    if (!Animal.animalMap.has(key)) {
      Animal.animalMap.set(key, []);
    }
    try {
      Animal.animalMap.get(key).forEach((animal) => {
        if (animal.name === value.name) {
          throw new Error(`${value.name} already present`);
        }
      });
      Animal.animalMap.get(key).push(value);
    } catch (error) {
      console.error(error.message);
    }
  }

  static deleteAnimal(key, index) {
    const animals = Animal.animalMap.get(key);
    animals.splice(index, 1);
    Animal.animalMap.set(key, animals);
  }
}

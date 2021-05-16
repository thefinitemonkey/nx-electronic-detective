export class Helpers {
  static getRandomInt(max: number) {
    // Round the number off in case it isn't an int, then generate a random
    // number from 1 to the max number specified
    max = Math.round(max);
    return Math.floor(Math.random() * Math.floor(max));
  }

  static deepCopy(obj: Record<string, unknown>) {
    // Create a deep copy of the given array of object
    let v, key;
    const output = Array.isArray(obj) ? []: {};
    for (key in obj) {
      v = obj[key];
      output[key] = typeof v === "object" ? this.deepCopy(v) : v;
    }

    return output;
  }

  static objKeysToArray(obj: Record<string, unknown>) {
    // Convert the keys in an object into an array
    const keys = Object.keys(obj);
    const array = [];
    let newObj;
    keys.forEach(key => {
      newObj = obj[key];
      newObj["id"] = key;
      array.push(newObj);
    });

    return array;
  }
}

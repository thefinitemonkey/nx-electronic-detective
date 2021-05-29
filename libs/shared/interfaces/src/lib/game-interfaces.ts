export interface Address {
  "id": string;
  "side": string;
  "town": string;
}

export interface Weapon {
  "id": string;
  "type": string;
  "fingerprint": string;
}

export interface Location {
  "id": string;
  "name": string;
  "address": Address;
  "occupants": string[];
  "weapon": Weapon;
}

export interface CharacterImages {
  "portrait": string;
  "profile": string;
}

export interface Character {
  "id": string;
  "odd": boolean;
  "name": string;
  "gender": string;
  "occupation": string;
  "relationshipID": string;
  "relationshipStatus": string;
  "images": CharacterImages;
  "availableQuestions": number[];
}

export interface GameSetup {
  "victim": string,
  "murderer": string,
  "weapon": string,
  "scene": string,
  "locations": Location[]
}

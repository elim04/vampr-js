class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let vampire1 = this.numberOfOffspring;
    let vampire2 = vampire.numberOfOffspring;

    if (vampire1 > vampire2) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let lineageOne = [];
    let lineageTwo = [];
    let currentVamp = this;
    let otherVamp = vampire;

    while (currentVamp.creator) {
      lineageOne.push(currentVamp.creator);
      currentVamp = currentVamp.creator;
    } 
    // console.log("vampire ancestors 1", lineageOne);

    while(otherVamp.creator) {
      lineageTwo.push(otherVamp.creator);
      otherVamp = otherVamp.creator;
    }
    // console.log("vampire ancestors 2", lineageTwo)
    
    if (lineageOne.length === 0 || this === vampire) {
      return this;
    } 
    
    if (lineageTwo.length === 0) {
      return vampire;
    }

    if (lineageTwo.includes(this)) {
      return this;
    } 

    if (lineageOne.includes(vampire)) {
      return vampire;
    }

    for (let vamp of lineageOne) {
      for (let vamp2 of lineageTwo) {
        if (vamp2 === vamp) {
          return vamp;
        }
      }
    }

  }
}

module.exports = Vampire;


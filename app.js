class Service {
  constructor(database) {
    this.db = new Database(database);
  }

  findPersonsWithSkill(skill) {
    let result = {};
    recommendations
            .filter(r => r.skill === skill)
            .forEach(r => {
              if (result[r.recommendee]) {
                ++result[r.recommendee];
              } else {
                result[r.recommendee] = 1;
              }
            });
    return result;
  }
  
  reset() {
    for (let collection in SAMPLE_DATA) {
      this.db.set(collection, sample[collection]);
    }
  }
}



const db = new Database('skillspointer');

let persons = db.get('persons');
let recommendations = db.get('recommendations');
let user = persons[3];



// ---

const SAMPLE_DATA = {
  persons: [
    {
      "id": 1,
      "name": "John Doe",
      "location": "Meylan"
    },
    {
      "id": 2,
      "name": "John Doe",
      "location": "Meylan"
    },
    {
      "id": 3,
      "name": "Bastien David",
      "location": "Meylan"
    },
    {
      "id": 4,
      "name": "Brice de Nice",
      "location": "Sofia Antipolis"
    }
  ],
  recommendations: [
    {recommender: 4, recommendee: 1, skill: "angular"},
    {recommender: 4, recommendee: 1, skill: "C#"},
  ]
};
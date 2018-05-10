class Service {
  constructor(database) {
    this.db = new Database(database);
  }

  findPersonsWithSkill(skill) {
    let result = {};
    this.db
      .get('recommendations').filter(r => r.skill === skill)
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
      this.db.set(collection, SAMPLE_DATA[collection]);
    }
  }
}


const service = new Service('skillspointer');
const db = service.db; //TODO get rid of this, obviously

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
      "name": "Mary Doe",
      "location": "Lyon"
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
    {recommender: 1, recommendee: 2, skill: "angular"},
    {recommender: 1, recommendee: 3, skill: "angular"},
    {recommender: 1, recommendee: 2, skill: "android"},
    {recommender: 1, recommendee: 3, skill: "android"},
    {recommender: 1, recommendee: 4, skill: "android"},
    
    {recommender: 2, recommendee: 4, skill: "android"},
  ]
};
// TODO make interface asynchronous, for REST implementation
class Service {
  constructor(database) {
    this.db = new Database(database);
  }

  // .../resources/persons/<id>
  findPerson(id) {
    return this.db.get('persons')[id];
  }

  // .../resources/persons?query=<query>
  findPersons(query) {
    return this.db.get('persons').filter(p => p.name.includes(query));
  }

  // .../service/recommended-persons-for?skill=<skill>
  findRecommendedPersonsFor(skill) {
    let result = {};
    this.db
      .get('recommendations')
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
      "id": 0,
      "name": "John Doe",
      "location": "Meylan"
    },
    {
      "id": 1,
      "name": "Mary Doe",
      "location": "Lyon"
    },
    {
      "id": 2,
      "name": "Bastien David",
      "location": "Meylan"
    },
    {
      "id": 3,
      "name": "Brice de Nice",
      "location": "Sofia Antipolis"
    }
  ],
  recommendations: [
    {recommender: 0, recommendee: 1, skill: "angular"},
    {recommender: 0, recommendee: 2, skill: "angular"},
    {recommender: 0, recommendee: 1, skill: "android"},
    {recommender: 0, recommendee: 2, skill: "android"},
    {recommender: 0, recommendee: 3, skill: "android"},
    
    {recommender: 1, recommendee: 3, skill: "android"},
  ]
};
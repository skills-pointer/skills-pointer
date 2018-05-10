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


// -----


// TODO make interface asynchronous, for REST implementation
class Service {
  constructor(database) {
    this.db = new Database(database);
    if(!this.db.get('persons')) {
      this.reset();
    }
    this.cache();
  }

  // GET .../resources/persons/<id>
  findPerson(id) {
    return this.persons[id];
  }

  // GET .../resources/persons?query=<query>
  findPersons(query) {
    let result=this.persons.filter(p => p.name.includes(query));
    return result;
  }

  // PUT .../resources/persons
  createPerson(name) {
    let person = {
      'id': persons.length,
      'name': name,
      'location': 'Meylan'
    };
    this.persons.push(person);
    this.db.set('persons', this.persons);
    return person;
  }

  // POST .../services/recommend
  recommend(recommender,recommendee,skill) {
    let recommendation = {
      recommender: recommender,
      recommendee: recommendee,
      skill: skill
    };
    this.recommendations.push(recommendation);
    this.db.set('recommendations', this.recommendations);
    return recommendation;
  }

  // POST .../service/recommended-persons-for?skill=<skill>
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
    this.cache();
  }
  
  cache() {
    this.persons = this.db.get('persons');
    this.recommendations = this.db.get('recommendations');
  }
}


const service = new Service('skills-pointer');
if (!service.findPerson(0)) { // just a hack to reset old databases (TODO add reset feature on "settings" tab ?)
  service.reset();
}

const db = service.db; //TODO get rid of this, obviously
let persons = db.get('persons');
let recommendations = db.get('recommendations');

let user = persons[3];
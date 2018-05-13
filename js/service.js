// TODO make Service interface asynchronous, for REST implementation
class Service {
  constructor(database) {
    this.db = new Database(database);
    if (!this.db.get('persons')) {
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
    let result = this.persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    return result;
  }

  // PUT .../resources/persons
  createPerson(name) {
    let person = {
      'id': this.persons.length,
      'name': name,
      'location': 'Meylan'
    };
    this.persons.push(person);
    this.db.set('persons', this.persons);
    return person;
  }

  // POST .../services/recommend
  recommend(recommender, recommendee, skill) {
    let recommendation = {
      recommender: recommender,
      recommendee: recommendee,
      skill: skill
    };
    this.recommendations.push(recommendation);
    this.db.set('recommendations', this.recommendations);
    return recommendation;
  }

  // POST .../service/find-recommended-persons-for?skill=<skill>
  findRecommendedPersonsFor(skill) {
    skill=skill.toLowerCase();
    let result = {};
    this.recommendations
            .filter(r => r.skill.toLowerCase() === skill)
            .forEach(r => {
              if (result[r.recommendee]) {
                ++result[r.recommendee];
              } else {
                result[r.recommendee] = 1;
              }
            });
    return result;
  }

  // POST .../service/find-distance?from=<from>&to=<to>
  findDistanceLabel(from,to) {
    from=from.toLowerCase();
    to=to.toLowerCase();
    let matrix={
      'grenoble':6,
      'lyon':100,
      'paris':650,
      'sofia antipolis':350
    };
    return from===to?'local!':`${matrix[to]} kms`;
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

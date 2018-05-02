class Database {
  constructor(name) {
    this.name = name;
    this._init();
  }

  get(key) {
    return this._get()[key];
  }
  set(key, value) {
    let data = this._get();
    data[key] = value;
    this._set(data);
  }

  _get() {
    return JSON.parse(localStorage[this.name]);
  }
  _set(data) {
    return localStorage[this.name] = JSON.stringify(data);
  }

  _init() {
    if (!localStorage[this.name]) {
      let sample = {
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
      this._set(sample);
    }
  }
}

const db=new Database('skillspointer');
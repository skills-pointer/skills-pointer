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

const db = new Database('skillspointer');

function reset() {
  for (let collection in sample) {
    db.set(collection, sample[collection]);
  }
}
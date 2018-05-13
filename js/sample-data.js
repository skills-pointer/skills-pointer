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
      "location": "Grenoble"
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
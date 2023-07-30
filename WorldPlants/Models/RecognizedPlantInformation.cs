// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class RecognizedPlantInformation
    {
        public Species Species { get; set; }
    }

    public class Species
    {
        public Genus Genus { get; set; }
        public Family Family { get; set; }
        public string ScientificName { get; set; }
    }

    public class Genus
    {
        public string ScientificName { get; set; }
    }

    public class Family
    {
        public string ScientificName { get; set; }
    }

}



/*
 OK {
  "score": 0.6722,
  "species": {
    "scientificNameWithoutAuthor": "Tulipa greigii",
    "scientificNameAuthorship": "Regel",
    "genus": {
      "scientificNameWithoutAuthor": "Tulipa",
      "scientificNameAuthorship": "",
      "scientificName": "Tulipa"
    },
    "family": {
      "scientificNameWithoutAuthor": "Liliaceae",
      "scientificNameAuthorship": "",
      "scientificName": "Liliaceae"
    },
    "commonNames": [
      "Tulipan Greiga"
    ],
    "scientificName": "Tulipa greigii Regel"
  },
  "gbif": {
    "id": "5299454"
  }
}
 */
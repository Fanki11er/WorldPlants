namespace WorldPlants.Models
{
    public class RecognizerResponse
    {
        public Result Result { get; set; }
    }

    public class Result
    {
        public Classification Classification { get; set; }
    }

    public class Classification
    {
        public Suggestion[] Suggestions { get; set; }
    }

    public class Suggestion
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
        public Details Details { get; set; }

    }

    public class Details
    {
        public Detail? Description { get; set; }
        public Detail[]? Images { get; set; }
    }

    public class Detail
    {
        public string? Value { get; set; }
    }
}

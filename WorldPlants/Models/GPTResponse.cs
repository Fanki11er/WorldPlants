using Newtonsoft.Json;

namespace WorldPlants.Models
{
    public class GPTResponse
    {
        [JsonProperty("choices")]
        public GPTResponseChoice[] Choices { get; set; }
    }

    public class GPTResponseChoice
    {
        [JsonProperty("message")]
        public GPTResponseMessage Message { get; set; }
    }

    public class GPTResponseMessage
    {
        [JsonProperty("function_call")]
        public GPTResponseFunctionCall FunctionCall { get; set; }
    }

    public class GPTResponseFunctionCall
    {
        [JsonProperty("arguments")]
        public string Arguments { get; set; }
    }
}

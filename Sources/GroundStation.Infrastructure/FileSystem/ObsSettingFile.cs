using System.Text;
using System.Text.Json.Nodes;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;

namespace GroundStation.Infrastructure.FileSystem;

public class ObsSettingFile : IObsSettingRepository
{
    public ObsSetting? GetObsSetting()
    {
        try
        {
            using var reader = new StreamReader(@"obs.json", Encoding.UTF8);
            var settings = JsonNode.Parse(reader.ReadToEnd());
            return new ObsSetting(settings?["address"]?.GetValue<string>() ?? "null",
                settings?["port"]?.GetValue<string>() ?? "null",
                settings?["password"]?.GetValue<string>() ?? "null");
        }
        catch (Exception)
        {
        }

        return null;
    }
}

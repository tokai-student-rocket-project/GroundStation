using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IObsSettingRepository
{
    ObsSetting? GetObsSetting();
}

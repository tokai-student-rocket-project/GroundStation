using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface ISensingModuleReceiverRepository : IReceiver
{
    FlightData GetLatest();
}

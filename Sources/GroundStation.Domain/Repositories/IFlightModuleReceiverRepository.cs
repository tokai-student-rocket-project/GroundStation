using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IFlightModuleReceiverRepository : IReceiver
{
    FlightData GetLatest();
}

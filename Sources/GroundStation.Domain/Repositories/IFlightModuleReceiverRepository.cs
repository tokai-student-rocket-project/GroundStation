using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IFlightModuleReceiverRepository : IReceiver
{
    FlightData? LatestData { get; }
    public int ReceivedCount { get; }
}

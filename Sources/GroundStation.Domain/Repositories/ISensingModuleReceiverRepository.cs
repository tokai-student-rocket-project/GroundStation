using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface ISensingModuleReceiverRepository : IReceiver
{
    SensingData? LatestData { get; }
    public int ReceivedCount { get; }
}

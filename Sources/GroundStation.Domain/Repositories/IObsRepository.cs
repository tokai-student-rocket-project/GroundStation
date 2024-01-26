using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IObsRepository
{
    void Connect(ObsSetting setting);
    void DisConnect();
    bool IsConnected { get; }
    void SendData(FlightData? flightData, SensingData? sensingData);
}

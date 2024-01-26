using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IObsRepository
{
    bool UseObs { get; set; }
    void Connect(ObsSetting setting);
    void DisConnect();
    bool IsConnected { get; }
    void SendData(FlightData? flightData, SensingData? sensingData);
}

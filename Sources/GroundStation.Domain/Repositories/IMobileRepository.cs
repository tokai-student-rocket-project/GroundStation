using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface IMobileRepository
{
    bool UseMobile { get; set; } 
    bool IsConnected { get; } 
    int ClientCount { get;}
    string LocalUrl { get; }
    string GlobalUrl { get; }

    void Start();
    void Stop();
    void SendData(FlightData? flightData, SensingData? sensingData);
}

namespace GroundStation.Domain.Entities;

public class FlightData
{
    public FlightData(int rssi)
    {
        RSSI = rssi;
    }

    public double RSSI { get; }
}

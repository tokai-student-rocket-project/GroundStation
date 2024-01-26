namespace GroundStation.Domain.Entities;
using System.Text.Json.Serialization;

public class FlightData : IData
{
    public FlightData(PacketDataPart packetDataPart, LoggerDataPart loggerDataPart, FlightDataPart flightDataPart, GnssDataPart gnssDataPart, ValveDataPart valveDataPart)
    {
        PacketDataPart = packetDataPart;
        LoggerDataPart = loggerDataPart;
        FlightDataPart = flightDataPart;
        GnssDataPart = gnssDataPart;
        ValveDataPart = valveDataPart;
    }
    
        
    public PacketDataPart PacketDataPart { get; }
    public LoggerDataPart LoggerDataPart { get; }
    public FlightDataPart FlightDataPart { get; }
    public GnssDataPart GnssDataPart { get; }
    public ValveDataPart ValveDataPart { get; }
}

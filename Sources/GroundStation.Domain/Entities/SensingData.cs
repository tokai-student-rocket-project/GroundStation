namespace GroundStation.Domain.Entities;

public class SensingData : IData
{
    public SensingData(PacketDataPart packetDataPart, LoggerDataPart loggerDataPart, DynamicsDataPart dynamicsDataPart, TrajectoryDataPart trajectoryDataPart, ElectricalDataPart electricalDataPart, ThermalDataPart thermalDataPart, SutegomaDataPart sutegomaDataPart)
    {
        PacketDataPart = packetDataPart;
        LoggerDataPart = loggerDataPart;
        DynamicsDataPart = dynamicsDataPart;
        TrajectoryDataPart = trajectoryDataPart;
        ElectricalDataPart = electricalDataPart;
        ThermalDataPart = thermalDataPart;
        SutegomaDataPart = sutegomaDataPart;
    }
    
    public PacketDataPart PacketDataPart { get; }
    public LoggerDataPart LoggerDataPart { get; }
    public DynamicsDataPart DynamicsDataPart { get; }
    public TrajectoryDataPart TrajectoryDataPart { get; }
    public ElectricalDataPart ElectricalDataPart { get; }
    public ThermalDataPart ThermalDataPart { get; }
    public SutegomaDataPart SutegomaDataPart {get;}
    
}

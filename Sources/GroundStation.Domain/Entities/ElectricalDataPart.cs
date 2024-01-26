namespace GroundStation.Domain.Entities;

public class ElectricalDataPart
{
    public ElectricalDataPart(double groundVoltage, double batteryVoltage, double tieVoltage, double busVoltage, double groundCurrent, double batteryCurrent, double tieCurrent, double busCurren, double groundPower, double batteryPower, double tiePower, double busPower)
    {
        GroundVoltage = groundVoltage;
        BatteryVoltage = batteryVoltage;
        TieVoltage = tieVoltage;
        BusVoltage = busVoltage;
        GroundCurrent = groundCurrent;
        BatteryCurrent = batteryCurrent;
        TieCurrent = tieCurrent;
        BusCurrent = busCurren;
        GroundPower = groundPower;
        BatteryPower = batteryPower;
        TiePower = tiePower;
        BusPower = busPower;
    }
    
    public double GroundVoltage { get; }
    public double BatteryVoltage { get; }
    public double TieVoltage { get; }
    public double BusVoltage { get; }
    public double GroundCurrent { get; }
    public double BatteryCurrent { get; }
    public double TieCurrent { get; }
    public double BusCurrent { get; }
    public double GroundPower { get; }
    public double BatteryPower { get; }
    public double TiePower { get; }
    public double BusPower { get; }
}

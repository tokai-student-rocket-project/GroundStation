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
    
    public string GroundVoltageString => GroundVoltage.ToString("F1");
    public string BatteryVoltageString => BatteryVoltage.ToString("F1");
    public string TieVoltageString => TieVoltage.ToString("F1");
    public string BusVoltageString => BusVoltage.ToString("F1");
    public string GroundCurrentString => GroundCurrent.ToString("F0");
    public string BatteryCurrentString => BatteryCurrent.ToString("F0");
    public string TieCurrentString => TieCurrent.ToString("F0");
    public string BusCurrentString => BusCurrent.ToString("F0");
    public string GroundPowerString => GroundPower.ToString("F1");
    public string BatteryPowerString => BatteryPower.ToString("F1");
    public string TiePowerString => TiePower.ToString("F1");
    public string BusPowerString => BusPower.ToString("F1");
}

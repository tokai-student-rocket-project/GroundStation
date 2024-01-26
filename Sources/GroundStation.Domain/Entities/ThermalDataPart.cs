namespace GroundStation.Domain.Entities;

public class ThermalDataPart
{
    public ThermalDataPart(double regulator1Temperature, double regulator2Temperature, double regulator3Temperature,
        double conductionTemperature, double outsideTemperature, double insideTemperature, double ventPortTemperature,
        double tankAtmosphereTemperature)
    {
        Regulator1Temperature = regulator1Temperature;
        Regulator2Temperature = regulator2Temperature;
        Regulator3Temperature = regulator3Temperature;
        ConductionTemperature = conductionTemperature;
        OutsideTemperature = outsideTemperature;
        InsideTemperature = insideTemperature;
        VentPortTemperature = ventPortTemperature;
        TankAtmosphereTemperature = tankAtmosphereTemperature;
    }
    
    public double Regulator1Temperature { get; }
    public double Regulator2Temperature { get; }
    public double Regulator3Temperature { get; }
    public double ConductionTemperature { get; }
    public double OutsideTemperature { get; }
    public double InsideTemperature { get; }
    public double VentPortTemperature { get; }
    public double TankAtmosphereTemperature { get; }
    
    public string Regulator1TemperatureString => Regulator1Temperature.ToString("F0");
    public string Regulator2TemperatureString => Regulator2Temperature.ToString("F0");
    public string Regulator3TemperatureString => Regulator3Temperature.ToString("F0");
    public string ConductionTemperatureString => ConductionTemperature.ToString("F0");
    public string OutsideTemperatureString => OutsideTemperature.ToString("F0");
    public string InsideTemperatureString => InsideTemperature.ToString("F0");
    public string VentPortTemperatureString => VentPortTemperature.ToString("F0");
    public string TankAtmosphereTemperatureString => TankAtmosphereTemperature.ToString("F0");
}

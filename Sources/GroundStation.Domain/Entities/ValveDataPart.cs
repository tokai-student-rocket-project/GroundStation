namespace GroundStation.Domain.Entities;

public class ValveDataPart
{
    public ValveDataPart(double motorTemperature, double mcuTemperature, double inputVoltage, double currentPosition, double targetPosition, double currentSupplyPosition, double voltage) //
    {
        MotorTemperature = motorTemperature;
        McuTemperature = mcuTemperature;
        InputVoltage = inputVoltage;
        CurrentPosition = currentPosition;
        TargetPosition = targetPosition;
        CurrentSupplyPosition = currentSupplyPosition;
        Voltage = voltage;
    }
    
    public double MotorTemperature { get; }
    public double McuTemperature { get; }
    public double InputVoltage { get; }
    public double CurrentPosition { get; }
    public double TargetPosition { get; }
    public double CurrentSupplyPosition { get; }
    public double Voltage { get; }
    
    public string MotorTemperatureString => MotorTemperature.ToString("F0");
    public string McuTemperatureString => McuTemperature.ToString("F0");
    public string InputVoltageString => InputVoltage.ToString("F1");
    public string CurrentPositionString => CurrentPosition.ToString("F0");
    public string TargetPositionString => TargetPosition.ToString("F0");
    public string CurrentSupplyPositionString => CurrentSupplyPosition.ToString("F0");
    public string VoltageString => Voltage.ToString("F0");
}

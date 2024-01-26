namespace GroundStation.Domain.Entities;

public class ValveDataPart
{
    public ValveDataPart(double motorTemperature, double mcuTemperature, double inputVoltage, double currentPosition, double targetPosition)
    {
        MotorTemperature = motorTemperature;
        McuTemperature = mcuTemperature;
        InputVoltage = inputVoltage;
        CurrentPosition = currentPosition;
        TargetPosition = targetPosition;
    }
    
    public double MotorTemperature { get; }
    public double McuTemperature { get; }
    public double InputVoltage { get; }
    public double CurrentPosition { get; }
    public double TargetPosition { get; }
    
    public string MotorTemperatureString => MotorTemperature.ToString("F0");
    public string McuTemperatureString => McuTemperature.ToString("F0");
    public string InputVoltageString => InputVoltage.ToString("F1");
    public string CurrentPositionString => CurrentPosition.ToString("F0");
    public string TargetPositionString => TargetPosition.ToString("F0");
}

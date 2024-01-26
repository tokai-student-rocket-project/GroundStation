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
}

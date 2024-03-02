namespace GroundStation.Domain.Entities;

public class TimerDataPart
{
    public TimerDataPart(double separation1ProtectionTime, double separation1ForceTime, double separation2ProtectionTime, double separation2ForceTime, double landingTime)
    {
        Separation1ProtectionTime = separation1ProtectionTime;
        Separation1ForceTime = separation1ForceTime;
        Separation2ProtectionTime = separation2ProtectionTime;
        Separation2ForceTime = separation2ForceTime;
        LandingTime = landingTime;
    }
    
    public double Separation1ProtectionTime { get; }
    public double Separation1ForceTime { get; }
    public double Separation2ProtectionTime { get; }
    public double Separation2ForceTime { get; }
    public double LandingTime { get; }
    
    public string Separation1ProtectionTimeString => Separation1ProtectionTime.ToString("F2");
    public string Separation1ForceTimeString => Separation1ForceTime.ToString("F2");
    public string Separation2ProtectionTimeString => Separation2ProtectionTime.ToString("F2");
    public string Separation2ForceTimeString => Separation2ForceTime.ToString("F2");
    public string LandingTimeString => LandingTime.ToString("F2");
}

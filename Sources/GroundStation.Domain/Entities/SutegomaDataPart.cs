namespace GroundStation.Domain.Entities;

public class SutegomaDataPart
{
    public SutegomaDataPart(double uptime, double taskRate)
    {
        Uptime = uptime;
        TaskRate = taskRate;
    }
    
    public double Uptime { get; }
    public double TaskRate { get; }
    
    public string UptimeString => Uptime.ToString("F2");
    public string TaskRateString => TaskRate.ToString("F0");
}

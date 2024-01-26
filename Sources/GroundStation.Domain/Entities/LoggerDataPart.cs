namespace GroundStation.Domain.Entities;

public class LoggerDataPart
{
    public LoggerDataPart(bool doLogging, int usage, int number)
    {
        DoLogging = doLogging;
        Usage = usage;
        Number = number;
    }
    
    public bool DoLogging { get; }
    public int Usage { get; }
    public int Number { get; }
}

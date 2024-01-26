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
    
    private readonly string[] _yesNoStatus = { "NO", "YES"};
    public string DoLoggingString => _yesNoStatus[Convert.ToInt32(DoLogging)];
    public string UsageString => Usage.ToString();
    public string NumberString => Number.ToString();
}

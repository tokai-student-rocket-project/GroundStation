namespace GroundStation.Domain.Entities;

public class FlightDataPart
{
    public FlightDataPart(int mode, double time, bool valveModeIsLaunch, bool flightPinIsOpen, bool isFalling, bool sn3IsOn, bool sn4IsOn)
    {
        Mode = mode;
        Time = time;
        ValveModeIsLaunch = valveModeIsLaunch;
        FlightPinIsOpen = flightPinIsOpen;
        IsFalling = isFalling;
        SN3IsOn = sn3IsOn;
        SN4IsOn = sn4IsOn;
    }
    
    public int Mode { get; }
    public double Time { get; }
    public bool ValveModeIsLaunch { get; }
    public bool FlightPinIsOpen { get; }
    public bool IsFalling { get; }
    public bool SN3IsOn { get; }
    public bool SN4IsOn { get; }
}

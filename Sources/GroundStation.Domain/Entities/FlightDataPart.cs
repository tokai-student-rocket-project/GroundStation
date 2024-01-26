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

    private readonly string[] _flightModes = { "STANDBY", "READY TO FLY", "POWERED CLIMB", "FREE CLIMB", "FREE DESCENT", "DROGUE CHUTE DESCENT", "MAIN CHUTE DESCENT", "LANDED", "SHUTDOWN", "DATA PROTECTION" };
    public string ModeString => _flightModes[Convert.ToInt32(Mode)];
    public string TimeString => Time.ToString("F2");
    private readonly string[] _valveModes = { "WAITING", "LAUNCH"};
    public string ValveModeString => _valveModes[Convert.ToInt32(ValveModeIsLaunch)];
    private readonly string[] _pinStatus = { "CLOSE", "TRIP"};
    public string FlightPinStateString => _pinStatus[Convert.ToInt32(FlightPinIsOpen)];
    private readonly string[] _yesNoStatus = { "NO", "YES"};
    public string IsFallingString => _yesNoStatus[Convert.ToInt32(IsFalling)];
    private readonly string[] _onOffStatus = { "OFF", "ON"};
    public string SN3StateString => _onOffStatus[Convert.ToInt32(SN3IsOn)];
    public string SN4StateString => _onOffStatus[Convert.ToInt32(SN4IsOn)];
}

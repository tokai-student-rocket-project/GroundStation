namespace GroundStation.Domain.Repositories;

public interface IReceiver
{
    public enum Status
    {
        NotSelected,
        Selected,
        ConnectionFailed,
        WaitingPacket,
        InvalidPacket,
        Connected
    }
    Status CurrentStatus { get; }
    string CurrentStatusString { get; }
    
    string? PortName { get; set; }
    
    string[] GetPortNames();
    void Start();
    void Stop();
}

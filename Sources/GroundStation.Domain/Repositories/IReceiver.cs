namespace GroundStation.Domain.Repositories;

public interface IReceiver
{
    string? PortName { get; set; }
    bool IsPortSet { get; }
    string[] GetPortNames();
    void Start();
    void Stop();
}

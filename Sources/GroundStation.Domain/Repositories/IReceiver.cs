namespace GroundStation.Domain.Repositories;

public interface IReceiver
{
    string? PortName { get; set; }
    string[] GetPortNames();
    void Start();
    void Stop();
}

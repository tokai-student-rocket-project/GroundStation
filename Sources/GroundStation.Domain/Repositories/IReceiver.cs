namespace GroundStation.Domain.Repositories;

public interface IReceiver
{
    string? PortName { get; set; }
    string[] GetPortNames();
    bool Start();
    void Stop();
}

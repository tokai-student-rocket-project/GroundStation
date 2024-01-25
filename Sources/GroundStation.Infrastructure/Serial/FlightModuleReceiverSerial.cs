using System.Diagnostics;
using System.IO.Ports;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;

namespace GroundStation.Infrastructure.Serial;

internal class FlightModuleReceiverSerial : IFlightModuleReceiverRepository
{
    public string? PortName
    {
        get => _port;
        set => _port = value;
    }
    
    public string[] GetPortNames() => SerialPort.GetPortNames();
    private string? _port;
    
    public void Start()
    {

    }

    public void Stop()
    {
        
    }
    
    public FlightData GetLatest()
    {
        return new FlightData(1000);
    }
}

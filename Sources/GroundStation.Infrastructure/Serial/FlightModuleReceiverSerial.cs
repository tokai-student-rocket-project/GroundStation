using System.Diagnostics;
using System.IO.Ports;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;

namespace GroundStation.Infrastructure.Serial;

internal class FlightModuleReceiverSerial : IFlightModuleReceiverRepository
{
    private SerialPort? _port;
    
    public string? PortName
    {
        get => _port?.PortName;
        set
        {
            if (value != PortName)
            {
                _port = new SerialPort(value, 115200);
            }
        }
    }
    
    public string[] GetPortNames() => SerialPort.GetPortNames();
    
    public bool Start()
    {
        _port?.Open();
        return _port?.IsOpen ?? false;
    }

    public void Stop()
    {
        _port?.Close();
    }
    
    public FlightData GetLatest()
    {
        return new FlightData(1000);
    }
}

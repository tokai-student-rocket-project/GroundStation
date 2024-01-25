using System.IO.Ports;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;

namespace GroundStation.Infrastructure.Serial;

internal class SensingModuleReceiverSerial : ISensingModuleReceiverRepository
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

    public bool IsPortSet => _port is not null;

    public string[] GetPortNames()
    {
        return SerialPort.GetPortNames();
    }

    public void Start()
    {
        if (_port is null)
        {
            return;
        }

        // _port.Open();
    }

    public void Stop()
    {
    }

    public FlightData GetLatest()
    {
        return new FlightData(1000);
    }
}

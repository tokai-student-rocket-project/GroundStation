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
                CurrentStatus = IReceiver.Status.Selected;
            }
        }
    }

    public IReceiver.Status CurrentStatus { get; private set; } = IReceiver.Status.NotSelected;
    public string CurrentStatusString => CurrentStatus.ToString("G");
    
    public string[] GetPortNames() => SerialPort.GetPortNames();
    
    public void Start()
    {
        _port?.Open();
        CurrentStatus = (_port?.IsOpen ?? false) ? IReceiver.Status.WaitingPacket : IReceiver.Status.ConnectionFailed;
    }

    public void Stop()
    {
        _port?.Close();
        CurrentStatus = IReceiver.Status.Selected;
    }
    
    public FlightData GetLatest()
    {
        return new FlightData(1000);
    }
}

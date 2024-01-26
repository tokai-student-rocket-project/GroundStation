using System.IO.Ports;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using System.Text.Json.Nodes;

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
                CurrentStatus = IReceiver.Status.Selected;
            }
        }
    }
    
    public IReceiver.Status CurrentStatus { get; private set; } = IReceiver.Status.NotSelected;
    public string CurrentStatusString => CurrentStatus.ToString("G");

    public string[] GetPortNames() => SerialPort.GetPortNames();
    public FlightData? LatestData { get; private set; }

    public void Start()
    {
        if (_port is null)
        {
            CurrentStatus = IReceiver.Status.ConnectionFailed;
            return;
        }
        
        _port.ReadTimeout = 5;
        _port.DataReceived += OnDataReceived;
        _port.Open();
        CurrentStatus = _port.IsOpen ? IReceiver.Status.WaitingPacket : IReceiver.Status.ConnectionFailed;
    }

    public void Stop()
    {
        _port?.Close();
        CurrentStatus = IReceiver.Status.Selected;
    }
    
    private void OnDataReceived(object sender, SerialDataReceivedEventArgs e)
    {
        var port = (SerialPort)sender;

        try
        {
            var rawPacket = port.ReadLine();
            var packet = JsonNode.Parse(rawPacket);

            CurrentStatus = packet?["packet"]?["module"]?.ToString() == "S"
                ? IReceiver.Status.Connected
                : IReceiver.Status.InvalidPacket;
            
            LatestData = new FlightData(-100);
        }
        catch (Exception)
        {
        }
    }
}

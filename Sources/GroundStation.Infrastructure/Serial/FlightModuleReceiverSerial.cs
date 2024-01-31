using System.IO.Ports;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using System.Text.Json.Nodes;

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
    public int ReceivedCount { get; private set; } = 0;
    
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
        ReceivedCount = 0;
    }

    public void Stop()
    {
        _port?.Close();
        CurrentStatus = IReceiver.Status.Selected;
        ReceivedCount = 0;
    }
    
    private void OnDataReceived(object sender, SerialDataReceivedEventArgs e)
    {
        var port = (SerialPort)sender;

        try
        {
            var rawPacket = port.ReadLine();
            var packet = JsonNode.Parse(rawPacket);

            CurrentStatus = packet?["packet"]?["module"]?.ToString() == "F"
                ? IReceiver.Status.Connected
                : IReceiver.Status.InvalidPacket;
            
            LatestData = new FlightData(
                new PacketDataPart(
                    packet["packet"]["rssi_dBm"].GetValue<int>(),
                    packet["packet"]["snr_dBm"].GetValue<double>(),
                    packet["packet"]["ident"].GetValue<string>(),
                    packet["packet"]["uptime_s"].GetValue<double>()
                    ),
                new LoggerDataPart(
                    packet["logger"]["doLogging"].GetValue<bool>(),
                    packet["logger"]["usage"].GetValue<int>(),
                    packet["logger"]["number"].GetValue<int>()),
                new FlightDataPart(
                    packet["flight"]["mode"].GetValue<int>(),
                    packet["flight"]["time_s"].GetValue<double>(),
                    packet["flight"]["detection"]["valveModeIsLaunch"].GetValue<bool>(),
                    packet["flight"]["detection"]["flightPinIsOpen"].GetValue<bool>(),
                    packet["flight"]["detection"]["isFalling"].GetValue<bool>(),
                    packet["flight"]["separation"]["sn3IsOn"].GetValue<bool>(),
                    packet["flight"]["separation"]["sn4IsOn"].GetValue<bool>()
                    ),
                new GnssDataPart(
                    packet["gnss"]["unixEpoch"].GetValue<int>(),
                    packet["gnss"]["fixType"].GetValue<int>(),
                packet["gnss"]["satellites"].GetValue<int>(),
            packet["gnss"]["latitude_deg"].GetValue<double>(),
            packet["gnss"]["longitude_deg"].GetValue<double>(),
            packet["gnss"]["height_m"].GetValue<double>(),
            packet["gnss"]["speed_mps"].GetValue<double>(),
            packet["gnss"]["accuracy_m"].GetValue<double>()
                    ),
                new ValveDataPart(
                    packet["valve"]["motorTemperature_degC"].GetValue<double>(),
                    packet["valve"]["mcuTemperature_degC"].GetValue<double>(),
                    packet["valve"]["inputVoltage_V"].GetValue<double>(),
                    packet["valve"]["currentPosition_deg"].GetValue<double>(),
                    packet["valve"]["currentDesiredPosition_deg"].GetValue<double>()
                    )
                );
            
            ReceivedCount++;
            Console.Beep();
        }
        catch (Exception)
        {
        }
    }
}

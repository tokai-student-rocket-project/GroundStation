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
    public int ReceivedCount { get; private set; } = 0;

    public string[] GetPortNames() => SerialPort.GetPortNames();
    public SensingData? LatestData { get; private set; }

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

            CurrentStatus = packet?["packet"]?["module"]?.ToString() == "S"
                ? IReceiver.Status.Connected
                : IReceiver.Status.InvalidPacket;
            
            LatestData = new SensingData(
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
                new DynamicsDataPart(
                    packet["dynamics"]["acceleration_mps2"]["norm"].GetValue<double>(),
                    packet["dynamics"]["acceleration_mps2"]["x"].GetValue<double>(),
                    packet["dynamics"]["acceleration_mps2"]["y"].GetValue<double>(),
                    packet["dynamics"]["acceleration_mps2"]["z"].GetValue<double>(),
                    packet["dynamics"]["orientation_deg"]["roll"].GetValue<double>(),
                    packet["dynamics"]["orientation_deg"]["pitch"].GetValue<double>(),
                    packet["dynamics"]["orientation_deg"]["yaw"].GetValue<double>(),
                    packet["dynamics"]["forceX_N"].GetValue<double>(),
                    packet["dynamics"]["jerkX_mps3"].GetValue<double>()
                    ),
                new TrajectoryDataPart(
                    packet["trajectory"]["altitude_m"].GetValue<double>(),
                    packet["trajectory"]["verticalSpeed_mps"].GetValue<double>(),
                    packet["trajectory"]["apogee_m"].GetValue<double>(),
                    packet["trajectory"]["estimated_s"].GetValue<double>()
                    ),
                new ElectricalDataPart(
                    packet["electrical"]["voltage_V"]["ground"].GetValue<double>(),
                    packet["electrical"]["voltage_V"]["battery"].GetValue<double>(),
                    packet["electrical"]["voltage_V"]["tie"].GetValue<double>(),
                    packet["electrical"]["voltage_V"]["bus"].GetValue<double>(),
                    packet["electrical"]["current_mA"]["ground"].GetValue<double>(),
                    packet["electrical"]["current_mA"]["battery"].GetValue<double>(),
                    packet["electrical"]["current_mA"]["tie"].GetValue<double>(),
                    packet["electrical"]["current_mA"]["bus"].GetValue<double>(),
                    packet["electrical"]["power_W"]["ground"].GetValue<double>(),
                    packet["electrical"]["power_W"]["battery"].GetValue<double>(),
                    packet["electrical"]["power_W"]["tie"].GetValue<double>(),
                    packet["electrical"]["power_W"]["bus"].GetValue<double>()
                    ),
                new ThermalDataPart(
                    packet["thermal"]["temperature_degC"]["regulator1"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["regulator2"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["regulator3"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["conduction"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["outside"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["inside"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["ventPort"].GetValue<double>(),
                    packet["thermal"]["temperature_degC"]["tankAtmosphere"].GetValue<double>()
                    ),
                new SutegomaDataPart(
                    packet["sutegoma"]["uptime_s"].GetValue<double>(),
                    packet["sutegoma"]["taskRate_Hz"].GetValue<double>()
                    ));

            ReceivedCount++;
        }
        catch (Exception)
        {
        }
    }
}

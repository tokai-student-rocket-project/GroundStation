using System.Net;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using SocketIOSharp.Server;


namespace GroundStation.Infrastructure.WebSocket;

public class Mobile : IMobileRepository
{
    private static readonly string s_hostName = Dns.GetHostName();
    private static readonly string s_address = Dns.GetHostAddresses(s_hostName).First().ToString();
    
    public bool UseMobile { get; set; } = false;
    private readonly SocketIOServer _server = new(new SocketIOServerOption(3010));
    public bool IsConnected => ClientCount > 0;
    public int ClientCount => _server.Clients.Count;
    public string WebsocketUrl => $"http://{s_address}:3010/";

    public void Start()
    {
        _server.Start();
    }

    public void Stop()
    {
        _server.Stop();
    }
    
    
    public void SendData(FlightData? flightData, SensingData? sensingData)
    {
        var airData = "{\"Alt\":" + sensingData?.TrajectoryDataPart.AltitudeString + ",\"Acc\":" + sensingData?.DynamicsDataPart.AccelerationNormString + ",\"Ori\":" + sensingData?.DynamicsDataPart.OrientationPitch + "}";
        _server.Emit("air-data", airData);
            
        var positionData = "{\"LatDms\":" + flightData?.GnssDataPart.LatitudeString + ",\"LatDeg\":" + flightData?.GnssDataPart.Latitude + ",\"LonDms\":" + flightData?.GnssDataPart.LongitudeString + ",\"LonDeg\":" + flightData?.GnssDataPart.Longitude + "}";
        _server.Emit("position-data", positionData);
            
        var systemData = "{\"FlightTime\":" + flightData?.FlightDataPart.Time + ",\"FlightMode\":" + flightData?.GnssDataPart.Longitude + "}";
        _server.Emit("system-data", systemData);
    }
}

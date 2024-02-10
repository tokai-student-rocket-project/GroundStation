using System.Net;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using SocketIOSharp.Server;


namespace GroundStation.Infrastructure.WebSocket;

public class Mobile : IMobileRepository

{
    private static readonly string s_externalIpString = new WebClient().DownloadString("https://ipinfo.io/ip");
    private static readonly IPAddress s_externalIp = IPAddress.Parse(s_externalIpString);
    
    private static readonly string s_hostName = Dns.GetHostName();
    private static readonly string s_address = Dns.GetHostAddresses(s_hostName).First().ToString();
    
    public bool UseMobile { get; set; } = false;
    private readonly SocketIOServer _server = new(new SocketIOServerOption(3010, AllowEIO3:true));
    public bool IsConnected => ClientCount > 0;
    public int ClientCount => _server.Clients.Count;
    public string LocalUrl => $"https://tokai-student-rocket-project.github.io/GroundStationMobile/?ws={s_address}";
    public string GlobalUrl => $"https://tokai-student-rocket-project.github.io/GroundStationMobile/?ws={s_externalIp}";

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
        var data = "{\"Alt\":\"" + sensingData?.TrajectoryDataPart.AltitudeString
                               + "\",\"Acc\":\"" + sensingData?.DynamicsDataPart.AccelerationNormString
                               + "\",\"Ori\":\"" + sensingData?.DynamicsDataPart.OrientationPitch
                               + "\",\"LatDms\":\"" + flightData?.GnssDataPart.LatitudeString
                               + "\",\"LatDeg\":\"" + flightData?.GnssDataPart.Latitude.ToString("F6")
                               + "\",\"LonDms\":\"" + flightData?.GnssDataPart.LongitudeString
                               + "\",\"LonDeg\":\"" + flightData?.GnssDataPart.Longitude.ToString("F6")
                               + "\",\"PosAcc\":\"" + flightData?.GnssDataPart.Accuracy.ToString("F3")
                               + "\",\"FlightTime\":\"" + flightData?.FlightDataPart.TimeString
                               + "\",\"FlightMode\":\"" + flightData?.FlightDataPart.ModeString
                               + "\"}";
       
        _server.Emit("data", data);
    }
}

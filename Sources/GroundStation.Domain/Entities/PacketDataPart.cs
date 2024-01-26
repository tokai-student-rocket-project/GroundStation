namespace GroundStation.Domain.Entities;

public class PacketDataPart
{
    public PacketDataPart(int rssi, double snr, string ident, double uptime)
    {
        RSSI = rssi;
        SNR = snr;
        Ident = ident;
        Uptime = uptime;
    }
    
        
    public int RSSI { get; }
    public double SNR { get; }
    public string Ident { get; }
    public double Uptime { get; }
    
    public string RSSIString => RSSI.ToString();
    public string SNRString => SNR.ToString("F1");
    public string UptimeString => Uptime.ToString("F2");
}

namespace GroundStation.Domain.Entities;

public class GnssDataPart
{
    public GnssDataPart(int fixType, int satellites, double latitude, double longitude, double height, double speed, double accuracy)
    {
        FixType = fixType;
        Satellites = satellites;
        Latitude = latitude;
        Longitude = longitude;
        Height = height;
        Speed = speed;
        Accuracy = accuracy;
    }
    
    public int FixType { get; }
    public int Satellites { get; }
    public double Latitude { get; }
    public double Longitude { get; }
    public double Height { get; }
    public double Speed { get; }
    public double Accuracy { get; }
}

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


    private readonly string[] _fixTypes = { "UNKNOWN", "UNKNOWN", "UNKNOWN", "3D", "DR" };
    public string FixTypeString => _fixTypes[FixType];
    public string SatellitesString => Satellites.ToString();
    public string LatitudeString => LatitudeDMS();
    public string LongitudeString => LongitudeDMS();
    public string HeightString => Height.ToString("F1");
    public string SpeedString => Speed.ToString("F1");
    public string AccuracyString => Accuracy.ToString("F1");

    private string LatitudeDMS()
    {
        var latD = Math.Floor(Latitude); 
        var latMS = double.Parse("0." + Latitude.ToString("F").Split(".")[1]) * 60;
        var latM = Math.Floor(latMS);
        var latS = (double.Parse("0." + latMS.ToString("F").Split(".")[1]) * 60).ToString("F0");
        return $"{latD}°{latM}′{latS}″N";
    }
    
    private string LongitudeDMS()
    {
        var lonD = Math.Floor(Longitude); 
        var lonMS = double.Parse("0." + Longitude.ToString("F").Split(".")[1]) * 60;
        var lonM = Math.Floor(lonMS);
        var lonS = (double.Parse("0." + lonMS.ToString("F").Split(".")[1]) * 60).ToString("F0");
        return $"{lonD}°{lonM}′{lonS}″E";
    }
}

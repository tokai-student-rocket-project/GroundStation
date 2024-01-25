namespace GroundStation.Domain.Entities;

public class FlightData
{
   public  FlightData(double altitude)
    {
        Altitude = altitude;
    }
    
    public double Altitude { get; }
}

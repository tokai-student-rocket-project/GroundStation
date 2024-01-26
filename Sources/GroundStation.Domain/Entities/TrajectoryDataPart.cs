namespace GroundStation.Domain.Entities;

public class TrajectoryDataPart
{
    public TrajectoryDataPart(double altitude, double verticalSpeed, double apogee, double estimated)
    {
        Altitude = altitude;
        VerticalSpeed = verticalSpeed;
        Apogee = apogee;
        Estimated = estimated;
    }
    
    public double Altitude { get; }
    public double VerticalSpeed { get; }
    public double Apogee { get; }
    public double Estimated { get; }
}

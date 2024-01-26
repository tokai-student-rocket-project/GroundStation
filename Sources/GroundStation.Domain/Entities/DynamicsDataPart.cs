namespace GroundStation.Domain.Entities;

public class DynamicsDataPart
{
    public DynamicsDataPart(double accelerationNorm, double accelerationX, double accelerationY, double accelerationZ, double orientationRoll, double orientationPitch, double orientationYaw, double force, double jerk)
    {
        AccelerationNorm = accelerationNorm;
        AccelerationX = accelerationX;
        AccelerationY = accelerationY;
        AccelerationZ = accelerationZ;
        OrientationRoll = orientationRoll;
        OrientationPitch = orientationPitch;
        OrientationYaw = orientationYaw;
        Force = force;
        Jerk = jerk;
    }
    
    public double AccelerationNorm { get; }
    public double AccelerationX { get; }
    public double AccelerationY { get; }
    public double AccelerationZ { get; }
    
    public double OrientationRoll { get; }
    public double OrientationPitch { get; }
    public double OrientationYaw { get; }
    
    public double Force { get; }
    public double Jerk { get; }
}

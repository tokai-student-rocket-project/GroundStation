using GroundStation.Domain.Repositories;
using GroundStation.Infrastructure.FileSystem;
using GroundStation.Infrastructure.Serial;

namespace GroundStation.Infrastructure;

public static class Factories
{
    public static IFlightModuleReceiverRepository CreateFlightModuleReceiverRepository()
    {
        return new FlightModuleReceiverSerial();
    }

    public static ISensingModuleReceiverRepository CreateSensingModuleReceiverRepository()
    {
        return new SensingModuleReceiverSerial();
    }
    
    public static IObsSettingRepository CreateObsSettingRepository()
    {
        return new ObsSettingFile();
    }
}

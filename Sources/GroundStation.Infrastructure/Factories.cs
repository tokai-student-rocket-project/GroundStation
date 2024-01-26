using GroundStation.Domain.Repositories;
using GroundStation.Infrastructure.FileSystem;
using GroundStation.Infrastructure.Serial;
using GroundStation.Infrastructure.WebSocket;

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
    
    public static IObsRepository CreateObsRepository()
    {
        return new Obs();
    }
}

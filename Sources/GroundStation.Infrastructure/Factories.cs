using GroundStation.Domain.Repositories;
using GroundStation.Infrastructure.Fake;

namespace GroundStation.Infrastructure;

public static class Factories
{
    public static IFlightModuleReceiverRepository CreateFlightModuleReceiverRepository()
    {
        return new FlightModuleReceiverFake();
    }
    
    public static ISensingModuleReceiverRepository CreateSensingModuleReceiverRepository()
    {
        return new SensingModuleReceiverFake();
    }
}

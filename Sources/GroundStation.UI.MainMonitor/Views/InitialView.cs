using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class InitialView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;

    public InitialView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(10, 1);
        Console.Write("WELCOME!");

        Console.SetCursorPosition(3, 3);
        Console.Write("Press any key to continue...");


        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
        NavigationRequest?.Invoke(this,
            new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                _sensingModuleReceiverRepository, _obsSettingRepository)));
    }
}

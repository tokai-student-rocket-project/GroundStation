using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class InitialView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;

    public InitialView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository,
        ILogRepository logRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
        _logRepository = logRepository;
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
                _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository)));
    }
}

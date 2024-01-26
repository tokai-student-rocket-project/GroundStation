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

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("            WELCOME!");
        Console.WriteLine();
        Console.WriteLine("  ___ _   _ ___   _   ___ _   _ ");
        Console.WriteLine(" / __| | | | _ ) /_\\ | _ \\ | | | ");
        Console.WriteLine(" \\__ \\ |_| | _ \\/ _ \\|   / |_| |");
        Console.WriteLine(" |___/\\___/|___/_/ \\_\\_|_\\\\___/");
        Console.WriteLine();
        Console.WriteLine("                         v1.1");
        Console.WriteLine();
        Console.WriteLine("   Press any key to continue...");
        Console.ResetColor();


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

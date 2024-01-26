using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class LoggerSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;

    public LoggerSettingView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    private bool _useLogger = false;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("LOGGER SETTING    2/3");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("USE LOGGER?");
        
        Console.SetCursorPosition(0, 3);
        Console.Write("[1] ");
        Console.ForegroundColor = (_useLogger) ? ConsoleColor.Green : ConsoleColor.Red;
        Console.Write(_useLogger ? "YES" : "NO");
        Console.ResetColor();

        
        Console.SetCursorPosition(0, 12);
        Console.Write("[<] PREV");

        Console.SetCursorPosition(0, 13);
        Console.Write("[>] NEXT");


        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ObsSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
        }
    }
}

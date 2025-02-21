using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SerialSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;
    private readonly IMobileRepository _mobileRepository;

    public SerialSettingView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository,
        ILogRepository logRepository,
        IMobileRepository mobileRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
        _logRepository = logRepository;
        _mobileRepository = mobileRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        //Console.Clear();

        Console.SetCursorPosition(3, 0);
        Console.Write("RECEIVER SETTING");
        Console.SetCursorPosition(25, 0);
        Console.Write("1/4");


        Console.SetCursorPosition(1, 2);
        Console.Write("FLIGHT MODULE");

        Console.SetCursorPosition(0, 3);
        Console.Write("[1] ");
        var flightModulePortName = _flightModuleReceiverRepository.PortName;
        Console.ForegroundColor = string.IsNullOrEmpty(flightModulePortName) ? ConsoleColor.Yellow : ConsoleColor.Cyan;
        Console.Write(flightModulePortName ?? "----------");
        Console.ResetColor();


        Console.SetCursorPosition(1, 5);
        Console.Write("SENSING MODULE");

        Console.SetCursorPosition(0, 6);
        Console.Write("[2] ");
        var sensingModulePortName = _sensingModuleReceiverRepository.PortName;
        Console.ForegroundColor = string.IsNullOrEmpty(sensingModulePortName) ? ConsoleColor.Yellow : ConsoleColor.Cyan;
        Console.Write(sensingModulePortName ?? "----------");
        Console.ResetColor();


        Console.ForegroundColor = ConsoleColor.Gray;
        Console.SetCursorPosition(0, 12);
        Console.Write("[<] PREV");
        Console.ResetColor();

        Console.SetCursorPosition(0, 13);
        Console.Write("[>] NEXT");


        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.D1:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new FlightModulePortSelectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
            case ConsoleKey.D2:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SensingModulePortSelectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new LoggerSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
            case ConsoleKey.LeftArrow:
                 NavigationRequest?.Invoke(this,
                     new NavigationRequestEventArgs(new InitialView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
        }
        
    }
}

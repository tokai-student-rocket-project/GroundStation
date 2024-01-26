using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SerialSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;

    public SerialSettingView(
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

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("RECEIVER SETTING    1/2");


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
        Console.SetCursorPosition(0, 8);
        Console.Write("[<] PREV");
        Console.ResetColor();

        Console.SetCursorPosition(0, 9);
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
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
            case ConsoleKey.D2:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SensingModulePortSelectionView(_flightModuleReceiverRepository,
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

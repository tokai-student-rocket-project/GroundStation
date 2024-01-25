using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SerialSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;

    public SerialSettingView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("RECEIVER SETTING    1/1");


        Console.SetCursorPosition(1, 2);
        Console.Write("FLIGHT MODULE");

        Console.SetCursorPosition(0, 3);
        var flightModulePortName = _flightModuleReceiverRepository.PortName;
        Console.ForegroundColor = string.IsNullOrEmpty(flightModulePortName) ? ConsoleColor.Yellow : ConsoleColor.Cyan;
        Console.Write("[1] ");
        Console.Write(flightModulePortName ?? "----------");
        Console.ResetColor();


        Console.SetCursorPosition(1, 5);
        Console.Write("SENSING MODULE");

        Console.SetCursorPosition(0, 6);
        var sensingModulePortName = _sensingModuleReceiverRepository.PortName;
        Console.ForegroundColor = string.IsNullOrEmpty(sensingModulePortName) ? ConsoleColor.Yellow : ConsoleColor.Cyan;
        Console.Write("[2] ");
        Console.Write(sensingModulePortName ?? "----------");
        Console.ResetColor();


        Console.SetCursorPosition(0, 8);
        Console.Write("[<] PREV");

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
                        _sensingModuleReceiverRepository)));
                break;
            case ConsoleKey.D2:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SensingModulePortSelectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository)));
                break;
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new InitialView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository)));
                break;
            case ConsoleKey.RightArrow:
                if (!_flightModuleReceiverRepository.IsPortSet || !_sensingModuleReceiverRepository.IsPortSet)
                {
                }
            
                // _flightModuleReceiverRepository.Start();
                break;
        }
    }
}

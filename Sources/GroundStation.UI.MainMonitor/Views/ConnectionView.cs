using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class ConnectionView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;

    public ConnectionView(
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
        Console.Write("CONNECTION");
        
        
        Console.SetCursorPosition(0, 2);
        Console.Write("[<] PREV");

        Console.ForegroundColor = ConsoleColor.Gray;
        Console.SetCursorPosition(0, 3);
        Console.Write("[>] NEXT");
        Console.ResetColor();
        
        
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
                        _sensingModuleReceiverRepository)));
                break;
        }
    }
}

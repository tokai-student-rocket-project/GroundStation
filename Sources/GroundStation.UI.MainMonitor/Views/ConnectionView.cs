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
        if (_flightModuleReceiverRepository.PortName is not null)
        {
            _flightModuleReceiverRepository.Start();
        }
        
        if (_sensingModuleReceiverRepository.PortName is not null)
        {
            _sensingModuleReceiverRepository.Start();
        }
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.SetCursorPosition(3, 0);
        Console.Write("CONNECTION");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("FLIGHT MODULE");

        Console.ForegroundColor = ConnectionStatusToColor(_flightModuleReceiverRepository.CurrentStatus);
        Console.SetCursorPosition(17, 2);
        Console.Write(_flightModuleReceiverRepository.CurrentStatusString);
        Console.ResetColor();
        
        
        Console.SetCursorPosition(1, 4);
        Console.Write("SENSING MODULE");
        
        Console.ForegroundColor = ConnectionStatusToColor(_sensingModuleReceiverRepository.CurrentStatus);
        Console.SetCursorPosition(17, 4);
        Console.Write(_sensingModuleReceiverRepository.CurrentStatusString);
        Console.ResetColor();
        
        Console.SetCursorPosition(0, 5);
        Console.Write(_flightModuleReceiverRepository.LatestData?.PacketDataPart.RSSI);
        
        
        Console.SetCursorPosition(0, 6);
        Console.Write("[<] PREV");
        
        Console.ForegroundColor = ConsoleColor.Gray;
        Console.SetCursorPosition(0, 7);
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
                if (_flightModuleReceiverRepository.PortName is not null)
                {
                    _flightModuleReceiverRepository.Stop();
                }
        
                if (_sensingModuleReceiverRepository.PortName is not null)
                {
                    _sensingModuleReceiverRepository.Stop();
                }
                
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository)));
                break;
        }
    }

    private ConsoleColor ConnectionStatusToColor(IReceiver.Status status)
    {
        return status switch
        {
            IReceiver.Status.NotSelected => ConsoleColor.Gray,
            IReceiver.Status.Selected => ConsoleColor.Black,
            IReceiver.Status.ConnectionFailed => ConsoleColor.Red,
            IReceiver.Status.WaitingPacket => ConsoleColor.Cyan,
            IReceiver.Status.InvalidPacket => ConsoleColor.Red,
            IReceiver.Status.Connected => ConsoleColor.Green,
            _ => ConsoleColor.Black
        };
    }
}

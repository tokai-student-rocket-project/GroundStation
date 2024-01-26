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
        if (_flightModuleReceiverRepository.CurrentStatus == IReceiver.Status.Selected)
        {
            _flightModuleReceiverRepository.Start();
        }
        
        if (_sensingModuleReceiverRepository.CurrentStatus == IReceiver.Status.Selected)
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
        
        Console.SetCursorPosition(17, 2);
        Console.Write(_flightModuleReceiverRepository.CurrentStatusString);
        
        
        Console.SetCursorPosition(1, 4);
        Console.Write("SENSING MODULE");
        
        Console.SetCursorPosition(17, 4);
        Console.Write(_sensingModuleReceiverRepository.CurrentStatusString);
        
        
        // Console.SetCursorPosition(1, 4);
        // Console.Write("FLIGHT MODULE");
        //
        // Console.ForegroundColor = ConsoleColor.Red;
        // Console.SetCursorPosition(17, 4);
        // Console.Write("CONNECTION FAILED");
        // Console.ResetColor();
        //
        //
        // Console.SetCursorPosition(1, 6);
        // Console.Write("FLIGHT MODULE");
        //
        // Console.ForegroundColor = ConsoleColor.Cyan;
        // Console.SetCursorPosition(17, 6);
        // Console.Write("WAITING PACKET");
        // Console.ResetColor();
        //
        //
        // Console.SetCursorPosition(1, 8);
        // Console.Write("FLIGHT MODULE");
        //
        // Console.ForegroundColor = ConsoleColor.Red;
        // Console.SetCursorPosition(17, 8);
        // Console.Write("INVALID PACKET");
        // Console.ResetColor();
        //
        //
        // Console.SetCursorPosition(1, 10);
        // Console.Write("FLIGHT MODULE");
        //
        // Console.ForegroundColor = ConsoleColor.Green;
        // Console.SetCursorPosition(17, 10);
        // Console.Write("CONNECTED");
        // Console.ResetColor();
        //
        // Console.SetCursorPosition(0, 11);
        // Console.Write("RECEIVED: ");
        // Console.ForegroundColor = ConsoleColor.Green;
        // Console.Write("99");
        // Console.ResetColor();
        //
        // Console.SetCursorPosition(0, 12);
        // Console.Write("RSSI: ");
        // Console.ForegroundColor = ConsoleColor.Green;
        // Console.Write("-110");
        // Console.ResetColor();
        //
        // Console.SetCursorPosition(0, 13);
        // Console.Write("SNR: ");
        // Console.ForegroundColor = ConsoleColor.Green;
        // Console.Write("5.0");
        // Console.ResetColor();
        
        
        // Console.SetCursorPosition(0, 10);
        // Console.Write("[<] PREV");
        //
        // Console.ForegroundColor = ConsoleColor.Gray;
        // Console.SetCursorPosition(0, 11);
        // Console.Write("[>] NEXT");
        // Console.ResetColor();
        //
        
        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.LeftArrow:
                _flightModuleReceiverRepository.Stop();
                _sensingModuleReceiverRepository.Stop();
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository)));
                break;
        }
    }
}

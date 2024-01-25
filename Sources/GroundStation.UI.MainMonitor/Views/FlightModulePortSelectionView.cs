using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class FlightModulePortSelectionView : IView
{
    private string[] _portNames = Array.Empty<string>();
    private int _selectedIndex = 0;

    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;

    public FlightModulePortSelectionView(
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
        _portNames = _flightModuleReceiverRepository.GetPortNames();
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.SetCursorPosition(3,0);
        Console.Write("RECEIVER SETTING    1/1");
        
        
        Console.SetCursorPosition(1,2);
        Console.Write("FLIGHT MODULE PORT");

        for (var i = 0; i < _portNames.Length; i++)
        {
            Console.SetCursorPosition(0,3 + i);
            
            if (i == _selectedIndex)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
            }
            
            Console.Write($"[{i + 1}] ");
            Console.Write(_portNames[i]);
            Console.ResetColor();
        }
        
        
        Console.SetCursorPosition(0,5 + _portNames.Length);
        Console.Write("[<] PREV");
        
        Console.SetCursorPosition(0,4 + _portNames.Length);
        Console.Write("[>] NEXT");
        
        
        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        
        if (int.TryParse(readKey.KeyChar.ToString(),  out var unverifiedSelectedIndex)) {}
        {
            if (unverifiedSelectedIndex >= 1 && unverifiedSelectedIndex <= _portNames.Length)
            {
                _selectedIndex = unverifiedSelectedIndex - 1;
            }
        }
        
        switch (readKey.Key)
        {
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository, _sensingModuleReceiverRepository)));
                break;
            case ConsoleKey.RightArrow:
                _flightModuleReceiverRepository.PortName = _portNames[_selectedIndex];
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository, _sensingModuleReceiverRepository)));
                break;
        }
    }
}

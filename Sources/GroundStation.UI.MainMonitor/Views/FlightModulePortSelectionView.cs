using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class FlightModulePortSelectionView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;
    private readonly IMobileRepository _mobileRepository;
    
    private string[] _portNames = Array.Empty<string>();
    private int _selectedIndex;

    public FlightModulePortSelectionView(
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
        _portNames = _flightModuleReceiverRepository.GetPortNames();
        
        //Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("RECEIVER SETTING    1/1");


        Console.SetCursorPosition(1, 2);
        Console.Write("FLIGHT MODULE PORT");

        for (var i = 0; i < _portNames.Length; i++)
        {
            Console.SetCursorPosition(0, 3 + i);
            Console.Write($"[{i + 1}] ");
            
            if (i == _selectedIndex)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
            }
            
            Console.Write(_portNames[i]);
            Console.ResetColor();
        }


        Console.SetCursorPosition(0, 12);
        Console.Write("[<] PREV");

        Console.SetCursorPosition(0, 13);
        Console.Write("[>] NEXT");


        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);

        if (int.TryParse(readKey.KeyChar.ToString(), out var unverifiedSelectedIndex))
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
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
            case ConsoleKey.RightArrow:
                _flightModuleReceiverRepository.PortName = _portNames[_selectedIndex];
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
        }
    }
}

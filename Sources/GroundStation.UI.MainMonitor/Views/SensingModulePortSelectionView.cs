using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SensingModulePortSelectionView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    
    private string[] _portNames = Array.Empty<string>();
    private int _selectedIndex;

    public SensingModulePortSelectionView(
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
        _portNames = _sensingModuleReceiverRepository.GetPortNames();
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("RECEIVER SETTING    1/1");


        Console.SetCursorPosition(1, 2);
        Console.Write("SENSING MODULE PORT");

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


        Console.SetCursorPosition(0, 5 + _portNames.Length);
        Console.Write("[<] PREV");

        Console.SetCursorPosition(0, 4 + _portNames.Length);
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
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
            case ConsoleKey.RightArrow:
                _sensingModuleReceiverRepository.PortName = _portNames[_selectedIndex];
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
        }
    }
}

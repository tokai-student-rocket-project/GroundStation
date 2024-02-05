using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class MobileSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;
    private readonly IMobileRepository _mobileRepository;

    public MobileSettingView(
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
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("MOBILE SETTING");
        Console.SetCursorPosition(25, 0);
        Console.Write("4/4");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("USE MOBILE?");
        
        Console.SetCursorPosition(0, 3);
        Console.Write("[1] ");
        Console.ForegroundColor = _mobileRepository.UseMobile ? ConsoleColor.Green : ConsoleColor.Red;
        Console.Write(_mobileRepository.UseMobile ? "YES" : "NO");
        Console.ResetColor();

        if (_mobileRepository.UseMobile)
        {
            Console.SetCursorPosition(0, 5);
            Console.WriteLine($"LISTEN ON:");
            Console.WriteLine($"WEBSOCKET    {_mobileRepository.WebsocketUrl}");
            Console.WriteLine($"CLIENTAPP");
            
            Console.SetCursorPosition(0, 9);
            Console.ForegroundColor = _mobileRepository.IsConnected ? ConsoleColor.Green : ConsoleColor.Red;
            Console.WriteLine(_mobileRepository.IsConnected ? "CONNECTED" : "NOT CONNECTED");
            Console.ResetColor();

            if (_mobileRepository.IsConnected)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"{_mobileRepository.ClientCount} CLIENT(S)");
                Console.ResetColor();
            }
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
        switch (readKey.Key)
        {
            case ConsoleKey.D1:
                _mobileRepository.UseMobile = !_mobileRepository.UseMobile;
                if (_mobileRepository.UseMobile)
                {
                    _mobileRepository.Start();
                }
                else if (!_mobileRepository.UseMobile)
                {
                    _mobileRepository.Stop();
                }
                break;
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ObsSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ConnectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                break;
        }
    }
}

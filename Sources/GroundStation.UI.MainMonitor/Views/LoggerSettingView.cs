using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class LoggerSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;

    public LoggerSettingView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository,
        ILogRepository logRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
        _logRepository = logRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;
    

    public void OnNavigated()
    {
        _logRepository.ScheduleLog();
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("LOGGER SETTING");
        Console.SetCursorPosition(25, 0);
        Console.Write("2/3");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("USE LOGGER?");
        
        Console.SetCursorPosition(0, 3);
        Console.Write("[1] ");
        Console.ForegroundColor = (_logRepository.UseLogger) ? ConsoleColor.Green : ConsoleColor.Red;
        Console.Write(_logRepository.UseLogger ? "YES" : "NO");
        Console.ResetColor();

        
        if (_logRepository.UseLogger)
        {
            Console.SetCursorPosition(1, 5);
            Console.WriteLine("LOG FILE");
            Console.WriteLine(_logRepository.LogName);
            
            Console.SetCursorPosition(1, 8);
            Console.WriteLine("SITUATION");
            
            Console.Write("[2] ");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine(_logRepository.IsPerformance ? "PERFORMANCE" : "TEMPORARY");
            Console.ResetColor();
            
            Console.Write("[3] ");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine(_logRepository.IsFlight ? "FLIGHT" : "GROUND");
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
        switch (readKey.Key)
        {
            case ConsoleKey.D1:
                _logRepository.UseLogger = !_logRepository.UseLogger;
                break;
            case ConsoleKey.D2:
                _logRepository.IsPerformance = !_logRepository.IsPerformance;
                break;
            case ConsoleKey.D3:
                _logRepository.IsFlight = !_logRepository.IsFlight;
                break;
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository)));
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ObsSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository)));
                break;
        }
    }
}

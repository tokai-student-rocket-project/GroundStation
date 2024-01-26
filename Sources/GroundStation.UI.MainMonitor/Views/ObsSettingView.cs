using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class ObsSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;

    public ObsSettingView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
            IObsSettingRepository obsSettingRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    private bool _useObs = false;
    private ObsSetting? _obsSetting;

    public void OnNavigated()
    {
        _obsSetting = _obsSettingRepository.GetObsSetting();
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("OBS SETTING    2/2");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("USE OBS?");
        
        Console.SetCursorPosition(0, 3);
        Console.Write("[1] ");
        Console.ForegroundColor = _useObs ? ConsoleColor.Green : ConsoleColor.Red;
        Console.Write(_useObs ? "YES" : "NO");
        Console.ResetColor();

        if (_obsSetting is null)
        {
            Console.SetCursorPosition(0, 5);
            Console.Write("SETTING NOT FOUND");
        }
        else
        {
            Console.SetCursorPosition(1, 5);
            Console.WriteLine("SETTING LOADED");
            Console.WriteLine($"ADDR    ws://{_obsSetting.Address}:{_obsSetting.Port}");
            Console.WriteLine($"PASS    {_obsSetting.Password}");
        }

        
        Console.SetCursorPosition(0, 9);
        Console.Write("[<] PREV");

        Console.SetCursorPosition(0, 10);
        Console.Write("[>] NEXT");


        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.D1:
                _useObs = !_useObs;
                break;
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SerialSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository)));
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ConnectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository)));
                break;
        }
    }
}

﻿using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class ObsSettingView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;

    public ObsSettingView(
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

    private bool _useObs = false;
    private bool _showPassword = false;
    private ObsSetting? _obsSetting;

    public void OnNavigated()
    {
        _obsSetting = _obsSettingRepository.GetObsSetting();
    }

    public void Render()
    {
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("OBS SETTING    3/3");
        
        
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
            Console.WriteLine($"URL    {_obsSetting.URL}");
            Console.WriteLine($"PWD    {(_showPassword ? _obsSetting.Password : @"****************")}");
        }
        
        Console.SetCursorPosition(0, 8);
        Console.Write("[2] ");
        Console.Write(_showPassword ? "HIDE PWD" : "SHOW PWD");
        Console.ResetColor();
        
        
        Console.SetCursorPosition(0, 10);
        Console.ForegroundColor = _obsRepository.IsConnected ? ConsoleColor.Green : ConsoleColor.Red;
        Console.Write(_obsRepository.IsConnected ? "CONNECTED" : "NOT CONNECTED");
        Console.ResetColor();

        
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
                _useObs = !_useObs;
                if (_useObs && _obsSetting is not null)
                {
                    _obsRepository.Connect(_obsSetting);
                }
                else if (!_useObs && _obsSetting is not null)
                {
                    _obsRepository.DisConnect();
                }
                break;
            case ConsoleKey.D2:
                _showPassword = !_showPassword;
                break;
            
            case ConsoleKey.LeftArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new LoggerSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new ConnectionView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository)));
                break;
        }
    }
}

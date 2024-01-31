using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SummaryView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;

    public SummaryView(
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
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.SetCursorPosition(3, 0);
        Console.Write("SUMMARY");
        
        
        Console.SetCursorPosition(0, 2);
        Console.Write($"FLIGHT MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ModeString ?? "------"}");
        
        Console.SetCursorPosition(0, 3);
        Console.Write($"VALVE MODE     {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeString ?? "------"}");
        
        
        Console.SetCursorPosition(1, 5);
        Console.Write("GNSS");

        Console.SetCursorPosition(0, 6);
        Console.Write("POS");
        
        Console.SetCursorPosition(7, 6);
        Console.Write($"{_flightModuleReceiverRepository.LatestData?.GnssDataPart.LatitudeString ?? "----"}   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LongitudeString ?? "----"}");
        
        Console.SetCursorPosition(0, 7);
        Console.Write($"ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.AccuracyString ?? "----"} m");
        
        
        Console.SetCursorPosition(1, 9);
        Console.Write("VALVE");
        
        Console.SetCursorPosition(0, 10);
        Console.Write($"MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeString ?? "------"}");
        
        Console.SetCursorPosition(0, 11);
        Console.Write($"ANGL    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.TargetPositionString ?? "--"}° > {_flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentPositionString ?? "--"}°");

        Console.SetCursorPosition(0, 12);
        Console.Write($"TEMP    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.MotorTemperatureString ?? "--"}°");

        _obsRepository.SendData(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        _logRepository.SaveLog(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        

        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
    }
}

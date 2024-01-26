using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SummaryView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;

    public SummaryView(
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
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.SetCursorPosition(3, 0);
        Console.Write("SUMMARY");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("GNSS");

        Console.SetCursorPosition(0, 3);
        Console.Write("POS");
        
        Console.SetCursorPosition(7, 3);
        Console.Write($"{_flightModuleReceiverRepository.LatestData?.GnssDataPart.LatitudeString ?? "----"}   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LongitudeString ?? "----"}");
        
        Console.SetCursorPosition(0, 4);
        Console.Write($"ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.AccuracyString ?? "----"} m");
        
        
        Console.SetCursorPosition(1, 6);
        Console.Write("VALVE");
        
        Console.SetCursorPosition(0, 7);
        Console.Write($"MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeString ?? "------"}");
        
        Console.SetCursorPosition(0, 8);
        Console.Write($"ANGL    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.TargetPositionString ?? "--"}° > {_flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentPositionString ?? "--"}°");


        _obsRepository.SendData(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        

        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
    }
}

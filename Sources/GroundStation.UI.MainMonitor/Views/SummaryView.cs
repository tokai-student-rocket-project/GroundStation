using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SummaryView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;

    public SummaryView(
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
        
        var lat = _flightModuleReceiverRepository.LatestData?.GnssDataPart.Latitude ?? 0;
        var latD = Math.Floor(lat); 
        var latMS = double.Parse("0." + lat.ToString("F").Split(".")[1]) * 60;
        var latM = Math.Floor(latMS);
        var latS = (double.Parse("0." + latMS.ToString("F").Split(".")[1]) * 60).ToString("F0");
        
        var lon = _flightModuleReceiverRepository.LatestData?.GnssDataPart.Longitude ?? 0;
        var lonD = Math.Floor(lon); 
        var lonMS = double.Parse("0." + lon.ToString("F").Split(".")[1]) * 60;
        var lonM = Math.Floor(lonMS);
        var lonS = (double.Parse("0." + lonMS.ToString("F").Split(".")[1]) * 60).ToString("F0");
        
        Console.Write($"{latD}°{latM}'{latS}\"N   {lonD}°{lonM}'{lonS}\"E");
        
        Console.SetCursorPosition(0, 4);
        Console.Write($"ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.Accuracy.ToString("F1") ?? "----"} m");
        
        
        Console.SetCursorPosition(1, 6);
        Console.Write("VALVE");
        
        Console.SetCursorPosition(0, 7);
        Console.Write($"MODE    {(_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeIsLaunch is null ? "-------" : _flightModuleReceiverRepository.LatestData.FlightDataPart.ValveModeIsLaunch ? "LAUNCH" : "WAITING")}");
        
        Console.SetCursorPosition(0, 8);
        Console.Write($"ANGL    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.TargetPosition.ToString("F0") ?? "--"}° > {_flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentPosition.ToString("F0") ?? "--"}°");
        

        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
    }
}
